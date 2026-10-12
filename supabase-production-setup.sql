-- ==========================================
-- SUPABASE PRODUCTION SETUP - ROQUACE
-- Run this in Supabase SQL Editor
-- ==========================================

-- ==========================================
-- 1. ENABLE ROW LEVEL SECURITY (RLS)
-- ==========================================

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- 2. PRODUCTS TABLE POLICIES
-- ==========================================

-- Drop existing policies if any
DROP POLICY IF EXISTS "Anyone can read products" ON products;
DROP POLICY IF EXISTS "Only admins can insert products" ON products;
DROP POLICY IF EXISTS "Only admins can update products" ON products;
DROP POLICY IF EXISTS "Only admins can delete products" ON products;

-- Public read access (anyone can view products)
CREATE POLICY "Anyone can read products"
  ON products FOR SELECT
  USING (true);

-- Admin-only write access (using service role key)
CREATE POLICY "Service role can insert products"
  ON products FOR INSERT
  WITH CHECK (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Service role can update products"
  ON products FOR UPDATE
  USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Service role can delete products"
  ON products FOR DELETE
  USING (auth.jwt()->>'role' = 'service_role');

-- ==========================================
-- 3. COLLECTIONS TABLE POLICIES
-- ==========================================

DROP POLICY IF EXISTS "Anyone can read collections" ON collections;
DROP POLICY IF EXISTS "Service role can modify collections" ON collections;

-- Public read access
CREATE POLICY "Anyone can read collections"
  ON collections FOR SELECT
  USING (true);

-- Admin-only write access
CREATE POLICY "Service role can modify collections"
  ON collections FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

-- ==========================================
-- 4. PRODUCT_COLLECTIONS TABLE POLICIES
-- ==========================================

DROP POLICY IF EXISTS "Anyone can read product_collections" ON product_collections;
DROP POLICY IF EXISTS "Service role can modify product_collections" ON product_collections;

-- Public read access
CREATE POLICY "Anyone can read product_collections"
  ON product_collections FOR SELECT
  USING (true);

-- Admin-only write access
CREATE POLICY "Service role can modify product_collections"
  ON product_collections FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

-- ==========================================
-- 5. ADMINS TABLE POLICIES
-- ==========================================

DROP POLICY IF EXISTS "No public access to admins" ON admins;

-- No public access at all (only via service role key in backend)
CREATE POLICY "No public access to admins"
  ON admins FOR ALL
  USING (false);

-- ==========================================
-- 6. VERIFY INDEXES (Should already exist)
-- ==========================================

-- Check existing indexes
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_products_slug') THEN
    CREATE INDEX idx_products_slug ON products(slug);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_products_category') THEN
    CREATE INDEX idx_products_category ON products(category);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_products_featured') THEN
    CREATE INDEX idx_products_featured ON products(is_featured);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_products_new') THEN
    CREATE INDEX idx_products_new ON products(is_new);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_collections_slug') THEN
    CREATE INDEX idx_collections_slug ON collections(slug);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_collections_featured') THEN
    CREATE INDEX idx_collections_featured ON collections(is_featured);
  END IF;
END $$;

-- ==========================================
-- 7. ENABLE REALTIME (OPTIONAL)
-- ==========================================

-- Uncomment if you want real-time updates
-- ALTER PUBLICATION supabase_realtime ADD TABLE products;
-- ALTER PUBLICATION supabase_realtime ADD TABLE collections;

-- ==========================================
-- 8. CREATE STORAGE BUCKET (Run separately if needed)
-- ==========================================

-- NOTE: Storage buckets cannot be created via SQL
-- Create manually in Dashboard -> Storage -> New Bucket
-- Bucket name: product-images
-- Public: Yes
-- Then run these policies:

/*
-- Storage policies (run AFTER creating bucket in dashboard)
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Public read access
CREATE POLICY "Public read product images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

-- Service role upload only
CREATE POLICY "Service role upload product images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'product-images' AND auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Service role delete product images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'product-images' AND auth.jwt()->>'role' = 'service_role');
*/

-- ==========================================
-- 9. VERIFY SETUP
-- ==========================================

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('products', 'collections', 'product_collections', 'admins');

-- Check policies exist
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Check indexes
SELECT tablename, indexname, indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN ('products', 'collections', 'product_collections')
ORDER BY tablename, indexname;

-- ==========================================
-- 10. TEST QUERIES (Verify everything works)
-- ==========================================

-- Should return all products (public read allowed)
SELECT COUNT(*) as total_products FROM products;

-- Should return all collections (public read allowed)
SELECT COUNT(*) as total_collections FROM collections;

-- Should return product-collection relationships (public read allowed)
SELECT COUNT(*) as total_relationships FROM product_collections;

-- ==========================================
-- SETUP COMPLETE!
-- ==========================================

-- Next steps:
-- 1. Go to Dashboard -> Settings -> API
-- 2. Add CORS allowed origins: https://your-vercel-site.vercel.app
-- 3. Verify environment variables in Vercel match production Supabase
-- 4. Test frontend can read products
-- 5. Verify unauthorized writes are blocked

-- Admin access:
-- - Use SUPABASE_SERVICE_KEY for admin operations (server-side only)
-- - Never expose service key in frontend code
-- - All frontend operations use PUBLIC_SUPABASE_ANON_KEY (read-only)
