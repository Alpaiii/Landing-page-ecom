import type { ProductCategory } from './products';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  imageHover?: string;
  productCount: number;
}

export const categories: Category[] = [
  {
    id: "tote",
    name: "Tote Bags",
    slug: "tote",
    description: "Classic tote bags perfect for shopping, work, or daily errands. Spacious and versatile.",
    image: "/images/categories/tote.webp",
    imageHover: "/images/categories/tote-hover.webp",
    productCount: 4,
  },
  {
    id: "crossbody",
    name: "Crossbody Bags",
    slug: "crossbody",
    description: "Hands-free convenience with adjustable straps. Perfect for on-the-go adventures.",
    image: "/images/categories/crossbody.webp",
    imageHover: "/images/categories/crossbody-hover.webp",
    productCount: 2,
  },
  {
    id: "messenger",
    name: "Messenger Bags",
    slug: "messenger",
    description: "Professional bags with multiple compartments. Ideal for work and school.",
    image: "/images/categories/messenger.webp",
    imageHover: "/images/categories/messenger-hover.webp",
    productCount: 2,
  },
  {
    id: "new-arrivals",
    name: "New Arrivals",
    slug: "new-arrivals",
    description: "Fresh styles just dropped. Be the first to shop our latest bags.",
    image: "/images/categories/new-arrival.webp",
    imageHover: "/images/categories/new-arrival.webp",
    productCount: 5,
  },
];

// Get category by slug
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

// Get category by id
export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

// Map product category to category data
export function getCategoryForProduct(productCategory: ProductCategory): Category | undefined {
  return categories.find((c) => c.id === productCategory);
}
