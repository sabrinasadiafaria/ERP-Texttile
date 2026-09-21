import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  role: string | null;
  department: string | null;
  designation: string | null;
  status: string;
}

interface RolePermissions {
  role: string;
  dashboard: boolean;
  projects: string;
  yarn: string;
  inventory: string;
  production: string;
  reports: string;
  admin: string;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  permissions: RolePermissions | null;
  isLoading: boolean;
  setDemoRole: (role: string) => void;
  demoRoles: string[];
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const DEMO_ROLES: { role: string; full_name: string }[] = [
  { role: 'Director', full_name: 'Demo Director' },
  { role: 'Admin', full_name: 'Demo Admin' },
  { role: 'Merchandiser', full_name: 'Demo Merchandiser' },
  { role: 'Yarn Manager', full_name: 'Demo Yarn Manager' },
  { role: 'Inventory Manager', full_name: 'Demo Inventory Manager' },
  { role: 'Production PM', full_name: 'Demo Production PM' },
  { role: 'Production APM', full_name: 'Demo Production APM' },
];

const DEMO_ROLE_KEY = 'demo_active_role';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [permissions, setPermissions] = useState<RolePermissions | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial fetch
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        loadDemoProfile();
      }
    });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        loadDemoProfile();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchRolePermissions = async (roleName: string) => {
    const { data, error } = await supabase.from('role_permissions').select('*').eq('role', roleName).single();
    if (!error && data) {
      setPermissions(data as RolePermissions);
    } else {
      // Fallback default permissions if not in DB yet
      setPermissions({
        role: roleName,
        dashboard: true,
        projects: 'view',
        yarn: 'view',
        inventory: 'view',
        production: 'view',
        reports: 'view',
        admin: 'none'
      });
    }
    setIsLoading(false);
  };

  const loadDemoProfile = async () => {
    const activeRole = localStorage.getItem(DEMO_ROLE_KEY) || 'Director';
    const demo = DEMO_ROLES.find(d => d.role === activeRole) || DEMO_ROLES[0];
    setProfile({
      id: 'demo-' + demo.role.toLowerCase().replace(/\s+/g, '-'),
      email: demo.role.toLowerCase().replace(/\s+/g, '-') + '@demo.local',
      full_name: demo.full_name,
      role: demo.role,
      department: demo.role,
      designation: demo.role,
      status: 'Active',
    });
    await fetchRolePermissions(demo.role);
  };

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        setIsLoading(false);
      } else {
        setProfile(data);
        if (data.role) {
          await fetchRolePermissions(data.role);
        } else {
          setIsLoading(false);
        }
      }
    } catch (err) {
      console.error('Unexpected error fetching profile:', err);
      setIsLoading(false);
    }
  };

  const setDemoRole = (role: string) => {
    localStorage.setItem(DEMO_ROLE_KEY, role);
    setIsLoading(true);
    loadDemoProfile();
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem(DEMO_ROLE_KEY);
    setProfile(null);
    setPermissions(null);
  };

  return (
    <AuthContext.Provider value={{ session, user, profile, permissions, isLoading, setDemoRole, demoRoles: DEMO_ROLES.map(d => d.role), signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
