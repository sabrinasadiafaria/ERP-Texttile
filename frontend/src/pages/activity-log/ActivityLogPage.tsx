import { useEffect, useMemo, useState } from 'react';
import {
  Activity, Loader2, Search, Filter,
  User, FolderKanban, ArrowRightLeft, Shirt,
  Package, Bell,
} from 'lucide-react';
import { DEMO_ACTIVITY_LOGS } from '@/lib/services/demoData';
import type { ActivityLog } from '@/lib/services/production';

type EntityType = ActivityLog['entity_type'];

const ENTITY_ICONS: Record<EntityType, any> = {
  project: FolderKanban,
  transfer: ArrowRightLeft,
  production: Shirt,
  yarn: Package,
  user: User,
  inventory: Package,
  notification: Bell,
};

const ENTITY_COLORS: Record<EntityType, string> = {
  project: 'bg-blue-100 text-blue-700',
  transfer: 'bg-amber-100 text-amber-700',
  production: 'bg-green-100 text-green-700',
  yarn: 'bg-purple-100 text-purple-700',
  user: 'bg-gray-100 text-gray-700',
  inventory: 'bg-orange-100 text-orange-700',
  notification: 'bg-pink-100 text-pink-700',
};

export function ActivityLogPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [search, setSearch] = useState('');
  const [entityFilter, setEntityFilter] = useState<'all' | EntityType>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setLogs(DEMO_ACTIVITY_LOGS);
    setIsLoading(false);
  }, []);

  const filtered = useMemo(() => {
    return logs.filter(l => {
      if (entityFilter !== 'all' && l.entity_type !== entityFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          l.description.toLowerCase().includes(q) ||
          l.action.toLowerCase().includes(q) ||
          (l.new_value || '').toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [logs, search, entityFilter]);

  const stats = useMemo(() => ({
    total: logs.length,
    today: logs.filter(l => {
      const d = new Date(l.created_at);
      const now = new Date();
      return d.toDateString() === now.toDateString();
    }).length,
    entities: new Set(logs.map(l => l.entity_type)).size,
    users: new Set(logs.map(l => l.user_id)).size,
  }), [logs]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#0047ff]" />
      </div>
    );
  }

  const entities: ('all' | EntityType)[] = ['all', 'project', 'transfer', 'production', 'yarn', 'user', 'inventory'];

  const kpis = [
    { label: 'Total Events', value: stats.total, icon: Activity, color: 'blue', bg: 'bg-blue-50' },
    { label: 'Today', value: stats.today, icon: Activity, color: 'green', bg: 'bg-green-50' },
    { label: 'Entity Types', value: stats.entities, icon: Filter, color: 'purple', bg: 'bg-purple-50' },
    { label: 'Unique Users', value: stats.users, icon: User, color: 'amber', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Activity Log Viewer</h1>
          <p className="text-sm text-gray-500 mt-1">Full audit trail of all system events</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search activity..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-1.5 w-48 lg:w-64 rounded-lg border border-gray-200 focus:outline-none focus:border-[#0047ff] text-sm"
            />
          </div>
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

      {/* Filters */}
      <div className="flex items-center space-x-2 flex-wrap gap-2">
        <span className="text-xs text-gray-500">Entity:</span>
        {entities.map(e => (
          <button
            key={e}
            onClick={() => setEntityFilter(e)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors capitalize ${
              entityFilter === e
                ? 'bg-[#0047ff] text-white border-[#0047ff]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-[#0047ff] hover:text-[#0047ff]'
            }`}
          >
            {e}
          </button>
        ))}
      </div>

      {/* Logs List */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-gray-400" />
            Events ({filtered.length})
          </h2>
        </div>
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-500 py-12 text-center">No activity matches filter.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {filtered.map(log => {
              const Icon = ENTITY_ICONS[log.entity_type] || Activity;
              return (
                <div key={log.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg ${ENTITY_COLORS[log.entity_type] || 'bg-gray-100'} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">{log.description}</p>
                          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                            <span className="text-xs text-gray-500 capitalize font-medium">
                              {log.action.replace(/_/g, ' ')}
                            </span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500 capitalize">
                              {log.entity_type}
                            </span>
                            {log.old_value && log.new_value && (
                              <>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-500">
                                  <span className="line-through text-red-600">{log.old_value}</span>
                                  {' → '}
                                  <span className="text-green-700 font-medium">{log.new_value}</span>
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xs text-gray-500">{log.user_id}</p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {new Date(log.created_at).toLocaleString('en-GB', {
                              day: '2-digit', month: 'short', year: 'numeric',
                              hour: '2-digit', minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
