// import  { supabase } from './supabaseClient'

// //Add property to favourites
// export const addFavourite = async (userId, propertyId) => {
//   const { data, error } = await supabase
//   .from('favourites')
//   .insert([{ user_id: userId, property_id: propertyId }])
//   .select()
//   .single()
//   if (error) throw error
//   return data
// }

// // Remove property from favourites
//  export const removeFavourite = async (userId, propertyId) => {
//   const { error } = await supabase
//   .from('favourites')
//   .delete()
//   .eq('user_id', userId)
//   .eq('property_id', propertyId)
//   if (error) throw error
// }

// // Get all favourites for a user
// export const getUserFavourites = async (userId) => {
//   const { data, error } = await supabase
//   .from('favourites')
//   .select('property_id')
//   .eq('user_id', userId)
//   if (error) throw error
//   return data.map((f) => f.property_id)
// }

// // Check if a property is favourited
// export const checkIsFavourited = async (userId, propertyId) => {
//   const { data, error } = await supabase
//   .from('favourites')
//   .select('id')
//   .eq('user_id', userId)
//   .eq('property_id', propertyId)
//   .single()
//   if (error) throw error
//   return !!data
// }

import { supabase } from "./supabaseClient";

// Check if property ID is a valid UUID
const isValidUUID = (id) => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    id,
  );
};

// Add property to favorites
export const addFavorite = async (userId, propertyId) => {
  // Don't save dummy properties to favorites
  if (!isValidUUID(propertyId)) {
    throw new Error("Cannot favorite a dummy property");
  }
  const { data, error } = await supabase
    .from("favorites")
    .insert([{ user_id: userId, property_id: propertyId }])
    .select()
    .single();
  if (error) throw error;
  return data;
};

// Remove property from favorites
export const removeFavorite = async (userId, propertyId) => {
  if (!isValidUUID(propertyId)) {
    throw new Error("Cannot unfavorite a dummy property");
  }
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", userId)
    .eq("property_id", propertyId);
  if (error) throw error;
};

// Get all favorites for a user
export const getUserFavorites = async (userId) => {
  const { data, error } = await supabase
    .from("favorites")
    .select("property_id")
    .eq("user_id", userId);
  if (error) throw error;
  return data.map((f) => f.property_id);
};

// Check if a property is favorited
export const checkIsFavorited = async (userId, propertyId) => {
  if (!isValidUUID(propertyId)) return false;
  const { data, error } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", userId)
    .eq("property_id", propertyId)
    .single();
  if (error) return false;
  return !!data;
};