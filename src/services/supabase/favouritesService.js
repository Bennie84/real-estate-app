import  { supabase } from './supabaseClient'

//Add property to favourites
export const addFavourite = async (userId, propertyId) => {
  const { data, error } = await supabase
  .from('favourites')
  .insert([{ user_id: userId, property_id: propertyId }])
  .select()
  .single()
  if (error) throw error
  return data
}

// Remove property from favourites
 export const removeFavourite = async (userId, propertyId) => {
  const { error } = await supabase
  .from('favourites')
  .delete()
  .eq('user_id', userId)
  .eq('property_id', propertyId)
  if (error) throw error
}
 

// Get all favourites for a user
export const getUserFavourites = async (userId) => {
  const { data, error } = await supabase
  .from('favourites')
  .select('property_id')
  .eq('user_id', userId)
  if (error) throw error
  return data.map((f) => f.property_id)
}

// Check if a property is favourited
export const checkIsFavourited = async (userId, propertyId) => {
  const { data, error } = await supabase
  .from('favourites')
  .select('id')
  .eq('user_id', userId)
  .eq('property_id', propertyId)
  .single()
  if (error) throw error
  return !!data
}

