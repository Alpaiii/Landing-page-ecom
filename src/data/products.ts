export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  badge?: string;
  colors: string[];
  sizes: string[];
  description: string;
  slug: string;
}

export const products: Product[] = [
  {
    id: "oversized-essential",
    name: "Oversized Essential Tee",
    price: 249000,
    category: "T-Shirt",
    image: "/images/products/tee.webp",
    badge: "New",
    colors: ["Black", "White"],
    sizes: ["S", "M", "L", "XL"],
    description: "Premium cotton oversized t-shirt for everyday comfort.",
    slug: "oversized-essential-tee",
  },
  {
    id: "classic-hoodie",
    name: "Classic Hoodie",
    price: 449000,
    category: "Hoodie",
    image: "/images/products/hoodie.webp",
    badge: "Best Seller",
    colors: ["Black", "Gray", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    description: "Cozy fleece-lined hoodie with minimalist design.",
    slug: "classic-hoodie",
  },
  {
    id: "slim-chino-pants",
    name: "Slim Chino Pants",
    price: 349000,
    category: "Pants",
    image: "/images/products/chino.webp",
    colors: ["Khaki", "Black", "Olive"],
    sizes: ["S", "M", "L", "XL"],
    description: "Tailored slim-fit chino pants for a clean look.",
    slug: "slim-chino-pants",
  },
  {
    id: "cargo-jacket",
    name: "Urban Cargo Jacket",
    price: 599000,
    category: "Jacket",
    image: "/images/products/jacket.webp",
    badge: "New",
    colors: ["Black", "Army Green"],
    sizes: ["M", "L", "XL"],
    description: "Streetwear-inspired cargo jacket with utility pockets.",
    slug: "urban-cargo-jacket",
  },
  {
    id: "a-line-midi-dress",
    name: "A-Line Midi Dress",
    price: 399000,
    category: "Dress",
    image: "/images/products/dress.webp",
    badge: "Sale",
    colors: ["Cream", "Dusty Rose"],
    sizes: ["XS", "S", "M", "L"],
    description: "Elegant A-line midi dress for any occasion.",
    slug: "a-line-midi-dress",
  },
  {
    id: "minimal-crossbody",
    name: "Minimal Crossbody Bag",
    price: 279000,
    category: "Accessories",
    image: "/images/products/bag.webp",
    colors: ["Black", "Tan"],
    sizes: ["One Size"],
    description: "Compact crossbody bag with clean lines.",
    slug: "minimal-crossbody-bag",
  },
];
