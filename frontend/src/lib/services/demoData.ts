/**
 * Realistic interconnected demo data for Al-Amin Export ERP
 * All data is relational and consistent across the system.
 * This file seeds mock data when Supabase tables are empty or provides
 * fallback data for dashboards during development.
 */

import {
  type Project,
  type DepartmentRecord,
  type Transfer,
  type ActivityLog,
  type Notification,
  type Department,
  PRODUCTION_ORDER,
} from './production';

// ============================================================================
// DEMO PROJECTS (AE-2026-XXX format)
// ============================================================================

export const DEMO_PROJECTS: Project[] = [
  {
    id: 'proj-001',
    order_number: 'PO-ITAL-2026-001',
    project_id: 'AE-2026-001',
    buyer_id: 'buyer-001',
    product_name: 'Merino Wool Crew Neck Sweater',
    quantity: 18000,
    delivery_date: '2026-03-15',
    status: 'In Production',
    priority: 'High',
    category: 'Sweater',
    gauge: '12GG',
    yarn_type: '100% Merino Wool',
    current_department: 'Sewing',
    current_status: 'In Progress',
    created_at: '2026-01-10T09:00:00Z',
    buyers: { company_name: 'Milano Fashion Group' },
  },
  {
    id: 'proj-002',
    order_number: 'PO-DEN-2026-002',
    project_id: 'AE-2026-002',
    buyer_id: 'buyer-002',
    product_name: 'Cashmere Blend Cardigan',
    quantity: 8500,
    delivery_date: '2026-02-28',
    status: 'In Production',
    priority: 'Urgent',
    category: 'Cardigan',
    gauge: '7GG',
    yarn_type: '80% Cashmere / 20% Silk',
    current_department: 'Linking',
    current_status: 'In Progress',
    created_at: '2026-01-05T08:30:00Z',
    buyers: { company_name: 'Nordic Knitwear A/S' },
  },
  {
    id: 'proj-003',
    order_number: 'PO-EUR-2026-003',
    project_id: 'AE-2026-003',
    buyer_id: 'buyer-003',
    product_name: 'Cotton Jersey Sweatshirt',
    quantity: 25000,
    delivery_date: '2026-04-20',
    status: 'Active',
    priority: 'Medium',
    category: 'Sweater',
    gauge: '14GG',
    yarn_type: '100% Organic Cotton',
    current_department: 'Knitting',
    current_status: 'In Progress',
    created_at: '2026-01-15T10:00:00Z',
    buyers: { company_name: 'European Fashion Brands' },
  },
  {
    id: 'proj-004',
    order_number: 'PO-UK-2026-004',
    project_id: 'AE-2026-004',
    buyer_id: 'buyer-004',
    product_name: 'Lambswool Fair Isle Pullover',
    quantity: 12000,
    delivery_date: '2026-03-30',
    status: 'Delayed',
    priority: 'High',
    category: 'Pullover',
    gauge: '5GG',
    yarn_type: '100% Lambswool',
    current_department: 'Washing',
    current_status: 'In Progress',
    created_at: '2025-12-20T09:15:00Z',
    buyers: { company_name: 'British Heritage Co.' },
  },
  {
    id: 'proj-005',
    order_number: 'PO-NL-2026-005',
    project_id: 'AE-2026-005',
    buyer_id: 'buyer-005',
    product_name: 'Alpaca Knit Vest',
    quantity: 6200,
    delivery_date: '2026-02-15',
    status: 'Completed',
    priority: 'Medium',
    category: 'Vest',
    gauge: '9GG',
    yarn_type: '70% Alpaca / 30% Wool',
    current_department: 'Inventory',
    current_status: 'Completed',
    created_at: '2025-11-15T08:00:00Z',
    buyers: { company_name: 'Amsterdam Contemporary' },
  },
  {
    id: 'proj-006',
    order_number: 'PO-DE-2026-006',
    project_id: 'AE-2026-006',
    buyer_id: 'buyer-006',
    product_name: 'Superfine Merino Polo Shirt',
    quantity: 15000,
    delivery_date: '2026-05-01',
    status: 'Active',
    priority: 'Low',
    category: 'Sweater',
    gauge: '16GG',
    yarn_type: '100% Superfine Merino',
    current_department: 'Yarn',
    current_status: 'Waiting',
    created_at: '2026-01-18T11:00:00Z',
    buyers: { company_name: 'German Premium Textiles' },
  },
  {
    id: 'proj-007',
    order_number: 'PO-FR-2026-007',
    project_id: 'AE-2026-007',
    buyer_id: 'buyer-001',
    product_name: 'Silk Blend Evening Shawl',
    quantity: 4000,
    delivery_date: '2026-03-01',
    status: 'In Production',
    priority: 'Urgent',
    category: 'Accessories',
    gauge: '18GG',
    yarn_type: '60% Silk / 40% Merino',
    current_department: 'Trimming',
    current_status: 'In Progress',
    created_at: '2026-01-08T14:00:00Z',
    buyers: { company_name: 'Milano Fashion Group' },
  },
  {
    id: 'proj-008',
    order_number: 'PO-SE-2026-008',
    project_id: 'AE-2026-008',
    buyer_id: 'buyer-002',
    product_name: "Organic Cotton Children's Sweater",
    quantity: 20000,
    delivery_date: '2026-04-10',
    status: 'Active',
    priority: 'Medium',
    category: 'Sweater',
    gauge: '12GG',
    yarn_type: '100% GOTS Organic Cotton',
    current_department: 'Knitting',
    current_status: 'Waiting',
    created_at: '2026-01-20T09:30:00Z',
    buyers: { company_name: 'Nordic Knitwear A/S' },
  },
];

// ============================================================================
// DEMO DEPARTMENT RECORDS
// ============================================================================

export const DEMO_DEPARTMENT_RECORDS: DepartmentRecord[] = [
  // Project AE-2026-001 — currently in Sewing
  { id: 'dr-001', project_id: 'proj-001', department: 'Yarn', received_quantity: 18000, produced_quantity: 18000, rejected_quantity: 120, damaged_quantity: 30, remaining_quantity: 0, status: 'Completed', received_date: '2026-01-12', completed_date: '2026-01-15', remarks: 'All yarn issued per BOM spec', created_by: 'user-yarn-001', created_at: '2026-01-12T10:00:00Z', updated_at: '2026-01-15T16:00:00Z' },
  { id: 'dr-002', project_id: 'proj-001', department: 'Knitting', received_quantity: 17850, produced_quantity: 17600, rejected_quantity: 250, damaged_quantity: 80, remaining_quantity: 0, status: 'Completed', received_date: '2026-01-16', completed_date: '2026-01-25T14:30:00Z', remarks: 'All panels knitted and inspected', created_by: 'user-knit-001', created_at: '2026-01-16T08:00:00Z', updated_at: '2026-01-25T14:30:00Z' },
  { id: 'dr-003', project_id: 'proj-001', department: 'Linking', received_quantity: 17270, produced_quantity: 17150, rejected_quantity: 120, damaged_quantity: 40, remaining_quantity: 0, status: 'Completed', received_date: '2026-01-26', completed_date: '2026-02-05T11:00:00Z', remarks: 'All linking complete', created_by: 'user-link-001', created_at: '2026-01-26T08:30:00Z', updated_at: '2026-02-05T11:00:00Z' },
  { id: 'dr-004', project_id: 'proj-001', department: 'Trimming', received_quantity: 16990, produced_quantity: 16880, rejected_quantity: 80, damaged_quantity: 25, remaining_quantity: 0, status: 'Completed', received_date: '2026-02-06', completed_date: '2026-02-12T15:00:00Z', remarks: 'All trimming and finishing done', created_by: 'user-trim-001', created_at: '2026-02-06T09:00:00Z', updated_at: '2026-02-12T15:00:00Z' },
  { id: 'dr-005', project_id: 'proj-001', department: 'Sewing', received_quantity: 16775, produced_quantity: 14200, rejected_quantity: 180, damaged_quantity: 55, remaining_quantity: 2575, status: 'In Progress', received_date: '2026-02-13', completed_date: null, remarks: 'Still in progress — 14,200 sewn, 2,575 remaining', created_by: 'user-sew-001', created_at: '2026-02-13T08:00:00Z', updated_at: '2026-02-20T16:00:00Z' },

  // Project AE-2026-002 — currently in Linking
  { id: 'dr-006', project_id: 'proj-002', department: 'Yarn', received_quantity: 8500, produced_quantity: 8500, rejected_quantity: 60, damaged_quantity: 15, remaining_quantity: 0, status: 'Completed', received_date: '2026-01-07', completed_date: '2026-01-10T12:00:00Z', remarks: '', created_by: 'user-yarn-001', created_at: '2026-01-07T10:00:00Z', updated_at: '2026-01-10T12:00:00Z' },
  { id: 'dr-007', project_id: 'proj-002', department: 'Knitting', received_quantity: 8425, produced_quantity: 8300, rejected_quantity: 100, damaged_quantity: 40, remaining_quantity: 0, status: 'Completed', received_date: '2026-01-11', completed_date: '2026-01-22T10:00:00Z', remarks: '', created_by: 'user-knit-001', created_at: '2026-01-11T08:00:00Z', updated_at: '2026-01-22T10:00:00Z' },
  { id: 'dr-008', project_id: 'proj-002', department: 'Linking', received_quantity: 8160, produced_quantity: 4100, rejected_quantity: 40, damaged_quantity: 20, remaining_quantity: 4060, status: 'In Progress', received_date: '2026-01-23', completed_date: null, remarks: 'Linking in progress — 4,100 linked, 4,060 remaining', created_by: 'user-link-001', created_at: '2026-01-23T09:00:00Z', updated_at: '2026-02-20T16:00:00Z' },

  // Project AE-2026-003 — currently in Knitting
  { id: 'dr-009', project_id: 'proj-003', department: 'Yarn', received_quantity: 25000, produced_quantity: 25000, rejected_quantity: 80, damaged_quantity: 20, remaining_quantity: 0, status: 'Completed', received_date: '2026-01-17', completed_date: '2026-01-20T14:00:00Z', remarks: '', created_by: 'user-yarn-001', created_at: '2026-01-17T10:00:00Z', updated_at: '2026-01-20T14:00:00Z' },
  { id: 'dr-010', project_id: 'proj-003', department: 'Knitting', received_quantity: 24900, produced_quantity: 12500, rejected_quantity: 200, damaged_quantity: 50, remaining_quantity: 12400, status: 'In Progress', received_date: '2026-01-21', completed_date: null, remarks: 'Knitting 50% complete', created_by: 'user-knit-001', created_at: '2026-01-21T08:00:00Z', updated_at: '2026-02-20T16:00:00Z' },

  // Project AE-2026-004 — Delayed, currently in Washing
  { id: 'dr-011', project_id: 'proj-004', department: 'Yarn', received_quantity: 12000, produced_quantity: 12000, rejected_quantity: 100, damaged_quantity: 25, remaining_quantity: 0, status: 'Completed', received_date: '2025-12-22', completed_date: '2025-12-26T12:00:00Z', remarks: '', created_by: 'user-yarn-001', created_at: '2025-12-22T10:00:00Z', updated_at: '2025-12-26T12:00:00Z' },
  { id: 'dr-012', project_id: 'proj-004', department: 'Knitting', received_quantity: 11875, produced_quantity: 11700, rejected_quantity: 150, damaged_quantity: 60, remaining_quantity: 0, status: 'Completed', received_date: '2025-12-27', completed_date: '2026-01-10T15:00:00Z', remarks: '', created_by: 'user-knit-001', created_at: '2025-12-27T08:00:00Z', updated_at: '2026-01-10T15:00:00Z' },
  { id: 'dr-013', project_id: 'proj-004', department: 'Linking', received_quantity: 11490, produced_quantity: 11300, rejected_quantity: 120, damaged_quantity: 45, remaining_quantity: 0, status: 'Completed', received_date: '2026-01-11', completed_date: '2026-01-20T14:00:00Z', remarks: '', created_by: 'user-link-001', created_at: '2026-01-11T08:00:00Z', updated_at: '2026-01-20T14:00:00Z' },
  { id: 'dr-014', project_id: 'proj-004', department: 'Trimming', received_quantity: 11135, produced_quantity: 11000, rejected_quantity: 90, damaged_quantity: 30, remaining_quantity: 0, status: 'Completed', received_date: '2026-01-21', completed_date: '2026-01-28T16:00:00Z', remarks: '', created_by: 'user-trim-001', created_at: '2026-01-21T09:00:00Z', updated_at: '2026-01-28T16:00:00Z' },
  { id: 'dr-015', project_id: 'proj-004', department: 'Sewing', received_quantity: 10880, produced_quantity: 10750, rejected_quantity: 100, damaged_quantity: 35, remaining_quantity: 0, status: 'Completed', received_date: '2026-01-29', completed_date: '2026-02-08T15:00:00Z', remarks: '', created_by: 'user-sew-001', created_at: '2026-01-29T08:00:00Z', updated_at: '2026-02-08T15:00:00Z' },
  { id: 'dr-016', project_id: 'proj-004', department: 'Washing', received_quantity: 10615, produced_quantity: 5300, rejected_quantity: 80, damaged_quantity: 25, remaining_quantity: 5315, status: 'In Progress', received_date: '2026-02-09', completed_date: null, remarks: 'Delayed — washing machine maintenance caused 3-day halt', created_by: 'user-wash-001', created_at: '2026-02-09T08:00:00Z', updated_at: '2026-02-20T16:00:00Z' },

  // Project AE-2026-005 — Completed
  { id: 'dr-017', project_id: 'proj-005', department: 'Yarn', received_quantity: 6200, produced_quantity: 6200, rejected_quantity: 40, damaged_quantity: 10, remaining_quantity: 0, status: 'Completed', received_date: '2025-11-17', completed_date: '2025-11-20T12:00:00Z', remarks: '', created_by: 'user-yarn-001', created_at: '2025-11-17T10:00:00Z', updated_at: '2025-11-20T12:00:00Z' },
  { id: 'dr-018', project_id: 'proj-005', department: 'Knitting', received_quantity: 6150, produced_quantity: 6050, rejected_quantity: 80, damaged_quantity: 30, remaining_quantity: 0, status: 'Completed', received_date: '2025-11-21', completed_date: '2025-12-01T15:00:00Z', remarks: '', created_by: 'user-knit-001', created_at: '2025-11-21T08:00:00Z', updated_at: '2025-12-01T15:00:00Z' },
  { id: 'dr-019', project_id: 'proj-005', department: 'Linking', received_quantity: 5940, produced_quantity: 5850, rejected_quantity: 60, damaged_quantity: 20, remaining_quantity: 0, status: 'Completed', received_date: '2025-12-02', completed_date: '2025-12-10T14:00:00Z', remarks: '', created_by: 'user-link-001', created_at: '2025-12-02T09:00:00Z', updated_at: '2025-12-10T14:00:00Z' },
  { id: 'dr-020', project_id: 'proj-005', department: 'Trimming', received_quantity: 5770, produced_quantity: 5720, rejected_quantity: 40, damaged_quantity: 15, remaining_quantity: 0, status: 'Completed', received_date: '2025-12-11', completed_date: '2025-12-16T16:00:00Z', remarks: '', created_by: 'user-trim-001', created_at: '2025-12-11T09:00:00Z', updated_at: '2025-12-16T16:00:00Z' },
  { id: 'dr-021', project_id: 'proj-005', department: 'Sewing', received_quantity: 5665, produced_quantity: 5590, rejected_quantity: 50, damaged_quantity: 20, remaining_quantity: 0, status: 'Completed', received_date: '2025-12-17', completed_date: '2025-12-24T15:00:00Z', remarks: '', created_by: 'user-sew-001', created_at: '2025-12-17T08:00:00Z', updated_at: '2025-12-24T15:00:00Z' },
  { id: 'dr-022', project_id: 'proj-005', department: 'Washing', received_quantity: 5520, produced_quantity: 5480, rejected_quantity: 30, damaged_quantity: 10, remaining_quantity: 0, status: 'Completed', received_date: '2025-12-26', completed_date: '2026-01-03T14:00:00Z', remarks: '', created_by: 'user-wash-001', created_at: '2025-12-26T08:00:00Z', updated_at: '2026-01-03T14:00:00Z' },
  { id: 'dr-023', project_id: 'proj-005', department: 'Ironing', received_quantity: 5440, produced_quantity: 5400, rejected_quantity: 20, damaged_quantity: 8, remaining_quantity: 0, status: 'Completed', received_date: '2026-01-04', completed_date: '2026-01-08T15:00:00Z', remarks: '', created_by: 'user-iron-001', created_at: '2026-01-04T08:00:00Z', updated_at: '2026-01-08T15:00:00Z' },
  { id: 'dr-024', project_id: 'proj-005', department: 'Packaging', received_quantity: 5372, produced_quantity: 5350, rejected_quantity: 15, damaged_quantity: 5, remaining_quantity: 0, status: 'Completed', received_date: '2026-01-09', completed_date: '2026-01-13T16:00:00Z', remarks: '', created_by: 'user-pack-001', created_at: '2026-01-09T08:00:00Z', updated_at: '2026-01-13T16:00:00Z' },
  { id: 'dr-025', project_id: 'proj-005', department: 'Inventory', received_quantity: 5330, produced_quantity: 5330, rejected_quantity: 0, damaged_quantity: 0, remaining_quantity: 0, status: 'Completed', received_date: '2026-01-14', completed_date: '2026-01-15T10:00:00Z', remarks: 'All 5,330 pieces received and catalogued', created_by: 'user-inv-001', created_at: '2026-01-14T09:00:00Z', updated_at: '2026-01-15T10:00:00Z' },

  // Project AE-2026-007 — currently in Trimming
  { id: 'dr-026', project_id: 'proj-007', department: 'Yarn', received_quantity: 4000, produced_quantity: 4000, rejected_quantity: 30, damaged_quantity: 10, remaining_quantity: 0, status: 'Completed', received_date: '2026-01-10', completed_date: '2026-01-12T14:00:00Z', remarks: '', created_by: 'user-yarn-001', created_at: '2026-01-10T10:00:00Z', updated_at: '2026-01-12T14:00:00Z' },
  { id: 'dr-027', project_id: 'proj-007', department: 'Knitting', received_quantity: 3960, produced_quantity: 3900, rejected_quantity: 50, damaged_quantity: 20, remaining_quantity: 0, status: 'Completed', received_date: '2026-01-13', completed_date: '2026-01-22T15:00:00Z', remarks: '', created_by: 'user-knit-001', created_at: '2026-01-13T08:00:00Z', updated_at: '2026-01-22T15:00:00Z' },
  { id: 'dr-028', project_id: 'proj-007', department: 'Linking', received_quantity: 3830, produced_quantity: 3780, rejected_quantity: 40, damaged_quantity: 15, remaining_quantity: 0, status: 'Completed', received_date: '2026-01-23', completed_date: '2026-02-01T14:00:00Z', remarks: '', created_by: 'user-link-001', created_at: '2026-01-23T09:00:00Z', updated_at: '2026-02-01T14:00:00Z' },
  { id: 'dr-029', project_id: 'proj-007', department: 'Trimming', received_quantity: 3725, produced_quantity: 1900, rejected_quantity: 30, damaged_quantity: 10, remaining_quantity: 1825, status: 'In Progress', received_date: '2026-02-02', completed_date: null, remarks: 'Trimming in progress', created_by: 'user-trim-001', created_at: '2026-02-02T09:00:00Z', updated_at: '2026-02-20T16:00:00Z' },
];

// ============================================================================
// DEMO TRANSFERS
// ============================================================================

export const DEMO_TRANSFERS: Transfer[] = [
  { id: 'tfr-001', project_id: 'proj-001', from_department: 'Sewing', to_department: 'Washing', quantity: 14200, rejected_quantity: 0, status: 'Pending', remarks: 'Awaiting washing confirmation', requested_by: 'user-sew-001', accepted_by: null, requested_at: '2026-02-20T16:30:00Z', accepted_at: null },
  { id: 'tfr-002', project_id: 'proj-002', from_department: 'Linking', to_department: 'Trimming', quantity: 4100, rejected_quantity: 0, status: 'Pending', remarks: '', requested_by: 'user-link-001', accepted_by: null, requested_at: '2026-02-20T15:00:00Z', accepted_at: null },
  { id: 'tfr-003', project_id: 'proj-007', from_department: 'Trimming', to_department: 'Sewing', quantity: 1900, rejected_quantity: 0, status: 'Pending', remarks: '', requested_by: 'user-trim-001', accepted_by: null, requested_at: '2026-02-20T14:00:00Z', accepted_at: null },
  { id: 'tfr-004', project_id: 'proj-004', from_department: 'Washing', to_department: 'Ironing', quantity: 5300, rejected_quantity: 0, status: 'Pending', remarks: 'Delayed — equipment maintenance', requested_by: 'user-wash-001', accepted_by: null, requested_at: '2026-02-20T10:00:00Z', accepted_at: null },
  { id: 'tfr-005', project_id: 'proj-001', from_department: 'Trimming', to_department: 'Sewing', quantity: 16880, rejected_quantity: 80, status: 'Completed', remarks: '', requested_by: 'user-trim-001', accepted_by: 'user-sew-001', requested_at: '2026-02-12T15:30:00Z', accepted_at: '2026-02-13T08:05:00Z' },
  { id: 'tfr-006', project_id: 'proj-001', from_department: 'Linking', to_department: 'Trimming', quantity: 17150, rejected_quantity: 120, status: 'Completed', remarks: '', requested_by: 'user-link-001', accepted_by: 'user-trim-001', requested_at: '2026-02-05T11:30:00Z', accepted_at: '2026-02-06T08:45:00Z' },
  { id: 'tfr-007', project_id: 'proj-001', from_department: 'Knitting', to_department: 'Linking', quantity: 17600, rejected_quantity: 250, status: 'Completed', remarks: '', requested_by: 'user-knit-001', accepted_by: 'user-link-001', requested_at: '2026-01-25T14:45:00Z', accepted_at: '2026-01-26T08:20:00Z' },
  { id: 'tfr-008', project_id: 'proj-002', from_department: 'Knitting', to_department: 'Linking', quantity: 8300, rejected_quantity: 100, status: 'Completed', remarks: '', requested_by: 'user-knit-001', accepted_by: 'user-link-001', requested_at: '2026-01-22T10:30:00Z', accepted_at: '2026-01-23T09:00:00Z' },
];

// ============================================================================
// DEMO ACTIVITY LOGS
// ============================================================================

export const DEMO_ACTIVITY_LOGS: ActivityLog[] = [
  { id: 'al-001', project_id: 'proj-001', entity_type: 'production', entity_id: 'dr-005', action: 'production_update', description: 'Sewing APM updated production: 14,200 sewn, 180 rejected, 55 damaged', user_id: 'user-sew-001', old_value: null, new_value: null, created_at: '2026-02-20T16:00:00Z' },
  { id: 'al-002', project_id: 'proj-001', entity_type: 'transfer', entity_id: 'tfr-001', action: 'transfer_created', description: 'Transfer request created: 14,200 pcs from Sewing to Washing', user_id: 'user-sew-001', old_value: null, new_value: 'Pending', created_at: '2026-02-20T16:30:00Z' },
  { id: 'al-003', project_id: 'proj-004', entity_type: 'project', entity_id: 'proj-004', action: 'status_changed', description: 'Project AE-2026-004 marked as Delayed due to washing machine maintenance', user_id: 'user-wash-001', old_value: 'In Production', new_value: 'Delayed', created_at: '2026-02-20T10:15:00Z' },
  { id: 'al-004', project_id: 'proj-002', entity_type: 'transfer', entity_id: 'tfr-002', action: 'transfer_created', description: 'Transfer request created: 4,100 pcs from Linking to Trimming', user_id: 'user-link-001', old_value: null, new_value: 'Pending', created_at: '2026-02-20T15:00:00Z' },
  { id: 'al-005', project_id: 'proj-007', entity_type: 'production', entity_id: 'dr-029', action: 'production_update', description: 'Trimming APM updated production: 1,900 trimmed, 30 rejected, 10 damaged', user_id: 'user-trim-001', old_value: null, new_value: null, created_at: '2026-02-20T14:00:00Z' },
  { id: 'al-006', project_id: 'proj-003', entity_type: 'production', entity_id: 'dr-010', action: 'production_update', description: 'Knitting APM updated production: 12,500 knitted, 200 rejected, 50 damaged', user_id: 'user-knit-001', old_value: null, new_value: null, created_at: '2026-02-19T16:30:00Z' },
  { id: 'al-007', project_id: 'proj-002', entity_type: 'production', entity_id: 'dr-008', action: 'production_update', description: 'Linking APM updated production: 4,100 linked, 40 rejected, 20 damaged', user_id: 'user-link-001', old_value: null, new_value: null, created_at: '2026-02-18T15:00:00Z' },
  { id: 'al-008', project_id: 'proj-006', entity_type: 'yarn', entity_id: null, action: 'yarn_requested', description: 'New yarn request submitted for AE-2026-006: 15,000 kg Superfine Merino', user_id: 'user-merc-001', old_value: null, new_value: 'Pending', created_at: '2026-01-20T09:00:00Z' },
  { id: 'al-009', project_id: 'proj-001', entity_type: 'project', entity_id: 'proj-001', action: 'created', description: 'Project AE-2026-001 created by Merchandiser for Milano Fashion Group', user_id: 'user-merc-001', old_value: null, new_value: null, created_at: '2026-01-10T09:00:00Z' },
  { id: 'al-010', project_id: 'proj-005', entity_type: 'project', entity_id: 'proj-005', action: 'completed', description: 'Project AE-2026-005 (Alpaca Knit Vest) completed and moved to finished goods inventory', user_id: 'user-inv-001', old_value: 'In Production', new_value: 'Completed', created_at: '2026-01-15T10:00:00Z' },
  { id: 'al-011', project_id: 'proj-001', entity_type: 'transfer', entity_id: 'tfr-005', action: 'transfer_accepted', description: 'Transfer accepted: 16,880 pcs from Trimming to Sewing', user_id: 'user-sew-001', old_value: 'Pending', new_value: 'Completed', created_at: '2026-02-13T08:05:00Z' },
  { id: 'al-012', project_id: 'proj-004', entity_type: 'transfer', entity_id: 'tfr-004', action: 'transfer_created', description: 'Transfer request created: 5,300 pcs from Washing to Ironing', user_id: 'user-wash-001', old_value: null, new_value: 'Pending', created_at: '2026-02-20T10:00:00Z' },
];

// ============================================================================
// DEMO NOTIFICATIONS
// ============================================================================

export const DEMO_NOTIFICATIONS: Notification[] = [
  { id: 'notif-001', user_id: 'user-dir-001', title: 'Production Delay Alert', message: 'Project AE-2026-004 is 12 days behind schedule. Washing department needs immediate attention.', type: 'warning', is_read: false, link: '/dashboard/merchandiser/projects/proj-004', created_at: '2026-02-20T08:00:00Z' },
  { id: 'notif-002', user_id: 'user-dir-001', title: 'Transfer Pending Approval', message: '4 transfer requests are awaiting acceptance across departments.', type: 'info', is_read: false, link: '/dashboard/director/transfers', created_at: '2026-02-20T07:30:00Z' },
  { id: 'notif-003', user_id: 'user-yarn-001', title: 'New Yarn Request', message: 'Merchandiser submitted yarn request for AE-2026-006 (15,000 kg Superfine Merino)', type: 'info', is_read: false, link: '/dashboard/yarn-manager', created_at: '2026-01-20T09:00:00Z' },
  { id: 'notif-004', user_id: 'user-sew-001', title: 'New Transfer Incoming', message: 'Project AE-2026-001: 14,200 pcs ready for transfer from Sewing to Washing', type: 'info', is_read: false, link: '/dashboard/production-apm/sewing', created_at: '2026-02-20T16:30:00Z' },
  { id: 'notif-005', user_id: 'user-merc-001', title: 'Project Delayed', message: 'Project AE-2026-004 status changed to Delayed. New expected completion: April 10, 2026.', type: 'error', is_read: false, link: '/dashboard/merchandiser/projects/proj-004', created_at: '2026-02-20T10:15:00Z' },
  { id: 'notif-006', user_id: 'user-link-001', title: 'Transfer Created', message: 'Transfer request for AE-2026-002: 4,100 pcs from Linking to Trimming', type: 'info', is_read: true, link: '/dashboard/linking-apm', created_at: '2026-02-20T15:00:00Z' },
  { id: 'notif-007', user_id: 'user-admin-001', title: 'User Login', message: 'New login detected from new device for user admin@alaminexport.com', type: 'info', is_read: true, link: null, created_at: '2026-02-19T09:00:00Z' },
];

// ============================================================================
// DEMO USERS
// ============================================================================

export const DEMO_USERS = [
  { id: 'user-dir-001', full_name: 'Kamal Hossain', email: 'director@alaminexport.com', role: 'Director', department: null, designation: 'Managing Director', status: 'active' },
  { id: 'user-admin-001', full_name: 'Rahim Uddin', email: 'admin@alaminexport.com', role: 'Admin', department: null, designation: 'System Administrator', status: 'active' },
  { id: 'user-merc-001', full_name: 'Fatima Begum', email: 'merchandiser@alaminexport.com', role: 'Merchandiser', department: null, designation: 'Senior Merchandiser', status: 'active' },
  { id: 'user-yarn-001', full_name: 'Abdul Karim', email: 'yarn@alaminexport.com', role: 'Yarn Manager', department: 'Yarn', designation: 'Yarn Manager', status: 'active' },
  { id: 'user-knit-001', full_name: 'Mohammed Hasan', email: 'knitting.pm@alaminexport.com', role: 'Knitting PM', department: 'Knitting', designation: 'Production Manager', status: 'active' },
  { id: 'user-link-001', full_name: 'Nur Islam', email: 'linking.pm@alaminexport.com', role: 'Linking PM', department: 'Linking', designation: 'Production Manager', status: 'active' },
  { id: 'user-trim-001', full_name: 'Sohan Ali', email: 'trimming.pm@alaminexport.com', role: 'Cutting & Trimming PM', department: 'Trimming', designation: 'Production Manager', status: 'active' },
  { id: 'user-sew-001', full_name: 'Jahid Hasan', email: 'sewing.pm@alaminexport.com', role: 'Production PM', department: 'Sewing', designation: 'Production Manager', status: 'active' },
  { id: 'user-wash-001', full_name: 'Ripon Mia', email: 'washing.pm@alaminexport.com', role: 'Production PM', department: 'Washing', designation: 'Production Manager', status: 'active' },
  { id: 'user-iron-001', full_name: 'Alamgir Hossain', email: 'ironing.pm@alaminexport.com', role: 'Production PM', department: 'Ironing', designation: 'Production Manager', status: 'active' },
  { id: 'user-pack-001', full_name: 'Shorif Uddin', email: 'packing.pm@alaminexport.com', role: 'Production PM', department: 'Packaging', designation: 'Production Manager', status: 'active' },
  { id: 'user-inv-001', full_name: 'Nazma Khatun', email: 'inventory@alaminexport.com', role: 'Inventory & Store Manager', department: 'Inventory', designation: 'Inventory Manager', status: 'active' },
];

// ============================================================================
// COMPUTED DERIVED DATA
// ============================================================================

export function getDepartmentProgressPercentages(): Record<Department, number> {
  const totals: Record<string, { produced: number; received: number }> = {};
  for (const rec of DEMO_DEPARTMENT_RECORDS) {
    if (!totals[rec.department]) totals[rec.department] = { produced: 0, received: 0 };
    totals[rec.department].produced += rec.produced_quantity;
    totals[rec.department].received += rec.received_quantity;
  }

  const result: Record<string, number> = {};
  for (const dept of PRODUCTION_ORDER) {
    const t = totals[dept];
    result[dept] = t && t.received > 0 ? Math.round((t.produced / t.received) * 100) : 0;
  }
  return result as Record<Department, number>;
}

export function getProjectProgress(projId: string): number {
  const records = DEMO_DEPARTMENT_RECORDS.filter(r => r.project_id === projId);
  if (records.length === 0) return 0;

  const totalDepts = PRODUCTION_ORDER.length;
  const completedCount = records.filter(r => r.status === 'Completed').length;
  const inProgressRecords = records.filter(r => r.status === 'In Progress');

  let progress = (completedCount / totalDepts) * 100;

  if (inProgressRecords.length > 0) {
    const last = inProgressRecords[inProgressRecords.length - 1];
    const deptProgress = last.received_quantity > 0
      ? (last.produced_quantity / last.received_quantity) * (1 / totalDepts) * 100
      : 0;
    progress += deptProgress;
  }

  return Math.min(100, Math.round(progress));
}
