import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Users, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingUsers: 0,
    activeUsers: 0,
    rejectedUsers: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase.from('profiles').select('status');
      if (error) throw error;
      
      const counts = {
        totalUsers: data.length,
        pendingUsers: data.filter(p => p.status === 'pending').length,
        activeUsers: data.filter(p => p.status === 'approved').length,
        rejectedUsers: data.filter(p => p.status === 'rejected').length
      };
      
      setStats(counts);
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500">System overview and user management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-50 text-[#0047ff] rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalUsers}</h3>
            </div>
          </div>
        </div>
        
        <Link to="/dashboard/admin/users?status=pending" className="bg-white p-6 rounded-xl border border-orange-200 shadow-sm hover:border-orange-300 transition-colors cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Approval</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.pendingUsers}</h3>
            </div>
          </div>
        </Link>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Users</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.activeUsers}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-50 text-red-600 rounded-lg">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Rejected</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.rejectedUsers}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
