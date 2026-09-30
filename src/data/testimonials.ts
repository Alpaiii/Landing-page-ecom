export interface Testimonial {
  id: string;
  name: string;
  avatar?: string;
  text: string;
  rating: number;
  product?: string;
  productSlug?: string;
  verified: boolean;
  date?: string;
  location?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Rina",
    avatar: "/images/testimonials/rina.webp",
    text: "Materialnya bagus dan cutting-nya sesuai dengan foto. Bahannya adem dan jahitannya rapi. Pasti bakal repeat order!",
    rating: 5,
    product: "Oversized Essential Tee",
    productSlug: "oversized-essential-tee",
    verified: true,
    date: "2026-09-15",
    location: "Jakarta",
  },
  {
    id: "t2",
    name: "Dimas",
    avatar: "/images/testimonials/dimas.webp",
    text: "Hoodie-nya cozy banget. Ukurannya pas dan desainnya clean. Fleece dalamnya tebal dan hangat. Recommended!",
    rating: 5,
    product: "Classic Hoodie",
    productSlug: "classic-hoodie",
    verified: true,
    date: "2026-09-10",
    location: "Bandung",
  },
  {
    id: "t3",
    name: "Sari",
    avatar: "/images/testimonials/sari.webp",
    text: "Dress-nya cantik banget. Cocok buat acara casual maupun semi-formal. Bahannya tidak mudah kusut. Love it!",
    rating: 5,
    product: "A-Line Midi Dress",
    productSlug: "a-line-midi-dress",
    verified: true,
    date: "2026-09-08",
    location: "Surabaya",
  },
  {
    id: "t4",
    name: "Andi",
    avatar: "/images/testimonials/andi.webp",
    text: "Pengiriman cepat dan packaging-nya premium. Chino-nya nyaman dipakai seharian. Pasti akan order lagi.",
    rating: 5,
    product: "Slim Chino Pants",
    productSlug: "slim-chino-pants",
    verified: true,
    date: "2026-09-05",
    location: "Yogyakarta",
  },
  {
    id: "t5",
    name: "Maya",
    avatar: "/images/testimonials/maya.webp",
    text: "Bag-nya minimalis dan bisa muat banyak barang. Kualitas bahan premium banget. Worth the price!",
    rating: 5,
    product: "Minimal Crossbody Bag",
    productSlug: "minimal-crossbody-bag",
    verified: true,
    date: "2026-09-01",
    location: "Bali",
  },
  {
    id: "t6",
    name: "Fajar",
    avatar: "/images/testimonials/fajar.webp",
    text: "Jacket-nya keren dan fungsional. Pocket-nya banyak dan muat barang. Cocok buat outfit harian.",
    rating: 4,
    product: "Urban Cargo Jacket",
    productSlug: "urban-cargo-jacket",
    verified: true,
    date: "2026-08-28",
    location: "Medan",
  },
];

// Get testimonials for a specific product
export function getTestimonialsForProduct(productSlug: string): Testimonial[] {
  return testimonials.filter((t) => t.productSlug === productSlug);
}

// Get average rating for a product
export function getAverageRatingForProduct(productSlug: string): number {
  const productTestimonials = getTestimonialsForProduct(productSlug);
  if (productTestimonials.length === 0) return 0;
  const sum = productTestimonials.reduce((acc, t) => acc + t.rating, 0);
  return Math.round((sum / productTestimonials.length) * 10) / 10;
}

// Get featured testimonials (for homepage)
export function getFeaturedTestimonials(limit: number = 3): Testimonial[] {
  return testimonials.slice(0, limit);
}
