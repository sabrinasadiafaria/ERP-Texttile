import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export function ProtectedRoute() {
  const { session, isLoading, profile } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-[#0047ff]" />
      </div>
    );
  }

  // Demo mode: no Supabase auth session, but profile may exist from local storage.
  // Allow through so we can test role-based nav.
  if (!session && !profile) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
