import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_PROJECT_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

let supabase: SupabaseClient;

// Create a mock client for client-side when env vars aren't available
if (isBrowser && (!supabaseUrl || !supabaseAnonKey)) {
  console.error('Missing Supabase environment variables');
  
  // Create a mock client that won't crash the app
  const mockFunctions = {
    from: () => ({
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve({ data: null, error: null }),
          limit: () => Promise.resolve({ data: [], error: null }),
        }),
        limit: () => Promise.resolve({ data: [], error: null }),
      }),
      insert: () => ({
        select: () => ({
          single: () => Promise.resolve({ data: null, error: null }),
        }),
      }),
      update: () => ({
        eq: () => ({
          select: () => ({
            single: () => Promise.resolve({ data: null, error: null }),
          }),
        }),
      }),
      delete: () => ({
        eq: () => Promise.resolve({ data: null, error: null }),
      }),
    }),
    channel: () => ({
      on: () => ({
        subscribe: () => ({}),
      }),
    }),
    removeChannel: () => {},
  };

  supabase = mockFunctions as unknown as SupabaseClient;
} else {
  // Create a real Supabase client
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
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
}

export default supabase; 