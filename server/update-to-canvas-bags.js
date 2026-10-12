require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function updateToCanvasBags() {
  try {
    console.log('Deleting old products...');
    
    // Delete all products
    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .gte('created_at', '1970-01-01');
    
    if (deleteError) {
      console.error('Error deleting products:', deleteError);
      return;
    }
    
    console.log('Inserting canvas bag products...');
    
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
    
    const { data, error } = await supabase
      .from('products')
      .insert(products)
      .select();
    
    if (error) {
      console.error('Error inserting products:', error);
      return;
    }
    
    console.log(`✓ Successfully inserted ${data.length} canvas bag products`);
    console.log('\nProducts:');
    data.forEach(p => console.log(`  - ${p.name}`));
    
    // Update collections
    console.log('\nUpdating collections...');
    
    const { data: collectionsData } = await supabase
      .from('collections')
      .select('id, slug');
    
    if (collectionsData) {
      // Delete old relationships
      await supabase.from('product_collections').delete().gte('created_at', '1970-01-01');
      
      const relationships = [];
      
      collectionsData.forEach(collection => {
        let filteredProducts = [];
        
        if (collection.slug === 'new-arrivals') {
          filteredProducts = data.filter(p => p.is_new);
        } else if (collection.slug === 'best-sellers') {
          filteredProducts = data.filter(p => p.is_featured);
        } else if (collection.slug === 'essentials') {
          filteredProducts = data.slice(0, 6); // First 6 bags
        } else if (collection.slug === 'autumn-2026') {
          filteredProducts = data.filter(p => p.is_featured);
        }
        
        filteredProducts.forEach((product, index) => {
          relationships.push({
            product_id: product.id,
            collection_id: collection.id,
            display_order: index + 1
          });
        });
      });
      
      if (relationships.length > 0) {
        await supabase.from('product_collections').insert(relationships);
        console.log(`✓ Updated ${relationships.length} collection relationships`);
      }
    }
    
    console.log('\n✓ All products updated to canvas bags!');
    
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

updateToCanvasBags();
