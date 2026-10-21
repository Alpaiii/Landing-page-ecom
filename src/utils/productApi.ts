import type { Product } from '../data/products';

const API_URL = import.meta.env.PUBLIC_API_URL || '/api';

/**
 * Resolve an API path.
 *
 * On the client a same-origin relative path is valid. During SSR Astro runs in
 * the same Node process as the Express API, so we call it over loopback.
 */
function apiUrl(path: string): string {
  if (typeof window !== 'undefined') return `${API_URL}${path}`;

  const base = process.env.INTERNAL_API_URL || `http://127.0.0.1:${process.env.PORT || 8000}`;
  return `${base}${API_URL}${path}`;
}

// Map database product to frontend Product type
export function mapApiProduct(apiProduct: any): Product {
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

  const images = (apiProduct.images || []).map((img: string, index: number) => ({
    src: img,
    alt: `${apiProduct.name} - Image ${index + 1}`
  }));

  const colors = (apiProduct.colors || []).map((color: string | any) => {
    if (typeof color === 'string') {
      return { name: color, hex: getColorHex(color) };
    }
    return color;
  });

  const sizes = (apiProduct.sizes || []).map((size: string | any) => {
    if (typeof size === 'string') {
      return { name: size, available: true };
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
    subcategory: deriveSubcategory(apiProduct),
    badge,
    images,
    thumbnail: images[0]?.src || '/images/placeholder.jpg',
    colors,
    sizes,
    description: apiProduct.description || '',
    shortDescription: apiProduct.description?.slice(0, 150) || '',
    rating: Number(apiProduct.rating) || 0,
    reviewCount: Number(apiProduct.review_count ?? apiProduct.reviewCount) || 0,
    inStock: apiProduct.stock > 0,
    stockCount: apiProduct.stock,
    tags: apiProduct.tags || [],
    featured: apiProduct.is_featured || false,
    newArrival: apiProduct.is_new || false
  };
}

function mapCategory(category: string): Product['category'] {
  const categoryMap: Record<string, Product['category']> = {
    'Clothing': 'women',
    'Footwear': 'unisex',
    'Accessories': 'accessories',
    'Bags': 'accessories'
  };
  return categoryMap[category] || 'accessories';
}

/**
 * The database stores every bag with subcategory "Bags". The storefront
 * navigation (categories.ts) expects tote/crossbody/messenger, so derive it
 * from the slug/name/tags and fall back to the broad "tote" bucket.
 */
function deriveSubcategory(apiProduct: any): string | undefined {
  const haystack = [
    apiProduct.subcategory,
    apiProduct.slug,
    apiProduct.name,
    ...(apiProduct.tags || [])
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  if (haystack.includes('crossbody')) return 'crossbody';
  if (haystack.includes('messenger')) return 'messenger';
  return 'tote';
}

function getColorHex(colorName: string): string {
  const colorMap: Record<string, string> = {
    'Black': '#000000', 'White': '#FFFFFF', 'Red': '#FF0000',
    'Blue': '#0000FF', 'Navy': '#000080', 'Green': '#008000',
    'Yellow': '#FFFF00', 'Orange': '#FFA500', 'Pink': '#FFC0CB',
    'Purple': '#800080', 'Brown': '#A52A2A', 'Gray': '#808080',
    'Grey': '#808080', 'Beige': '#F5F5DC', 'Cream': '#FFFDD0',
    'Natural': '#F5F5DC', 'Tan': '#D2B48C', 'Khaki': '#C3B091',
    'Olive': '#808000', 'Sage': '#9DC183', 'Charcoal': '#36454F',
    'Burgundy': '#800020'
  };
  return colorMap[colorName] || '#CCCCCC';
}

// Fetch products from API
export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(apiUrl('/products'));
    if (!response.ok) throw new Error('Failed to fetch products');
    const result = await response.json();
    return (result.data || []).map(mapApiProduct);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Fetch single product by slug
export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const response = await fetch(apiUrl(`/products/slug/${encodeURIComponent(slug)}`));
    if (!response.ok) return null;
    const result = await response.json();
    return result.data ? mapApiProduct(result.data) : null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Fetch products by category
export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  const products = await fetchProducts();
  return products.filter(p => p.category === category);
}

// Search products
export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const response = await fetch(apiUrl(`/search/products?q=${encodeURIComponent(query)}`));
    if (!response.ok) return [];
    const result = await response.json();
    return (result.data || []).map(mapApiProduct);
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}
