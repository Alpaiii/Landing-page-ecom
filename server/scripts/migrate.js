import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function migrate() {
  const client = await pool.connect();
  
  try {
    console.log('🔄 Starting migration...');
    
    // Enable pgcrypto for gen_random_uuid()
    await client.query(`
      CREATE EXTENSION IF NOT EXISTS pgcrypto;
    `);
    console.log('✅ pgcrypto extension enabled');
    
    // Create update_updated_at_column function
    await client.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);
    console.log('✅ update_updated_at_column function created');
    
    // Create all tables
    await client.query(`
      -- Products table
      CREATE TABLE IF NOT EXISTS products (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        compare_price DECIMAL(10, 2),
        category VARCHAR(100) NOT NULL,
        subcategory VARCHAR(100),
        images JSONB DEFAULT '[]'::jsonb,
        colors JSONB DEFAULT '[]'::jsonb,
        sizes JSONB DEFAULT '[]'::jsonb,
        tags JSONB DEFAULT '[]'::jsonb,
        stock INTEGER DEFAULT 0,
        is_featured BOOLEAN DEFAULT false,
        is_new BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Admins table
      CREATE TABLE IF NOT EXISTS admins (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Categories table
      CREATE TABLE IF NOT EXISTS categories (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        slug VARCHAR(100) UNIQUE NOT NULL,
        parent_id UUID REFERENCES categories(id),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Collections table
      CREATE TABLE IF NOT EXISTS collections (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        short_description TEXT,
        image VARCHAR(500),
        image_hover VARCHAR(500),
        season VARCHAR(50),
        year INTEGER,
        is_featured BOOLEAN DEFAULT false,
        display_order INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Product-Collections junction table
      CREATE TABLE IF NOT EXISTS product_collections (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        product_id UUID REFERENCES products(id) ON DELETE CASCADE,
        collection_id UUID REFERENCES collections(id) ON DELETE CASCADE,
        display_order INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        UNIQUE(product_id, collection_id)
      );

      -- Customers table
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Customer addresses table
      CREATE TABLE IF NOT EXISTS customer_addresses (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
        label VARCHAR(50),
        full_name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        address_line1 VARCHAR(255) NOT NULL,
        address_line2 VARCHAR(255),
        city VARCHAR(100) NOT NULL,
        province VARCHAR(100) NOT NULL,
        postal_code VARCHAR(20) NOT NULL,
        country VARCHAR(100) DEFAULT 'Indonesia',
        is_default BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Orders table
      CREATE TABLE IF NOT EXISTS orders (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
        customer_email VARCHAR(255) NOT NULL,
        customer_name VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(50) NOT NULL,
        shipping_address JSONB NOT NULL,
        shipping_method VARCHAR(50) NOT NULL,
        shipping_cost DECIMAL(10, 2) DEFAULT 0,
        items JSONB NOT NULL,
        subtotal DECIMAL(10, 2) NOT NULL,
        discount DECIMAL(10, 2) DEFAULT 0,
        discount_code VARCHAR(50),
        total_amount DECIMAL(10, 2) NOT NULL,
        payment_method VARCHAR(100) NOT NULL,
        payment_status VARCHAR(50) DEFAULT 'pending',
        status VARCHAR(50) DEFAULT 'pending',
        tracking_number VARCHAR(255),
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Order status history
      CREATE TABLE IF NOT EXISTS order_status_history (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
        status VARCHAR(50) NOT NULL,
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Reviews table
      CREATE TABLE IF NOT EXISTS reviews (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        product_id UUID REFERENCES products(id) ON DELETE CASCADE,
        customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
        customer_name VARCHAR(255) NOT NULL,
        order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        title VARCHAR(255),
        comment TEXT,
        is_verified BOOLEAN DEFAULT false,
        is_approved BOOLEAN DEFAULT true,
        helpful_count INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Coupons table
      CREATE TABLE IF NOT EXISTS coupons (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        code VARCHAR(50) UNIQUE NOT NULL,
        description TEXT,
        discount_type VARCHAR(20) NOT NULL,
        discount_value DECIMAL(10, 2) NOT NULL,
        min_purchase DECIMAL(10, 2) DEFAULT 0,
        max_discount DECIMAL(10, 2),
        usage_limit INTEGER,
        usage_count INTEGER DEFAULT 0,
        per_customer_limit INTEGER DEFAULT 1,
        valid_from TIMESTAMP WITH TIME ZONE,
        valid_until TIMESTAMP WITH TIME ZONE,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Coupon usage tracking
      CREATE TABLE IF NOT EXISTS coupon_usage (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        coupon_id UUID REFERENCES coupons(id) ON DELETE CASCADE,
        customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
        order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
        discount_amount DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Wishlist table
      CREATE TABLE IF NOT EXISTS wishlist (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
        product_id UUID REFERENCES products(id) ON DELETE CASCADE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        UNIQUE(customer_id, product_id)
      );

      -- Login rate limiting (shared across replicas)
      CREATE TABLE IF NOT EXISTS login_attempts (
        key TEXT PRIMARY KEY,
        count INTEGER NOT NULL DEFAULT 0,
        reset_at TIMESTAMP WITH TIME ZONE NOT NULL
      );
    `);
    console.log('✅ All tables created');
    
    // Create indexes
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
      CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
      CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
      CREATE INDEX IF NOT EXISTS idx_products_new ON products(is_new);
      CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);
      CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
      CREATE INDEX IF NOT EXISTS idx_collections_slug ON collections(slug);
      CREATE INDEX IF NOT EXISTS idx_collections_featured ON collections(is_featured);
      CREATE INDEX IF NOT EXISTS idx_product_collections_product ON product_collections(product_id);
      CREATE INDEX IF NOT EXISTS idx_product_collections_collection ON product_collections(collection_id);
      CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
      CREATE INDEX IF NOT EXISTS idx_customer_addresses_customer ON customer_addresses(customer_id);
      CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id);
      CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
      CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);
      CREATE INDEX IF NOT EXISTS idx_reviews_customer ON reviews(customer_id);
      CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);
      CREATE INDEX IF NOT EXISTS idx_wishlist_customer ON wishlist(customer_id);
      CREATE INDEX IF NOT EXISTS idx_login_attempts_reset ON login_attempts(reset_at);
    `);
    console.log('✅ All indexes created');
    
    // Create triggers for updated_at
    await client.query(`
      DROP TRIGGER IF EXISTS update_products_updated_at ON products;
      CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

      DROP TRIGGER IF EXISTS update_collections_updated_at ON collections;
      CREATE TRIGGER update_collections_updated_at BEFORE UPDATE ON collections
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

      DROP TRIGGER IF EXISTS update_customers_updated_at ON customers;
      CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

      DROP TRIGGER IF EXISTS update_customer_addresses_updated_at ON customer_addresses;
      CREATE TRIGGER update_customer_addresses_updated_at BEFORE UPDATE ON customer_addresses
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

      DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
      CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

      DROP TRIGGER IF EXISTS update_reviews_updated_at ON reviews;
      CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

      DROP TRIGGER IF EXISTS update_coupons_updated_at ON coupons;
      CREATE TRIGGER update_coupons_updated_at BEFORE UPDATE ON coupons
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    `);
    console.log('✅ All triggers created');
    
    console.log('🎉 Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
