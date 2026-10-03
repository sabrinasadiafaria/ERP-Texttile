CREATE TABLE IF NOT EXISTS production_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  department TEXT NOT NULL,
  input_quantity NUMERIC DEFAULT 0,
  planned_quantity NUMERIC DEFAULT 0,
  produced_quantity NUMERIC DEFAULT 0,
  rejected_quantity NUMERIC DEFAULT 0,
  damaged_quantity NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'RECEIVED',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS production_transfers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  from_department TEXT NOT NULL,
  to_department TEXT NOT NULL,
  source_production_record UUID REFERENCES production_records(id) ON DELETE CASCADE,
  quantity NUMERIC NOT NULL,
  status TEXT DEFAULT 'PENDING',
  accepted_quantity NUMERIC,
  rejected_quantity NUMERIC,
  damaged_quantity NUMERIC,
  created_by UUID REFERENCES auth.users(id),
  accepted_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  accepted_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  remarks TEXT
);

ALTER TABLE production_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE production_transfers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read/write for authenticated users" ON production_records FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable read/write for authenticated users" ON production_transfers FOR ALL USING (auth.role() = 'authenticated');
