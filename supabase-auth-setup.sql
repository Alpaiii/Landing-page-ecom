-- ==========================================
-- SUPABASE AUTH SETUP FOR ADMIN
-- Run this in Supabase SQL Editor
-- ==========================================

-- 1. Create admin_users table (separate from public admins table)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Users can read their own data
CREATE POLICY "Users can read own data"
  ON admin_users FOR SELECT
  USING (auth.uid() = id);

-- 4. Policy: Only authenticated users can see admin_users
CREATE POLICY "Authenticated users can read admin_users"
  ON admin_users FOR SELECT
  USING (auth.role() = 'authenticated');

-- 5. Create function to auto-create admin_users entry on signup
CREATE OR REPLACE FUNCTION public.handle_new_admin()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.admin_users (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Trigger to run after auth.users insert
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_admin();

-- 7. Update products policies to allow authenticated admin users
DROP POLICY IF EXISTS "Authenticated admins can insert products" ON products;
DROP POLICY IF EXISTS "Authenticated admins can update products" ON products;
DROP POLICY IF EXISTS "Authenticated admins can delete products" ON products;

CREATE POLICY "Authenticated admins can insert products"
  ON products FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Authenticated admins can update products"
  ON products FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Authenticated admins can delete products"
  ON products FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 8. Same for collections
DROP POLICY IF EXISTS "Authenticated admins can modify collections" ON collections;

CREATE POLICY "Authenticated admins can modify collections"
  ON collections FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 9. Same for product_collections
DROP POLICY IF EXISTS "Authenticated admins can modify product_collections" ON product_collections;

CREATE POLICY "Authenticated admins can modify product_collections"
  ON product_collections FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ==========================================
-- MANUAL STEP: Create First Admin User
-- ==========================================

-- Go to Supabase Dashboard -> Authentication -> Users
-- Click "Add User" (or "Invite User")
-- Email: admin@roquace.com
-- Password: (set strong password)
-- Click "Create User"

-- The trigger will automatically create entry in admin_users table

-- ==========================================
-- VERIFICATION
-- ==========================================

-- Check admin_users table exists
SELECT * FROM admin_users;

-- Test: After creating user in dashboard, you should see them here
