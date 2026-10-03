import { Navigate } from 'react-router-dom';
import { useAuth, type PermissionAction } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface RoleProtectedRouteProps {
  /** Permission check against the RBAC matrix (preferred). */
  module?: string;
  action?: PermissionAction;
  /** Optional extra role whitelist (kept for narrow cases such as dashboards). */
  allowedRoles?: string[];
  children: React.ReactNode;
}

export function RoleProtectedRoute({ module, action = 'view', allowedRoles, children }: RoleProtectedRouteProps) {
  const { profile, isLoading, can } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-[#0047ff]" />
      </div>
    );
  }

  const roleOk = !allowedRoles || (!!profile?.role && allowedRoles.includes(profile.role));
  const permOk = !module || can(module, action);

  if (!profile?.role || !roleOk || !permOk) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
