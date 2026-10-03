import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

export function PendingApproval() {
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-blue-600">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Account Pending Approval</h2>
          <p className="text-gray-500">
            Your account has been created successfully, but it requires administrator approval before you can access the ERP system.
          </p>
        </div>
        
        <p className="text-sm text-gray-400">
          Please check back later or contact your system administrator.
        </p>
        
        <button onClick={signOut} className="w-full bg-[#0047ff] text-white py-2 rounded-lg hover:bg-blue-700">
          Sign Out
        </button>
      </div>
    </div>
  );
}
