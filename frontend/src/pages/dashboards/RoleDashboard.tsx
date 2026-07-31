import { useAuth } from '@/contexts/AuthContext';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle2,
  Activity
} from 'lucide-react';

interface RoleDashboardProps {
  roleName: string;
}

export function RoleDashboard({ roleName }: RoleDashboardProps) {
  const { profile } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {roleName} Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back, {profile?.full_name || 'User'}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            System Status: Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Tasks', value: '124', icon: CheckCircle2, color: 'text-blue-600', bg: 'bg-blue-100' },
          { label: 'In Progress', value: '12', icon: Activity, color: 'text-yellow-600', bg: 'bg-yellow-100' },
          { label: 'Pending Approval', value: '4', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-100' },
          { label: 'Performance', value: '+14%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center">
            <div className={`p-3 rounded-lg ${stat.bg} ${stat.color} mr-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-start pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 mr-4 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">System update log {i}</p>
                  <p className="text-xs text-gray-500 mt-1">Generated placeholder activity for {roleName}</p>
                </div>
                <span className="ml-auto text-xs text-gray-400">2h ago</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">User Information</h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Full Name</p>
              <p className="text-sm font-medium text-gray-900 mt-1">{profile?.full_name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
              <p className="text-sm font-medium text-gray-900 mt-1">{profile?.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Role</p>
              <p className="text-sm font-medium text-gray-900 mt-1">{profile?.role}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Status</p>
              <p className="text-sm font-medium text-green-600 mt-1 capitalize">{profile?.status}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
