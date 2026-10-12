import type { Product } from './products';

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  size?: string;
  color?: string;
}

/** Aggregate rating breakdown (percentages must total 100). */
export interface RatingBreakdown {
  average: number;
  total: number;
  distribution: Array<{ stars: number; percent: number }>;
}

export const reviews: Review[] = [
  {
    id: 'rev-001',
    productId: 'oversized-essential-tee',
    author: 'Sarah K.',
    rating: 5,
    title: 'Worth every rupiah',
    body: 'The cotton is genuinely premium and the oversized drop is exactly what I wanted. Washed it three times already, no fading and still holds its shape.',
    date: '2026-09-14',
    verifiedPurchase: true,
    helpfulCount: 24,
    size: 'M',
    color: 'Black',
  },
  {
    id: 'rev-002',
    productId: 'oversized-essential-tee',
    author: 'Budi N.',
    rating: 4,
    title: 'Great fit, sizing runs big',
    body: 'Really solid quality. It is properly oversized so if you want a regular fit, size down like the product page says.',
    date: '2026-09-02',
    verifiedPurchase: true,
    helpfulCount: 11,
    size: 'L',
    color: 'Heather Gray',
  },
  {
    id: 'rev-003',
    productId: 'oversized-essential-tee',
    author: 'Dewi A.',
    rating: 5,
    title: 'My third purchase',
    body: 'Bought this after the hoodie and it is the same standard of quality. The neckline does not sag after washing which was my main worry.',
    date: '2026-08-28',
    verifiedPurchase: true,
    helpfulCount: 8,
    size: 'S',
    color: 'White',
  },
  {
    id: 'rev-004',
    productId: 'classic-hoodie',
    author: 'Andi P.',
    rating: 5,
    title: 'Warm without being heavy',
    body: 'The fleece lining is soft and it is not bulky at all. Wear it through an Indonesian rainy season and it still does not pill.',
    date: '2026-09-20',
    verifiedPurchase: true,
    helpfulCount: 31,
    size: 'M',
    color: 'Navy',
  },
  {
    id: 'rev-005',
    productId: 'classic-hoodie',
    author: 'Rina S.',
    rating: 4,
    title: 'Nice, slightly small',
    body: 'Quality is clearly there. I would size up if you are between sizes because the fit is closer to regular than oversized.',
    date: '2026-09-05',
    verifiedPurchase: true,
    helpfulCount: 15,
    size: 'M',
    color: 'Charcoal',
  },
  {
    id: 'rev-006',
    productId: 'classic-hoodie',
    author: 'Tomas G.',
    rating: 5,
    title: 'Minimalist and clean',
    body: 'No loud branding, no clutter. Exactly the aesthetic I was looking for. The drawstrings are properly weighted too.',
    date: '2026-08-19',
    verifiedPurchase: false,
    helpfulCount: 6,
    size: 'XL',
    color: 'Black',
  },
  {
    id: 'rev-007',
    productId: 'slim-chino-pants',
    author: 'Hendra W.',
    rating: 4,
    title: 'Clean taper',
    body: 'The slim fit is genuinely slim through the leg without being tight. Fabric has a little stretch which makes sitting all day comfortable.',
    date: '2026-09-11',
    verifiedPurchase: true,
    helpfulCount: 19,
    size: '32',
    color: 'Khaki',
  },
  {
    id: 'rev-008',
    productId: 'urban-cargo-jacket',
    author: 'Yoga M.',
    rating: 4,
    title: 'Functional and sturdy',
    body: 'Canvas feels durable and the pockets are actually usable. Only note is that S was unavailable so I took M and it is roomy.',
    date: '2026-09-25',
    verifiedPurchase: true,
    helpfulCount: 12,
    size: 'M',
    color: 'Army Green',
  },
  {
    id: 'rev-009',
    productId: 'a-line-midi-dress',
    author: 'Maya L.',
    rating: 5,
    title: 'Perfect for the office',
    body: 'Wore it to a meeting and a dinner in the same week. The lining is not see-through which I always check first.',
    date: '2026-09-30',
    verifiedPurchase: true,
    helpfulCount: 27,
    size: 'S',
    color: 'Cream',
  },
  {
    id: 'rev-010',
    productId: 'a-line-midi-dress',
    author: 'Putri R.',
    rating: 3,
    title: 'Nice but runs short for me',
    body: 'The cut is lovely. At 165 cm it hit above my knee, so I would size up if you want more length.',
    date: '2026-08-22',
    verifiedPurchase: true,
    helpfulCount: 9,
    size: 'XS',
    color: 'Dusty Rose',
  },
  {
    id: 'rev-011',
    productId: 'minimal-crossbody-bag',
    author: 'Fajar D.',
    rating: 5,
    title: 'Bigger than expected in a good way',
    body: 'Fits a phone, wallet, keys and a small bottle. The magnetic closure is strong and the strap adjustment is smooth.',
    date: '2026-09-18',
    verifiedPurchase: true,
    helpfulCount: 14,
    color: 'Tan',
  },
  {
    id: 'rev-012',
    productId: 'relaxed-linen-shirt',
    author: 'Nadia H.',
    rating: 5,
    title: 'Breathable in Jakarta heat',
    body: 'Real linen, not a blend, and you can tell. Wears cool and the wrinkles are part of the look rather than a flaw.',
    date: '2026-09-08',
    verifiedPurchase: true,
    helpfulCount: 21,
    size: 'M',
    color: 'Sage',
  },
  {
    id: 'rev-013',
    productId: 'high-waist-wide-leg-pants',
    author: 'Intan C.',
    rating: 5,
    title: 'Elongates perfectly',
    body: 'The high waist and drape do exactly what the photos suggest. I am 160 cm and it falls to the floor.',
    date: '2026-09-27',
    verifiedPurchase: true,
    helpfulCount: 18,
    size: 'M',
    color: 'Black',
  },
];

/** Review summaries for products that have no written reviews yet. */
const fallbackBreakdowns: Record<string, RatingBreakdown> = {
  default: {
    average: 4.8,
    total: 24,
    distribution: [
      { stars: 5, percent: 74 },
      { stars: 4, percent: 17 },
      { stars: 3, percent: 5 },
      { stars: 2, percent: 2 },
      { stars: 1, percent: 2 },
    ],
  },
};

export function getReviewsForProduct(productId: string): Review[] {
  return reviews
    .filter((review) => review.productId === productId)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getRatingBreakdown(product: Product): RatingBreakdown {
  const productReviews = getReviewsForProduct(product.id);

  if (productReviews.length === 0) {
    return {
      average: product.rating,
      total: product.reviewCount,
      distribution: fallbackBreakdowns.default.distribution,
    };
  }

  // Scale the written-review distribution up to the product's full review count.
  const distribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = productReviews.filter((r) => r.rating === stars).length;
    return {
      stars,
      percent: Math.round((count / productReviews.length) * 100),
    };
  });

  return {
    average: product.rating,
    total: product.reviewCount,
    distribution,
  };
}