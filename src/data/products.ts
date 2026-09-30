// Product Type Definitions
export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductSize {
  name: string;
  available: boolean;
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number; // Original price for sale items
  category: "women" | "men" | "accessories" | "unisex";
  subcategory?: string; // e.g., "t-shirt", "hoodie", "pants"
  badge?: "New" | "Best Seller" | "Sale" | "Limited" | "Sold Out";
  
  // Images
  images: ProductImage[];
  thumbnail: string;
  
  // Variants
  colors: ProductColor[];
  sizes: ProductSize[];
  
  // Details
  description: string;
  shortDescription?: string;
  material?: string;
  care?: string[];
  fit?: string;
  
  // Rating & Reviews
  rating: number;
  reviewCount: number;
  
  // Stock
  inStock: boolean;
  stockCount?: number;
  
  // Tags for filtering
  tags?: string[];
  
  // SEO
  metaTitle?: string;
  metaDescription?: string;
}

// Badge Types
export type ProductBadge = Product["badge"];

// Category Types
export type ProductCategory = Product["category"];

// Helper function to check if product is new
export function isNew(product: Product): boolean {
  return product.badge === "New";
}

// Helper function to check if product is on sale
export function isOnSale(product: Product): boolean {
  return product.badge === "Sale" && product.compareAtPrice !== undefined;
}

// Helper function to check if product is sold out
export function isSoldOut(product: Product): boolean {
  return product.badge === "Sold Out" || !product.inStock;
}

// Helper function to get discount percentage
export function getDiscountPercentage(product: Product): number {
  if (!product.compareAtPrice) return 0;
  return Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100);
}

// Product Data
export const products: Product[] = [
  {
    id: "oversized-essential-tee",
    name: "Oversized Essential Tee",
    slug: "oversized-essential-tee",
    price: 249000,
    category: "men",
    subcategory: "t-shirt",
    badge: "New",
    thumbnail: "/images/products/tee.webp",
    images: [
      { src: "/images/products/tee.webp", alt: "Oversized Essential Tee - Front" },
      { src: "/images/products/tee.webp", alt: "Oversized Essential Tee - Back" },
      { src: "/images/products/tee.webp", alt: "Oversized Essential Tee - Detail" },
    ],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "White", hex: "#ffffff" },
      { name: "Heather Gray", hex: "#9ca3af" },
    ],
    sizes: [
      { name: "S", available: true },
      { name: "M", available: true },
      { name: "L", available: true },
      { name: "XL", available: true },
    ],
    description: "Premium cotton oversized t-shirt designed for everyday comfort. Features a relaxed fit with dropped shoulders and a clean minimalist aesthetic. Made from 100% organic cotton for a soft, breathable feel.",
    shortDescription: "Premium cotton oversized t-shirt for everyday comfort.",
    material: "100% Organic Cotton",
    care: ["Machine wash cold", "Tumble dry low", "Do not bleach"],
    fit: "Relaxed, oversized fit. Size down for a closer fit.",
    rating: 4.9,
    reviewCount: 32,
    inStock: true,
    stockCount: 45,
    tags: ["t-shirt", "essential", "casual", "everyday"],
  },
  {
    id: "classic-hoodie",
    name: "Classic Hoodie",
    slug: "classic-hoodie",
    price: 449000,
    category: "men",
    subcategory: "hoodie",
    badge: "Best Seller",
    thumbnail: "/images/products/hoodie.webp",
    images: [
      { src: "/images/products/hoodie.webp", alt: "Classic Hoodie - Front" },
      { src: "/images/products/hoodie.webp", alt: "Classic Hoodie - Back" },
      { src: "/images/products/hoodie.webp", alt: "Classic Hoodie - Detail" },
    ],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Charcoal", hex: "#4a4a4a" },
      { name: "Navy", hex: "#1e3a5f" },
    ],
    sizes: [
      { name: "S", available: true },
      { name: "M", available: true },
      { name: "L", available: true },
      { name: "XL", available: true },
    ],
    description: "Cozy fleece-lined hoodie with a minimalist design. Features a spacious kangaroo pocket, adjustable drawstring hood, and ribbed cuffs. Perfect for layering or wearing on its own.",
    shortDescription: "Cozy fleece-lined hoodie with minimalist design.",
    material: "80% Cotton, 20% Polyester",
    care: ["Machine wash cold inside out", "Tumble dry low", "Do not iron on print"],
    fit: "Regular fit. True to size.",
    rating: 4.8,
    reviewCount: 56,
    inStock: true,
    stockCount: 38,
    tags: ["hoodie", "essential", "casual", "streetwear"],
  },
  {
    id: "slim-chino-pants",
    name: "Slim Chino Pants",
    slug: "slim-chino-pants",
    price: 349000,
    category: "men",
    subcategory: "pants",
    thumbnail: "/images/products/chino.webp",
    images: [
      { src: "/images/products/chino.webp", alt: "Slim Chino Pants - Front" },
      { src: "/images/products/chino.webp", alt: "Slim Chino Pants - Back" },
    ],
    colors: [
      { name: "Khaki", hex: "#c3b091" },
      { name: "Black", hex: "#1a1a1a" },
      { name: "Olive", hex: "#556b2f" },
    ],
    sizes: [
      { name: "28", available: true },
      { name: "30", available: true },
      { name: "32", available: true },
      { name: "34", available: true },
      { name: "36", available: false },
    ],
    description: "Tailored slim-fit chino pants for a clean, polished look. Features a mid-rise waist, tapered leg, and minimal detailing. Versatile enough for both casual and smart-casual occasions.",
    shortDescription: "Tailored slim-fit chino pants for a clean look.",
    material: "98% Cotton, 2% Elastane",
    care: ["Machine wash cold", "Hang to dry", "Iron on medium heat"],
    fit: "Slim fit. Tapered leg.",
    rating: 4.7,
    reviewCount: 24,
    inStock: true,
    stockCount: 20,
    tags: ["pants", "chino", "casual", "smart-casual"],
  },
  {
    id: "urban-cargo-jacket",
    name: "Urban Cargo Jacket",
    slug: "urban-cargo-jacket",
    price: 599000,
    category: "men",
    subcategory: "jacket",
    badge: "New",
    thumbnail: "/images/products/jacket.webp",
    images: [
      { src: "/images/products/jacket.webp", alt: "Urban Cargo Jacket - Front" },
      { src: "/images/products/jacket.webp", alt: "Urban Cargo Jacket - Back" },
    ],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Army Green", hex: "#4b5320" },
    ],
    sizes: [
      { name: "S", available: false },
      { name: "M", available: true },
      { name: "L", available: true },
      { name: "XL", available: true },
    ],
    description: "Streetwear-inspired cargo jacket with multiple utility pockets. Features a relaxed fit, stand collar, and concealed zip closure. A statement piece that combines function with style.",
    shortDescription: "Streetwear-inspired cargo jacket with utility pockets.",
    material: "100% Cotton Canvas",
    care: ["Dry clean recommended", "Or machine wash cold on gentle cycle"],
    fit: "Relaxed fit. Size down for a closer fit.",
    rating: 4.6,
    reviewCount: 18,
    inStock: true,
    stockCount: 15,
    tags: ["jacket", "cargo", "streetwear", "outerwear"],
  },
  {
    id: "a-line-midi-dress",
    name: "A-Line Midi Dress",
    slug: "a-line-midi-dress",
    price: 299000,
    compareAtPrice: 399000,
    category: "women",
    subcategory: "dress",
    badge: "Sale",
    thumbnail: "/images/products/dress.webp",
    images: [
      { src: "/images/products/dress.webp", alt: "A-Line Midi Dress - Front" },
      { src: "/images/products/dress.webp", alt: "A-Line Midi Dress - Back" },
    ],
    colors: [
      { name: "Cream", hex: "#fffdd0" },
      { name: "Dusty Rose", hex: "#dcae96" },
    ],
    sizes: [
      { name: "XS", available: true },
      { name: "S", available: true },
      { name: "M", available: true },
      { name: "L", available: false },
    ],
    description: "Elegant A-line midi dress suitable for any occasion. Features a flattering fitted bodice, flowing skirt, and concealed back zip. Dress it up with heels or keep it casual with sneakers.",
    shortDescription: "Elegant A-line midi dress for any occasion.",
    material: "95% Polyester, 5% Elastane",
    care: ["Hand wash cold", "Hang to dry", "Iron on low heat"],
    fit: "Regular fit. True to size.",
    rating: 4.8,
    reviewCount: 42,
    inStock: true,
    stockCount: 12,
    tags: ["dress", "midi", "elegant", "casual"],
  },
  {
    id: "minimal-crossbody-bag",
    name: "Minimal Crossbody Bag",
    slug: "minimal-crossbody-bag",
    price: 279000,
    category: "accessories",
    subcategory: "bag",
    thumbnail: "/images/products/bag.webp",
    images: [
      { src: "/images/products/bag.webp", alt: "Minimal Crossbody Bag - Front" },
      { src: "/images/products/bag.webp", alt: "Minimal Crossbody Bag - Detail" },
    ],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Tan", hex: "#d2b48c" },
    ],
    sizes: [
      { name: "One Size", available: true },
    ],
    description: "Compact crossbody bag with clean lines and a minimalist aesthetic. Features an adjustable strap, interior slip pocket, and magnetic closure. Perfect for essentials on the go.",
    shortDescription: "Compact crossbody bag with clean lines.",
    material: "Vegan Leather",
    care: ["Wipe with damp cloth", "Store in dust bag"],
    fit: "Adjustable strap: 90-120cm",
    rating: 4.5,
    reviewCount: 28,
    inStock: true,
    stockCount: 50,
    tags: ["bag", "accessories", "minimal", "everyday"],
  },
  {
    id: "relaxed-linen-shirt",
    name: "Relaxed Linen Shirt",
    slug: "relaxed-linen-shirt",
    price: 389000,
    category: "women",
    subcategory: "shirt",
    badge: "New",
    thumbnail: "/images/products/tee.webp",
    images: [
      { src: "/images/products/tee.webp", alt: "Relaxed Linen Shirt - Front" },
      { src: "/images/products/tee.webp", alt: "Relaxed Linen Shirt - Back" },
    ],
    colors: [
      { name: "White", hex: "#ffffff" },
      { name: "Sand", hex: "#c2b280" },
      { name: "Sage", hex: "#9dc183" },
    ],
    sizes: [
      { name: "XS", available: true },
      { name: "S", available: true },
      { name: "M", available: true },
      { name: "L", available: true },
    ],
    description: "Breathable linen shirt with a relaxed, effortless silhouette. Features a button-down front, chest pocket, and rolled sleeve tabs. A warm-weather essential.",
    shortDescription: "Breathable linen shirt with relaxed silhouette.",
    material: "100% Linen",
    care: ["Machine wash cold", "Line dry", "Iron on medium heat"],
    fit: "Relaxed fit. True to size.",
    rating: 4.7,
    reviewCount: 15,
    inStock: true,
    stockCount: 30,
    tags: ["shirt", "linen", "casual", "summer"],
  },
  {
    id: "high-waist-wide-leg",
    name: "High Waist Wide Leg Pants",
    slug: "high-waist-wide-leg-pants",
    price: 379000,
    category: "women",
    subcategory: "pants",
    badge: "Best Seller",
    thumbnail: "/images/products/chino.webp",
    images: [
      { src: "/images/products/chino.webp", alt: "High Waist Wide Leg Pants - Front" },
      { src: "/images/products/chino.webp", alt: "High Waist Wide Leg Pants - Back" },
    ],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Cream", hex: "#fffdd0" },
    ],
    sizes: [
      { name: "XS", available: true },
      { name: "S", available: true },
      { name: "M", available: true },
      { name: "L", available: true },
    ],
    description: "Elegant high-waisted wide leg pants that elongate the silhouette. Features a concealed side zip, front pleats, and a flowing drape. Versatile for work or weekend.",
    shortDescription: "Elegant high-waisted wide leg pants.",
    material: "65% Polyester, 35% Viscose",
    care: ["Dry clean only"],
    fit: "High waist, wide leg. True to size.",
    rating: 4.9,
    reviewCount: 38,
    inStock: true,
    stockCount: 25,
    tags: ["pants", "wide-leg", "elegant", "workwear"],
  },
];

// Get products by category
export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

// Get products by badge
export function getProductsByBadge(badge: ProductBadge): Product[] {
  return products.filter((p) => p.badge === badge);
}

// Get new arrivals
export function getNewArrivals(limit?: number): Product[] {
  const newProducts = products.filter(isNew);
  return limit ? newProducts.slice(0, limit) : newProducts;
}

// Get best sellers
export function getBestSellers(limit?: number): Product[] {
  const bestSellers = products.filter((p) => p.badge === "Best Seller");
  return limit ? bestSellers.slice(0, limit) : bestSellers;
}

// Get product by slug
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

// Get related products
export function getRelatedProducts(product: Product, limit: number = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}
