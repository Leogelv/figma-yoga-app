import { createClient } from '@supabase/supabase-js'

// Приоритезируем переменные NEXT_PUBLIC, затем смотрим SUPABASE_* переменные
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_PROJECT_URL || 'https://umgioqmcytxkspbrbaww.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtZ2lvcW1jeXR4a3NwYnJiYXd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3ODg5NDAsImV4cCI6MjAyOTM2NDk0MH0.kPvXVc1YJL5ekRWyUMFO9K3cOAFHm9XuQhXL3iC71Qc';

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseAnonKey ? 'Present' : 'Missing');

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export default supabase; 