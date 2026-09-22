import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

class MockQueryBuilder implements PromiseLike<any> {
  private table: string;
  private action: 'select' | 'insert' | 'update' | 'delete' = 'select';
  private payload: any = null;
  private isSingle = false;

  constructor(table: string) {
    this.table = table;
  }

  select() { 
    if (this.action !== 'insert' && this.action !== 'update' && this.action !== 'delete') {
      this.action = 'select'; 
    }
    return this; 
  }
  insert(data: any) { this.action = 'insert'; this.payload = data; return this; }
  update(data: any) { this.action = 'update'; this.payload = data; return this; }
  delete() { this.action = 'delete'; return this; }

  eq() { return this; }
  neq() { return this; }
  in() { return this; }
  contains() { return this; }
  order() { return this; }
  limit() { return this; }
  single() { this.isSingle = true; return this; }

  then<TResult1 = any, TResult2 = never>(
    onfulfilled?: ((value: any) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
  ): PromiseLike<TResult1 | TResult2> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let resultData: any = [];
        const storageKey = `demo_db_${this.table}`;
        
        if (this.action === 'select') {
          const stored = localStorage.getItem(storageKey);
          resultData = stored ? JSON.parse(stored) : [];
          
          if (this.isSingle) {
            resultData = resultData[0] || null;
            if (!resultData && this.table === 'role_permissions') {
              resultData = {
                role: 'Demo', dashboard: true, projects: 'view', yarn: 'view', inventory: 'view', production: 'view', reports: 'view', admin: 'none'
              };
            }
          }
        } else if (this.action === 'insert') {
          const stored = localStorage.getItem(storageKey);
          const existing = stored ? JSON.parse(stored) : [];
          const newData = Array.isArray(this.payload) ? this.payload : [this.payload];
          const processedData = newData.map(item => ({
            ...item,
            id: item.id || `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            created_at: item.created_at || new Date().toISOString()
          }));
          localStorage.setItem(storageKey, JSON.stringify([...processedData, ...existing]));
          resultData = processedData;
        } else if (this.action === 'update' || this.action === 'delete') {
          // Simplistic mock: we don't actually filter properly in mock mode for updates, 
          // just pretend it succeeded.
          resultData = this.payload;
        }

        resolve({ data: resultData, error: null });
      }, 10);
    }).then(onfulfilled, onrejected);
  }
}

function makeDummyClient(): SupabaseClient {
  const dummy = {
    from: (table: string) => new MockQueryBuilder(table),
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } }, error: null }),
      signInWithPassword: () => Promise.resolve({ data: { session: null, user: null }, error: null }),
      signUp: () => Promise.resolve({ data: { session: null, user: null }, error: null }),
      signOut: () => Promise.resolve({ error: null }),
      resetPasswordForEmail: () => Promise.resolve({ error: null }),
    },
    storage: { 
      from: () => ({ 
        upload: () => Promise.resolve({ data: null, error: null }), 
        download: () => Promise.resolve({ data: null, error: null }) 
      }) 
    },
  } as unknown as SupabaseClient;
  return dummy;
}

export const supabase: SupabaseClient =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : makeDummyClient();

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[supabase] env vars missing — running in demo mode with localStorage mock');
}
