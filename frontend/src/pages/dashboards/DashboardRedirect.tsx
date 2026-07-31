import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export function DashboardRedirect() {
  const { profile, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-[#0047ff]" />
      </div>
    );
  }

  if (!profile || !profile.role) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Account Pending</h1>
        <p className="text-gray-500 text-center max-w-md">
          Your account has been created but no role has been assigned yet. Please contact your system administrator.
        </p>
      </div>
    );
  }

  // Format the role to match our URL structure (e.g. "Yarn Manager" -> "yarn-manager")
  const rolePath = profile.role.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
  
  return <Navigate to={`/dashboard/${rolePath}`} replace />;
}
