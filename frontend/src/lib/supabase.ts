import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

if (!supabase) {
  // Demo mode: all pages fall back to in-memory DEMO_* data.
  // Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to connect a real project.
  console.warn('[supabase] env vars missing — running in demo mode');
}
