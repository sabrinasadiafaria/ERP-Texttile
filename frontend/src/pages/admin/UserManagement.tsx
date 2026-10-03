import { useCallback, useEffect, useMemo, useState } from 'react';
import { Check, X, Search, Loader2, Power, Pencil, Save } from 'lucide-react';
import { useAuth, type UserProfile, type UserStatus } from '@/contexts/AuthContext';
import { ALL_ROLES, getDepartmentForRole, PRODUCTION_DEPARTMENTS } from '@/lib/roles';
import { listUsers, setUser, updateProfileDetails } from '@/lib/services/userAdmin';

const DEPARTMENT_OPTIONS = [
  'Management', 'Administration', 'Commercial', 'Yarn', 'Inventory & Store',
  ...PRODUCTION_DEPARTMENTS.map((d) => d.displayName),
];

const STATUS_STYLE: Record<UserStatus, string> = {
  pending: 'bg-orange-100 text-orange-800',
  active: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  inactive: 'bg-gray-200 text-gray-700',
};

type Tab = 'pending' | 'all';

export function UserManagement() {
  const { can, profile: me } = useAuth();
  const canManage = can('users', 'manage');
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<Tab>('pending');
  // per-row draft for role/department chosen before approving
  const [draft, setDraft] = useState<Record<string, { role?: string; department?: string; name?: string }>>({});
  const [editing, setEditing] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try { setUsers(await listUsers()); setError(null); }
    catch (e) { setError((e as Error).message); }
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  const run = async (id: string, fn: () => Promise<void>) => {
    setBusy(id); setError(null);
    try { await fn(); await load(); }
    catch (e) { setError((e as Error).message); }
    setBusy(null);
  };

  const setDraftField = (id: string, patch: { role?: string; department?: string; name?: string }) =>
    setDraft((d) => ({ ...d, [id]: { ...d[id], ...patch } }));

  const onRoleChange = (u: UserProfile, role: string) => {
    // default the department from the role (e.g. Knitting PM -> Knitting)
    const dept = getDepartmentForRole(role)?.displayName;
    setDraftField(u.id, { role, ...(dept && !u.department ? { department: dept } : {}) });
  };

  const approve = (u: UserProfile) => {
    const d = draft[u.id] ?? {};
    const role = d.role ?? u.role;
    const department = d.department ?? u.department;
    if (!role) { setError('Assign a role before approving.'); return; }
    if (!department) { setError('Assign a department before approving.'); return; }
    run(u.id, () => setUser({ userId: u.id, status: 'active', role, department }));
  };

  const reject = (u: UserProfile) => {
    const reason = window.prompt('Reason for rejection (required):');
    if (!reason) return;
    run(u.id, () => setUser({ userId: u.id, status: 'rejected', reason }));
  };

  const saveEdit = (u: UserProfile) => {
    const d = draft[u.id] ?? {};
    run(u.id, async () => {
      if (d.name !== undefined && d.name !== u.full_name) await updateProfileDetails(u.id, { full_name: d.name });
      if ((d.role && d.role !== u.role) || (d.department && d.department !== u.department)) {
        await setUser({ userId: u.id, status: u.status, role: d.role ?? u.role, department: d.department ?? u.department });
      }
      setEditing(null);
    });
  };

  const visible = useMemo(() => {
    const q = search.toLowerCase();
    return users
      .filter((u) => (tab === 'pending' ? u.status === 'pending' : true))
      .filter((u) => !q || u.full_name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q) || u.role?.toLowerCase().includes(q));
  }, [users, tab, search]);

  const pendingCount = users.filter((u) => u.status === 'pending').length;

  if (!canManage) return <p className="text-sm text-gray-500">You do not have permission to manage users.</p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-500">
            New users register on the Sign Up page and appear here as Pending. Approve to assign role and department.
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm"
            placeholder="Search name, email, role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={() => setTab('pending')} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === 'pending' ? 'bg-[#0047ff] text-white' : 'bg-white border text-gray-700'}`}>
          Pending Users ({pendingCount})
        </button>
        <button onClick={() => setTab('all')} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === 'all' ? 'bg-[#0047ff] text-white' : 'bg-white border text-gray-700'}`}>
          All Users ({users.length})
        </button>
      </div>

      {error && <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm">{error}</div>}

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#0047ff]" /></div>
        ) : visible.length === 0 ? (
          <p className="p-8 text-center text-sm text-gray-500">{tab === 'pending' ? 'No users awaiting approval.' : 'No users found.'}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['User', 'Status', 'Role', 'Department', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {visible.map((u) => {
                  const d = draft[u.id] ?? {};
                  const isEditing = editing === u.id || u.status === 'pending';
                  const isMe = u.id === me?.id;
                  return (
                    <tr key={u.id}>
                      <td className="px-4 py-3">
                        {editing === u.id ? (
                          <input className="border rounded px-2 py-1 text-sm" defaultValue={u.full_name ?? ''} onChange={(e) => setDraftField(u.id, { name: e.target.value })} />
                        ) : (
                          <div className="text-sm font-medium text-gray-900">{u.full_name || 'No Name'}</div>
                        )}
                        <div className="text-xs text-gray-500">{u.email}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${STATUS_STYLE[u.status]}`}>{u.status}</span>
                        {u.status === 'rejected' && u.rejection_reason && <div className="text-xs text-red-500 mt-1">{u.rejection_reason}</div>}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {isEditing ? (
                          <select value={d.role ?? u.role ?? ''} onChange={(e) => onRoleChange(u, e.target.value)} className="border rounded px-2 py-1 text-sm">
                            <option value="">Select role</option>
                            {ALL_ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                          </select>
                        ) : (u.role ?? '—')}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {isEditing ? (
                          <select value={d.department ?? u.department ?? ''} onChange={(e) => setDraftField(u.id, { department: e.target.value })} className="border rounded px-2 py-1 text-sm">
                            <option value="">Select department</option>
                            {DEPARTMENT_OPTIONS.map((x) => <option key={x} value={x}>{x}</option>)}
                          </select>
                        ) : (u.department ?? '—')}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 items-center">
                          {busy === u.id && <Loader2 className="w-4 h-4 animate-spin" />}
                          {(u.status === 'pending' || u.status === 'rejected') && (
                            <button title="Approve" disabled={busy === u.id} onClick={() => approve(u)} className="text-emerald-700 bg-emerald-50 p-2 rounded-lg"><Check className="w-4 h-4" /></button>
                          )}
                          {u.status === 'pending' && (
                            <button title="Reject" disabled={busy === u.id} onClick={() => reject(u)} className="text-red-600 bg-red-50 p-2 rounded-lg"><X className="w-4 h-4" /></button>
                          )}
                          {u.status === 'active' && !isMe && (
                            <button title="Deactivate" disabled={busy === u.id} onClick={() => run(u.id, () => setUser({ userId: u.id, status: 'inactive' }))} className="text-gray-700 bg-gray-100 p-2 rounded-lg"><Power className="w-4 h-4" /></button>
                          )}
                          {u.status === 'inactive' && (
                            <button title="Activate" disabled={busy === u.id} onClick={() => run(u.id, () => setUser({ userId: u.id, status: 'active' }))} className="text-emerald-700 bg-emerald-50 p-2 rounded-lg"><Power className="w-4 h-4" /></button>
                          )}
                          {u.status !== 'pending' && (editing === u.id ? (
                            <button title="Save" onClick={() => saveEdit(u)} className="text-[#0047ff] bg-blue-50 p-2 rounded-lg"><Save className="w-4 h-4" /></button>
                          ) : (
                            <button title="Edit user" onClick={() => setEditing(u.id)} className="text-gray-700 bg-gray-100 p-2 rounded-lg"><Pencil className="w-4 h-4" /></button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
