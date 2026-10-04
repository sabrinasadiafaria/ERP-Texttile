import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRightLeft, CheckCircle2, XCircle, AlertTriangle,
  Filter, Loader2, Clock, Calculator, ArrowRight, FileText,
} from 'lucide-react';

import type { TransferStatus } from '@/lib/services/production';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { getDepartmentForRole, ROLES } from '@/lib/roles';

type ValidationIssue =
  | { type: 'exceeds_produced'; message: string }
  | { type: 'no_record'; message: string }
  | { type: 'mismatch_rejected'; message: string }
  | { type: 'ok'; message: string };

function validateTransfer(t: any, records: any[]): ValidationIssue {
  const sourceRecord = records.find(
    r => r.project_id === t.project_id && r.department === t.from_department
  );

  if (!sourceRecord) {
    return { type: 'no_record', message: 'No department record exists for source.' };
  }

  if (t.quantity > sourceRecord.produced_quantity) {
    return {
      type: 'exceeds_produced',
      message: `Transfer quantity (${Number(t.quantity || 0).toLocaleString()}) exceeds source produced quantity (${Number(sourceRecord.produced_quantity || 0).toLocaleString()}).`,
    };
  }

  const totalAccountedFor = t.quantity + (t.rejected_quantity || 0);
  if (totalAccountedFor > sourceRecord.produced_quantity) {
    return {
      type: 'mismatch_rejected',
      message: `Quantity + rejected (${totalAccountedFor.toLocaleString()}) exceeds source produced (${Number(sourceRecord.produced_quantity || 0).toLocaleString()}).`,
    };
  }

  return {
    type: 'ok',
    message: `Math OK: ${Number(t.quantity || 0).toLocaleString()} shipped + ${(t.rejected_quantity || 0).toLocaleString()} rejected = ${totalAccountedFor.toLocaleString()} / ${Number(sourceRecord.produced_quantity || 0).toLocaleString()} produced.`,
  };
}

export function TransfersPage() {
  const { profile } = useAuth();
  const [transfers, setTransfers] = useState<any[]>([]);
  const [records, setRecords] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [transferLogs, setTransferLogs] = useState<any[]>([]);
  const [filterStatus, setFilterStatus] = useState<'All' | TransferStatus>('All');
  const [auditLog, setAuditLog] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    const [
      { data: transfersData },
      { data: recordsData },
      { data: projectsData },
      { data: logsData }
    ] = await Promise.all([
      supabase.from('production_transfers').select('*').order('created_at', { ascending: false }),
      supabase.from('production_records').select('*'),
      supabase.from('projects').select('*, buyers(company_name)'),
      supabase.from('activity_logs').select('*').eq('module', 'transfer').order('created_at', { ascending: false }).limit(10)
    ]);

    // Department users only see transfers into/out of their own department.
    const role = profile?.role || '';
    const cfg = getDepartmentForRole(role);
    const myDept = cfg
      ? (cfg.displayName.includes('Trimming') ? 'Trimming' : cfg.displayName)
      : role === ROLES.INVENTORY_MANAGER ? 'Inventory' : null;
    const scoped = myDept
      ? (transfersData || []).filter((t: any) => t.from_department === myDept || t.to_department === myDept)
      : transfersData;
    if (scoped) setTransfers(scoped);
    if (recordsData) setRecords(recordsData);
    if (projectsData) setProjects(projectsData);
    if (logsData) setTransferLogs(logsData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [profile?.role]);

  const filtered = useMemo(() => {
    if (filterStatus === 'All') return transfers;
    return transfers.filter(t => t.status.toUpperCase() === filterStatus.toUpperCase());
  }, [transfers, filterStatus]);

  const stats = useMemo(() => ({
    total: transfers.length,
    pending: transfers.filter(t => t.status === 'Pending' || t.status === 'PENDING').length,
    accepted: transfers.filter(t => t.status === 'Accepted' || t.status === 'ACCEPTED' || t.status === 'COMPLETED').length,
    rejected: transfers.filter(t => t.status === 'Rejected' || t.status === 'REJECTED').length,
  }), [transfers]);

  const receiveIntoDepartment = async (t: any, qty: number) => {
    await supabase.from('production_records').insert({
      project_id: t.project_id,
      department: t.to_department,
      input_quantity: qty,
      planned_quantity: qty,
      status: t.to_department === 'Inventory' ? 'COMPLETED' : 'RECEIVED',
      created_by: profile?.id,
    });
  };

  const handleAccept = async (id: string, t: any) => {
    if (t.status !== 'PENDING' && t.status !== 'Pending') return;
    await receiveIntoDepartment(t, t.quantity);
    await supabase.from('production_transfers').update({
      status: 'ACCEPTED',
      accepted_quantity: t.quantity,
      accepted_by: profile?.id,
      accepted_at: new Date().toISOString()
    }).eq('id', id);

    await supabase.from('activity_logs').insert({
      user_id: profile?.id,
      action: 'ACCEPT',
      module: 'transfer',
      description: `Accepted transfer ${id}`
    });

    setAuditLog(prev => [{
      id: `audit-${Date.now()}-accept`,
      action: 'accepted',
      actor: profile?.full_name || 'System',
      timestamp: new Date().toISOString(),
      remarks: 'Full acceptance recorded.',
    }, ...prev]);
    fetchData();
  };

  const handleReject = async (id: string, t: any) => {
    await supabase.from('production_transfers').update({
      status: 'REJECTED',
      rejected_quantity: t.quantity,
      accepted_by: profile?.id,
      accepted_at: new Date().toISOString()
    }).eq('id', id);

    await supabase.from('activity_logs').insert({
      user_id: profile?.id,
      action: 'REJECT',
      module: 'transfer',
      description: `Rejected transfer ${id}`
    });

    setAuditLog(prev => [{
      id: `audit-${Date.now()}-reject`,
      action: 'rejected',
      actor: profile?.full_name || 'System',
      timestamp: new Date().toISOString(),
      remarks: 'Rejected.',
    }, ...prev]);
    fetchData();
  };

  const handlePartialAccept = async (id: string, t: any, acceptedQty: number) => {
    const rejectedQty = t.quantity - acceptedQty;
    if (acceptedQty > 0) await receiveIntoDepartment(t, acceptedQty);
    await supabase.from('production_transfers').update({
      status: 'PARTIAL',
      accepted_quantity: acceptedQty,
      rejected_quantity: rejectedQty,
      accepted_by: profile?.id,
      accepted_at: new Date().toISOString()
    }).eq('id', id);

    await supabase.from('activity_logs').insert({
      user_id: profile?.id,
      action: 'PARTIAL_ACCEPT',
      module: 'transfer',
      description: `Partially accepted transfer ${id}`
    });

    setAuditLog(prev => [{
      id: `audit-${Date.now()}-partial`,
      action: 'partially_accepted',
      actor: profile?.full_name || 'System',
      timestamp: new Date().toISOString(),
      remarks: `Partial acceptance: ${acceptedQty} accepted, ${rejectedQty} rejected.`,
    }, ...prev]);
    fetchData();
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
  const selectedValidation = selected ? validateTransfer(selected, records) : null;
  const selectedProject = selected ? projects.find(p => p.id === selected.project_id) : null;

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
        {/* Transfer List â€” 3/5 */}
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
                const validation = validateTransfer(t, records);
                const proj = projects.find(p => p.id === t.project_id);
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
                          <span className="text-sm font-semibold text-[#0047ff]">{proj?.order_number || t.project_id}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-600">{proj?.product_name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="font-medium">{t.from_department}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                          <span className="font-medium">{t.to_department}</span>
                          <span className="text-gray-400 ml-2">{Number(t.quantity || 0).toLocaleString()} pcs</span>
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
                            {new Date(t.created_at || new Date()).toLocaleString('en-GB', {
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

        {/* Detail Panel â€” 2/5 */}
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
                    <span className="font-medium">{selectedProject?.order_number}</span>
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
                    <span className="font-medium">{Number(selected.quantity || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Rejected</span>
                    <span className="font-medium">{Number(selected.rejected_quantity || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status</span>
                    <span className="font-medium">{selected.status}</span>
                  </div>
                </div>

                {selected.status === 'Pending' || selected.status === 'PENDING' ? (
                  <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleAccept(selected.id, selected)}
                      className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors text-xs font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Accept
                    </button>
                    <button
                      onClick={() => {
                        const approved = prompt(`Partial approval â€” accepted qty (max ${selected.quantity}):`, String(Math.floor(selected.quantity / 2)));
                        if (approved) handlePartialAccept(selected.id, selected, parseFloat(approved));
                      }}
                      className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors text-xs font-medium"
                    >
                      <Calculator className="w-4 h-4" />
                      Partial
                    </button>
                    <button
                      onClick={() => handleReject(selected.id, selected)}
                      className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors text-xs font-medium"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                ) : null}
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
