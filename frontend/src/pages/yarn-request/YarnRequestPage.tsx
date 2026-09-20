import { useEffect, useMemo, useState } from 'react';
import {
  FileOutput, CheckCircle2, XCircle, Clock,
  Plus, Loader2, Package, AlertTriangle, ArrowRight, Calculator, FileText,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DEMO_PROJECTS,
  DEMO_ACTIVITY_LOGS,
} from '@/lib/services/demoData';
import type { ActivityLog } from '@/lib/services/production';

export type YarnRequestStatus = 'Pending' | 'Approved' | 'Partially Approved' | 'Rejected' | 'Issued';

export interface YarnRequest {
  id: string;
  project_id: string;
  yarn_type: string;
  quantity_kg: number;
  approved_quantity_kg: number;
  rejected_quantity_kg: number;
  issued_quantity_kg: number;
  status: YarnRequestStatus;
  requested_by: string;
  requested_at: string;
  approved_by: string | null;
  approved_at: string | null;
  remarks: string;
}

const INITIAL_REQUESTS: YarnRequest[] = [
  {
    id: 'yr-001',
    project_id: 'proj-006',
    yarn_type: '100% Superfine Merino',
    quantity_kg: 15000,
    approved_quantity_kg: 0,
    rejected_quantity_kg: 0,
    issued_quantity_kg: 0,
    status: 'Pending',
    requested_by: 'user-merc-001',
    requested_at: '2026-01-20T09:00:00Z',
    approved_by: null,
    approved_at: null,
    remarks: 'Urgent — buyer wants delivery by May 1',
  },
  {
    id: 'yr-002',
    project_id: 'proj-008',
    yarn_type: '100% GOTS Organic Cotton',
    quantity_kg: 22000,
    approved_quantity_kg: 22000,
    rejected_quantity_kg: 0,
    issued_quantity_kg: 18500,
    status: 'Issued',
    requested_by: 'user-knit-001',
    requested_at: '2026-01-15T08:00:00Z',
    approved_by: 'user-yarn-001',
    approved_at: '2026-01-16T10:00:00Z',
    remarks: 'Issued in two batches — 18,500 kg released to Knitting',
  },
  {
    id: 'yr-003',
    project_id: 'proj-003',
    yarn_type: '100% Organic Cotton',
    quantity_kg: 27000,
    approved_quantity_kg: 25000,
    rejected_quantity_kg: 2000,
    issued_quantity_kg: 25000,
    status: 'Partially Approved',
    requested_by: 'user-knit-001',
    requested_at: '2026-01-12T09:00:00Z',
    approved_by: 'user-yarn-001',
    approved_at: '2026-01-13T11:00:00Z',
    remarks: 'Stock shortage — 2,000 kg to be sourced later',
  },
];

export function YarnRequestPage() {
  const { profile } = useAuth();
  const [requests, setRequests] = useState<YarnRequest[]>([]);
  const [filterStatus, setFilterStatus] = useState<'All' | YarnRequestStatus>('All');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);

  // New request form
  const [formProject, setFormProject] = useState('');
  const [formYarn, setFormYarn] = useState('');
  const [formQty, setFormQty] = useState('');
  const [formRemarks, setFormRemarks] = useState('');

  useEffect(() => {
    setRequests(INITIAL_REQUESTS);
    setIsLoading(false);
  }, []);

  const filtered = useMemo(() => {
    if (filterStatus === 'All') return requests;
    return requests.filter(r => r.status === filterStatus);
  }, [requests, filterStatus]);

  const stats = useMemo(() => ({
    total: requests.length,
    pending: requests.filter(r => r.status === 'Pending').length,
    approved: requests.filter(r => r.status === 'Approved' || r.status === 'Issued').length,
    partial: requests.filter(r => r.status === 'Partially Approved').length,
    rejected: requests.filter(r => r.status === 'Rejected').length,
  }), [requests]);

  const handleApprove = (id: string) => {
    setRequests(prev => prev.map(r =>
      r.id === id
        ? {
            ...r,
            status: 'Approved',
            approved_quantity_kg: r.quantity_kg,
            approved_by: profile?.id || 'user-yarn-001',
            approved_at: new Date().toISOString(),
          }
        : r
    ));
  };

  const handlePartialApprove = (id: string, approvedQty: number) => {
    setRequests(prev => prev.map(r =>
      r.id === id
        ? {
            ...r,
            status: 'Partially Approved',
            approved_quantity_kg: approvedQty,
            rejected_quantity_kg: r.quantity_kg - approvedQty,
            approved_by: profile?.id || 'user-yarn-001',
            approved_at: new Date().toISOString(),
          }
        : r
    ));
  };

  const handleReject = (id: string) => {
    setRequests(prev => prev.map(r =>
      r.id === id
        ? {
            ...r,
            status: 'Rejected',
            approved_quantity_kg: 0,
            rejected_quantity_kg: r.quantity_kg,
            approved_by: profile?.id || 'user-yarn-001',
            approved_at: new Date().toISOString(),
          }
        : r
    ));
  };

  const handleIssue = (id: string) => {
    setRequests(prev => prev.map(r =>
      r.id === id
        ? {
            ...r,
            status: 'Issued',
            issued_quantity_kg: r.approved_quantity_kg,
          }
        : r
    ));
  };

  const handleCreate = () => {
    if (!formProject || !formYarn || !formQty) return;
    const newReq: YarnRequest = {
      id: `yr-${Date.now()}`,
      project_id: formProject,
      yarn_type: formYarn,
      quantity_kg: parseFloat(formQty),
      approved_quantity_kg: 0,
      rejected_quantity_kg: 0,
      issued_quantity_kg: 0,
      status: 'Pending',
      requested_by: profile?.id || 'user-system',
      requested_at: new Date().toISOString(),
      approved_by: null,
      approved_at: null,
      remarks: formRemarks,
    };
    setRequests(prev => [newReq, ...prev]);
    setShowCreate(false);
    setFormProject('');
    setFormYarn('');
    setFormQty('');
    setFormRemarks('');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#0047ff]" />
      </div>
    );
  }

  const statusFilters: ('All' | YarnRequestStatus)[] = ['All', 'Pending', 'Approved', 'Partially Approved', 'Issued', 'Rejected'];

  const kpis = [
    { label: 'Total Requests', value: stats.total, icon: FileOutput, color: 'blue', bg: 'bg-blue-50' },
    { label: 'Pending', value: stats.pending, icon: Clock, color: 'amber', bg: 'bg-amber-50' },
    { label: 'Approved/Issued', value: stats.approved, icon: CheckCircle2, color: 'green', bg: 'bg-green-50' },
    { label: 'Partially Approved', value: stats.partial, icon: AlertTriangle, color: 'purple', bg: 'bg-purple-50' },
  ];

  const selected = selectedId ? requests.find(r => r.id === selectedId) : null;
  const selectedProject = selected ? DEMO_PROJECTS.find(p => p.id === selected.project_id) : null;

  // Activity log scoped to yarn requests
  const yarnLogs: ActivityLog[] = DEMO_ACTIVITY_LOGS.filter(l => l.entity_type === 'yarn').slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Yarn Request & Issue Workflow</h1>
          <p className="text-sm text-gray-500 mt-1">APMs request yarn, Yarn Manager approves/issues, MIN transactions recorded</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center px-4 py-2 rounded-lg bg-[#0047ff] text-white hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Request
        </button>
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
      <div className="flex items-center space-x-2">
        {statusFilters.map(s => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              filterStatus === s
                ? 'bg-[#0047ff] text-white border-[#0047ff]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-[#0047ff] hover:text-[#0047ff]'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Request List — 3/5 */}
        <div className="xl:col-span-3 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <FileOutput className="w-5 h-5 text-gray-400" />
              Request Queue
            </h2>
          </div>
          {filtered.length === 0 ? (
            <p className="text-sm text-gray-500 py-12 text-center">No requests match filter.</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {filtered.map(r => {
                const proj = DEMO_PROJECTS.find(p => p.id === r.project_id);
                const isSelected = selectedId === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => setSelectedId(r.id)}
                    className={`w-full text-left p-4 transition-colors ${
                      isSelected ? 'bg-blue-50/50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-[#0047ff]">{proj?.project_id || r.project_id}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-600 truncate">{r.yarn_type}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-1">{proj?.buyers?.company_name} • {proj?.product_name}</p>
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                          <span className="font-medium">{r.quantity_kg.toLocaleString()} kg</span>
                          {r.approved_quantity_kg > 0 && r.approved_quantity_kg !== r.quantity_kg && (
                            <span className="text-xs text-gray-500">
                              (Approved: {r.approved_quantity_kg.toLocaleString()} kg)
                            </span>
                          )}
                          {r.issued_quantity_kg > 0 && (
                            <span className="text-xs text-blue-600">
                              Issued: {r.issued_quantity_kg.toLocaleString()} kg
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            r.status === 'Approved' || r.status === 'Issued' ? 'bg-green-100 text-green-700' :
                            r.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                            r.status === 'Partially Approved' ? 'bg-purple-100 text-purple-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {r.status}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(r.requested_at).toLocaleString('en-GB', {
                              day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Detail Panel — 2/5 */}
        <div className="xl:col-span-2 space-y-6">
          {selected ? (
            <>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-gray-400" />
                  Request Details
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Project</span>
                    <span className="font-medium">{selectedProject?.project_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Yarn Type</span>
                    <span className="font-medium text-right">{selected.yarn_type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Requested</span>
                    <span className="font-medium">{selected.quantity_kg.toLocaleString()} kg</span>
                  </div>
                  {selected.approved_quantity_kg > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Approved</span>
                      <span className="font-medium text-green-700">{selected.approved_quantity_kg.toLocaleString()} kg</span>
                    </div>
                  )}
                  {selected.rejected_quantity_kg > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Rejected</span>
                      <span className="font-medium text-red-700">{selected.rejected_quantity_kg.toLocaleString()} kg</span>
                    </div>
                  )}
                  {selected.issued_quantity_kg > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Issued</span>
                      <span className="font-medium text-blue-700">{selected.issued_quantity_kg.toLocaleString()} kg</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status</span>
                    <span className="font-medium">{selected.status}</span>
                  </div>
                  {selected.remarks && (
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">Remarks</p>
                      <p className="text-sm text-gray-700">{selected.remarks}</p>
                    </div>
                  )}
                </div>

                {selected.status === 'Pending' && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Yarn Manager Actions</p>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => handleApprove(selected.id)}
                        className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors text-xs font-medium"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          const approved = prompt(`Partial approval — approved kg (max ${selected.quantity_kg}):`, String(Math.floor(selected.quantity_kg / 2)));
                          if (approved) handlePartialApprove(selected.id, parseFloat(approved));
                        }}
                        className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors text-xs font-medium"
                      >
                        <Calculator className="w-4 h-4" />
                        Partial
                      </button>
                      <button
                        onClick={() => handleReject(selected.id)}
                        className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors text-xs font-medium"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  </div>
                )}

                {(selected.status === 'Approved' || selected.status === 'Partially Approved') && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleIssue(selected.id)}
                      className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#0047ff] text-white hover:bg-blue-700 transition-colors text-xs font-medium"
                    >
                      <ArrowRight className="w-4 h-4" />
                      Issue {selected.approved_quantity_kg.toLocaleString()} kg (MIN Transaction)
                    </button>
                  </div>
                )}
              </div>

              {/* Math validation */}
              <div className={`rounded-xl border p-6 ${
                selected.approved_quantity_kg + selected.rejected_quantity_kg === selected.quantity_kg || selected.status === 'Pending'
                  ? 'bg-blue-50 border-blue-200'
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  <Calculator className="w-5 h-5 text-blue-700" />
                  <h3 className="font-bold text-blue-900">Quantity Validation</h3>
                </div>
                <p className="text-sm text-blue-800">
                  {selected.quantity_kg.toLocaleString()} kg requested
                  {selected.approved_quantity_kg > 0 && ` • ${selected.approved_quantity_kg.toLocaleString()} kg approved`}
                  {selected.rejected_quantity_kg > 0 && ` • ${selected.rejected_quantity_kg.toLocaleString()} kg rejected`}
                  {selected.issued_quantity_kg > 0 && ` • ${selected.issued_quantity_kg.toLocaleString()} kg issued`}
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  Sum check: {(selected.approved_quantity_kg + selected.rejected_quantity_kg).toLocaleString()} / {selected.quantity_kg.toLocaleString()} kg
                </p>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
              <FileOutput className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">Select a yarn request to view details and act.</p>
            </div>
          )}

          {/* Activity Log */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-400" />
              Yarn Activity
            </h2>
            {yarnLogs.length === 0 ? (
              <p className="text-sm text-gray-500">No yarn activity yet.</p>
            ) : (
              <div className="space-y-3">
                {yarnLogs.map(log => (
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
            )}
          </div>
        </div>
      </div>

      {/* Create Request Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">New Yarn Request</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Project</label>
                <select
                  value={formProject}
                  onChange={(e) => setFormProject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0047ff] text-sm"
                >
                  <option value="">Select project</option>
                  {DEMO_PROJECTS.map(p => (
                    <option key={p.id} value={p.id}>{p.project_id} — {p.product_name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Yarn Type</label>
                <input
                  type="text"
                  value={formYarn}
                  onChange={(e) => setFormYarn(e.target.value)}
                  placeholder="e.g. 100% Merino Wool"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0047ff] text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Quantity (kg)</label>
                <input
                  type="number"
                  value={formQty}
                  onChange={(e) => setFormQty(e.target.value)}
                  placeholder="e.g. 15000"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0047ff] text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Remarks</label>
                <textarea
                  value={formRemarks}
                  onChange={(e) => setFormRemarks(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0047ff] text-sm"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowCreate(false)}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!formProject || !formYarn || !formQty}
                className="px-4 py-2 rounded-lg bg-[#0047ff] text-white hover:bg-blue-700 text-sm disabled:opacity-50"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
