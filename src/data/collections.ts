export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
}

export const collections: Collection[] = [
  {
    id: "new-arrivals",
    name: "New Arrivals",
    description: "Fresh styles just dropped.",
    image: "/images/collections/new-arrivals.webp",
    slug: "new-arrivals",
  },
  {
    id: "best-sellers",
    name: "Best Sellers",
    description: "Customer favorites you'll love.",
    image: "/images/collections/best-sellers.webp",
    slug: "best-sellers",
  },
  {
    id: "essentials",
    name: "Essentials",
    description: "Wardrobe staples for every day.",
    image: "/images/collections/essentials.webp",
    slug: "essentials",
  },
];
