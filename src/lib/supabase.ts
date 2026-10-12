import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Public client for client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for server-side operations (use only in server context)
export const getSupabaseAdmin = () => {
  const serviceKey = import.meta.env.SUPABASE_SERVICE_KEY;
  if (!serviceKey) {
    throw new Error('Missing Supabase service key');
  }
  return createClient(supabaseUrl, serviceKey);
};
