import { supabase } from './supabaseClient'

//Sign up a new user
export const signUp = async (email, password, fullName) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName
      }
    }
  })

  if (error) throw error
  return data
}

//Log in an existing user
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  if (error) throw error
  return data
}

//Log out the current user
export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

//Get the currently logged in user
export const getCurrentUser = async () => {
  const { data: { user} }= await supabase.auth.getUser()
  return user
}

//Forgot password
export const resetPassword = async (email) => {
  const {  error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`
  })
  if (error) throw error
}

//Get user profile from profile table
export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
   .from('profiles')
   .select('*')
   .eq('id', userId)
   .single()
   if (error) return null
   return data
}