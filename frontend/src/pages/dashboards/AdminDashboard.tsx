import { useEffect, useState } from 'react';
import {
  Users, Shield, Activity, Settings, Plus, Search,
  Eye, Edit2, Loader2, CheckCircle2, XCircle,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DEMO_USERS } from '@/lib/services/demoData';

interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  activeProjects: number;
  departments: number;
  pendingRequests: number;
  systemAlerts: number;
}

export function AdminDashboard() {
  const [stats, setStats] = useState<SystemStats>({
    totalUsers: 0,
    activeUsers: 0,
    activeProjects: 0,
    departments: 9,
    pendingRequests: 0,
    systemAlerts: 0,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [users] = useState(DEMO_USERS);

  useEffect(() => {
    // In production, fetch from Supabase
    setStats({
      totalUsers: DEMO_USERS.length,
      activeUsers: DEMO_USERS.filter(u => u.status === 'active').length,
      activeProjects: 6,
      departments: 9,
      pendingRequests: 3,
      systemAlerts: 1,
    });
    setIsLoading(false);
  }, []);

  const filteredUsers = users.filter(u =>
    u.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#0047ff]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">System Administration</h1>
          <p className="text-sm text-gray-500 mt-1">Manage users, roles, and system-wide settings</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            System Operational
          </span>
        </div>
      </div>

      {/* System Overview KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'blue', bg: 'bg-blue-50' },
          { label: 'Active Users', value: stats.activeUsers, icon: CheckCircle2, color: 'green', bg: 'bg-green-50' },
          { label: 'Active Projects', value: stats.activeProjects, icon: Activity, color: 'purple', bg: 'bg-purple-50' },
          { label: 'Departments', value: stats.departments, icon: Shield, color: 'amber', bg: 'bg-amber-50' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex items-center hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl ${kpi.bg} flex items-center justify-center mr-4 flex-shrink-0`}>
              <kpi.icon className={`w-6 h-6 text-${kpi.color}-600`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{kpi.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-0.5">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* User Management */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">User Management</h2>
            <p className="text-sm text-gray-500 mt-1">Manage user accounts, roles, and permissions</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20 focus:border-[#0047ff] text-sm w-64"
              />
            </div>
            <Button className="bg-[#0047ff] hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                {['Name', 'Email', 'Role', 'Department', 'Status', 'Last Login', 'Actions'].map(h => (
                  <th key={h} className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                        {user.full_name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{user.full_name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-600">{user.email}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-600">{user.department || '—'}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {user.status === 'active' ? (
                        <><CheckCircle2 className="w-3 h-3 mr-1" />Active</>
                      ) : (
                        <><XCircle className="w-3 h-3 mr-1" />Inactive</>
                      )}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-500">Today 09:00</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-[#0047ff] hover:bg-blue-50 transition-colors" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-[#0047ff] hover:bg-blue-50 transition-colors" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-colors" title="Reset Password">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Permissions Overview */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Role Permissions Overview</h2>
            <p className="text-sm text-gray-500 mt-1">Summary of all system roles and their access levels</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                {['Role', 'Dashboard', 'Projects', 'Yarn', 'Inventory', 'Production', 'Reports', 'Admin'].map(h => (
                  <th key={h} className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { role: 'Director', dashboard: true, projects: 'view', yarn: 'view', inventory: 'view', production: 'view', reports: 'view', admin: 'none' },
                { role: 'Admin', dashboard: true, projects: 'view', yarn: 'view', inventory: 'view', production: 'view', reports: 'view', admin: 'full' },
                { role: 'Merchandiser', dashboard: true, projects: 'full', yarn: 'view', inventory: 'view', production: 'none', reports: 'view', admin: 'none' },
                { role: 'Yarn Manager', dashboard: true, projects: 'view', yarn: 'full', inventory: 'view', production: 'none', reports: 'view', admin: 'none' },
                { role: 'Inventory Manager', dashboard: true, projects: 'view', yarn: 'view', inventory: 'full', production: 'none', reports: 'view', admin: 'none' },
                { role: 'Production PM', dashboard: true, projects: 'view', yarn: 'none', inventory: 'none', production: 'manage', reports: 'view', admin: 'none' },
                { role: 'Production APM', dashboard: true, projects: 'view', yarn: 'none', inventory: 'none', production: 'update', reports: 'none', admin: 'none' },
              ].map((row) => (
                <tr key={row.role} className="hover:bg-gray-50/50">
                  <td className="py-3 px-6">
                    <span className="text-sm font-medium text-gray-900">{row.role}</span>
                  </td>
                  {[row.dashboard, row.projects, row.yarn, row.inventory, row.production, row.reports, row.admin].map((perm, i) => (
                    <td key={i} className="py-3 px-6 text-center">
                      {perm === 'full' || perm === 'manage' || perm === 'update' ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                      ) : perm === 'view' ? (
                        <Eye className="w-5 h-5 text-blue-400 mx-auto" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-300 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center gap-6 text-xs text-gray-500">
          <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> Full Access</span>
          <span className="flex items-center gap-1"><Eye className="w-4 h-4 text-blue-400" /> View Only</span>
          <span className="flex items-center gap-1"><XCircle className="w-4 h-4 text-gray-300" /> No Access</span>
        </div>
      </div>

      {/* System Settings */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">System Configuration</h2>
            <p className="text-sm text-gray-500 mt-1">Configure factory structure and system parameters</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Factory Structure', desc: '10 floors configured', detail: 'Floors 10-1 + Store', icon: Activity },
            { label: 'Departments', desc: '9 departments active', detail: 'Production workflow configured', icon: Shield },
            { label: 'System Version', desc: 'ERP v1.0.0', detail: 'Last updated: Sep 2026', icon: Settings },
          ].map((item) => (
            <div key={item.label} className="p-4 rounded-lg border border-gray-100 hover:border-[#0047ff]/30 transition-colors cursor-pointer">
              <div className="flex items-center gap-3 mb-2">
                <item.icon className="w-5 h-5 text-[#0047ff]" />
                <span className="font-semibold text-gray-900">{item.label}</span>
              </div>
              <p className="text-sm text-gray-600">{item.desc}</p>
              <p className="text-xs text-gray-400 mt-1">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
