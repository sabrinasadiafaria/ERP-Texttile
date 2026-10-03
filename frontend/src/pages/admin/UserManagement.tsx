import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Check, X, Shield, Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const ROLES = [
    'Director', 'Admin', 'Merchandiser', 'Yarn Manager', 'Inventory & Store Manager',
    'Knitting PM', 'Knitting APM', 'Linking PM', 'Linking APM',
    'Cutting & Trimming PM', 'Cutting & Trimming APM',
    'Sewing PM', 'Sewing APM', 'Washing PM', 'Washing APM',
    'Ironing PM', 'Ironing APM', 'Packaging PM', 'Packaging APM'
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setUsers(data);
    }
    setLoading(false);
  };

  const handleUpdateStatus = async (userId: string, newStatus: string) => {
    const { error } = await supabase.from('profiles').update({ status: newStatus }).eq('id', userId);
    if (!error) {
      setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u));
    }
  };

  const handleUpdateRole = async (userId: string, newRole: string) => {
    const { error } = await supabase.from('profiles').update({ role: newRole }).eq('id', userId);
    if (!error) {
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    }
  };
  
  const handleUpdateDepartment = async (userId: string, newDept: string) => {
    const { error } = await supabase.from('profiles').update({ department: newDept }).eq('id', userId);
    if (!error) {
      setUsers(users.map(u => u.id === userId ? { ...u, department: newDept } : u));
    }
  };

  const filteredUsers = users.filter(u => 
    u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-500">Approve users and assign roles</p>
        </div>
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-[#0047ff] focus:border-[#0047ff]"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#0047ff]" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-[#0047ff] font-bold">
                          {user.full_name?.charAt(0) || user.email.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.full_name || 'No Name'}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        user.status === 'pending' ? 'bg-orange-100 text-orange-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <select 
                        value={user.role || ''} 
                        onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-[#0047ff] focus:border-[#0047ff] sm:text-sm rounded-md"
                      >
                        <option value="">Select Role</option>
                        {ROLES.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <input 
                        type="text" 
                        value={user.department || ''} 
                        onChange={(e) => handleUpdateDepartment(user.id, e.target.value)}
                        placeholder="e.g. Knitting"
                        className="mt-1 focus:ring-[#0047ff] focus:border-[#0047ff] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-1 px-2 border"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {user.status === 'pending' ? (
                        <div className="flex justify-end space-x-2">
                          <button onClick={() => handleUpdateStatus(user.id, 'approved')} className="text-emerald-600 hover:text-emerald-900 bg-emerald-50 p-2 rounded-lg">
                            <Check className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleUpdateStatus(user.id, 'rejected')} className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-lg">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => handleUpdateStatus(user.id, user.status === 'approved' ? 'inactive' : 'approved')} className="text-gray-600 hover:text-gray-900 bg-gray-50 p-2 rounded-lg">
                          <Shield className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
