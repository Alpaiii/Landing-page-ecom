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
  subcategory?: string; // e.g., "tote", "crossbody", "messenger"
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
    id: "classic-canvas-tote",
    name: "Classic Canvas Tote",
    slug: "classic-canvas-tote",
    price: 179000,
    compareAtPrice: 249000,
    category: "accessories",
    subcategory: "tote",
    badge: "New",
    thumbnail: "/images/products/1.webp",
    images: [
      { src: "/images/products/1.webp", alt: "Classic Canvas Tote - Front" },
      { src: "/images/products/1.webp", alt: "Classic Canvas Tote - Detail" },
    ],
    colors: [
      { name: "Natural", hex: "#F5F5DC" },
      { name: "Black", hex: "#000000" },
      { name: "Navy", hex: "#000080" },
    ],
    sizes: [{ name: "One Size", available: true }],
    description: "Timeless canvas tote bag with sturdy construction. Perfect for daily use, shopping, or beach trips.",
    shortDescription: "Timeless canvas tote bag for daily use.",
    material: "100% Canvas Cotton",
    care: ["Spot clean with damp cloth", "Do not machine wash", "Air dry flat"],
    fit: "One size fits all",
    rating: 4.5,
    reviewCount: 0,
    inStock: true,
    stockCount: 50,
    tags: ["tote", "canvas", "classic"],
  },
  {
    id: "large-canvas-shopper",
    name: "Large Canvas Shopper",
    slug: "large-canvas-shopper",
    price: 199000,
    compareAtPrice: 279000,
    category: "accessories",
    subcategory: "tote",
    badge: "New",
    thumbnail: "/images/products/2.webp",
    images: [
      { src: "/images/products/2.webp", alt: "Large Canvas Shopper - Front" },
      { src: "/images/products/2.webp", alt: "Large Canvas Shopper - Detail" },
    ],
    colors: [
      { name: "Beige", hex: "#F5F5DC" },
      { name: "Gray", hex: "#808080" },
      { name: "Olive", hex: "#808000" },
    ],
    sizes: [{ name: "One Size", available: true }],
    description: "Spacious canvas shopping bag with reinforced handles. Ideal for groceries and everyday essentials.",
    shortDescription: "Spacious canvas shopping bag.",
    material: "100% Canvas Cotton",
    care: ["Spot clean with damp cloth", "Do not machine wash", "Air dry flat"],
    fit: "One size fits all",
    rating: 4.5,
    reviewCount: 0,
    inStock: true,
    stockCount: 45,
    tags: ["shopper", "canvas", "large"],
  },
  {
    id: "mini-canvas-crossbody",
    name: "Mini Canvas Crossbody",
    slug: "mini-canvas-crossbody",
    price: 149000,
    compareAtPrice: 199000,
    category: "accessories",
    subcategory: "crossbody",
    badge: "Best Seller",
    thumbnail: "/images/products/3.webp",
    images: [
      { src: "/images/products/3.webp", alt: "Mini Canvas Crossbody - Front" },
      { src: "/images/products/3.webp", alt: "Mini Canvas Crossbody - Detail" },
    ],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Cream", hex: "#FFFDD0" },
      { name: "Brown", hex: "#A52A2A" },
    ],
    sizes: [{ name: "One Size", available: true }],
    description: "Compact canvas crossbody bag with adjustable strap. Perfect for hands-free convenience.",
    shortDescription: "Compact canvas crossbody bag.",
    material: "100% Canvas Cotton",
    care: ["Spot clean with damp cloth", "Do not machine wash", "Air dry flat"],
    fit: "Adjustable strap",
    rating: 4.5,
    reviewCount: 0,
    inStock: true,
    stockCount: 60,
    tags: ["crossbody", "canvas", "mini"],
  },
  {
    id: "canvas-weekend-bag",
    name: "Canvas Weekend Bag",
    slug: "canvas-weekend-bag",
    price: 349000,
    compareAtPrice: 449000,
    category: "accessories",
    subcategory: "messenger",
    badge: "Sale",
    thumbnail: "/images/products/4.webp",
    images: [
      { src: "/images/products/4.webp", alt: "Canvas Weekend Bag - Front" },
      { src: "/images/products/4.webp", alt: "Canvas Weekend Bag - Detail" },
    ],
    colors: [
      { name: "Navy", hex: "#000080" },
      { name: "Forest Green", hex: "#228B22" },
      { name: "Charcoal", hex: "#36454F" },
    ],
    sizes: [{ name: "One Size", available: true }],
    description: "Durable canvas weekend bag with leather trim. Great for short trips and gym sessions.",
    shortDescription: "Durable canvas weekend bag.",
    material: "100% Canvas Cotton",
    care: ["Spot clean with damp cloth", "Do not machine wash", "Air dry flat"],
    fit: "One size fits all",
    rating: 4.5,
    reviewCount: 0,
    inStock: true,
    stockCount: 35,
    tags: ["weekend", "canvas", "travel"],
  },
  {
    id: "striped-canvas-beach-bag",
    name: "Striped Canvas Beach Bag",
    slug: "striped-canvas-beach-bag",
    price: 229000,
    compareAtPrice: 299000,
    category: "accessories",
    subcategory: "tote",
    badge: "Best Seller",
    thumbnail: "/images/products/5.webp",
    images: [
      { src: "/images/products/5.webp", alt: "Striped Canvas Beach Bag - Front" },
      { src: "/images/products/5.webp", alt: "Striped Canvas Beach Bag - Detail" },
    ],
    colors: [
      { name: "Blue Stripe", hex: "#4A90D9" },
      { name: "Red Stripe", hex: "#C0392B" },
      { name: "Black Stripe", hex: "#000000" },
    ],
    sizes: [{ name: "One Size", available: true }],
    description: "Breezy striped canvas bag perfect for beach days. Water-resistant lining included.",
    shortDescription: "Striped canvas bag for beach days.",
    material: "100% Canvas Cotton",
    care: ["Spot clean with damp cloth", "Do not machine wash", "Air dry flat"],
    fit: "One size fits all",
    rating: 4.5,
    reviewCount: 0,
    inStock: true,
    stockCount: 40,
    tags: ["beach", "canvas", "striped"],
  },
  {
    id: "canvas-messenger-bag",
    name: "Canvas Messenger Bag",
    slug: "canvas-messenger-bag",
    price: 279000,
    compareAtPrice: 359000,
    category: "accessories",
    subcategory: "messenger",
    badge: "New",
    thumbnail: "/images/products/6.webp",
    images: [
      { src: "/images/products/6.webp", alt: "Canvas Messenger Bag - Front" },
      { src: "/images/products/6.webp", alt: "Canvas Messenger Bag - Detail" },
    ],
    colors: [
      { name: "Khaki", hex: "#C3B091" },
      { name: "Black", hex: "#000000" },
      { name: "Navy", hex: "#000080" },
    ],
    sizes: [{ name: "One Size", available: true }],
    description: "Functional canvas messenger bag with multiple compartments. Ideal for work or school.",
    shortDescription: "Functional canvas messenger bag.",
    material: "100% Canvas Cotton",
    care: ["Spot clean with damp cloth", "Do not machine wash", "Air dry flat"],
    fit: "One size fits all",
    rating: 4.5,
    reviewCount: 0,
    inStock: true,
    stockCount: 55,
    tags: ["messenger", "canvas", "work"],
  },
  {
    id: "foldable-canvas-tote",
    name: "Foldable Canvas Tote",
    slug: "foldable-canvas-tote",
    price: 129000,
    compareAtPrice: 179000,
    category: "accessories",
    subcategory: "tote",
    badge: "Sale",
    thumbnail: "/images/products/7.webp",
    images: [
      { src: "/images/products/7.webp", alt: "Foldable Canvas Tote - Front" },
      { src: "/images/products/7.webp", alt: "Foldable Canvas Tote - Detail" },
    ],
    colors: [
      { name: "Natural", hex: "#F5F5DC" },
      { name: "Gray", hex: "#808080" },
      { name: "Sage", hex: "#9DC183" },
    ],
    sizes: [{ name: "One Size", available: true }],
    description: "Lightweight foldable canvas tote. Easy to pack and carry anywhere you go.",
    shortDescription: "Lightweight foldable canvas tote.",
    material: "100% Canvas Cotton",
    care: ["Spot clean with damp cloth", "Do not machine wash", "Air dry flat"],
    fit: "One size fits all",
    rating: 4.5,
    reviewCount: 0,
    inStock: true,
    stockCount: 70,
    tags: ["foldable", "canvas", "compact"],
  },
  {
    id: "canvas-laptop-tote",
    name: "Canvas Laptop Tote",
    slug: "canvas-laptop-tote",
    price: 319000,
    compareAtPrice: 399000,
    category: "accessories",
    subcategory: "tote",
    badge: "Best Seller",
    thumbnail: "/images/products/8.webp",
    images: [
      { src: "/images/products/8.webp", alt: "Canvas Laptop Tote - Front" },
      { src: "/images/products/8.webp", alt: "Canvas Laptop Tote - Detail" },
    ],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Gray", hex: "#808080" },
      { name: "Navy", hex: "#000080" },
    ],
    sizes: [{ name: "One Size", available: true }],
    description: "Professional canvas tote with padded laptop sleeve. Fits up to 15-inch laptops.",
    shortDescription: "Canvas tote with padded laptop sleeve.",
    material: "100% Canvas Cotton",
    care: ["Spot clean with damp cloth", "Do not machine wash", "Air dry flat"],
    fit: "Fits up to 15-inch laptops",
    rating: 4.5,
    reviewCount: 0,
    inStock: true,
    stockCount: 45,
    tags: ["laptop", "canvas", "professional"],
  },
  {
    id: "canvas-bucket-bag",
    name: "Canvas Bucket Bag",
    slug: "canvas-bucket-bag",
    price: 189000,
    compareAtPrice: 249000,
    category: "accessories",
    subcategory: "tote",
    badge: "New",
    thumbnail: "/images/products/9.webp",
    images: [
      { src: "/images/products/9.webp", alt: "Canvas Bucket Bag - Front" },
      { src: "/images/products/9.webp", alt: "Canvas Bucket Bag - Detail" },
    ],
    colors: [
      { name: "Tan", hex: "#D2B48C" },
      { name: "Black", hex: "#000000" },
      { name: "Cream", hex: "#FFFDD0" },
    ],
    sizes: [{ name: "One Size", available: true }],
    description: "Trendy canvas bucket bag with drawstring closure. Stylish and practical design.",
    shortDescription: "Trendy canvas bucket bag.",
    material: "100% Canvas Cotton",
    care: ["Spot clean with damp cloth", "Do not machine wash", "Air dry flat"],
    fit: "One size fits all",
    rating: 4.5,
    reviewCount: 0,
    inStock: true,
    stockCount: 50,
    tags: ["bucket", "canvas", "trendy"],
  },
  {
    id: "canvas-market-bag",
    name: "Canvas Market Bag",
    slug: "canvas-market-bag",
    price: 159000,
    compareAtPrice: 219000,
    category: "accessories",
    subcategory: "tote",
    badge: "New",
    thumbnail: "/images/products/10.webp",
    images: [
      { src: "/images/products/10.webp", alt: "Canvas Market Bag - Front" },
      { src: "/images/products/10.webp", alt: "Canvas Market Bag - Detail" },
    ],
    colors: [
      { name: "Natural", hex: "#F5F5DC" },
      { name: "Navy", hex: "#000080" },
      { name: "Burgundy", hex: "#800020" },
    ],
    sizes: [{ name: "One Size", available: true }],
    description: "Eco-friendly canvas market bag with wide opening. Perfect for farmers market visits.",
    shortDescription: "Eco-friendly canvas market bag.",
    material: "100% Canvas Cotton",
    care: ["Spot clean with damp cloth", "Do not machine wash", "Air dry flat"],
    fit: "One size fits all",
    rating: 4.5,
    reviewCount: 0,
    inStock: true,
    stockCount: 60,
    tags: ["market", "canvas", "eco-friendly"],
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
