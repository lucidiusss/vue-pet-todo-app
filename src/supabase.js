import { createClient } from '@supabase/supabase-js'

<<<<<<< HEAD

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
=======
const supabaseUrl = VITE_SUPABASE_URL
const supabaseAnonKey = VITE_SUPABASE_ANON_KEY
>>>>>>> 6e5662dbef146bf84e705a7edd006627969f2fae

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
