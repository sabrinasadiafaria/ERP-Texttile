import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import {
  ArrowLeft, Loader2, Edit2, Lock, ListPlus,
  CheckCircle2, Clock, AlertTriangle, XCircle, Activity,
  TrendingUp, ArrowRight, FileText, Package,
} from 'lucide-react';
import { DocumentUploader } from './DocumentUploader';
import {
  DEMO_DEPARTMENT_RECORDS,
  DEMO_TRANSFERS,
  DEMO_ACTIVITY_LOGS,
  getProjectProgress,
} from '@/lib/services/demoData';
import { PRODUCTION_ORDER } from '@/lib/services/production';

export function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchProject = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*, buyers(company_name)')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching project:', error);
    } else {
      setProject(data);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#0047ff]" />
      </div>
    );
  }

  if (!project) {
    return <div className="text-center py-12 text-gray-500">Project not found</div>;
  }

  const isLocked = project.status !== 'Draft';

  const deptRecords = DEMO_DEPARTMENT_RECORDS.filter(r => r.project_id === id);
  const projectTransfers = DEMO_TRANSFERS.filter(t => t.project_id === id);
  const projectLogs = DEMO_ACTIVITY_LOGS.filter(l => l.project_id === id);
  const progress = getProjectProgress(id || '');

  // Build merged timeline from records + transfers
  const timeline = [
    ...deptRecords.map(r => ({
      id: `dept-${r.id}`,
      date: r.completed_date || r.received_date || r.created_at,
      type: 'department' as const,
      title: `${r.department} ${r.status === 'Completed' ? 'Completed' : r.status === 'In Progress' ? 'In Progress' : 'Pending'}`,
      subtitle: `${r.produced_quantity.toLocaleString()} produced / ${r.received_quantity.toLocaleString()} received`,
      icon: r.status === 'Completed' ? CheckCircle2 : r.status === 'In Progress' ? Clock : AlertTriangle,
      color: r.status === 'Completed' ? 'green' : r.status === 'In Progress' ? 'blue' : 'amber',
    })),
    ...projectTransfers.map(t => ({
      id: `tfr-${t.id}`,
      date: t.accepted_at || t.requested_at,
      type: 'transfer' as const,
      title: `Transfer ${t.status}`,
      subtitle: `${t.quantity.toLocaleString()} pcs ${t.from_department} → ${t.to_department}`,
      icon: t.status === 'Completed' || t.status === 'Accepted' ? CheckCircle2 :
            t.status === 'Rejected' ? XCircle : ArrowRight,
      color: t.status === 'Completed' || t.status === 'Accepted' ? 'green' :
             t.status === 'Rejected' ? 'red' : 'amber',
    })),
  ].sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/dashboard/projects" className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Project: {project.order_number}</h1>
            <p className="text-sm text-gray-500 mt-1">{project.buyers?.company_name} - {project.product_name}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 capitalize">
            {project.status}
          </span>
          <Link
            to={`/dashboard/projects/${project.id}/bom`}
            className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-[#0047ff] hover:bg-blue-50 hover:border-[#0047ff] flex items-center justify-center transition-colors"
            title="Bill of Materials"
          >
            <ListPlus className="w-5 h-5" />
          </Link>
          <button
            disabled={isLocked}
            className={`p-2 rounded-lg border flex items-center justify-center transition-colors
              ${isLocked
                ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white border-gray-200 text-gray-600 hover:text-[#0047ff] hover:bg-blue-50 hover:border-[#0047ff]'
              }`}
            title={isLocked ? "Editing locked while in production" : "Edit Project"}
          >
            {isLocked ? <Lock className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Technical Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Quantity</p>
                <p className="text-sm font-semibold mt-1">{project.quantity}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Category</p>
                <p className="text-sm font-semibold mt-1">{project.category || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Gauge</p>
                <p className="text-sm font-semibold mt-1">{project.gauge || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Yarn Type</p>
                <p className="text-sm font-semibold mt-1">{project.yarn_type || '-'}</p>
              </div>
            </div>
          </div>

          {/* Department History */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-gray-400" />
                Department History
              </h2>
              <span className="text-xs text-gray-500">{deptRecords.length} of {PRODUCTION_ORDER.length} departments</span>
            </div>
            {deptRecords.length === 0 ? (
              <p className="text-sm text-gray-500 py-4">No department records yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      {['Department', 'Received', 'Produced', 'Rejected', 'Damaged', 'Status', 'Started', 'Completed'].map(h => (
                        <th key={h} className="pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {deptRecords.map((r) => (
                      <tr key={r.id} className="hover:bg-gray-50/50">
                        <td className="py-2.5 pr-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                            {r.department}
                          </span>
                        </td>
                        <td className="py-2.5 pr-4 text-gray-700">{r.received_quantity.toLocaleString()}</td>
                        <td className="py-2.5 pr-4 font-medium text-gray-900">{r.produced_quantity.toLocaleString()}</td>
                        <td className="py-2.5 pr-4 text-red-600">{r.rejected_quantity.toLocaleString()}</td>
                        <td className="py-2.5 pr-4 text-amber-600">{r.damaged_quantity.toLocaleString()}</td>
                        <td className="py-2.5 pr-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            r.status === 'Completed' ? 'bg-green-100 text-green-700' :
                            r.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                            r.status === 'Transfer Pending' ? 'bg-amber-100 text-amber-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {r.status}
                          </span>
                        </td>
                        <td className="py-2.5 pr-4 text-xs text-gray-500">
                          {r.received_date ? new Date(r.received_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : '—'}
                        </td>
                        <td className="py-2.5 text-xs text-gray-500">
                          {r.completed_date ? new Date(r.completed_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Activity Timeline */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-gray-400" />
                Activity Timeline
              </h2>
              <span className="text-xs text-gray-500">{timeline.length} events</span>
            </div>
            {timeline.length === 0 ? (
              <p className="text-sm text-gray-500 py-4">No activity yet.</p>
            ) : (
              <ol className="space-y-4 relative">
                <div className="absolute left-4 top-2 bottom-2 w-px bg-gray-200" />
                {timeline.map((event) => (
                  <li key={event.id} className="flex items-start gap-3 relative">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                      event.color === 'green' ? 'bg-green-100' :
                      event.color === 'blue' ? 'bg-blue-100' :
                      event.color === 'amber' ? 'bg-amber-100' :
                      event.color === 'red' ? 'bg-red-100' : 'bg-gray-100'
                    }`}>
                      <event.icon className={`w-4 h-4 ${
                        event.color === 'green' ? 'text-green-600' :
                        event.color === 'blue' ? 'text-blue-600' :
                        event.color === 'amber' ? 'text-amber-600' :
                        event.color === 'red' ? 'text-red-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <p className="text-sm font-medium text-gray-900">{event.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{event.subtitle}</p>
                      {event.date && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          {new Date(event.date).toLocaleString('en-GB', {
                            day: '2-digit', month: 'short', year: 'numeric',
                            hour: '2-digit', minute: '2-digit'
                          })}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Project Documents</h2>
            <DocumentUploader projectId={project.id} />
          </div>
        </div>

        <div className="space-y-6">
          {/* Progress Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-gray-400" />
              Production Progress
            </h2>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-bold text-gray-900">{progress}%</span>
              <span className="text-sm text-gray-500 mb-1">complete</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
              <div
                className={`h-full rounded-full transition-all ${
                  progress >= 100 ? 'bg-green-500' :
                  progress >= 50 ? 'bg-blue-500' : 'bg-amber-500'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Current Department</span>
                <span className="font-medium">{project.current_department || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Current Status</span>
                <span className="font-medium">{project.current_status || '—'}</span>
              </div>
            </div>
          </div>

          {/* Transfers Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2 flex items-center gap-2">
              <ArrowRight className="w-5 h-5 text-gray-400" />
              Transfers
            </h2>
            {projectTransfers.length === 0 ? (
              <p className="text-sm text-gray-500 py-2">No transfers recorded.</p>
            ) : (
              <div className="space-y-3">
                {projectTransfers.slice(0, 5).map((t) => (
                  <div key={t.id} className="flex items-center justify-between p-2 rounded-lg border border-gray-100">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {t.from_department} → {t.to_department}
                      </p>
                      <p className="text-xs text-gray-500">{t.quantity.toLocaleString()} pcs</p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      t.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      t.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                      t.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {t.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Schedule</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Delivery Date</p>
                <p className="text-sm font-semibold mt-1">
                  {project.delivery_date ? new Date(project.delivery_date).toLocaleDateString() : 'Unscheduled'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Priority</p>
                <p className="text-sm font-semibold mt-1">{project.priority}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Created</p>
                <p className="text-sm font-semibold mt-1">
                  {new Date(project.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>

          {/* Recent Activity Log */}
          {projectLogs.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2 flex items-center gap-2">
                <FileText className="w-5 h-5 text-gray-400" />
                Activity Log
              </h2>
              <div className="space-y-3">
                {projectLogs.slice(0, 5).map((log) => (
                  <div key={log.id} className="pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                    <p className="text-sm text-gray-900">{log.description}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(log.created_at).toLocaleString('en-GB', {
                        day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
