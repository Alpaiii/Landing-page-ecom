export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order?: number;
}

export const faqItems: FAQItem[] = [
  {
    id: "sizing",
    question: "How do I choose my size?",
    answer: "We recommend referring to our Size Guide available on each product page. Our products generally run true to size, but specific fit information is provided in each product description. If you're between sizes, we suggest sizing up for a relaxed fit or down for a fitted look.",
    category: "Sizing",
    order: 1,
  },
  {
    id: "ordering",
    question: "How can I place an order?",
    answer: "Simply browse our products, select your preferred color and size, and add to cart. When you're ready, proceed to checkout and complete your order via WhatsApp. Our team will confirm your order and provide payment instructions within 1 business day.",
    category: "Ordering",
    order: 2,
  },
  {
    id: "cod",
    question: "Do you accept COD (Cash on Delivery)?",
    answer: "Yes, we accept COD for orders within Jabodetabek area with a maximum order value of Rp 2.000.000. For orders outside this area or above this value, we require advance payment via bank transfer or e-wallet.",
    category: "Payment",
    order: 3,
  },
  {
    id: "shipping-time",
    question: "How long does shipping take?",
    answer: "Orders within Jabodetabek typically arrive within 1-2 business days. For other areas in Java, expect 2-4 business days. For outside Java, shipping takes 3-7 business days depending on your location. You'll receive a tracking number once your order is shipped.",
    category: "Shipping",
    order: 4,
  },
  {
    id: "payment-methods",
    question: "What payment methods are available?",
    answer: "We accept bank transfers (BCA, Mandiri, BNI, BRI), e-wallets (GoPay, OVO, DANA, ShopeePay), and COD for eligible areas. Payment details will be provided after you submit your order via WhatsApp.",
    category: "Payment",
    order: 5,
  },
  {
    id: "returns",
    question: "Can I return my order?",
    answer: "Yes, we accept returns within 7 days of delivery for unworn, unwashed items with original tags attached. Sale items and accessories are final sale and cannot be returned. Return shipping costs are the responsibility of the customer unless the item is defective.",
    category: "Returns",
    order: 6,
  },
  {
    id: "tracking",
    question: "How can I track my order?",
    answer: "Once your order is shipped, you'll receive a WhatsApp message with your tracking number and a link to track your package. You can also message us anytime on WhatsApp for order updates.",
    category: "Shipping",
    order: 7,
  },
  {
    id: "exchange",
    question: "Can I exchange for a different size?",
    answer: "Yes, exchanges are allowed within 7 days of delivery for unworn items with original tags. The item must be in its original condition. Please contact us via WhatsApp to arrange an exchange. You'll need to cover the shipping cost for the exchange.",
    category: "Returns",
    order: 8,
  },
  {
    id: "international",
    question: "Do you ship internationally?",
    answer: "Currently, we only ship within Indonesia. We're working on expanding to international shipping in the future. Stay tuned to our Instagram for updates!",
    category: "Shipping",
    order: 9,
  },
  {
    id: "product-care",
    question: "How should I care for my items?",
    answer: "Care instructions vary by product. Please check the care label on each item or refer to the product description on our website. Generally, we recommend washing in cold water, avoiding bleach, and air drying when possible to maintain fabric quality.",
    category: "Product",
    order: 10,
  },
];

// Get FAQs by category
export function getFAQsByCategory(category: string): FAQItem[] {
  return faqItems.filter((item) => item.category === category);
}

// Get all FAQ categories
export function getFAQCategories(): string[] {
  const categories = new Set(faqItems.map((item) => item.category).filter(Boolean));
  return Array.from(categories) as string[];
}

// Get ordered FAQs
export function getOrderedFAQs(): FAQItem[] {
  return [...faqItems].sort((a, b) => (a.order || 0) - (b.order || 0));
}
