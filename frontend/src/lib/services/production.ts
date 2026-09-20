import { supabase } from '@/lib/supabase';

// ============================================================================
// TYPES
// ============================================================================

export interface Project {
  id: string;
  order_number: string;
  project_id: string; // AE-2026-001 format
  buyer_id: string;
  product_name: string;
  quantity: number;
  delivery_date: string;
  status: ProjectStatus;
  priority: Priority;
  category: string;
  gauge: string;
  yarn_type: string;
  current_department: Department | null;
  current_status: DepartmentStatus;
  created_at: string;
  buyers?: { company_name: string };
}

export type ProjectStatus = 'Draft' | 'Active' | 'In Production' | 'Delayed' | 'On Hold' | 'Completed' | 'Cancelled';
export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type DepartmentStatus = 'Waiting' | 'In Progress' | 'Completed' | 'Transfer Pending' | 'Accepted' | 'Rejected';

export type Department =
  | 'Yarn'
  | 'Knitting'
  | 'Linking'
  | 'Trimming'
  | 'Sewing'
  | 'Washing'
  | 'Ironing'
  | 'Packaging'
  | 'Inventory'
  | 'Store'
  | 'Shipment';

export const DEPARTMENTS: Department[] = [
  'Yarn',
  'Knitting',
  'Linking',
  'Trimming',
  'Sewing',
  'Washing',
  'Ironing',
  'Packaging',
  'Inventory',
];

export const PRODUCTION_ORDER: Department[] = [
  'Yarn',
  'Knitting',
  'Linking',
  'Trimming',
  'Sewing',
  'Washing',
  'Ironing',
  'Packaging',
  'Inventory',
];

export interface DepartmentRecord {
  id: string;
  project_id: string;
  department: Department;
  received_quantity: number;
  produced_quantity: number;
  rejected_quantity: number;
  damaged_quantity: number;
  remaining_quantity: number;
  status: DepartmentStatus;
  received_date: string | null;
  completed_date: string | null;
  remarks: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  profiles?: { full_name: string };
}

export interface Transfer {
  id: string;
  project_id: string;
  from_department: Department;
  to_department: Department;
  quantity: number;
  rejected_quantity: number;
  status: TransferStatus;
  remarks: string;
  requested_by: string;
  accepted_by: string | null;
  requested_at: string;
  accepted_at: string | null;
  project?: { order_number: string; product_name: string; buyers?: { company_name: string } };
  from_profile?: { full_name: string };
  to_profile?: { full_name: string };
}

export type TransferStatus = 'Pending' | 'Accepted' | 'Rejected' | 'Partially Accepted' | 'Completed';

export interface ActivityLog {
  id: string;
  project_id: string | null;
  entity_type: 'project' | 'transfer' | 'production' | 'yarn' | 'user' | 'inventory' | 'notification';
  entity_id: string | null;
  action: string;
  description: string;
  user_id: string;
  old_value: string | null;
  new_value: string | null;
  created_at: string;
  profiles?: { full_name: string; role: string };
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  is_read: boolean;
  link: string | null;
  created_at: string;
}

export interface DepartmentSummary {
  department: Department;
  activeProjects: number;
  completedProjects: number;
  totalProduced: number;
  totalRejected: number;
  totalDamaged: number;
  avgEfficiency: number;
}

// ============================================================================
// PROJECTS
// ============================================================================

export async function fetchProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*, buyers(company_name)')
    .order('created_at', { ascending: false });
  if (error) { console.error('fetchProjects error:', error); return []; }
  return data || [];
}

export async function fetchProjectById(id: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .select('*, buyers(company_name)')
    .eq('id', id)
    .single();
  if (error) { console.error('fetchProjectById error:', error); return null; }
  return data;
}

export async function fetchProjectsByDepartment(department: Department): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*, buyers(company_name)')
    .eq('current_department', department)
    .order('created_at', { ascending: false });
  if (error) { console.error('fetchProjectsByDepartment error:', error); return []; }
  return data || [];
}

export async function fetchActiveProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*, buyers(company_name)')
    .not('status', 'in', '("Completed","Cancelled","Draft")')
    .order('delivery_date', { ascending: true });
  if (error) { console.error('fetchActiveProjects error:', error); return []; }
  return data || [];
}

// ============================================================================
// DEPARTMENT RECORDS
// ============================================================================

export async function fetchDepartmentRecords(projectId: string): Promise<DepartmentRecord[]> {
  const { data, error } = await supabase
    .from('project_department_records')
    .select('*, profiles(full_name)')
    .eq('project_id', projectId)
    .order('created_at', { ascending: true });
  if (error) { console.error('fetchDepartmentRecords error:', error); return []; }
  return data || [];
}

export async function fetchDepartmentRecordsByDept(department: Department): Promise<DepartmentRecord[]> {
  const { data, error } = await supabase
    .from('project_department_records')
    .select('*, projects(order_number, product_name, quantity, buyers(company_name)), profiles(full_name)')
    .eq('department', department)
    .order('created_at', { ascending: false });
  if (error) { console.error('fetchDepartmentRecordsByDept error:', error); return []; }
  return data || [];
}

export async function upsertDepartmentRecord(record: Partial<DepartmentRecord>): Promise<DepartmentRecord | null> {
  const { data, error } = await supabase
    .from('project_department_records')
    .upsert(record, { onConflict: 'project_id,department' })
    .select()
    .single();
  if (error) { console.error('upsertDepartmentRecord error:', error); return null; }
  return data;
}

export async function updateProjectDepartment(
  projectId: string,
  department: Department,
  quantities: { produced?: number; rejected?: number; damaged?: number },
  remarks?: string,
  userId?: string
): Promise<boolean> {
  // First get or create the record
  const { data: existing } = await supabase
    .from('project_department_records')
    .select('*')
    .eq('project_id', projectId)
    .eq('department', department)
    .single();

  const receivedQty = existing?.received_quantity || 0;
  const prevProduced = existing?.produced_quantity || 0;
  const prevRejected = existing?.rejected_quantity || 0;
  const prevDamaged = existing?.damaged_quantity || 0;

  const newProduced = quantities.produced ?? prevProduced;
  const newRejected = quantities.rejected ?? prevRejected;
  const newDamaged = quantities.damaged ?? prevDamaged;

  // Calculate remaining: received - produced
  const remaining = Math.max(0, receivedQty - newProduced);

  const record = {
    project_id: projectId,
    department,
    produced_quantity: newProduced,
    rejected_quantity: newRejected,
    damaged_quantity: newDamaged,
    remaining_quantity: remaining,
    status: 'In Progress' as DepartmentStatus,
    remarks: remarks || existing?.remarks || '',
    updated_at: new Date().toISOString(),
    created_by: existing?.created_by || userId || '',
  };

  const { error } = await supabase
    .from('project_department_records')
    .upsert(record, { onConflict: 'project_id,department' });

  if (error) { console.error('updateProjectDepartment error:', error); return false; }

  // Update project status
  await supabase
    .from('projects')
    .update({
      current_department: department,
      current_status: 'In Progress',
    })
    .eq('id', projectId);

  return true;
}

// ============================================================================
// TRANSFERS
// ============================================================================

export async function fetchTransfers(filters?: { fromDept?: Department; toDept?: Department; status?: TransferStatus }): Promise<Transfer[]> {
  let query = supabase
    .from('transfers')
    .select('*, projects(order_number, product_name, buyers(company_name)), from_profile:profiles!transfers_requested_by_fkey(full_name), to_profile:profiles!transfers_accepted_by_fkey(full_name)')
    .order('requested_at', { ascending: false });

  if (filters?.fromDept) query = query.eq('from_department', filters.fromDept);
  if (filters?.toDept) query = query.eq('to_department', filters.toDept);
  if (filters?.status) query = query.eq('status', filters.status);

  const { data, error } = await query;
  if (error) { console.error('fetchTransfers error:', error); return []; }
  return data || [];
}

export async function fetchTransfersByProject(projectId: string): Promise<Transfer[]> {
  const { data, error } = await supabase
    .from('transfers')
    .select('*, projects(order_number, product_name, buyers(company_name)), from_profile:profiles!transfers_requested_by_fkey(full_name), to_profile:profiles!transfers_accepted_by_fkey(full_name)')
    .eq('project_id', projectId)
    .order('requested_at', { ascending: true });
  if (error) { console.error('fetchTransfersByProject error:', error); return []; }
  return data || [];
}

export async function createTransfer(transfer: {
  project_id: string;
  from_department: Department;
  to_department: Department;
  quantity: number;
  rejected_quantity?: number;
  remarks?: string;
  requested_by: string;
}): Promise<Transfer | null> {
  const { data, error } = await supabase
    .from('transfers')
    .insert([{
      ...transfer,
      status: 'Pending',
      requested_at: new Date().toISOString(),
    }])
    .select()
    .single();
  if (error) { console.error('createTransfer error:', error); return null; }

  // Update from department record status
  await supabase
    .from('project_department_records')
    .update({ status: 'Transfer Pending' })
    .eq('project_id', transfer.project_id)
    .eq('department', transfer.from_department);

  // Update project current department
  await supabase
    .from('projects')
    .update({ current_status: 'Transfer Pending' })
    .eq('id', transfer.project_id);

  return data;
}

export async function updateTransferStatus(
  transferId: string,
  status: TransferStatus,
  accepted_by: string,
  rejected_quantity?: number,
  remarks?: string
): Promise<boolean> {
  const { error } = await supabase
    .from('transfers')
    .update({
      status,
      accepted_by,
      accepted_at: new Date().toISOString(),
      rejected_quantity: rejected_quantity || 0,
      remarks: remarks || '',
    })
    .eq('id', transferId);

  if (error) { console.error('updateTransferStatus error:', error); return false; }

  // Fetch transfer to update related records
  const { data: transfer } = await supabase
    .from('transfers')
    .select('*, projects(order_number)')
    .eq('id', transferId)
    .single();

  if (transfer) {
    if (status === 'Accepted' || status === 'Partially Accepted') {
      // Create incoming record for target department
      const receivedQty = status === 'Partially Accepted' ? (rejected_quantity || 0) : transfer.quantity;
      await supabase.from('project_department_records').upsert({
        project_id: transfer.project_id,
        department: transfer.to_department,
        received_quantity: receivedQty,
        produced_quantity: 0,
        rejected_quantity: 0,
        damaged_quantity: 0,
        remaining_quantity: receivedQty,
        status: 'Waiting',
        received_date: new Date().toISOString(),
      }, { onConflict: 'project_id,department' });

      // Update project
      await supabase.from('projects').update({
        current_department: transfer.to_department,
        current_status: 'Accepted',
      }).eq('id', transfer.project_id);
    }
  }

  return true;
}

// ============================================================================
// ACTIVITY LOGS
// ============================================================================

export async function fetchActivityLogs(projectId?: string, limit = 50): Promise<ActivityLog[]> {
  let query = supabase
    .from('activity_logs')
    .select('*, profiles(full_name, role)')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (projectId) query = query.eq('project_id', projectId);

  const { data, error } = await query;
  if (error) { console.error('fetchActivityLogs error:', error); return []; }
  return data || [];
}

export async function logActivity(log: {
  project_id?: string;
  entity_type: ActivityLog['entity_type'];
  entity_id?: string;
  action: string;
  description: string;
  user_id: string;
  old_value?: string;
  new_value?: string;
}): Promise<boolean> {
  const { error } = await supabase
    .from('activity_logs')
    .insert([{
      ...log,
      created_at: new Date().toISOString(),
    }]);
  if (error) { console.error('logActivity error:', error); return false; }
  return true;
}

// ============================================================================
// NOTIFICATIONS
// ============================================================================

export async function fetchNotifications(userId: string): Promise<Notification[]> {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(20);
  if (error) { console.error('fetchNotifications error:', error); return []; }
  return data || [];
}

export async function createNotification(notification: Omit<Notification, 'id' | 'created_at'>): Promise<boolean> {
  const { error } = await supabase
    .from('notifications')
    .insert([{
      ...notification,
      created_at: new Date().toISOString(),
    }]);
  if (error) { console.error('createNotification error:', error); return false; }
  return true;
}

export async function markNotificationRead(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', id);
  if (error) { console.error('markNotificationRead error:', error); return false; }
  return true;
}

// ============================================================================
// DASHBOARD STATS
// ============================================================================

export async function fetchDirectorStats(): Promise<{
  totalActive: number;
  totalCompleted: number;
  totalDelayed: number;
  todayProduction: number;
  pendingActions: number;
  lowStockItems: number;
  activeDepartments: number;
}> {
  const { count: active } = await supabase.from('projects').select('*', { count: 'exact', head: true }).not('status', 'in', '("Completed","Cancelled","Draft")');
  const { count: completed } = await supabase.from('projects').select('*', { count: 'exact', head: true }).eq('status', 'Completed');
  const { count: delayed } = await supabase.from('projects').select('*', { count: 'exact', head: true }).eq('status', 'Delayed');
  const { count: pendingTransfers } = await supabase.from('transfers').select('*', { count: 'exact', head: true }).eq('status', 'Pending');
  const { count: pendingYarn } = await supabase.from('yarn_requests').select('*', { count: 'exact', head: true }).eq('status', 'Pending');

  return {
    totalActive: active || 0,
    totalCompleted: completed || 0,
    totalDelayed: delayed || 0,
    todayProduction: 0, // Computed from production records
    pendingActions: (pendingTransfers || 0) + (pendingYarn || 0),
    lowStockItems: 0,
    activeDepartments: 8,
  };
}

export async function fetchDepartmentSummaries(): Promise<DepartmentSummary[]> {
  const summaries: DepartmentSummary[] = [];
  for (const dept of PRODUCTION_ORDER) {
    const { data: records } = await supabase
      .from('project_department_records')
      .select('produced_quantity, rejected_quantity, damaged_quantity, status')
      .eq('department', dept);

    const { count: active } = await supabase
      .from('projects')
      .select('*', { count: 'exact', head: true })
      .eq('current_department', dept)
      .not('status', 'in', '("Completed","Cancelled")');

    const completed = records?.filter(r => r.status === 'Completed').length || 0;
    const totalProduced = records?.reduce((sum, r) => sum + (r.produced_quantity || 0), 0) || 0;
    const totalRejected = records?.reduce((sum, r) => sum + (r.rejected_quantity || 0), 0) || 0;
    const totalDamaged = records?.reduce((sum, r) => sum + (r.damaged_quantity || 0), 0) || 0;

    summaries.push({
      department: dept,
      activeProjects: active || 0,
      completedProjects: completed,
      totalProduced,
      totalRejected,
      totalDamaged,
      avgEfficiency: totalProduced > 0 ? Math.round(((totalProduced - totalRejected - totalDamaged) / totalProduced) * 100) : 0,
    });
  }
  return summaries;
}

// ============================================================================
// HELPERS
// ============================================================================

export function generateProjectId(year: number, sequence: number): string {
  return `AE-${year}-${String(sequence).padStart(3, '0')}`;
}

export function getNextDepartment(current: Department): Department | null {
  const idx = PRODUCTION_ORDER.indexOf(current);
  if (idx === -1 || idx >= PRODUCTION_ORDER.length - 1) return null;
  return PRODUCTION_ORDER[idx + 1];
}

export function getDepartmentProgress(_projectId: string, records: DepartmentRecord[]): number {
  if (records.length === 0) return 0;
  const totalDepts = PRODUCTION_ORDER.length;
  const completedDepts = records.filter(r => r.status === 'Completed').length;
  const inProgress = records.filter(r => r.status === 'In Progress').length;

  let progress = (completedDepts / totalDepts) * 100;
  // Add partial credit for in-progress department
  if (inProgress > 0) {
    const lastRecord = records
      .filter(r => r.status === 'In Progress')
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
    if (lastRecord) {
      const deptProgress = lastRecord.received_quantity > 0
        ? (lastRecord.produced_quantity / lastRecord.received_quantity) * (1 / totalDepts) * 100
        : 0;
      progress += deptProgress;
    }
  }
  return Math.min(100, Math.round(progress));
}
