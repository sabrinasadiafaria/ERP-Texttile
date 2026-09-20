import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Package, Clock, CheckCircle2, AlertTriangle,
  ArrowRight, TrendingUp, Loader2, ArrowRightLeft, Activity,
} from 'lucide-react';
import {
  DEMO_PROJECTS,
  DEMO_DEPARTMENT_RECORDS,
  DEMO_TRANSFERS,
} from '@/lib/services/demoData';
import { type Department } from '@/lib/services/production';

interface DeptStats {
  activeProjects: number;
  totalReceived: number;
  totalProduced: number;
  totalRejected: number;
  totalDamaged: number;
  pendingTransfersIn: number;
  pendingTransfersOut: number;
  avgEfficiency: number;
}

export function DepartmentDashboard() {
  const location = useLocation();
  // Path: /dashboard/<role-path>; the dept is inferred from the role path segment.
  const rolePath = location.pathname.split('/').filter(Boolean).pop() || '';
  const department = mapRolePathToDepartment(rolePath);

  const [stats, setStats] = useState<DeptStats>({
    activeProjects: 0,
    totalReceived: 0,
    totalProduced: 0,
    totalRejected: 0,
    totalDamaged: 0,
    pendingTransfersIn: 0,
    pendingTransfersOut: 0,
    avgEfficiency: 0,
  });
  const [recentRecords, setRecentRecords] = useState<typeof DEMO_DEPARTMENT_RECORDS>([]);
  const [pendingTransfers, setPendingTransfers] = useState<typeof DEMO_TRANSFERS>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!department) {
      setIsLoading(false);
      return;
    }

    const records = DEMO_DEPARTMENT_RECORDS.filter(r => r.department === department);
    const activeProjects = DEMO_PROJECTS.filter(p => p.current_department === department && p.status !== 'Completed' && p.status !== 'Cancelled');
    const transfersIn = DEMO_TRANSFERS.filter(t => t.to_department === department && t.status === 'Pending');
    const transfersOut = DEMO_TRANSFERS.filter(t => t.from_department === department && t.status === 'Pending');

    const totalReceived = records.reduce((s, r) => s + r.received_quantity, 0);
    const totalProduced = records.reduce((s, r) => s + r.produced_quantity, 0);
    const totalRejected = records.reduce((s, r) => s + r.rejected_quantity, 0);
    const totalDamaged = records.reduce((s, r) => s + r.damaged_quantity, 0);
    const avgEfficiency = totalProduced > 0
      ? Math.round(((totalProduced - totalRejected - totalDamaged) / totalProduced) * 100)
      : 0;

    setStats({
      activeProjects: activeProjects.length,
      totalReceived,
      totalProduced,
      totalRejected,
      totalDamaged,
      pendingTransfersIn: transfersIn.length,
      pendingTransfersOut: transfersOut.length,
      avgEfficiency,
    });

    setRecentRecords(records.slice(-5).reverse());
    setPendingTransfers([...transfersIn, ...transfersOut]);
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [department]);

  if (!department) {
    return (
      <div className="text-center py-12 text-gray-500">
        Department not recognized for role: {rolePath}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#0047ff]" />
      </div>
    );
  }

  const kpis = [
    { label: 'Active Projects', value: stats.activeProjects, icon: LayoutDashboard, color: 'blue', bg: 'bg-blue-50' },
    { label: 'Total Received', value: stats.totalReceived.toLocaleString(), icon: Package, color: 'purple', bg: 'bg-purple-50' },
    { label: 'Total Produced', value: stats.totalProduced.toLocaleString(), icon: CheckCircle2, color: 'green', bg: 'bg-green-50' },
    { label: 'Efficiency', value: `${stats.avgEfficiency}%`, icon: TrendingUp, color: stats.avgEfficiency >= 80 ? 'green' : 'amber', bg: stats.avgEfficiency >= 80 ? 'bg-green-50' : 'bg-amber-50' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{department} Department</h1>
          <p className="text-sm text-gray-500 mt-1">
            {stats.activeProjects} active project{stats.activeProjects !== 1 ? 's' : ''} • {stats.pendingTransfersIn + stats.pendingTransfersOut} pending transfer{stats.pendingTransfersIn + stats.pendingTransfersOut !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Activity className="w-3 h-3 mr-1" />
            {department}
          </span>
          {stats.pendingTransfersIn + stats.pendingTransfersOut > 0 && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
              <Clock className="w-3 h-3 mr-1" />
              Action Needed
            </span>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
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

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Active Projects — 3/5 */}
        <div className="xl:col-span-3 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Active Projects</h2>
            <span className="text-xs text-gray-500">{stats.activeProjects} active</span>
          </div>
          {stats.activeProjects === 0 ? (
            <p className="text-sm text-gray-500 py-4">No active projects in this department.</p>
          ) : (
            <div className="space-y-3">
              {DEMO_PROJECTS
                .filter(p => p.current_department === department && p.status !== 'Completed' && p.status !== 'Cancelled')
                .map((proj) => {
                  const record = DEMO_DEPARTMENT_RECORDS.find(r => r.project_id === proj.id && r.department === department);
                  const pct = record && record.received_quantity > 0
                    ? Math.round((record.produced_quantity / record.received_quantity) * 100)
                    : 0;
                  return (
                    <Link
                      key={proj.id}
                      to={`/dashboard/merchandiser/projects/${proj.id}`}
                      className="block p-4 rounded-lg border border-gray-100 hover:border-[#0047ff] hover:bg-blue-50/30 transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-sm font-semibold text-[#0047ff]">{proj.project_id}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{proj.buyers?.company_name} • {proj.product_name}</p>
                        </div>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          proj.status === 'Delayed' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {proj.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex-1 bg-gray-100 rounded-full h-2">
                          <div
                            className={`h-full rounded-full ${pct >= 100 ? 'bg-green-500' : pct >= 50 ? 'bg-blue-500' : 'bg-amber-500'}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-600 w-12 text-right">{pct}%</span>
                      </div>
                    </Link>
                  );
                })}
            </div>
          )}
        </div>

        {/* Pending Transfers — 2/5 */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5 text-gray-400" />
              Pending Transfers
            </h2>
            <Link to="/dashboard/transfers" className="text-xs font-medium text-[#0047ff] hover:underline flex items-center">
              View All <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
          {pendingTransfers.length === 0 ? (
            <p className="text-sm text-gray-500 py-4">No pending transfers.</p>
          ) : (
            <div className="space-y-3">
              {pendingTransfers.map((t) => {
                const isIncoming = t.to_department === department;
                return (
                  <div key={t.id} className="p-3 rounded-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        isIncoming ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {isIncoming ? 'Incoming' : 'Outgoing'}
                      </span>
                      <span className="text-xs text-gray-500">{t.quantity.toLocaleString()} pcs</span>
                    </div>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {t.from_department} → {t.to_department}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(t.requested_at).toLocaleString('en-GB', {
                        day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Recent Records */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Production Records</h2>
        {recentRecords.length === 0 ? (
          <p className="text-sm text-gray-500 py-4">No production records yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Project', 'Received', 'Produced', 'Rejected', 'Damaged', 'Status'].map(h => (
                    <th key={h} className="pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentRecords.map((r) => {
                  const proj = DEMO_PROJECTS.find(p => p.id === r.project_id);
                  return (
                    <tr key={r.id} className="hover:bg-gray-50/50">
                      <td className="py-2.5 pr-4">
                        <span className="text-sm font-medium text-[#0047ff]">{proj?.project_id || r.project_id}</span>
                      </td>
                      <td className="py-2.5 pr-4 text-gray-700">{r.received_quantity.toLocaleString()}</td>
                      <td className="py-2.5 pr-4 font-medium text-gray-900">{r.produced_quantity.toLocaleString()}</td>
                      <td className="py-2.5 pr-4 text-red-600">{r.rejected_quantity.toLocaleString()}</td>
                      <td className="py-2.5 pr-4 text-amber-600">{r.damaged_quantity.toLocaleString()}</td>
                      <td className="py-2.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          r.status === 'Completed' ? 'bg-green-100 text-green-700' :
                          r.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Production Alerts */}
      {(stats.totalRejected > 100 || stats.totalDamaged > 50) && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-amber-900">Quality Alert</p>
            <p className="text-xs text-amber-800 mt-0.5">
              {stats.totalRejected.toLocaleString()} rejected pieces and {stats.totalDamaged.toLocaleString()} damaged pieces detected.
              Review quality control processes.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function mapRolePathToDepartment(rolePath: string): Department | null {
  const normalized = rolePath.toLowerCase();
  // Router uses roleToPath: 'Cutting & Trimming PM' -> 'cutting-trimming-pm'
  if (normalized.includes('knitting')) return 'Knitting';
  if (normalized.includes('linking')) return 'Linking';
  if (normalized.includes('trimming') || normalized.includes('cutting')) return 'Trimming';
  if (normalized.includes('sewing') || normalized === 'production-pm' || normalized === 'production-apm') return 'Sewing';
  if (normalized.includes('washing')) return 'Washing';
  if (normalized.includes('ironing')) return 'Ironing';
  if (normalized.includes('packaging') || normalized.includes('packing')) return 'Packaging';
  if (normalized.includes('inventory') || normalized.includes('store')) return 'Inventory';
  if (normalized.includes('yarn')) return 'Yarn';
  return null;
}
