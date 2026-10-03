CREATE TABLE IF NOT EXISTS yarn_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  bom_id UUID REFERENCES bill_of_materials(id) ON DELETE CASCADE,
  yarn_type TEXT,
  requested_quantity NUMERIC NOT NULL,
  approved_quantity NUMERIC DEFAULT 0,
  rejected_quantity NUMERIC DEFAULT 0,
  issued_quantity NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'PENDING',
  requested_by UUID REFERENCES auth.users(id),
  approved_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  approved_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  remarks TEXT
);

-- RLS
ALTER TABLE yarn_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read/write for authenticated users" ON yarn_requests FOR ALL USING (auth.role() = 'authenticated');
