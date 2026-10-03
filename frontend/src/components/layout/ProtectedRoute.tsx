import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

/** Gate for the whole ERP: requires a real session AND an approved (active) profile with a role. */
export function ProtectedRoute() {
  const { session, profile, isApproved, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-[#0047ff]" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // pending / rejected / inactive / role-less users never reach the ERP
  if (!profile || !isApproved) {
    return <Navigate to="/pending-approval" replace />;
  }

  return <Outlet />;
}
