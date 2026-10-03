import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export type UserStatus = 'pending' | 'active' | 'rejected' | 'inactive';
export type PermissionAction =
  | 'view' | 'create' | 'update' | 'delete' | 'approve'
  | 'reject' | 'receive' | 'issue' | 'transfer' | 'manage';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  role: string | null;
  department: string | null;
  designation: string | null;
  status: UserStatus;
  rejection_reason?: string | null;
  created_at?: string;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  /** Modules -> actions granted to the current role, loaded from rbac_permissions. */
  permissions: Record<string, PermissionAction[]>;
  /** True only for an authenticated user whose profile is ACTIVE and has a role. */
  isApproved: boolean;
  isLoading: boolean;
  can: (module: string, action: PermissionAction) => boolean;
  canAny: (module: string) => boolean;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [permissions, setPermissions] = useState<Record<string, PermissionAction[]>>({});
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async (s: Session | null) => {
    if (!s?.user) {
      setProfile(null);
      setPermissions({});
      setIsLoading(false);
      return;
    }
    const { data: p, error } = await supabase.from('profiles').select('*').eq('id', s.user.id).single();
    if (error || !p) {
      setProfile(null);
      setPermissions({});
      setIsLoading(false);
      return;
    }
    const prof = { ...p, status: String(p.status).toLowerCase() } as UserProfile;
    setProfile(prof);

    // Only approved users receive a permission matrix. Anyone else gets none.
    if (prof.status === 'active' && prof.role) {
      const { data: rows } = await supabase
        .from('rbac_permissions')
        .select('module, action')
        .eq('role', prof.role);
      const matrix: Record<string, PermissionAction[]> = {};
      (rows ?? []).forEach((r: { module: string; action: PermissionAction }) => {
        (matrix[r.module] ??= []).push(r.action);
      });
      setPermissions(matrix);
    } else {
      setPermissions({});
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      load(data.session);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_evt, s) => {
      setSession(s);
      setIsLoading(true);
      // Defer to avoid awaiting Supabase calls inside the auth callback
      setTimeout(() => load(s), 0);
    });
    return () => subscription.unsubscribe();
  }, [load]);

  const isApproved = !!session && profile?.status === 'active' && !!profile.role;

  const can = (module: string, action: PermissionAction) => {
    if (!isApproved) return false;
    const granted = permissions[module] ?? [];
    return granted.includes(action) || granted.includes('manage');
  };
  const canAny = (module: string) => isApproved && (permissions[module]?.length ?? 0) > 0;

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setPermissions({});
  };

  const refresh = async () => load(session);

  return (
    <AuthContext.Provider
      value={{ session, user: session?.user ?? null, profile, permissions, isApproved, isLoading, can, canAny, signOut, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
