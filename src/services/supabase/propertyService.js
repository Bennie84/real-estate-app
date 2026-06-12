import { supabase } from './supabaseClient'

//Get all properties with optional filters
export const getProperties = async (filters = {}) => {
  let query = supabase
  .from('properties')
  .select('*')
  .order('created_at', { ascending: false })

  if (filters.search) {
    query = query.or(
      `title.ilike.%${filters.search}%, location.ilike.%${filters.search}%`
    )
  }
  if (filters.category && filters.category !== 'All') {
    query = query.eq('category', filters.category)
  }
   if (filters.status && filters.status !== 'All') {
    query = query.eq('status', filters.status)
  }
  if (filters.minPrice) {
    query = query.gte('price', filters.minPrice)
  }
  if (filters.maxPrice) {
    query = query.lte('price', filters.maxPrice)
  }
  if (filters.bedrooms && filters.bedrooms !== 'Any') {
    query = query.gte('bedrooms', filters.bedrooms)
  }

  const { data, error } = await query
  if (error) throw error
  return data
}

//Get single property by ID
export const getPropertyById = async (id) => {
  const { data, error} = await supabase
  .from('properties')
  .select('*')
  .eq('id', id)
  .single()
  if (error) throw error
  return data
}

//Get featured properties
export const getFeaturedProperties = async () => {
  const { data, error } = await supabase
  .from('properties')
  .select('*')
  .eq('is_featured', true)
  .order('created_at', { ascending: false })
  .limit(6)
  if (error) throw error
  return data
}

//Add new property (admin only)
export const addProperty = async (propertyData) => {
  const { data, error } = await supabase
  .from('properties')
  .insert([propertyData])
  .select()
  .single()
  if (error) throw error
  return data
}

//Update property (admin only)
export const updateProperty = async (id, propertyData) => {
  const { data, error } = await supabase
  .from('properties')
  .update(propertyData)
  .eq('id', id)
  .select()
  .single()
  if (error) throw error
  return data
}

//Delete property (admin only)
export const deleteProperty = async (id) => {
  const { data, error } = await supabase
  .from('properties')
  .delete()
  .eq('id', id)
  if (error) throw error
  return data
}

//Upload property image to Supabase Storage
export const uploadPropertyImage = async (file, propertyId) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${propertyId}/${Date.now()}.${fileExt}`

  const { error } = await supabase.storage
  .from('property-images')
  .upload(fileName, file)

  if (error) throw error

  const { data } = supabase.storage
  .from('property-images')
  .getPublicUrl(fileName)

  return data.getPublicUrl
}
