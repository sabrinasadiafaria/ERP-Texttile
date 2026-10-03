import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const COPY: Record<string, { title: string; body: string }> = {
  pending: {
    title: 'Account Pending Approval',
    body: 'Your account was created, but an administrator must approve it and assign your role and department before you can access the ERP.',
  },
  rejected: {
    title: 'Account Rejected',
    body: 'Your account request was rejected by an administrator.',
  },
  inactive: {
    title: 'Account Deactivated',
    body: 'Your account has been deactivated. Contact your administrator to regain access.',
  },
  active: {
    title: 'Role Not Assigned',
    body: 'Your account is active but no role has been assigned yet. Contact your administrator.',
  },
};

export function PendingApproval() {
  const { session, profile, isApproved, isLoading, signOut, refresh } = useAuth();

  if (isLoading) return null;
  if (!session) return <Navigate to="/login" replace />;
  if (isApproved) return <Navigate to="/dashboard" replace />;

  const copy = COPY[profile?.status ?? 'pending'] ?? COPY.pending;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">{copy.title}</h2>
          <p className="text-gray-500">{copy.body}</p>
          {profile?.status === 'rejected' && profile.rejection_reason && (
            <p className="mt-3 text-sm text-red-600">Reason: {profile.rejection_reason}</p>
          )}
        </div>
        <button onClick={refresh} className="w-full border border-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-50">
          Check status again
        </button>
        <button onClick={signOut} className="w-full bg-[#0047ff] text-white py-2 rounded-lg hover:bg-blue-700">
          Sign Out
        </button>
      </div>
    </div>
  );
}
