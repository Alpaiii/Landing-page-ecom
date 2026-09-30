export const siteConfig = {
  // Brand Information
  name: "Roquace",
  tagline: "Wear Your Identity.",
  description: "Contemporary fashion designed for everyday expression. Premium quality clothing for modern brands.",
  
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
        { href: '/shop', label: 'All Products' },
        { href: '/shop?category=women', label: 'Women' },
        { href: '/shop?category=men', label: 'Men' },
        { href: '/shop?category=accessories', label: 'Accessories' },
        { href: '/shop?filter=new', label: 'New Arrivals' },
        { href: '/shop?filter=bestseller', label: 'Best Sellers' },
      ],
      company: [
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
        { href: '/faq', label: 'FAQ' },
      ],
      support: [
        { href: '/shipping', label: 'Shipping' },
        { href: '/returns', label: 'Returns' },
        { href: '/size-guide', label: 'Size Guide' },
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
