require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function resetProducts() {
  try {
    // Delete existing products
    console.log('Deleting existing products...');
    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .gte('created_at', '1970-01-01'); // Delete all
    
    if (deleteError) {
      console.error('Error deleting products:', deleteError);
      return;
    }
    
    console.log('Products deleted successfully');
    
    // Insert new products
    console.log('Inserting new products...');
    
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
    
    const { data, error } = await supabase
      .from('products')
      .insert(products)
      .select();
    
    if (error) {
      console.error('Error inserting products:', error);
      return;
    }
    
    console.log(`Successfully inserted ${data.length} products`);
    console.log('Products:', data.map(p => p.name));
    
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

resetProducts();
