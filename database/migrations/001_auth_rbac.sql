-- 001_auth_rbac.sql
-- Phase 1 (signup -> pending -> admin approval) and Phase 2 (RBAC).
-- Idempotent. Reuses the existing `profiles` and `role_permissions` tables.
-- Run in the Supabase SQL editor.

-- ---------------------------------------------------------------------------
-- 1. profiles: add missing columns, normalise status
-- ---------------------------------------------------------------------------
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS department TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS approved_by UUID;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS approved_at TIMESTAMPTZ;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS rejection_reason TEXT;

-- legacy rows: map old values onto the canonical status set
UPDATE profiles SET status = lower(status);
UPDATE profiles SET status = 'active' WHERE status NOT IN ('pending','active','rejected','inactive');
ALTER TABLE profiles ALTER COLUMN status SET DEFAULT 'pending';
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_status_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_status_check
  CHECK (status IN ('pending','active','rejected','inactive'));

-- canonical role names (one spelling everywhere)
UPDATE profiles SET role = 'Inventory & Store Manager' WHERE role = 'Inventory Manager';
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check CHECK (role IS NULL OR role IN (
  'Director','Admin','Merchandiser','Yarn Manager','Inventory & Store Manager',
  'Knitting PM','Knitting APM','Linking PM','Linking APM',
  'Cutting & Trimming PM','Cutting & Trimming APM',
  'Sewing PM','Sewing APM','Washing PM','Washing APM',
  'Ironing PM','Ironing APM','Packaging PM','Packaging APM'));

-- ---------------------------------------------------------------------------
-- 2. Signup trigger: every new auth user starts PENDING with NO role
--    (role and status can only be set by an admin afterwards)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, department, status)
  VALUES (NEW.id, NEW.email,
          COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
          NULL, NULL, 'pending')
  ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email, full_name = EXCLUDED.full_name;

  INSERT INTO public.notifications (user_id, title, message, type, link)
  SELECT p.id, 'New account awaiting approval',
         COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email) || ' signed up and needs approval.',
         'info', '/dashboard/admin/users'
  FROM public.profiles p WHERE p.role = 'Admin' AND p.status = 'active';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Prototype requirement: no email verification.
CREATE OR REPLACE FUNCTION public.auto_confirm_email() RETURNS TRIGGER AS $$
BEGIN NEW.email_confirmed_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
DROP TRIGGER IF EXISTS auto_confirm_email_trigger ON auth.users;
CREATE TRIGGER auto_confirm_email_trigger BEFORE INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.auto_confirm_email();

-- ---------------------------------------------------------------------------
-- 3. RBAC matrix: ROLE -> MODULE -> ACTION (single source of truth)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS rbac_permissions (
  role    TEXT NOT NULL,
  module  TEXT NOT NULL,
  action  TEXT NOT NULL CHECK (action IN
    ('view','create','update','delete','approve','reject','receive','issue','transfer','manage')),
  PRIMARY KEY (role, module, action)
);

-- Helpers used by RLS and RPC functions
CREATE OR REPLACE FUNCTION public.current_role_name() RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid() AND status = 'active';
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.has_permission(p_module TEXT, p_action TEXT) RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.rbac_permissions r
    JOIN public.profiles p ON p.role = r.role
    WHERE p.id = auth.uid() AND p.status = 'active'
      AND r.module = p_module AND (r.action = p_action OR r.action = 'manage')
  );
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Seed the matrix
TRUNCATE rbac_permissions;

-- Admin: manage everything
INSERT INTO rbac_permissions (role, module, action)
SELECT 'Admin', m, 'manage' FROM unnest(ARRAY[
  'users','roles','settings','activity','notifications','buyers','projects','bom','yarn_requests',
  'suppliers','yarn','purchase_orders','inventory','finished_goods','material',
  'knitting','linking','cutting_trimming','sewing','washing','ironing','packaging','transfers','dashboard'
]) m;

-- Director: monitor-only
INSERT INTO rbac_permissions (role, module, action)
SELECT 'Director', m, 'view' FROM unnest(ARRAY[
  'dashboard','activity','buyers','projects','bom','yarn_requests','suppliers','yarn',
  'purchase_orders','inventory','finished_goods','material','knitting','linking',
  'cutting_trimming','sewing','washing','ironing','packaging','transfers','notifications'
]) m;

-- Merchandiser
INSERT INTO rbac_permissions (role, module, action) VALUES
 ('Merchandiser','dashboard','view'),('Merchandiser','notifications','view'),
 ('Merchandiser','buyers','manage'),('Merchandiser','projects','manage'),('Merchandiser','bom','manage'),
 ('Merchandiser','yarn_requests','create'),('Merchandiser','yarn_requests','view'),
 ('Merchandiser','purchase_orders','view'),('Merchandiser','transfers','view'),('Merchandiser','activity','view');

-- Yarn Manager
INSERT INTO rbac_permissions (role, module, action) VALUES
 ('Yarn Manager','dashboard','view'),('Yarn Manager','notifications','view'),
 ('Yarn Manager','suppliers','manage'),('Yarn Manager','yarn','manage'),
 ('Yarn Manager','purchase_orders','manage'),
 ('Yarn Manager','yarn_requests','view'),('Yarn Manager','yarn_requests','approve'),
 ('Yarn Manager','yarn_requests','reject'),('Yarn Manager','yarn_requests','issue'),
 ('Yarn Manager','projects','view'),('Yarn Manager','activity','view');

-- Inventory & Store Manager
INSERT INTO rbac_permissions (role, module, action) VALUES
 ('Inventory & Store Manager','dashboard','view'),('Inventory & Store Manager','notifications','view'),
 ('Inventory & Store Manager','inventory','manage'),('Inventory & Store Manager','material','manage'),
 ('Inventory & Store Manager','finished_goods','manage'),
 ('Inventory & Store Manager','transfers','view'),('Inventory & Store Manager','transfers','receive'),
 ('Inventory & Store Manager','projects','view'),('Inventory & Store Manager','activity','view');

-- Production departments: PM and APM, scoped to OWN department only
DO $$
DECLARE d TEXT; dept TEXT[] := ARRAY['knitting','linking','cutting_trimming','sewing','washing','ironing','packaging'];
        nm TEXT[] := ARRAY['Knitting','Linking','Cutting & Trimming','Sewing','Washing','Ironing','Packaging'];
        i INT;
BEGIN
  FOR i IN 1..array_length(dept,1) LOOP
    d := dept[i];
    -- PM: plan/assign/approve/receive/transfer
    INSERT INTO rbac_permissions (role, module, action)
    SELECT nm[i] || ' PM', d, a FROM unnest(ARRAY['view','create','update','approve','reject','receive','transfer']) a;
    INSERT INTO rbac_permissions (role, module, action) VALUES
      (nm[i] || ' PM','dashboard','view'),(nm[i] || ' PM','notifications','view'),
      (nm[i] || ' PM','transfers','view'),(nm[i] || ' PM','transfers','receive'),
      (nm[i] || ' PM','transfers','transfer'),(nm[i] || ' PM','projects','view');
    -- APM: execute, record, complete, transfer
    INSERT INTO rbac_permissions (role, module, action)
    SELECT nm[i] || ' APM', d, a FROM unnest(ARRAY['view','update','transfer']) a;
    INSERT INTO rbac_permissions (role, module, action) VALUES
      (nm[i] || ' APM','dashboard','view'),(nm[i] || ' APM','notifications','view'),
      (nm[i] || ' APM','transfers','view'),(nm[i] || ' APM','transfers','transfer'),
      (nm[i] || ' APM','projects','view');
  END LOOP;
  -- Knitting additionally raises yarn requests against issued yarn
  INSERT INTO rbac_permissions (role, module, action) VALUES
    ('Knitting PM','yarn_requests','view'),('Knitting PM','yarn_requests','create'),
    ('Knitting APM','yarn_requests','view');
END $$;

-- ---------------------------------------------------------------------------
-- 4. RLS: replace the permissive USING(true) policies
-- ---------------------------------------------------------------------------
ALTER TABLE rbac_permissions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS rbac_read ON rbac_permissions;
CREATE POLICY rbac_read ON rbac_permissions FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS rbac_admin_write ON rbac_permissions;
CREATE POLICY rbac_admin_write ON rbac_permissions FOR ALL TO authenticated
  USING (public.has_permission('roles','manage')) WITH CHECK (public.has_permission('roles','manage'));

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can manage profiles" ON profiles;
DROP POLICY IF EXISTS profiles_self_read ON profiles;
DROP POLICY IF EXISTS profiles_admin_all ON profiles;
-- a user may always read their own row (needed to learn they are pending)
CREATE POLICY profiles_self_read ON profiles FOR SELECT TO authenticated USING (id = auth.uid());
-- admins read/write every row; nobody else can change role/status
CREATE POLICY profiles_admin_all ON profiles FOR ALL TO authenticated
  USING (public.has_permission('users','manage')) WITH CHECK (public.has_permission('users','manage'));
-- active users can read names of colleagues (assignment dropdowns, "created by")
DROP POLICY IF EXISTS profiles_active_read ON profiles;
CREATE POLICY profiles_active_read ON profiles FOR SELECT TO authenticated
  USING (public.current_role_name() IS NOT NULL);

-- ---------------------------------------------------------------------------
-- 5. Admin RPCs: approve / reject / activate / deactivate / change role
--    Each writes the activity log and notifies the user.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  action TEXT NOT NULL,
  module TEXT,
  entity_type TEXT,
  entity_id TEXT,
  description TEXT,
  project_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE activity_logs ADD COLUMN IF NOT EXISTS module TEXT;
ALTER TABLE activity_logs ADD COLUMN IF NOT EXISTS project_id UUID;
ALTER TABLE activity_logs ALTER COLUMN entity_id TYPE TEXT USING entity_id::TEXT;

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  type TEXT DEFAULT 'info',
  is_read BOOLEAN DEFAULT FALSE,
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION public.log_activity(
  p_action TEXT, p_module TEXT, p_entity_type TEXT, p_entity_id TEXT, p_description TEXT, p_project UUID DEFAULT NULL
) RETURNS VOID AS $$
  INSERT INTO public.activity_logs (user_id, action, module, entity_type, entity_id, description, project_id)
  VALUES (auth.uid(), p_action, p_module, p_entity_type, p_entity_id, p_description, p_project);
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.notify_role(p_role TEXT, p_title TEXT, p_message TEXT, p_link TEXT DEFAULT NULL)
RETURNS VOID AS $$
  INSERT INTO public.notifications (user_id, title, message, type, link)
  SELECT id, p_title, p_message, 'info', p_link FROM public.profiles WHERE role = p_role AND status = 'active';
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.admin_set_user(
  p_user UUID, p_status TEXT, p_role TEXT DEFAULT NULL, p_department TEXT DEFAULT NULL, p_reason TEXT DEFAULT NULL
) RETURNS VOID AS $$
DECLARE old_role TEXT; act TEXT;
BEGIN
  IF NOT public.has_permission('users','manage') THEN RAISE EXCEPTION 'Not authorised'; END IF;
  IF p_status NOT IN ('pending','active','rejected','inactive') THEN RAISE EXCEPTION 'Bad status'; END IF;
  IF p_status = 'active' AND p_role IS NULL AND (SELECT role FROM public.profiles WHERE id = p_user) IS NULL THEN
    RAISE EXCEPTION 'A role must be assigned before activating a user';
  END IF;
  IF p_status = 'rejected' AND COALESCE(p_reason,'') = '' THEN RAISE EXCEPTION 'Rejection reason required'; END IF;
  SELECT role INTO old_role FROM public.profiles WHERE id = p_user;
  UPDATE public.profiles SET
    status = p_status,
    role = COALESCE(p_role, role),
    department = COALESCE(p_department, department),
    rejection_reason = CASE WHEN p_status = 'rejected' THEN p_reason ELSE NULL END,
    approved_by = CASE WHEN p_status = 'active' THEN auth.uid() ELSE approved_by END,
    approved_at = CASE WHEN p_status = 'active' THEN NOW() ELSE approved_at END,
    updated_at = NOW()
  WHERE id = p_user;
  act := CASE p_status WHEN 'active' THEN 'APPROVE_USER' WHEN 'rejected' THEN 'REJECT_USER' ELSE 'UPDATE_USER' END;
  PERFORM public.log_activity(act, 'users', 'profile', p_user::TEXT, 'Status set to ' || p_status);
  IF p_role IS NOT NULL AND p_role IS DISTINCT FROM old_role THEN
    PERFORM public.log_activity('CHANGE_ROLE','users','profile',p_user::TEXT,
      'Role ' || COALESCE(old_role,'none') || ' -> ' || p_role);
  END IF;
  INSERT INTO public.notifications (user_id, title, message, type)
  VALUES (p_user, 'Account ' || p_status, 'Your account status is now ' || p_status, 'info');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- activity_logs / notifications RLS
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS activity_read ON activity_logs;
CREATE POLICY activity_read ON activity_logs FOR SELECT TO authenticated
  USING (public.has_permission('activity','view'));
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS notif_own_read ON notifications;
CREATE POLICY notif_own_read ON notifications FOR SELECT TO authenticated USING (user_id = auth.uid());
DROP POLICY IF EXISTS notif_own_update ON notifications;
CREATE POLICY notif_own_update ON notifications FOR UPDATE TO authenticated USING (user_id = auth.uid());

GRANT EXECUTE ON FUNCTION public.admin_set_user(UUID,TEXT,TEXT,TEXT,TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_permission(TEXT,TEXT) TO authenticated;
