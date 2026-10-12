export const siteConfig = {
  // Brand Information
  name: "Roquace",
  tagline: "Carry Your Story.",
  description: "Premium canvas bags designed for everyday adventures. Durable, sustainable, and crafted with purpose.",
  
  // Contact
  contact: {
    whatsapp: "628123456789",
    email: "hello@roquace.com",
    address: "Jakarta, Indonesia",
  },

  // Social Media
  social: {
    instagram: "https://instagram.com/roquace",
    instagramHandle: "@roquace",
    tiktok: "https://tiktok.com/@roquace",
    tiktokHandle: "@roquace",
    pinterest: "https://pinterest.com/roquace",
    pinterestHandle: "@roquace",
  },

  // Currency & Pricing
  currency: "IDR",
  currencySymbol: "Rp",
  currencyLocale: "id-ID",

  // Shipping
  shipping: {
    freeShippingMinimum: 500000,
    estimatedDays: "3-5 business days",
  },

  // Announcement Bar
  announcement: {
    text: "FREE SHIPPING ON ORDERS OVER RP500K",
    ctaText: "Shop Now",
    ctaLink: "/shop",
    enabled: true,
  },

  // Hero Section
  hero: {
    eyebrow: "Canvas Collection",
    headline: "Carry Your",
    headlineAccent: "Adventure.",
    subcopy: "Sustainable canvas bags crafted for life on the move.",
    offerPills: [
      "FREE SHIPPING ON ORDERS OVER RP500K",
      "COD · Tukar 7 Hari",
    ],
    shopTheLookProductId: "classic-canvas-tote",
    primaryCta: { href: "/shop", label: "Shop Bags" },
    secondaryCta: { href: "/about", label: "Our Story" },
  },

  // Navigation Links
  navigation: {
    main: [
      { href: '/shop', label: 'Shop' },
      { href: '/collections', label: 'Collections' },
      { href: '/lookbook', label: 'Lookbook' },
      { href: '/about', label: 'About' },
      { href: '/faq', label: 'FAQ' },
    ],
    footer: {
      shop: [
        { href: '/shop', label: 'All Bags' },
        { href: '/shop/tote', label: 'Tote Bags' },
        { href: '/shop/crossbody', label: 'Crossbody' },
        { href: '/shop/messenger', label: 'Messenger' },
        { href: '/shop/new-arrivals', label: 'New Arrivals' },
        { href: '/shop?filter=Best+Seller', label: 'Best Sellers' },
      ],
      company: [
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
        { href: '/faq', label: 'FAQ' },
      ],
      support: [
        { href: '/shipping-returns', label: 'Shipping & Returns' },
        { href: '/size-guide', label: 'Bag Dimensions' },
      ],
      legal: [
        { href: '/privacy', label: 'Privacy Policy' },
        { href: '/terms', label: 'Terms & Conditions' },
      ],
    },
  },

  // Brand Metrics (Trust Section)
  metrics: {
    customers: "10K+",
    customersLabel: "Happy Customers",
    rating: "4.9/5",
    ratingLabel: "Customer Rating",
    products: "50+",
    productsLabel: "Products",
    shipping: "Fast",
    shippingLabel: "Shipping",
  },

  // SEO Defaults
  seo: {
    siteName: "Roquace",
    twitterHandle: "@roquace",
    defaultOgImage: "/images/og-default.jpg",
  },

  // Analytics (optional - can be enabled/disabled)
  analytics: {
    googleAnalyticsId: "",
    googleTagManagerId: "",
    metaPixelId: "",
    enabled: false,
  },
};
