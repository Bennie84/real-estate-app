import { supabase } from './supabaseClient'

// Submit a new inquiry
export const submitInquiry = async (inquiryData) => {
  //If property_id is not a valid UUID (dummy data), set it to null
  const isValidUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(inquiryData.property_id)
  const { data, error } = await supabase
  .from('inquiries')
    .insert([{
      ...inquiryData,
      property_id: isValidUUID ? inquiryData.property_id : null
    }])
    .select()
    .single()
    if (error) throw error
    return data  
}

// Get all inquirires (admin only)
export const getInquiries = async () => {
  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false})
    if (error) throw error
    return data  
}

// Delete inquiry (admin only)
 export const deleteInquiry = async (id) => {
 const { error } = await supabase
  .from('inquiries')
    .delete()
    .eq('id', id)
    if (error) throw error
 }