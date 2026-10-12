require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function setupCollections() {
  try {
    console.log('Step 1: Please run collections-schema.sql in Supabase SQL Editor first.');
    console.log('Step 2: Then this script will insert data...\n');
    
    console.log('Inserting collections...');
    
    // Insert collections directly
    const collections = [
      {
        name: 'New Arrivals',
        slug: 'new-arrivals',
        description: 'Discover our latest additions to the collection. Fresh styles that define the season\'s aesthetic.',
        short_description: 'Fresh styles just dropped.',
        image: '/images/collections/new-arrivals.webp',
        image_hover: '/images/collections/new-arrivals-hover.webp',
        season: 'Autumn',
        year: 2026,
        is_featured: true,
        display_order: 1
      },
      {
        name: 'Best Sellers',
        slug: 'best-sellers',
        description: 'The pieces our customers love most. Tried, tested, and approved by the community.',
        short_description: 'Customer favorites you\'ll love.',
        image: '/images/collections/best-sellers.webp',
        image_hover: '/images/collections/best-sellers-hover.webp',
        season: null,
        year: null,
        is_featured: false,
        display_order: 2
      },
      {
        name: 'Essentials',
        slug: 'essentials',
        description: 'Timeless wardrobe staples designed for everyday wear. The foundation of any great outfit.',
        short_description: 'Wardrobe staples for every day.',
        image: '/images/collections/essentials.webp',
        image_hover: '/images/collections/essentials-hover.webp',
        season: null,
        year: null,
        is_featured: false,
        display_order: 3
      },
      {
        name: 'Autumn 2026',
        slug: 'autumn-2026',
        description: 'Our Autumn 2026 collection explores texture and layering. Warm tones meet minimalist silhouettes.',
        short_description: 'Warm tones, minimalist silhouettes.',
        image: '/images/collections/essentials.webp',
        image_hover: '/images/collections/essentials.webp',
        season: 'Autumn',
        year: 2026,
        is_featured: true,
        display_order: 4
      }
    ];
    
    const { data: collectionsData, error: insertError } = await supabase
      .from('collections')
      .insert(collections)
      .select();
    
    if (insertError) {
      console.error('Error inserting collections:', insertError);
      console.log('Please run collections-schema.sql manually in Supabase SQL Editor first.');
      return;
    }
    
    console.log(`✓ Inserted ${collectionsData.length} collections`);
    
    // Get all products
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, is_new, is_featured, category');
    
    if (productsError || !products) {
      console.error('Error fetching products:', productsError);
      return;
    }
    
    console.log(`Found ${products.length} products`);
    
    // Create product-collection relationships
    const relationships = [];
    
    collectionsData.forEach(collection => {
      let filteredProducts = [];
      
      if (collection.slug === 'new-arrivals') {
        filteredProducts = products.filter(p => p.is_new);
      } else if (collection.slug === 'best-sellers') {
        filteredProducts = products.filter(p => p.is_featured);
      } else if (collection.slug === 'essentials') {
        filteredProducts = products.filter(p => p.category === 'Clothing');
      } else if (collection.slug === 'autumn-2026') {
        filteredProducts = products.filter(p => p.is_featured);
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
      const { error: relError } = await supabase
        .from('product_collections')
        .insert(relationships);
      
      if (relError) {
        console.error('Error creating relationships:', relError);
      } else {
        console.log(`✓ Created ${relationships.length} product-collection relationships`);
      }
    }
    
    console.log('\n✓ Collections setup complete!');
    console.log('\nCollections summary:');
    collectionsData.forEach(c => {
      const count = relationships.filter(r => r.collection_id === c.id).length;
      console.log(`  - ${c.name}: ${count} products`);
    });
    
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

setupCollections();
