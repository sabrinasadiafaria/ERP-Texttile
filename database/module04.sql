-- Inventory Categories
CREATE TABLE IF NOT EXISTS inventory_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Warehouse Structure
CREATE TABLE IF NOT EXISTS warehouse_zones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS warehouse_racks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  zone_id UUID REFERENCES warehouse_zones(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS warehouse_shelves (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rack_id UUID REFERENCES warehouse_racks(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS warehouse_bins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shelf_id UUID REFERENCES warehouse_shelves(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inventory Items (Master)
CREATE TABLE IF NOT EXISTS inventory_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_code TEXT NOT NULL UNIQUE,
  category_id UUID REFERENCES inventory_categories(id),
  name TEXT NOT NULL,
  description TEXT,
  unit TEXT NOT NULL,
  min_stock NUMERIC DEFAULT 0,
  max_stock NUMERIC,
  reorder_level NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inventory Batches (Tracks stock per item and location)
CREATE TABLE IF NOT EXISTS inventory_batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID REFERENCES inventory_items(id),
  batch_number TEXT NOT NULL,
  bin_id UUID REFERENCES warehouse_bins(id),
  quantity NUMERIC NOT NULL DEFAULT 0 CHECK (quantity >= 0),
  unit_price NUMERIC,
  supplier_id UUID REFERENCES suppliers(id), -- From Module-03
  expiry_date DATE,
  status TEXT DEFAULT 'Available',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Material Receipts (Inbound)
CREATE TABLE IF NOT EXISTS material_receipts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  receipt_number TEXT NOT NULL UNIQUE,
  po_id UUID REFERENCES purchase_orders(id), -- From Module-02
  supplier_id UUID REFERENCES suppliers(id),
  received_date DATE NOT NULL,
  remarks TEXT,
  status TEXT DEFAULT 'Pending Verification',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

CREATE TABLE IF NOT EXISTS material_receipt_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  receipt_id UUID REFERENCES material_receipts(id) ON DELETE CASCADE,
  item_id UUID REFERENCES inventory_items(id),
  batch_number TEXT,
  quantity NUMERIC NOT NULL,
  unit_price NUMERIC,
  bin_id UUID REFERENCES warehouse_bins(id)
);

-- Material Verifications (QA)
CREATE TABLE IF NOT EXISTS material_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  receipt_item_id UUID REFERENCES material_receipt_items(id) ON DELETE CASCADE,
  verified_quantity NUMERIC NOT NULL,
  rejected_quantity NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'Pending', -- Pending, Accepted, Rejected, Hold
  remarks TEXT,
  verified_by UUID REFERENCES auth.users(id),
  verified_at TIMESTAMPTZ
);

-- Material Requests
CREATE TABLE IF NOT EXISTS material_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_number TEXT NOT NULL UNIQUE,
  department TEXT NOT NULL,
  project_id UUID REFERENCES projects(id), -- From Module-02
  priority TEXT DEFAULT 'Normal',
  remarks TEXT,
  status TEXT DEFAULT 'Pending', -- Pending, Approved, Rejected, Completed
  requested_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS material_request_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID REFERENCES material_requests(id) ON DELETE CASCADE,
  item_id UUID REFERENCES inventory_items(id),
  quantity NUMERIC NOT NULL
);

-- Material Issue Notes (MIN)
CREATE TABLE IF NOT EXISTS material_issue_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  min_number TEXT NOT NULL UNIQUE,
  request_id UUID REFERENCES material_requests(id),
  department TEXT NOT NULL,
  project_id UUID REFERENCES projects(id),
  issue_date DATE NOT NULL,
  remarks TEXT,
  status TEXT DEFAULT 'Issued', -- Pending, Issued, Partially Issued
  issued_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS material_issue_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  min_id UUID REFERENCES material_issue_notes(id) ON DELETE CASCADE,
  item_id UUID REFERENCES inventory_items(id),
  batch_id UUID REFERENCES inventory_batches(id),
  quantity NUMERIC NOT NULL CHECK (quantity > 0)
);

-- Material Returns
CREATE TABLE IF NOT EXISTS material_returns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  return_number TEXT NOT NULL UNIQUE,
  department TEXT NOT NULL,
  item_id UUID REFERENCES inventory_items(id),
  batch_id UUID REFERENCES inventory_batches(id),
  quantity NUMERIC NOT NULL CHECK (quantity > 0),
  condition TEXT NOT NULL, -- Usable, Damaged
  return_reason TEXT,
  status TEXT DEFAULT 'Received',
  received_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Stock Adjustments
CREATE TABLE IF NOT EXISTS stock_adjustments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID REFERENCES inventory_batches(id),
  old_quantity NUMERIC NOT NULL,
  new_quantity NUMERIC NOT NULL,
  reason TEXT NOT NULL, -- Physical Count, Damage, Loss, Correction
  status TEXT DEFAULT 'Pending Approval', -- Pending Approval, Approved, Rejected
  requested_by UUID REFERENCES auth.users(id),
  approved_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Finished Goods
CREATE TABLE IF NOT EXISTS finished_goods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  total_quantity NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'Stored', -- Stored, Reserved, Ready For Shipment, Dispatched
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS finished_goods_cartons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  finished_goods_id UUID REFERENCES finished_goods(id) ON DELETE CASCADE,
  carton_number TEXT NOT NULL,
  quantity NUMERIC NOT NULL,
  bin_id UUID REFERENCES warehouse_bins(id),
  received_date DATE NOT NULL,
  shipment_status TEXT DEFAULT 'Stored'
);

-- Inventory Movements Ledger (Audit trail for general inventory)
CREATE TABLE IF NOT EXISTS inventory_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID REFERENCES inventory_batches(id),
  transaction_type TEXT NOT NULL, -- Receive, Issue, Return, Adjustment, Transfer
  quantity_change NUMERIC NOT NULL,
  reference_id UUID, -- Link to MIN, Receipt, etc.
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- RLS setup (Assuming we just enable it and allow all for this prototype, or specific policies)
-- To avoid complex policies blocking UI progress in prototype, we can use a simpler approach:

ALTER TABLE inventory_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE warehouse_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE warehouse_racks ENABLE ROW LEVEL SECURITY;
ALTER TABLE warehouse_shelves ENABLE ROW LEVEL SECURITY;
ALTER TABLE warehouse_bins ENABLE ROW LEVEL SECURITY;
ALTER TABLE material_receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE material_receipt_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE material_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE material_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE material_request_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE material_issue_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE material_issue_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE material_returns ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_adjustments ENABLE ROW LEVEL SECURITY;
ALTER TABLE finished_goods ENABLE ROW LEVEL SECURITY;
ALTER TABLE finished_goods_cartons ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_movements ENABLE ROW LEVEL SECURITY;

-- Creating permissive policies for Inventory & Store Manager or all authenticated users for now
-- Note: In a real app we'd join with profiles table, but for prototype we can allow auth.role() = 'authenticated'
CREATE POLICY "Enable read/write for authenticated users" ON inventory_categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable read/write for authenticated users" ON inventory_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable read/write for authenticated users" ON inventory_batches FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable read/write for authenticated users" ON warehouse_zones FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable read/write for authenticated users" ON warehouse_racks FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable read/write for authenticated users" ON warehouse_shelves FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable read/write for authenticated users" ON warehouse_bins FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable read/write for authenticated users" ON material_receipts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable read/write for authenticated users" ON material_receipt_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable read/write for authenticated users" ON material_verifications FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable read/write for authenticated users" ON material_requests FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable read/write for authenticated users" ON material_request_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable read/write for authenticated users" ON material_issue_notes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable read/write for authenticated users" ON material_issue_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable read/write for authenticated users" ON material_returns FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable read/write for authenticated users" ON stock_adjustments FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable read/write for authenticated users" ON finished_goods FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable read/write for authenticated users" ON finished_goods_cartons FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable read/write for authenticated users" ON inventory_movements FOR ALL USING (auth.role() = 'authenticated');
