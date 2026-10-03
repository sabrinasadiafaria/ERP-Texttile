import { supabase } from '@/lib/supabase';
import type { UserProfile, UserStatus } from '@/contexts/AuthContext';

/** Admin user operations. All writes go through the admin_set_user RPC, which
 *  re-checks the caller's permission in the database and logs the activity. */
export async function listUsers(): Promise<UserProfile[]> {
  const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map((u) => ({ ...u, status: String(u.status).toLowerCase() })) as UserProfile[];
}

export async function setUser(args: {
  userId: string;
  status: UserStatus;
  role?: string | null;
  department?: string | null;
  reason?: string | null;
}): Promise<void> {
  const { error } = await supabase.rpc('admin_set_user', {
    p_user: args.userId,
    p_status: args.status,
    p_role: args.role ?? null,
    p_department: args.department ?? null,
    p_reason: args.reason ?? null,
  });
  if (error) throw new Error(error.message);
}

export async function updateProfileDetails(userId: string, details: { full_name: string; designation?: string }): Promise<void> {
  const { error } = await supabase.from('profiles').update({ ...details, updated_at: new Date().toISOString() }).eq('id', userId);
  if (error) throw new Error(error.message);
}
