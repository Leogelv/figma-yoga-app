import { createClient } from '@supabase/supabase-js'

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_PROJECT_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

// Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

// Create Supabase client with realtime enabled
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      log_level: process.env.NODE_ENV === 'development' ? 'info' : 'error',
    },
  },
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export default supabase; 