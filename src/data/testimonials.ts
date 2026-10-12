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
    text: "Canvas tote-nya kuat dan muat banyak barang. Jahitannya rapi dan handle-nya nyaman di tangan. Pasti bakal repeat order!",
    rating: 5,
    product: "Classic Canvas Tote",
    productSlug: "classic-canvas-tote",
    verified: true,
    date: "2026-09-15",
    location: "Jakarta",
  },
  {
    id: "t2",
    name: "Dimas",
    avatar: "/images/testimonials/dimas.webp",
    text: "Messenger bag-nya perfect buat kerja. Muat laptop 15 inch dan banyak kompartemen. Material canvas-nya premium!",
    rating: 5,
    product: "Canvas Messenger Bag",
    productSlug: "canvas-messenger-bag",
    verified: true,
    date: "2026-09-10",
    location: "Bandung",
  },
  {
    id: "t3",
    name: "Sari",
    avatar: "/images/testimonials/sari.webp",
    text: "Crossbody bag-nya compact tapi muat banyak. Cocok buat jalan-jalan santai. Bahannya tidak mudah kotor. Love it!",
    rating: 5,
    product: "Mini Canvas Crossbody",
    productSlug: "mini-canvas-crossbody",
    verified: true,
    date: "2026-09-08",
    location: "Surabaya",
  },
  {
    id: "t4",
    name: "Andi",
    avatar: "/images/testimonials/andi.webp",
    text: "Pengiriman cepat dan packaging-nya rapi. Weekend bag-nya spacious dan tahan lama. Perfect untuk short trip!",
    rating: 5,
    product: "Canvas Weekend Bag",
    productSlug: "canvas-weekend-bag",
    verified: true,
    date: "2026-09-05",
    location: "Yogyakarta",
  },
  {
    id: "t5",
    name: "Maya",
    avatar: "/images/testimonials/maya.webp",
    text: "Beach bag-nya lucu dan praktis. Muat handuk, sunscreen, dan barang-barang pantai. Water-resistant lining-nya berguna banget!",
    rating: 5,
    product: "Striped Canvas Beach Bag",
    productSlug: "striped-canvas-beach-bag",
    verified: true,
    date: "2026-09-01",
    location: "Bali",
  },
  {
    id: "t6",
    name: "Fajar",
    avatar: "/images/testimonials/fajar.webp",
    text: "Laptop tote-nya sleek dan professional. Padded laptop sleeve-nya aman. Canvas-nya thick dan berkualitas.",
    rating: 4,
    product: "Canvas Laptop Tote",
    productSlug: "canvas-laptop-tote",
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
