import pg from 'pg';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function seed() {
  const client = await pool.connect();
  
  try {
    console.log('🌱 Starting seed...');
    
    // Seed admin. Password dikontrol lewat env var ADMIN_PASSWORD (Railway).
    // Jika diset, password selalu disinkronkan setiap deploy. Jika tidak (dev lokal),
    // pakai default dan tidak menimpa password yang sudah ada.
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const adminPasswordHash = await bcrypt.hash(adminPassword, 10);
    if (process.env.ADMIN_PASSWORD) {
      await client.query(`
        INSERT INTO admins (email, password_hash, name)
        VALUES ($1, $2, $3)
        ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash
      `, ['admin@roquace.com', adminPasswordHash, 'Admin Roquace']);
    } else {
      await client.query(`
        INSERT INTO admins (email, password_hash, name)
        VALUES ($1, $2, $3)
        ON CONFLICT (email) DO NOTHING
      `, ['admin@roquace.com', adminPasswordHash, 'Admin Roquace']);
    }
    console.log('✅ Admin seeded');
    
    // Seed products (canvas bags)
    const products = [
      {
        name: 'Classic Canvas Tote',
        slug: 'classic-canvas-tote',
        description: 'Timeless canvas tote bag with sturdy construction. Perfect for daily use, shopping, or beach trips.',
        price: 179000,
        compare_price: 249000,
        category: 'Accessories',
        subcategory: 'Bags',
        images: ['/images/products/1.webp'],
        colors: ['Natural', 'Black', 'Navy'],
        sizes: ['One Size'],
        tags: ['tote', 'canvas', 'classic'],
        stock: 50,
        is_featured: true,
        is_new: true
      },
      {
        name: 'Large Canvas Shopper',
        slug: 'large-canvas-shopper',
        description: 'Spacious canvas shopping bag with reinforced handles. Ideal for groceries and everyday essentials.',
        price: 199000,
        compare_price: 279000,
        category: 'Accessories',
        subcategory: 'Bags',
        images: ['/images/products/2.webp'],
        colors: ['Beige', 'Gray', 'Olive'],
        sizes: ['One Size'],
        tags: ['shopper', 'canvas', 'large'],
        stock: 45,
        is_featured: true,
        is_new: true
      },
      {
        name: 'Mini Canvas Crossbody',
        slug: 'mini-canvas-crossbody',
        description: 'Compact canvas crossbody bag with adjustable strap. Perfect for hands-free convenience.',
        price: 149000,
        compare_price: 199000,
        category: 'Accessories',
        subcategory: 'Bags',
        images: ['/images/products/3.webp'],
        colors: ['Black', 'Cream', 'Brown'],
        sizes: ['One Size'],
        tags: ['crossbody', 'canvas', 'mini'],
        stock: 60,
        is_featured: true,
        is_new: false
      },
      {
        name: 'Canvas Weekend Bag',
        slug: 'canvas-weekend-bag',
        description: 'Durable canvas weekend bag with leather trim. Great for short trips and gym sessions.',
        price: 349000,
        compare_price: 449000,
        category: 'Accessories',
        subcategory: 'Bags',
        images: ['/images/products/4.webp'],
        colors: ['Navy', 'Forest Green', 'Charcoal'],
        sizes: ['One Size'],
        tags: ['weekend', 'canvas', 'travel'],
        stock: 35,
        is_featured: false,
        is_new: false
      },
      {
        name: 'Striped Canvas Beach Bag',
        slug: 'striped-canvas-beach-bag',
        description: 'Breezy striped canvas bag perfect for beach days. Water-resistant lining included.',
        price: 229000,
        compare_price: 299000,
        category: 'Accessories',
        subcategory: 'Bags',
        images: ['/images/products/5.webp'],
        colors: ['Blue Stripe', 'Red Stripe', 'Black Stripe'],
        sizes: ['One Size'],
        tags: ['beach', 'canvas', 'striped'],
        stock: 40,
        is_featured: true,
        is_new: false
      },
      {
        name: 'Canvas Messenger Bag',
        slug: 'canvas-messenger-bag',
        description: 'Functional canvas messenger bag with multiple compartments. Ideal for work or school.',
        price: 279000,
        compare_price: 359000,
        category: 'Accessories',
        subcategory: 'Bags',
        images: ['/images/products/6.webp'],
        colors: ['Khaki', 'Black', 'Navy'],
        sizes: ['One Size'],
        tags: ['messenger', 'canvas', 'work'],
        stock: 55,
        is_featured: true,
        is_new: true
      },
      {
        name: 'Foldable Canvas Tote',
        slug: 'foldable-canvas-tote',
        description: 'Lightweight foldable canvas tote. Easy to pack and carry anywhere you go.',
        price: 129000,
        compare_price: 179000,
        category: 'Accessories',
        subcategory: 'Bags',
        images: ['/images/products/7.webp'],
        colors: ['Natural', 'Gray', 'Sage'],
        sizes: ['One Size'],
        tags: ['foldable', 'canvas', 'compact'],
        stock: 70,
        is_featured: false,
        is_new: false
      },
      {
        name: 'Canvas Laptop Tote',
        slug: 'canvas-laptop-tote',
        description: 'Professional canvas tote with padded laptop sleeve. Fits up to 15-inch laptops.',
        price: 319000,
        compare_price: 399000,
        category: 'Accessories',
        subcategory: 'Bags',
        images: ['/images/products/8.webp'],
        colors: ['Black', 'Gray', 'Navy'],
        sizes: ['One Size'],
        tags: ['laptop', 'canvas', 'professional'],
        stock: 45,
        is_featured: true,
        is_new: false
      },
      {
        name: 'Canvas Bucket Bag',
        slug: 'canvas-bucket-bag',
        description: 'Trendy canvas bucket bag with drawstring closure. Stylish and practical design.',
        price: 189000,
        compare_price: 249000,
        category: 'Accessories',
        subcategory: 'Bags',
        images: ['/images/products/9.webp'],
        colors: ['Tan', 'Black', 'Cream'],
        sizes: ['One Size'],
        tags: ['bucket', 'canvas', 'trendy'],
        stock: 50,
        is_featured: true,
        is_new: true
      },
      {
        name: 'Canvas Market Bag',
        slug: 'canvas-market-bag',
        description: 'Eco-friendly canvas market bag with wide opening. Perfect for farmers market visits.',
        price: 159000,
        compare_price: 219000,
        category: 'Accessories',
        subcategory: 'Bags',
        images: ['/images/products/10.webp'],
        colors: ['Natural', 'Navy', 'Burgundy'],
        sizes: ['One Size'],
        tags: ['market', 'canvas', 'eco-friendly'],
        stock: 60,
        is_featured: false,
        is_new: true
      }
    ];
    
    for (const product of products) {
      await client.query(`
        INSERT INTO products (name, slug, description, price, compare_price, category, subcategory, images, colors, sizes, tags, stock, is_featured, is_new)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        ON CONFLICT (slug) DO NOTHING
      `, [
        product.name,
        product.slug,
        product.description,
        product.price,
        product.compare_price,
        product.category,
        product.subcategory,
        JSON.stringify(product.images),
        JSON.stringify(product.colors),
        JSON.stringify(product.sizes),
        JSON.stringify(product.tags),
        product.stock,
        product.is_featured,
        product.is_new
      ]);
    }
    console.log('✅ Products seeded');
    
    // Seed categories
    const categories = [
      { name: 'Clothing', slug: 'clothing' },
      { name: 'Accessories', slug: 'accessories' },
      { name: 'Footwear', slug: 'footwear' }
    ];
    
    for (const category of categories) {
      await client.query(`
        INSERT INTO categories (name, slug)
        VALUES ($1, $2)
        ON CONFLICT (slug) DO NOTHING
      `, [category.name, category.slug]);
    }
    console.log('✅ Categories seeded');
    
    // Seed collections
    const collections = [
      {
        name: 'New Arrivals',
        slug: 'new-arrivals',
        description: 'The latest additions to our collection',
        short_description: 'Fresh styles just dropped',
        image: '/images/collections/new-arrivals.webp',
        season: 'Spring',
        year: 2026,
        is_featured: true,
        display_order: 1
      },
      {
        name: 'Best Sellers',
        slug: 'best-sellers',
        description: 'Our most popular pieces loved by customers',
        short_description: 'Customer favorites',
        image: '/images/collections/best-sellers.webp',
        is_featured: true,
        display_order: 2
      },
      {
        name: 'Essentials',
        slug: 'essentials',
        description: 'Timeless basics for everyday wear',
        short_description: 'Wardrobe staples',
        image: '/images/collections/essentials.webp',
        is_featured: false,
        display_order: 3
      }
    ];
    
    for (const collection of collections) {
      await client.query(`
        INSERT INTO collections (name, slug, description, short_description, image, season, year, is_featured, display_order)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (slug) DO NOTHING
      `, [
        collection.name,
        collection.slug,
        collection.description,
        collection.short_description,
        collection.image,
        collection.season || null,
        collection.year || null,
        collection.is_featured,
        collection.display_order
      ]);
    }
    console.log('✅ Collections seeded');
    
    // Seed coupons
    const coupons = [
      {
        code: 'WELCOME10',
        description: 'Welcome discount 10%',
        discount_type: 'percentage',
        discount_value: 10.00,
        min_purchase: 100000,
        max_discount: 50000,
        usage_limit: 100,
        valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      },
      {
        code: 'SAVE20',
        description: 'Save 20% on all bags',
        discount_type: 'percentage',
        discount_value: 20.00,
        min_purchase: 200000,
        max_discount: 100000,
        usage_limit: 50,
        valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      },
      {
        code: 'FREESHIP',
        description: 'Free shipping',
        discount_type: 'fixed',
        discount_value: 15000,
        min_purchase: 0,
        max_discount: null,
        usage_limit: 1000,
        valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      },
      {
        code: 'NEWYEAR2026',
        description: 'New Year special 25%',
        discount_type: 'percentage',
        discount_value: 25.00,
        min_purchase: 300000,
        max_discount: 150000,
        usage_limit: 200,
        valid_until: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
      },
      {
        code: 'FLAT50K',
        description: 'Flat Rp 50,000 off',
        discount_type: 'fixed',
        discount_value: 50000,
        min_purchase: 250000,
        max_discount: null,
        usage_limit: 150,
        valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      }
    ];
    
    for (const coupon of coupons) {
      await client.query(`
        INSERT INTO coupons (code, description, discount_type, discount_value, min_purchase, max_discount, usage_limit, valid_from, valid_until, is_active)
        VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), $8, true)
        ON CONFLICT (code) DO NOTHING
      `, [
        coupon.code,
        coupon.description,
        coupon.discount_type,
        coupon.discount_value,
        coupon.min_purchase,
        coupon.max_discount,
        coupon.usage_limit,
        coupon.valid_until
      ]);
    }
    console.log('✅ Coupons seeded');
    
    // Seed sample customers
    const customerPassword = await bcrypt.hash('password123', 10);
    const customers = [
      { email: 'john@example.com', name: 'John Doe', phone: '+6281234567890' },
      { email: 'jane@example.com', name: 'Jane Smith', phone: '+6281234567891' },
      { email: 'test@example.com', name: 'Test User', phone: '+6281234567892' }
    ];
    
    for (const customer of customers) {
      await client.query(`
        INSERT INTO customers (email, password_hash, name, phone)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (email) DO NOTHING
      `, [customer.email, customerPassword, customer.name, customer.phone]);
    }
    console.log('✅ Customers seeded');
    
    console.log('🎉 Seed completed successfully!');
  } catch (error) {
    console.error('❌ Seed failed:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
