export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  product?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Rina",
    text: "Kualitasnya juara! Bahannya adem dan jahitannya rapi. Pasti bakal repeat order.",
    rating: 5,
    product: "Oversized Essential Tee",
  },
  {
    id: "t2",
    name: "Dimas",
    text: "Hoodie-nya cozy banget. Ukurannya pas dan desainnya clean. Recommended!",
    rating: 5,
    product: "Classic Hoodie",
  },
  {
    id: "t3",
    name: "Sari",
    text: "Dress-nya cantik banget. Cocok buat acara casual maupun semi-formal.",
    rating: 5,
    product: "A-Line Midi Dress",
  },
];
