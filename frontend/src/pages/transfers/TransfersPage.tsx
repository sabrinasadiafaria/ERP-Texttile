import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRightLeft, CheckCircle2, XCircle, AlertTriangle,
  Filter, Loader2, Clock, Calculator, ArrowRight, FileText,
} from 'lucide-react';
import {
  DEMO_TRANSFERS,
  DEMO_DEPARTMENT_RECORDS,
  DEMO_PROJECTS,
  DEMO_ACTIVITY_LOGS,
} from '@/lib/services/demoData';
import type { Transfer, TransferStatus, ActivityLog } from '@/lib/services/production';
import { useAuth } from '@/contexts/AuthContext';

type ValidationIssue =
  | { type: 'exceeds_produced'; message: string }
  | { type: 'no_record'; message: string }
  | { type: 'mismatch_rejected'; message: string }
  | { type: 'ok'; message: string };

/**
 * Mathematical quantity validation.
 * Rules:
 *  - Transfer quantity must be ≤ produced_quantity of from-dept record (you can't ship more than you made)
 *  - If rejected_quantity > 0, rejected + accepted quantity must equal transferred quantity
 *  - Source record must exist
 */
function validateTransfer(t: Transfer): ValidationIssue {
  const sourceRecord = DEMO_DEPARTMENT_RECORDS.find(
    r => r.project_id === t.project_id && r.department === t.from_department
  );

  if (!sourceRecord) {
    return { type: 'no_record', message: 'No department record exists for source.' };
  }

  if (t.quantity > sourceRecord.produced_quantity) {
    return {
      type: 'exceeds_produced',
      message: `Transfer quantity (${t.quantity.toLocaleString()}) exceeds source produced quantity (${sourceRecord.produced_quantity.toLocaleString()}).`,
    };
  }

  const totalAccountedFor = t.quantity + t.rejected_quantity;
  if (totalAccountedFor > sourceRecord.produced_quantity) {
    return {
      type: 'mismatch_rejected',
      message: `Quantity + rejected (${totalAccountedFor.toLocaleString()}) exceeds source produced (${sourceRecord.produced_quantity.toLocaleString()}).`,
    };
  }

  return {
    type: 'ok',
    message: `Math OK: ${t.quantity.toLocaleString()} shipped + ${t.rejected_quantity.toLocaleString()} rejected = ${totalAccountedFor.toLocaleString()} / ${sourceRecord.produced_quantity.toLocaleString()} produced.`,
  };
}

interface AuditEntry {
  id: string;
  transfer: Transfer;
  action: 'accepted' | 'rejected' | 'partially_accepted';
  actor: string;
  timestamp: string;
  remarks: string;
  rejectedQuantity: number;
}

export function TransfersPage() {
  const { profile } = useAuth();
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [filterStatus, setFilterStatus] = useState<'All' | TransferStatus>('All');
  const [auditLog, setAuditLog] = useState<AuditEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    setTransfers(DEMO_TRANSFERS);
    setIsLoading(false);
  }, []);

  const filtered = useMemo(() => {
    if (filterStatus === 'All') return transfers;
    return transfers.filter(t => t.status === filterStatus);
  }, [transfers, filterStatus]);

  const stats = useMemo(() => ({
    total: transfers.length,
    pending: transfers.filter(t => t.status === 'Pending').length,
    accepted: transfers.filter(t => t.status === 'Accepted' || t.status === 'Completed').length,
    rejected: transfers.filter(t => t.status === 'Rejected').length,
  }), [transfers]);

  const handleAccept = (id: string) => {
    const t = transfers.find(x => x.id === id);
    if (!t) return;
    const updated: Transfer = { ...t, status: 'Completed', accepted_by: profile?.id || 'user-system', accepted_at: new Date().toISOString() };
    setTransfers(prev => prev.map(x => x.id === id ? updated : x));
    setAuditLog(prev => [{
      id: `audit-${Date.now()}-accept`,
      transfer: updated,
      action: 'accepted',
      actor: profile?.full_name || 'System',
      timestamp: new Date().toISOString(),
      remarks: 'Full acceptance recorded from UI.',
      rejectedQuantity: 0,
    }, ...prev]);
  };

  const handleReject = (id: string) => {
    const t = transfers.find(x => x.id === id);
    if (!t) return;
    const updated: Transfer = { ...t, status: 'Rejected', accepted_by: profile?.id || 'user-system', accepted_at: new Date().toISOString() };
    setTransfers(prev => prev.map(x => x.id === id ? updated : x));
    setAuditLog(prev => [{
      id: `audit-${Date.now()}-reject`,
      transfer: updated,
      action: 'rejected',
      actor: profile?.full_name || 'System',
      timestamp: new Date().toISOString(),
      remarks: 'Rejected from UI.',
      rejectedQuantity: 0,
    }, ...prev]);
  };

  const handlePartialAccept = (id: string) => {
    const t = transfers.find(x => x.id === id);
    if (!t) return;
    const partialQty = Math.floor(t.quantity / 2);
    const rejected = t.quantity - partialQty;
    const updated: Transfer = {
      ...t,
      status: 'Partially Accepted',
      accepted_by: profile?.id || 'user-system',
      accepted_at: new Date().toISOString(),
      quantity: partialQty,
      rejected_quantity: rejected,
    };
    setTransfers(prev => prev.map(x => x.id === id ? updated : x));
    setAuditLog(prev => [{
      id: `audit-${Date.now()}-partial`,
      transfer: updated,
      action: 'partially_accepted',
      actor: profile?.full_name || 'System',
      timestamp: new Date().toISOString(),
      remarks: `Partial acceptance: ${partialQty.toLocaleString()} accepted, ${rejected.toLocaleString()} rejected.`,
      rejectedQuantity: rejected,
    }, ...prev]);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#0047ff]" />
      </div>
    );
  }

  const statusFilters: ('All' | TransferStatus)[] = ['All', 'Pending', 'Accepted', 'Completed', 'Partially Accepted', 'Rejected'];

  const kpis = [
    { label: 'Total Transfers', value: stats.total, icon: ArrowRightLeft, color: 'blue', bg: 'bg-blue-50' },
    { label: 'Pending', value: stats.pending, icon: Clock, color: 'amber', bg: 'bg-amber-50' },
    { label: 'Accepted', value: stats.accepted, icon: CheckCircle2, color: 'green', bg: 'bg-green-50' },
    { label: 'Rejected', value: stats.rejected, icon: XCircle, color: 'red', bg: 'bg-red-50' },
  ];

  const selected = selectedId ? transfers.find(t => t.id === selectedId) : null;
  const selectedValidation = selected ? validateTransfer(selected) : null;
  const selectedProject = selected ? DEMO_PROJECTS.find(p => p.id === selected.project_id) : null;

  // Recent activity logs scoped to transfers
  const transferLogs: ActivityLog[] = DEMO_ACTIVITY_LOGS
    .filter(l => l.entity_type === 'transfer')
    .slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Transfer Management</h1>
          <p className="text-sm text-gray-500 mt-1">Validate, accept, and audit inter-department transfers</p>
        </div>
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
        {/* Transfer List — 3/5 */}
        <div className="xl:col-span-3 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5 text-gray-400" />
              Transfer Queue
            </h2>
            <Filter className="w-4 h-4 text-gray-400" />
          </div>
          {filtered.length === 0 ? (
            <p className="text-sm text-gray-500 py-12 text-center">No transfers match filter.</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {filtered.map(t => {
                const validation = validateTransfer(t);
                const proj = DEMO_PROJECTS.find(p => p.id === t.project_id);
                const isSelected = selectedId === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedId(t.id)}
                    className={`w-full text-left p-4 transition-colors ${
                      isSelected ? 'bg-blue-50/50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-[#0047ff]">{proj?.project_id || t.project_id}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-600">{proj?.product_name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="font-medium">{t.from_department}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                          <span className="font-medium">{t.to_department}</span>
                          <span className="text-gray-400 ml-2">{t.quantity.toLocaleString()} pcs</span>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            t.status === 'Completed' || t.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                            t.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                            t.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {t.status}
                          </span>
                          {validation.type !== 'ok' && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-700">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Validation Issue
                            </span>
                          )}
                          <span className="text-xs text-gray-400">
                            {new Date(t.requested_at).toLocaleString('en-GB', {
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
                  <FileText className="w-5 h-5 text-gray-400" />
                  Transfer Details
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Project</span>
                    <span className="font-medium">{selectedProject?.project_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Buyer</span>
                    <span className="font-medium">{selectedProject?.buyers?.company_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">From</span>
                    <span className="font-medium">{selected.from_department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">To</span>
                    <span className="font-medium">{selected.to_department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Quantity</span>
                    <span className="font-medium">{selected.quantity.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Rejected</span>
                    <span className="font-medium">{selected.rejected_quantity.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status</span>
                    <span className="font-medium">{selected.status}</span>
                  </div>
                </div>

                {selected.status === 'Pending' && (
                  <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleAccept(selected.id)}
                      className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors text-xs font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Accept
                    </button>
                    <button
                      onClick={() => handlePartialAccept(selected.id)}
                      className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors text-xs font-medium"
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
                )}
              </div>

              {/* Validation Card */}
              <div className={`rounded-xl border p-6 ${
                selectedValidation?.type === 'ok'
                  ? 'bg-green-50 border-green-200'
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  <Calculator className={`w-5 h-5 ${selectedValidation?.type === 'ok' ? 'text-green-700' : 'text-red-700'}`} />
                  <h3 className={`font-bold ${selectedValidation?.type === 'ok' ? 'text-green-900' : 'text-red-900'}`}>
                    Quantity Validation
                  </h3>
                </div>
                <p className={`text-sm ${selectedValidation?.type === 'ok' ? 'text-green-800' : 'text-red-800'}`}>
                  {selectedValidation?.message}
                </p>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
              <ArrowRightLeft className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">Select a transfer from the queue to view details and validate.</p>
            </div>
          )}

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Transfer Activity</h2>
            {transferLogs.length === 0 ? (
              <p className="text-sm text-gray-500">No activity yet.</p>
            ) : (
              <div className="space-y-3">
                {transferLogs.map(log => (
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

          {/* Audit Log (local actions taken in this session) */}
          {auditLog.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-gray-400" />
                Session Audit Log
              </h2>
              <div className="space-y-3">
                {auditLog.map(entry => (
                  <div key={entry.id} className="pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        entry.action === 'accepted' ? 'bg-green-100 text-green-700' :
                        entry.action === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {entry.action === 'accepted' ? 'Accepted' :
                         entry.action === 'rejected' ? 'Rejected' : 'Partially Accepted'}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(entry.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{entry.remarks}</p>
                    <p className="text-xs text-gray-400 mt-0.5">By {entry.actor}</p>
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
