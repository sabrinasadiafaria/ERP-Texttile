import { useEffect, useMemo, useState } from 'react';
import {
  Settings as SettingsIcon, Building, Users as UsersIcon,
  Save, Plus, Edit2, Trash2, Loader2,
} from 'lucide-react';
import { PRODUCTION_ORDER } from '@/lib/services/production';

interface DepartmentConfig {
  id: string;
  name: string;
  sequence: number;
  manager_role: string;
  apm_role: string | null;
  floor: string;
  active: boolean;
}

const INITIAL_DEPARTMENTS: DepartmentConfig[] = PRODUCTION_ORDER.map((dept, idx) => ({
  id: `dept-${idx}`,
  name: dept,
  sequence: idx + 1,
  manager_role: dept === 'Yarn' ? 'Yarn Manager' :
               dept === 'Inventory' ? 'Inventory & Store Manager' :
               `${dept} PM`,
  apm_role: dept !== 'Yarn' && dept !== 'Inventory' ? `${dept} APM` : null,
  floor: `Floor ${10 - Math.floor(idx / 2)}`,
  active: true,
}));

interface FactoryFloor {
  id: string;
  name: string;
  departments: string[];
  capacity_units_per_day: number;
}

const INITIAL_FACTORY: FactoryFloor[] = [
  { id: 'floor-10', name: 'Floor 10', departments: ['Yarn Store'], capacity_units_per_day: 50000 },
  { id: 'floor-9', name: 'Floor 9', departments: ['Knitting'], capacity_units_per_day: 30000 },
  { id: 'floor-8', name: 'Floor 8', departments: ['Linking', 'Trimming'], capacity_units_per_day: 25000 },
  { id: 'floor-7', name: 'Floor 7', departments: ['Sewing'], capacity_units_per_day: 20000 },
  { id: 'floor-6', name: 'Floor 6', departments: ['Washing', 'Ironing'], capacity_units_per_day: 15000 },
  { id: 'floor-5', name: 'Floor 5', departments: ['Packaging'], capacity_units_per_day: 18000 },
  { id: 'floor-1', name: 'Floor 1', departments: ['Inventory', 'Store'], capacity_units_per_day: 100000 },
];

export function SettingsPage() {
  const [departments, setDepartments] = useState<DepartmentConfig[]>([]);
  const [factory] = useState<FactoryFloor[]>(INITIAL_FACTORY);
  const [activeTab, setActiveTab] = useState<'departments' | 'factory' | 'system'>('departments');
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFloor, setEditFloor] = useState('');

  useEffect(() => {
    setDepartments(INITIAL_DEPARTMENTS);
    setIsLoading(false);
  }, []);

  const summary = useMemo(() => ({
    active: departments.filter(d => d.active).length,
    floors: factory.length,
    totalDailyCapacity: factory.reduce((s, f) => s + f.capacity_units_per_day, 0),
  }), [departments, factory]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#0047ff]" />
      </div>
    );
  }

  const handleSaveEdit = (id: string) => {
    setDepartments(prev => prev.map(d => d.id === id ? { ...d, floor: editFloor } : d));
    setEditingId(null);
    setEditFloor('');
  };

  const handleToggleActive = (id: string) => {
    setDepartments(prev => prev.map(d => d.id === id ? { ...d, active: !d.active } : d));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">System Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Configure departments, factory structure, and system parameters</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 rounded-lg bg-[#0047ff] text-white hover:bg-blue-700 transition-colors text-sm font-medium">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex items-center">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mr-4">
            <Building className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Active Departments</p>
            <p className="text-2xl font-bold text-gray-900 mt-0.5">{summary.active} / {departments.length}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex items-center">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mr-4">
            <Building className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Factory Floors</p>
            <p className="text-2xl font-bold text-gray-900 mt-0.5">{summary.floors}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex items-center">
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mr-4">
            <SettingsIcon className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Daily Capacity</p>
            <p className="text-2xl font-bold text-gray-900 mt-0.5">{summary.totalDailyCapacity.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-gray-200">
        {[
          { id: 'departments' as const, label: 'Departments', icon: UsersIcon },
          { id: 'factory' as const, label: 'Factory Structure', icon: Building },
          { id: 'system' as const, label: 'System Parameters', icon: SettingsIcon },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-[#0047ff] text-[#0047ff]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'departments' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Department Configuration</h2>
              <p className="text-sm text-gray-500 mt-1">Manage production departments, their sequence, and roles</p>
            </div>
            <button className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-medium">
              <Plus className="w-4 h-4 mr-1" />
              Add Department
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  {['#', 'Department', 'Manager Role', 'APM Role', 'Floor', 'Status', 'Actions'].map(h => (
                    <th key={h} className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {departments.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50">
                    <td className="py-3 px-6">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs font-bold text-gray-600">
                        {d.sequence}
                      </span>
                    </td>
                    <td className="py-3 px-6">
                      <span className="font-medium text-gray-900">{d.name}</span>
                    </td>
                    <td className="py-3 px-6 text-gray-700">{d.manager_role}</td>
                    <td className="py-3 px-6 text-gray-700">{d.apm_role || '—'}</td>
                    <td className="py-3 px-6">
                      {editingId === d.id ? (
                        <input
                          type="text"
                          value={editFloor}
                          onChange={(e) => setEditFloor(e.target.value)}
                          className="w-24 px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#0047ff]"
                        />
                      ) : (
                        <span className="text-gray-700">{d.floor}</span>
                      )}
                    </td>
                    <td className="py-3 px-6">
                      <button
                        onClick={() => handleToggleActive(d.id)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          d.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {d.active ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="py-3 px-6">
                      <div className="flex items-center space-x-2">
                        {editingId === d.id ? (
                          <>
                            <button
                              onClick={() => handleSaveEdit(d.id)}
                              className="p-1.5 rounded-lg text-green-600 hover:bg-green-50"
                              title="Save"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-50"
                              title="Cancel"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                setEditingId(d.id);
                                setEditFloor(d.floor);
                              }}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-[#0047ff] hover:bg-blue-50"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'factory' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Factory Structure</h2>
            <p className="text-sm text-gray-500 mt-1">Physical floor layout and capacity configuration</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  {['Floor', 'Departments', 'Daily Capacity (units)', 'Actions'].map(h => (
                    <th key={h} className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {factory.map((f) => (
                  <tr key={f.id} className="hover:bg-gray-50">
                    <td className="py-3 px-6 font-medium text-gray-900">{f.name}</td>
                    <td className="py-3 px-6">
                      <div className="flex flex-wrap gap-1">
                        {f.departments.map(d => (
                          <span key={d} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                            {d}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-6 font-semibold text-gray-900">{f.capacity_units_per_day.toLocaleString()}</td>
                    <td className="py-3 px-6">
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-[#0047ff] hover:bg-blue-50">
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'system' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">System Parameters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { key: 'company_name', label: 'Company Name', value: 'Al-Amin Export ERP', type: 'text' },
              { key: 'currency', label: 'Default Currency', value: 'USD', type: 'text' },
              { key: 'timezone', label: 'Timezone', value: 'Asia/Dhaka (UTC+6)', type: 'text' },
              { key: 'date_format', label: 'Date Format', value: 'DD MMM YYYY', type: 'text' },
              { key: 'low_stock_threshold', label: 'Low Stock Threshold (kg)', value: '500', type: 'number' },
              { key: 'overdue_days', label: 'Project Overdue Threshold (days)', value: '7', type: 'number' },
            ].map(field => (
              <div key={field.key}>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  defaultValue={field.value}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0047ff] text-sm"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
