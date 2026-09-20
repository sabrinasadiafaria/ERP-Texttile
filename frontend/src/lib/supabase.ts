import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

function makeDummyClient(): SupabaseClient {
  const dummy = {
    from: () => ({
      select: () => ({
        eq: () => ({ data: [], error: null, status: 200, statusText: 'OK', count: null, fetching: false, mutate: () => {} }),
        order: () => ({ data: [], error: null, status: 200, statusText: 'OK', count: null, fetching: false, mutate: () => {} }),
        in: () => ({ data: [], error: null, status: 200, statusText: 'OK', count: null, fetching: false, mutate: () => {} }),
        data: [], error: null,
      }),
      insert: () => ({ data: null, error: null, status: 200, statusText: 'OK', count: null, fetching: false, mutate: () => {} }),
      update: () => ({ data: null, error: null, status: 200, statusText: 'OK', count: null, fetching: false, mutate: () => {} }),
      delete: () => ({ data: null, error: null, status: 200, statusText: 'OK', count: null, fetching: false, mutate: () => {} }),
    }),
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } }, error: null }),
      signInWithPassword: () => Promise.resolve({ data: { session: null, user: null }, error: null }),
      signUp: () => Promise.resolve({ data: { session: null, user: null }, error: null }),
      signOut: () => Promise.resolve({ error: null }),
      resetPasswordForEmail: () => Promise.resolve({ error: null }),
    },
    storage: { from: () => ({ upload: () => Promise.resolve({ data: null, error: null }), download: () => Promise.resolve({ data: null, error: null }) }) },
  } as unknown as SupabaseClient;
  return dummy;
}

export const supabase: SupabaseClient =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : makeDummyClient();

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[supabase] env vars missing — running in demo mode');
}
