export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  image: string;
  imageHover?: string;
  season?: string;
  year?: number;
  productCount: number;
  featured?: boolean;
}

export const collections: Collection[] = [
  {
    id: "new-arrivals",
    name: "New Arrivals",
    slug: "new-arrivals",
    description: "Discover our latest additions to the collection. Fresh styles that define the season's aesthetic.",
    shortDescription: "Fresh styles just dropped.",
    image: "/images/collections/new-arrivals.webp",
    imageHover: "/images/collections/new-arrivals-hover.webp",
    season: "Autumn",
    year: 2026,
    productCount: 8,
    featured: true,
  },
  {
    id: "best-sellers",
    name: "Best Sellers",
    slug: "best-sellers",
    description: "The pieces our customers love most. Tried, tested, and approved by the community.",
    shortDescription: "Customer favorites you'll love.",
    image: "/images/collections/best-sellers.webp",
    imageHover: "/images/collections/best-sellers-hover.webp",
    productCount: 12,
  },
  {
    id: "essentials",
    name: "Essentials",
    slug: "essentials",
    description: "Timeless wardrobe staples designed for everyday wear. The foundation of any great outfit.",
    shortDescription: "Wardrobe staples for every day.",
    image: "/images/collections/essentials.webp",
    imageHover: "/images/collections/essentials-hover.webp",
    productCount: 15,
  },
  {
    id: "autumn-2026",
    name: "Autumn 2026",
    slug: "autumn-2026",
    description: "Our Autumn 2026 collection explores texture and layering. Warm tones meet minimalist silhouettes.",
    shortDescription: "Warm tones, minimalist silhouettes.",
    image: "/images/collections/essentials.webp",
    imageHover: "/images/collections/essentials.webp",
    season: "Autumn",
    year: 2026,
    productCount: 20,
    featured: true,
  },
];

// Get collection by slug
export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

// Get featured collections
export function getFeaturedCollections(): Collection[] {
  return collections.filter((c) => c.featured);
}

// Get collection by season and year
export function getCollectionBySeason(season: string, year: number): Collection | undefined {
  return collections.find((c) => c.season === season && c.year === year);
}
