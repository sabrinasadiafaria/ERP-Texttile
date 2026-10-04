import { useState } from 'react';
import { Loader2, Send, Save } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export const NEXT_DEPARTMENT: Record<string, string | null> = {
  Knitting: 'Linking',
  Linking: 'Trimming',
  Trimming: 'Sewing',
  Sewing: 'Washing',
  Washing: 'Ironing',
  Ironing: 'Packaging',
  Packaging: 'Inventory',
  Inventory: null,
};

interface Props {
  record: any;
  department: string;
  userId?: string;
  onChanged: () => void;
}

const statusStyle = (s: string) =>
  s === 'COMPLETED' ? 'bg-green-100 text-green-700'
  : s === 'QC_PENDING' ? 'bg-amber-100 text-amber-700'
  : s === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700'
  : 'bg-gray-100 text-gray-700';

export function DepartmentRecordRow({ record, department, userId, onChanged }: Props) {
  const [editing, setEditing] = useState(false);
  const [produced, setProduced] = useState<number>(record.produced_quantity || record.input_quantity || 0);
  const [rejected, setRejected] = useState<number>(record.rejected_quantity || 0);
  const [damaged, setDamaged] = useState<number>(record.damaged_quantity || 0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const next = NEXT_DEPARTMENT[department] ?? null;
  const good = Math.max(0, (record.produced_quantity || 0) - (record.rejected_quantity || 0) - (record.damaged_quantity || 0));

  async function saveOutput() {
    if (produced < 0 || rejected < 0 || damaged < 0) return setError('Quantities cannot be negative');
    if (rejected + damaged > produced) return setError('Rejected + damaged cannot exceed produced');
    setBusy(true); setError('');
    const { error: err } = await supabase.from('production_records').update({
      produced_quantity: produced,
      rejected_quantity: rejected,
      damaged_quantity: damaged,
      status: 'QC_PENDING',
      updated_at: new Date().toISOString(),
    }).eq('id', record.id);
    if (err) { setError(err.message); setBusy(false); return; }
    await supabase.from('activity_logs').insert({
      user_id: userId, project_id: record.project_id, action: 'UPDATE_PRODUCTION', module: 'production',
      entity_type: 'production_record', entity_id: record.id,
      description: `${department}: ${produced} produced, ${rejected} rejected, ${damaged} damaged`,
    });
    setBusy(false); setEditing(false); onChanged();
  }

  async function transfer() {
    if (!next) return;
    if (good <= 0) return setError('No good pieces to transfer');
    setBusy(true); setError('');
    const { data: existing } = await supabase.from('production_transfers').select('id').eq('source_production_record', record.id).neq('status', 'REJECTED').limit(1);
    if (existing && existing.length > 0) { setBusy(false); setError('Transfer already created'); onChanged(); return; }
    const { data: t, error: err } = await supabase.from('production_transfers').insert({
      project_id: record.project_id,
      from_department: department,
      to_department: next,
      source_production_record: record.id,
      quantity: good,
      status: 'PENDING',
      created_by: userId,
    }).select().single();
    if (err) { setError(err.message); setBusy(false); return; }
    await supabase.from('production_records').update({ status: 'COMPLETED', updated_at: new Date().toISOString() }).eq('id', record.id);
    await supabase.from('activity_logs').insert({
      user_id: userId, project_id: record.project_id, action: 'CREATE_TRANSFER', module: 'production',
      entity_type: 'transfer', entity_id: t.id,
      description: `Transferred ${good} pcs from ${department} to ${next}`,
    });
    setBusy(false); onChanged();
  }

  const numInput = (value: number, set: (n: number) => void, label: string) => (
    <label className="text-[10px] text-gray-500 flex flex-col">
      {label}
      <input type="number" min={0} value={value} onChange={(e) => set(Number(e.target.value))}
        className="w-20 border border-gray-200 rounded px-2 py-1 text-sm text-gray-900" />
    </label>
  );

  return (
    <tr className="hover:bg-gray-50/50 align-top">
      <td className="py-2.5 pr-4 text-sm font-medium text-[#0047ff]">{record.projects?.order_number || record.project_id}</td>
      <td className="py-2.5 pr-4 text-gray-700">{(record.input_quantity || 0).toLocaleString()}</td>
      <td className="py-2.5 pr-4 font-medium text-gray-900">{(record.produced_quantity || 0).toLocaleString()}</td>
      <td className="py-2.5 pr-4 text-red-600">{(record.rejected_quantity || 0).toLocaleString()}</td>
      <td className="py-2.5 pr-4 text-amber-600">{(record.damaged_quantity || 0).toLocaleString()}</td>
      <td className="py-2.5 pr-4">
        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle(record.status)}`}>{record.status}</span>
      </td>
      <td className="py-2.5">
        {record.status === 'COMPLETED' ? (
          <span className="text-xs text-gray-400">{next ? `Sent to ${next}` : 'Done'}</span>
        ) : editing ? (
          <div className="flex items-end gap-2 flex-wrap">
            {numInput(produced, setProduced, 'Produced')}
            {numInput(rejected, setRejected, 'Rejected')}
            {numInput(damaged, setDamaged, 'Damaged')}
            <button disabled={busy} onClick={saveOutput}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0047ff] text-white text-xs font-medium disabled:opacity-50">
              {busy ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />} Save
            </button>
            <button onClick={() => setEditing(false)} className="text-xs text-gray-500 px-2 py-1.5">Cancel</button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => setEditing(true)}
              className="px-3 py-1.5 rounded-lg border border-[#0047ff] text-[#0047ff] text-xs font-medium hover:bg-blue-50">
              Record Output
            </button>
            {record.status === 'QC_PENDING' && next && (
              <button disabled={busy} onClick={transfer}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-600 text-white text-xs font-medium disabled:opacity-50">
                {busy ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />} Transfer to {next}
              </button>
            )}
          </div>
        )}
        {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
      </td>
    </tr>
  );
}
