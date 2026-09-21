import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Users, Shield, Activity, Settings, Plus, Search,
  Eye, Edit2, Loader2, CheckCircle2, XCircle,
  RefreshCw, X, Save
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

const INITIAL_PERMISSIONS = [
  { role: 'Director', dashboard: true, projects: 'view', yarn: 'view', inventory: 'view', production: 'view', reports: 'view', admin: 'none' },
  { role: 'Admin', dashboard: true, projects: 'view', yarn: 'view', inventory: 'view', production: 'view', reports: 'view', admin: 'full' },
  { role: 'Merchandiser', dashboard: true, projects: 'full', yarn: 'view', inventory: 'view', production: 'none', reports: 'view', admin: 'none' },
  { role: 'Yarn Manager', dashboard: true, projects: 'view', yarn: 'full', inventory: 'view', production: 'none', reports: 'view', admin: 'none' },
  { role: 'Inventory Manager', dashboard: true, projects: 'view', yarn: 'view', inventory: 'full', production: 'none', reports: 'view', admin: 'none' },
  { role: 'Production PM', dashboard: true, projects: 'view', yarn: 'none', inventory: 'none', production: 'manage', reports: 'view', admin: 'none' },
  { role: 'Production APM', dashboard: true, projects: 'view', yarn: 'none', inventory: 'none', production: 'update', reports: 'none', admin: 'none' },
];

export function AdminDashboard() {
  const location = useLocation();
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

  // User Management
  const [users, setUsers] = useState(DEMO_USERS);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [viewingUser, setViewingUser] = useState<any>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Role Permissions
  const [rolePermissions, setRolePermissions] = useState(INITIAL_PERMISSIONS);
  const [hasUnsavedPermissions, setHasUnsavedPermissions] = useState(false);

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/admin/users')) {
      document.getElementById('users-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (path.includes('/admin/departments')) {
      document.getElementById('departments-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  useEffect(() => {
    setStats({
      totalUsers: users.length,
      activeUsers: users.filter(u => u.status === 'active').length,
      activeProjects: 6,
      departments: 9,
      pendingRequests: 3,
      systemAlerts: 1,
    });
    setIsLoading(false);
  }, [users]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const filteredUsers = users.filter(u =>
    u.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newUser: any = {
      id: editingUser?.id || `usr_${Date.now()}`,
      full_name: formData.get('full_name') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as string,
      department: formData.get('department') as string || undefined,
      designation: formData.get('role') as string,
      status: formData.get('status') === 'active' ? 'active' : 'inactive',
      created_at: editingUser?.created_at || new Date().toISOString()
    };

    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? newUser : u));
      setToast('User updated successfully');
    } else {
      setUsers([newUser, ...users]);
      setToast('User added successfully');
    }
    setIsUserModalOpen(false);
    setEditingUser(null);
  };

  const handleResetPassword = () => {
    if (window.confirm('Are you sure you want to send a password reset email?')) {
      setToast('Password reset email sent');
    }
  };

  const togglePermission = (roleIndex: number, field: string) => {
    setRolePermissions(prev => {
      const newPerms = [...prev];
      const val = newPerms[roleIndex][field as keyof typeof newPerms[0]];
      let nextVal: string | boolean = 'none';
      if (typeof val === 'boolean') {
        nextVal = !val;
      } else {
        if (val === 'none') nextVal = 'view';
        else if (val === 'view') nextVal = 'full';
        else nextVal = 'none';
      }
      newPerms[roleIndex] = { ...newPerms[roleIndex], [field]: nextVal };
      setHasUnsavedPermissions(true);
      return newPerms;
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#0047ff]" />
      </div>
    );
  }

  return (
    <div className="space-y-6 relative pb-20">
      
      {toast && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-400" />
          {toast}
        </div>
      )}

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
      <div id="users-section" className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden scroll-mt-24">
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
            <Button 
              className="bg-[#0047ff] hover:bg-blue-700 text-white"
              onClick={() => { setEditingUser(null); setIsUserModalOpen(true); }}
            >
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
                        {user.full_name.split(' ').map((n: string) => n[0]).join('').slice(0,2)}
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
                      <button 
                        className="p-1.5 rounded-lg text-gray-400 hover:text-[#0047ff] hover:bg-blue-50 transition-colors" 
                        title="View"
                        onClick={() => { setViewingUser(user); setIsViewModalOpen(true); }}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-1.5 rounded-lg text-gray-400 hover:text-[#0047ff] hover:bg-blue-50 transition-colors" 
                        title="Edit"
                        onClick={() => { setEditingUser(user); setIsUserModalOpen(true); }}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-1.5 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-colors" 
                        title="Reset Password"
                        onClick={() => handleResetPassword()}
                      >
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
      <div id="permissions-section" className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 scroll-mt-24">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Role Permissions Overview</h2>
            <p className="text-sm text-gray-500 mt-1">Summary of all system roles and their access levels (Click to edit)</p>
          </div>
          {hasUnsavedPermissions && (
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white shadow-lg animate-pulse"
              onClick={() => { setHasUnsavedPermissions(false); setToast('Permissions saved successfully!'); }}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Permissions
            </Button>
          )}
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
              {rolePermissions.map((row, idx) => (
                <tr key={row.role} className="hover:bg-gray-50/50">
                  <td className="py-3 px-6">
                    <span className="text-sm font-medium text-gray-900">{row.role}</span>
                  </td>
                  {['dashboard', 'projects', 'yarn', 'inventory', 'production', 'reports', 'admin'].map((field, i) => {
                    const perm = row[field as keyof typeof row];
                    return (
                      <td key={i} className="py-3 px-6 text-center">
                        <button 
                          onClick={() => togglePermission(idx, field)}
                          className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20"
                        >
                          {perm === true || perm === 'full' || perm === 'manage' || perm === 'update' ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                          ) : perm === 'view' ? (
                            <Eye className="w-5 h-5 text-blue-400 mx-auto" />
                          ) : (
                            <XCircle className="w-5 h-5 text-gray-300 mx-auto" />
                          )}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center gap-6 text-xs text-gray-500">
          <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> Full Access / True</span>
          <span className="flex items-center gap-1"><Eye className="w-4 h-4 text-blue-400" /> View Only</span>
          <span className="flex items-center gap-1"><XCircle className="w-4 h-4 text-gray-300" /> No Access / False</span>
        </div>
      </div>

      {/* System Settings */}
      <div id="departments-section" className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 scroll-mt-24">
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

      {/* Add/Edit User Modal */}
      {isUserModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{editingUser ? 'Edit User' : 'Add New User'}</h3>
              <button onClick={() => setIsUserModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveUser} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input required type="text" name="full_name" defaultValue={editingUser?.full_name} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0047ff] focus:border-[#0047ff]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input required type="email" name="email" defaultValue={editingUser?.email} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0047ff] focus:border-[#0047ff]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select name="role" defaultValue={editingUser?.role || 'Admin'} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0047ff] focus:border-[#0047ff]">
                  <option>Admin</option>
                  <option>Director</option>
                  <option>Merchandiser</option>
                  <option>Yarn Manager</option>
                  <option>Inventory Manager</option>
                  <option>Knitting PM</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select name="status" defaultValue={editingUser?.status || 'active'} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0047ff] focus:border-[#0047ff]">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsUserModalOpen(false)}>Cancel</Button>
                <Button type="submit" className="bg-[#0047ff] hover:bg-blue-700 text-white">Save User</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View User Modal */}
      {isViewModalOpen && viewingUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">User Details</h3>
              <button onClick={() => setIsViewModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-[#0047ff]/10 flex items-center justify-center text-xl font-bold text-[#0047ff]">
                  {viewingUser.full_name.split(' ').map((n: string) => n[0]).join('').slice(0,2)}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{viewingUser.full_name}</h4>
                  <p className="text-sm text-gray-500">{viewingUser.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase">Role</p>
                  <p className="font-medium text-gray-900">{viewingUser.role}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">Status</p>
                  <span className={`inline-flex items-center px-2 py-0.5 mt-1 rounded-full text-xs font-medium ${
                    viewingUser.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {viewingUser.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">Last Login</p>
                  <p className="font-medium text-gray-900">Today, 09:00 AM</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">Created</p>
                  <p className="font-medium text-gray-900">{new Date(viewingUser.created_at || Date.now()).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="pt-6 flex justify-end">
                <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>Close</Button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
