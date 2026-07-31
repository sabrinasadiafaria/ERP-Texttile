import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface RoleProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

export function RoleProtectedRoute({ allowedRoles, children }: RoleProtectedRouteProps) {
  const { profile, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-[#0047ff]" />
      </div>
    );
  }

  if (!profile || !profile.role || !allowedRoles.includes(profile.role)) {
    // Redirect to a generic dashboard or unauthorized page
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
