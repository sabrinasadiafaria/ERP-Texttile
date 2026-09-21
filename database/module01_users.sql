-- Module 01: Users and Permissions

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT,
  department TEXT,
  designation TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Role Permissions table
CREATE TABLE IF NOT EXISTS role_permissions (
  role TEXT PRIMARY KEY,
  dashboard BOOLEAN DEFAULT true,
  projects TEXT DEFAULT 'view',
  yarn TEXT DEFAULT 'view',
  inventory TEXT DEFAULT 'view',
  production TEXT DEFAULT 'view',
  reports TEXT DEFAULT 'view',
  admin TEXT DEFAULT 'none',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;

-- Disable RLS for prototype or allow anon so demo mode can edit/view
DROP POLICY IF EXISTS "Anyone can view role permissions" ON role_permissions;
CREATE POLICY "Anyone can view role permissions"
  ON role_permissions FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Admins can manage role permissions" ON role_permissions;
CREATE POLICY "Admins can manage role permissions"
  ON role_permissions FOR ALL
  USING (true);

DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Admins can manage profiles" ON profiles;
CREATE POLICY "Admins can manage profiles"
  ON profiles FOR ALL
  USING (true);

-- Insert initial roles
INSERT INTO role_permissions (role, dashboard, projects, yarn, inventory, production, reports, admin)
VALUES 
  ('Director', true, 'view', 'view', 'view', 'view', 'view', 'none'),
  ('Admin', true, 'view', 'view', 'view', 'view', 'view', 'full'),
  ('Merchandiser', true, 'full', 'view', 'view', 'none', 'view', 'none'),
  ('Yarn Manager', true, 'view', 'full', 'view', 'none', 'view', 'none'),
  ('Inventory Manager', true, 'view', 'view', 'full', 'none', 'view', 'none'),
  ('Production PM', true, 'view', 'none', 'none', 'manage', 'view', 'none'),
  ('Production APM', true, 'view', 'none', 'none', 'update', 'none', 'none')
ON CONFLICT (role) DO NOTHING;

-- ============================================================================
-- AUTH TRIGGER: Auto-create profile on signup
-- ============================================================================

-- Create a function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, status)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    'Pending', -- Default role until admin assigns one
    'active'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
