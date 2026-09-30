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
    id: "women",
    name: "Women",
    slug: "women",
    description: "Contemporary pieces designed for the modern woman. From elegant dresses to everyday essentials.",
    image: "/images/categories/women.webp",
    imageHover: "/images/categories/women-hover.webp",
    productCount: 24,
  },
  {
    id: "men",
    name: "Men",
    slug: "men",
    description: "Minimalist menswear with a focus on quality and versatility. Built for everyday wear.",
    image: "/images/categories/men.webp",
    imageHover: "/images/categories/men-hover.webp",
    productCount: 18,
  },
  {
    id: "accessories",
    name: "Accessories",
    slug: "accessories",
    description: "Finishing touches that complete your look. Bags, belts, and more.",
    image: "/images/categories/accessories.webp",
    imageHover: "/images/categories/accessories-hover.webp",
    productCount: 12,
  },
  {
    id: "new-arrivals",
    name: "New Arrivals",
    slug: "new-arrivals",
    description: "Fresh styles just dropped. Be the first to shop our latest pieces.",
    image: "/images/categories/new-arrival.webp",
    imageHover: "/images/categories/new-arrival.webp",
    productCount: 8,
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
