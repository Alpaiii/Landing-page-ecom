import type { Product } from '../data/products';
import { supabase } from '../lib/supabase';

// Map database product to frontend Product type
export function mapApiProduct(apiProduct: any): Product {
  // Determine badge
  let badge: Product['badge'] = undefined;
  if (!apiProduct.stock || apiProduct.stock === 0) {
    badge = 'Sold Out';
  } else if (apiProduct.is_new) {
    badge = 'New';
  } else if (apiProduct.is_featured) {
    badge = 'Best Seller';
  } else if (apiProduct.compare_price && apiProduct.compare_price > apiProduct.price) {
    badge = 'Sale';
  }

  // Map images (already in correct format from database)
  const images = (apiProduct.images || []).map((img: string, index: number) => ({
    src: img,
    alt: `${apiProduct.name} - Image ${index + 1}`
  }));

  // Map colors - handle both string array and object array
  const colors = (apiProduct.colors || []).map((color: string | any) => {
    if (typeof color === 'string') {
      return {
        name: color,
        hex: getColorHex(color)
      };
    }
    return color;
  });

  // Map sizes - handle both string array and object array
  const sizes = (apiProduct.sizes || []).map((size: string | any) => {
    if (typeof size === 'string') {
      return {
        name: size,
        available: true
      };
    }
    return size;
  });

  return {
    id: apiProduct.id,
    name: apiProduct.name,
    slug: apiProduct.slug,
    price: apiProduct.price,
    compareAtPrice: apiProduct.compare_price || undefined,
    category: mapCategory(apiProduct.category),
    subcategory: apiProduct.subcategory || undefined,
    badge,
    images,
    thumbnail: images[0]?.src || '/images/placeholder.jpg',
    colors,
    sizes,
    description: apiProduct.description || '',
    shortDescription: apiProduct.description?.slice(0, 150) || '',
    rating: 4.5, // Default rating, update when you have reviews
    reviewCount: 0, // Default, update when you have reviews
    inStock: apiProduct.stock > 0,
    stockCount: apiProduct.stock,
    tags: apiProduct.tags || [],
    featured: apiProduct.is_featured || false,
    newArrival: apiProduct.is_new || false
  };
}

// Map database category to frontend category
function mapCategory(category: string): Product['category'] {
  const categoryMap: Record<string, Product['category']> = {
    'Clothing': 'women',
    'Footwear': 'unisex',
    'Accessories': 'accessories',
    'Bags': 'accessories'
  };
  
  return categoryMap[category] || 'accessories';
}

// Simple color name to hex mapping
function getColorHex(colorName: string): string {
  const colorMap: Record<string, string> = {
    'Black': '#000000',
    'White': '#FFFFFF',
    'Red': '#FF0000',
    'Blue': '#0000FF',
    'Navy': '#000080',
    'Green': '#008000',
    'Yellow': '#FFFF00',
    'Orange': '#FFA500',
    'Pink': '#FFC0CB',
    'Purple': '#800080',
    'Brown': '#A52A2A',
    'Gray': '#808080',
    'Grey': '#808080',
    'Beige': '#F5F5DC',
    'Cream': '#FFFDD0',
    'Natural': '#F5F5DC',
    'Tan': '#D2B48C',
    'Khaki': '#C3B091',
    'Olive': '#808000',
    'Sage': '#9DC183',
    'Charcoal': '#36454F',
    'Burgundy': '#800020'
  };
  
  return colorMap[colorName] || '#CCCCCC';
}

// Fetch products from Supabase
export async function fetchProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }
    
    return (data || []).map(mapApiProduct);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Fetch single product by slug
export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) {
      console.error('Error fetching product:', error);
      return null;
    }
    
    return data ? mapApiProduct(data) : null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Fetch products by category
export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }
    
    return (data || []).map(mapApiProduct);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}

// Search products
export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,tags.cs.{${query}}`)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error searching products:', error);
      return [];
    }
    
    return (data || []).map(mapApiProduct);
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}
