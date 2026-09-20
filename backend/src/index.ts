import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

dotenv.config();

function makeDummyClient(): SupabaseClient {
  return {
    from: () => ({
      select: () => ({
        eq: () => ({ data: [], error: null, count: 0 }),
        order: () => ({ data: [], error: null, count: 0 }),
        in: () => ({ data: [], error: null, count: 0 }),
      }),
      insert: () => ({ data: null, error: null }),
      update: () => ({ data: null, error: null }),
      delete: () => ({ data: null, error: null }),
    }),
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } }, error: null }),
      signInWithPassword: () => Promise.resolve({ data: { session: null, user: null }, error: null }),
      signUp: () => Promise.resolve({ data: { session: null, user: null }, error: null }),
      signOut: () => Promise.resolve({ error: null }),
      resetPasswordForEmail: () => Promise.resolve({ error: null }),
    },
  } as unknown as SupabaseClient;
}

const app = express();
app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';
export const supabase: SupabaseClient =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : makeDummyClient();

if (!supabaseUrl || !supabaseKey) {
  console.warn('[backend] Supabase env not set — DB calls will fail. Set SUPABASE_URL and SUPABASE_ANON_KEY to enable.');
}

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('TextTile ERP Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});