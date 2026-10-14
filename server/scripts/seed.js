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
    
    // Seed admin
    const adminPassword = await bcrypt.hash('admin123', 10);
    await client.query(`
      INSERT INTO admins (email, password_hash, name)
      VALUES ($1, $2, $3)
      ON CONFLICT (email) DO NOTHING
    `, ['admin@roquace.com', adminPassword, 'Admin Roquace']);
    console.log('✅ Admin seeded');
    
    // Seed products
    const products = [
      {
        name: 'Oversized Graphic Tee',
        slug: 'oversized-graphic-tee',
        description: 'Premium cotton oversized t-shirt with unique graphic print',
        price: 249000,
        compare_price: 349000,
        category: 'Clothing',
        subcategory: 'Tops',
        images: ['/images/products/1.webp'],
        colors: ['Black', 'White', 'Gray'],
        sizes: ['S', 'M', 'L', 'XL'],
        tags: ['tee', 'oversized', 'graphic'],
        stock: 45,
        is_featured: true,
        is_new: true
      },
      {
        name: 'Minimalist Hoodie',
        slug: 'minimalist-hoodie',
        description: 'Comfortable premium hoodie with clean minimalist design',
        price: 449000,
        compare_price: 599000,
        category: 'Clothing',
        subcategory: 'Tops',
        images: ['/images/products/2.webp'],
        colors: ['Black', 'Navy', 'Cream', 'Gray'],
        sizes: ['S', 'M', 'L', 'XL'],
        tags: ['hoodie', 'minimalist', 'cotton'],
        stock: 60,
        is_featured: true,
        is_new: true
      },
      {
        name: 'Wide Leg Cargo Pants',
        slug: 'wide-leg-cargo-pants',
        description: 'Relaxed fit cargo pants with multiple pockets',
        price: 389000,
        compare_price: 499000,
        category: 'Clothing',
        subcategory: 'Bottoms',
        images: ['/images/products/3.webp'],
        colors: ['Khaki', 'Black', 'Olive'],
        sizes: ['S', 'M', 'L', 'XL'],
        tags: ['cargo', 'pants', 'wide-leg'],
        stock: 50,
        is_featured: true,
        is_new: false
      },
      {
        name: 'Relaxed Fit Jeans',
        slug: 'relaxed-fit-jeans',
        description: 'Classic denim jeans with comfortable relaxed fit',
        price: 359000,
        compare_price: 459000,
        category: 'Clothing',
        subcategory: 'Bottoms',
        images: ['/images/products/4.webp'],
        colors: ['Dark Blue', 'Light Blue', 'Black'],
        sizes: ['28', '30', '32', '34', '36'],
        tags: ['jeans', 'denim', 'relaxed'],
        stock: 70,
        is_featured: false,
        is_new: false
      },
      {
        name: 'Linen Button Shirt',
        slug: 'linen-button-shirt',
        description: 'Breathable linen shirt perfect for summer',
        price: 299000,
        compare_price: 399000,
        category: 'Clothing',
        subcategory: 'Tops',
        images: ['/images/products/5.webp'],
        colors: ['White', 'Beige', 'Light Blue'],
        sizes: ['S', 'M', 'L', 'XL'],
        tags: ['shirt', 'linen', 'summer'],
        stock: 40,
        is_featured: true,
        is_new: false
      },
      {
        name: 'Varsity Bomber Jacket',
        slug: 'varsity-bomber-jacket',
        description: 'Vintage-inspired varsity jacket with embroidered details',
        price: 649000,
        compare_price: 799000,
        category: 'Clothing',
        subcategory: 'Outerwear',
        images: ['/images/products/6.webp'],
        colors: ['Black/White', 'Navy/Cream'],
        sizes: ['S', 'M', 'L', 'XL'],
        tags: ['jacket', 'bomber', 'varsity'],
        stock: 30,
        is_featured: true,
        is_new: true
      },
      {
        name: 'Canvas Tote Bag',
        slug: 'canvas-tote-bag',
        description: 'Spacious canvas tote bag with leather handles',
        price: 179000,
        compare_price: 249000,
        category: 'Accessories',
        subcategory: 'Bags',
        images: ['/images/products/7.webp'],
        colors: ['Natural', 'Black', 'Navy'],
        sizes: ['One Size'],
        tags: ['bag', 'tote', 'canvas'],
        stock: 80,
        is_featured: false,
        is_new: false
      },
      {
        name: 'Minimalist Backpack',
        slug: 'minimalist-backpack',
        description: 'Water-resistant backpack with laptop compartment',
        price: 499000,
        compare_price: 649000,
        category: 'Accessories',
        subcategory: 'Bags',
        images: ['/images/products/8.webp'],
        colors: ['Black', 'Gray', 'Navy'],
        sizes: ['One Size'],
        tags: ['backpack', 'minimalist', 'laptop'],
        stock: 55,
        is_featured: true,
        is_new: false
      },
      {
        name: 'Classic White Sneakers',
        slug: 'classic-white-sneakers',
        description: 'Premium leather sneakers with iconic silhouette',
        price: 549000,
        compare_price: 699000,
        category: 'Footwear',
        subcategory: 'Sneakers',
        images: ['/images/products/9.webp'],
        colors: ['White', 'White/Black'],
        sizes: ['39', '40', '41', '42', '43', '44'],
        tags: ['sneakers', 'leather', 'classic'],
        stock: 65,
        is_featured: true,
        is_new: true
      },
      {
        name: 'Chunky Dad Sneakers',
        slug: 'chunky-dad-sneakers',
        description: 'Retro-inspired chunky sneakers with bold design',
        price: 599000,
        compare_price: 749000,
        category: 'Footwear',
        subcategory: 'Sneakers',
        images: ['/images/products/10.webp'],
        colors: ['White/Gray', 'Black/Red'],
        sizes: ['39', '40', '41', '42', '43', '44'],
        tags: ['sneakers', 'chunky', 'retro'],
        stock: 50,
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
