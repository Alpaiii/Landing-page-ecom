import type { Product } from '../data/products';
import { products as staticProducts } from '../data/products';

const API_URL = import.meta.env.PUBLIC_API_URL || '/api';

/**
 * Resolve an API path to an absolute URL.
 *
 * Pages render at build time (SSG), where `fetch` receives a relative path and
 * Node rejects it with ERR_INVALID_URL. On the server we fall back to the local
 * static dataset; in the browser the same-origin relative path is valid.
 */
function apiUrl(path: string): string {
  if (typeof window !== 'undefined') return `${API_URL}${path}`;
  return new URL(`${API_URL}${path}`, import.meta.env.SITE ?? 'http://localhost:4321').toString();
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
    subcategory: apiProduct.subcategory || undefined,
    badge,
    images,
    thumbnail: images[0]?.src || '/images/placeholder.jpg',
    colors,
    sizes,
    description: apiProduct.description || '',
    shortDescription: apiProduct.description?.slice(0, 150) || '',
    rating: 4.5,
    reviewCount: 0,
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

/**
 * True while Astro renders pages at build time. The Express API is not running
 * during the build, so those calls must not be attempted.
 */
const isBuild = typeof window === 'undefined';

// Fetch products from API
export async function fetchProducts(): Promise<Product[]> {
  if (isBuild) return staticProducts;

  try {
    const response = await fetch(apiUrl('/products'));
    if (!response.ok) throw new Error('Failed to fetch products');
    const result = await response.json();
    return (result.data || []).map(mapApiProduct);
  } catch (error) {
    console.error('Error fetching products:', error);
    return staticProducts;
  }
}

// Fetch single product by slug
export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  if (isBuild) return staticProducts.find(p => p.slug === slug) ?? null;

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
  if (isBuild) {
    return staticProducts.filter(p => p.category === category);
  }

  try {
    const response = await fetch(apiUrl(`/products?category=${encodeURIComponent(category)}`));
    if (!response.ok) return [];
    const result = await response.json();
    return (result.data || []).map(mapApiProduct);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}

// Search products
export async function searchProducts(query: string): Promise<Product[]> {
  if (isBuild) {
    const term = query.toLowerCase();
    return staticProducts.filter(
      p =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.tags?.some(t => t.toLowerCase().includes(term))
    );
  }

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
