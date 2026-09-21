import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FolderKanban, CheckCircle2, AlertTriangle, TrendingUp,
  ArrowRight, Clock, Activity, BarChart3,
  Loader2, XCircle, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { DEMO_PROJECTS, DEMO_TRANSFERS, DEMO_ACTIVITY_LOGS, getDepartmentProgressPercentages, getProjectProgress } from '@/lib/services/demoData';
import { PRODUCTION_ORDER, type Department } from '@/lib/services/production';

interface DirectorStats {
  totalActive: number;
  totalCompleted: number;
  totalDelayed: number;
  todayProduction: number;
  pendingActions: number;
  activeDepartments: number;
}

export function DirectorDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DirectorStats>({
    totalActive: 0,
    totalCompleted: 0,
    totalDelayed: 0,
    todayProduction: 0,
    pendingActions: 0,
    activeDepartments: 0,
  });
  const [deptProgress, setDeptProgress] = useState<Record<Department, number>>({} as Record<Department, number>);
  const [recentActivity] = useState(DEMO_ACTIVITY_LOGS.slice(0, 8));
  const [pendingAlerts, setPendingAlerts] = useState<{type: string; message: string; link: string}[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Compute stats from demo data
    const active = DEMO_PROJECTS.filter(p => p.status !== 'Completed' && p.status !== 'Cancelled' && p.status !== 'Draft');
    const completed = DEMO_PROJECTS.filter(p => p.status === 'Completed');
    const delayed = DEMO_PROJECTS.filter(p => p.status === 'Delayed');
    const pendingTransfers = DEMO_TRANSFERS.filter(t => t.status === 'Pending');

    // Today's production: use demo records as proxy
    const todayProd = 36700;

    setStats({
      totalActive: active.length,
      totalCompleted: completed.length,
      totalDelayed: delayed.length,
      todayProduction: todayProd,
      pendingActions: pendingTransfers.length,
      activeDepartments: 8,
    });

    setDeptProgress(getDepartmentProgressPercentages());

    // Build alerts
    const alerts: {type: string; message: string; link: string}[] = [];

    // Delayed projects
    for (const p of delayed) {
      alerts.push({
        type: 'error',
        message: `Project ${p.project_id} (${p.buyers?.company_name}) is ${Math.floor((new Date(p.delivery_date).getTime() - Date.now()) / (1000*60*60*24))} days overdue`,
        link: `/dashboard/projects/${p.id}`,
      });
    }

    // Pending transfers
    if (pendingTransfers.length > 0) {
      alerts.push({
        type: 'warning',
        message: `${pendingTransfers.length} transfer request(s) pending across departments`,
        link: '/dashboard/transfers',
      });
    }

    // Low stock / yarn issues
    alerts.push({
      type: 'warning',
      message: 'Yarn stock low: Superfine Merino below reorder level (current: 450kg, reorder: 500kg)',
      link: '/dashboard/yarn-manager/inventory',
    });

    setPendingAlerts(alerts);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#0047ff]" />
      </div>
    );
  }

  const kpis = [
    { label: 'Active Projects', value: stats.totalActive, icon: FolderKanban, color: 'blue', bg: 'bg-blue-50' },
    { label: 'Completed This Year', value: stats.totalCompleted, icon: CheckCircle2, color: 'green', bg: 'bg-green-50' },
    { label: 'Delayed Projects', value: stats.totalDelayed, icon: AlertTriangle, color: stats.totalDelayed > 0 ? 'red' : 'gray', bg: stats.totalDelayed > 0 ? 'bg-red-50' : 'bg-gray-50' },
    { label: "Today's Production", value: stats.todayProduction.toLocaleString(), icon: TrendingUp, color: 'purple', bg: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Factory Overview</h1>
          <p className="text-sm text-gray-500 mt-1">What is happening across the factory today</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Zap className="w-3 h-3 mr-1" />
            {stats.activeDepartments} Active Departments
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            <Clock className="w-3 h-3 mr-1" />
            {stats.pendingActions} Pending Actions
          </span>
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

      {/* Alerts Section */}
      {pendingAlerts.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Active Alerts
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">
                {pendingAlerts.length}
              </span>
            </h2>
          </div>
          <div className="space-y-3">
            {pendingAlerts.map((alert, i) => (
              <div
                key={i}
                className={`flex items-start justify-between p-3 rounded-lg border ${
                  alert.type === 'error' ? 'bg-red-50 border-red-100' : 'bg-amber-50 border-amber-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  {alert.type === 'error' ? (
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  )}
                  <p className={`text-sm font-medium ${alert.type === 'error' ? 'text-red-800' : 'text-amber-800'}`}>
                    {alert.message}
                  </p>
                </div>
                <Link
                  to={alert.link}
                  className={`text-xs font-medium flex-shrink-0 ml-4 ${
                    alert.type === 'error' ? 'text-red-600 hover:text-red-800' : 'text-amber-600 hover:text-amber-800'
                  }`}
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content: Production Overview + Running Projects */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">

        {/* Production Overview — 2/5 width */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Production Overview</h2>
            <Link to="/dashboard/merchandiser/reports" className="text-xs font-medium text-[#0047ff] hover:underline flex items-center">
              View Reports <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
          <div className="space-y-4">
            {PRODUCTION_ORDER.map((dept) => {
              const pct = deptProgress[dept] || 0;
              return (
                <div key={dept} className="flex items-center gap-4">
                  <div className="w-24 text-xs font-medium text-gray-600 truncate">{dept}</div>
                  <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        pct === 100 ? 'bg-green-500' :
                        pct >= 50 ? 'bg-blue-500' :
                        pct >= 20 ? 'bg-amber-500' : 'bg-gray-300'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="w-10 text-xs font-semibold text-gray-700 text-right">{pct}%</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Running Projects — 3/5 width */}
        <div className="xl:col-span-3 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Running Projects</h2>
            <span className="text-xs text-gray-500">{stats.totalActive} active</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Project ID', 'Buyer', 'Product', 'Qty', 'Dept', 'Progress', 'Deadline', 'Status'].map(h => (
                    <th key={h} className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {DEMO_PROJECTS
                  .filter(p => p.status !== 'Completed' && p.status !== 'Cancelled' && p.status !== 'Draft')
                  .map((proj) => {
                    const progress = getProjectProgress(proj.id);
                    const isDelayed = proj.status === 'Delayed';
                    return (
                      <tr key={proj.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-3 pr-4">
                          <button
                            onClick={() => navigate(`/dashboard/projects/${proj.id}`)}
                            className="text-sm font-semibold text-[#0047ff] hover:underline"
                          >
                            {proj.project_id}
                          </button>
                        </td>
                        <td className="py-3 pr-4">
                          <span className="text-sm text-gray-700">{proj.buyers?.company_name}</span>
                        </td>
                        <td className="py-3 pr-4">
                          <span className="text-sm text-gray-900 font-medium">{proj.product_name}</span>
                        </td>
                        <td className="py-3 pr-4">
                          <span className="text-sm text-gray-600">{proj.quantity.toLocaleString()}</span>
                        </td>
                        <td className="py-3 pr-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                            {proj.current_department || '—'}
                          </span>
                        </td>
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-gray-100 rounded-full h-1.5">
                              <div
                                className={`h-full rounded-full ${isDelayed ? 'bg-red-400' : progress >= 50 ? 'bg-blue-500' : 'bg-amber-400'}`}
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium text-gray-600">{progress}%</span>
                          </div>
                        </td>
                        <td className="py-3 pr-4">
                          <span className="text-sm text-gray-600">
                            {new Date(proj.delivery_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                          </span>
                        </td>
                        <td className="py-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                            isDelayed ? 'bg-red-100 text-red-700' :
                            progress >= 50 ? 'bg-blue-100 text-blue-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {isDelayed ? 'Delayed' : progress >= 50 ? 'On Track' : 'In Progress'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Activity + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-gray-400" />
              Recent Activity
            </h2>
            <Link to="/dashboard/activity-log" className="text-xs font-medium text-[#0047ff] hover:underline flex items-center">
              View All <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentActivity.map((log) => (
              <div key={log.id} className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{log.description}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(log.created_at).toLocaleString('en-GB', {
                      day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Access</h2>
          <div className="space-y-3">
            {[
              { label: 'All Projects', path: '/dashboard/merchandiser/projects', icon: FolderKanban, count: DEMO_PROJECTS.length },
              { label: 'Pending Transfers', path: '/dashboard/transfers', icon: ArrowRight, count: DEMO_TRANSFERS.filter(t => t.status === 'Pending').length },
              { label: 'Production Reports', path: '/dashboard/merchandiser/reports', icon: BarChart3, count: null },
              { label: 'User Management', path: '/dashboard/admin/users', icon: Activity, count: null },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-[#0047ff] hover:bg-blue-50/30 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-gray-400 group-hover:text-[#0047ff]" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-[#0047ff]">{item.label}</span>
                </div>
                {item.count !== null && (
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs font-bold text-gray-600">
                    {item.count}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
