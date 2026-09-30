# Roquace Fashion Template V2 — Todo List

**Status:** Revision / Enhancement
**Framework:** Astro
**Last Updated:** 2026-09-30

---

## P0 — Must Have

### Configuration System
- [x] Create `src/config/site.ts` — centralized site configuration (brand name, tagline, description, contact, social, currency)
- [x] Create `src/config/theme.ts` — theme configuration (colors, fonts, radius, container width)
- [x] Create `src/data/products.ts` — product data structure
- [x] Create `src/data/categories.ts` — category data
- [x] Create `src/data/collections.ts` — collection data
- [x] Create `src/data/testimonials.ts` — testimonial data
- [x] Create `src/data/faq.ts` — FAQ data
- [x] Create `src/data/navigation.ts` — navigation links
- [x] Create `src/data/social.ts` — social media links

### Layout & Navigation
- [x] Update Navbar — sticky, transparent on hero, background change on scroll
- [x] Create mobile menu
- [x] Add search trigger
- [x] Add cart indicator with count
- [x] Implement smooth transition

### Homepage Sections
- [x] Create Announcement Bar — configurable text, CTA, enable/disable
- [x] Update Hero Section — editorial image/video, eyebrow, headline, description, primary & secondary CTA
- [x] Create Trust/Brand Metrics section — configurable metrics (customers, rating, products, shipping)
- [ ] Create Featured Collection section — product grid with View All CTA
- [x] Create Product Card component — image, name, price, badge, rating, color options, wishlist, quick view, add to cart
- [ ] Create Shop by Category section — Women, Men, Accessories, New Arrivals
- [ ] Create Brand Story section — philosophy, editorial image, CTA
- [ ] Create Why Choose Us section — 4 value items with number, title, description
- [ ] Update Lookbook section — editorial layout, horizontal scroll, collection title
- [ ] Create New Arrivals section — product carousel/grid with New badge
- [ ] Create Testimonials section — customer name, image, review, rating, verified buyer badge
- [ ] Create Instagram Section — 4-6 images grid, hover overlay, Instagram link
- [ ] Create FAQ section — accordion with minimum 7 questions
- [ ] Create Final CTA section — headline, Shop Collection & WhatsApp CTAs
- [ ] Create Newsletter section — email input, subscribe CTA
- [x] Update Footer — brand info, shop links, company links, support links, social links, legal links

### Shop Page
- [x] Create `/shop` page
- [x] Implement product grid layout
- [x] Create category filter
- [ ] Create price filter
- [ ] Create size filter
- [ ] Create color filter
- [ ] Create availability filter
- [x] Implement search functionality
- [x] Create sorting (Featured, Newest, Price Low-High, Price High-Low, Best Selling)
- [ ] Implement pagination or load more

### Search
- [x] Create search overlay
- [x] Implement search functionality
- [ ] Display search results

### Product Detail Page
- [x] Create `/products/[slug]` page
- [x] Create image gallery with thumbnails
- [x] Implement image zoom
- [x] Display product title, price, discount price, rating
- [x] Create color selection
- [x] Create size selection
- [x] Create quantity selector
- [x] Create Add to Cart button
- [x] Create WhatsApp Order button
- [x] Create Wishlist button
- [x] Create Size Guide modal
- [x] Display product details, material, shipping info, return info

### Size Guide
- [x] Create Size Guide modal
- [x] Create responsive size table
- [x] Make configurable per product

### Shopping Cart
- [x] Create Cart component/overlay
- [x] Implement add product to cart
- [x] Implement remove product from cart
- [x] Implement quantity increase/decrease
- [x] Display product subtotal and total
- [x] Create empty cart state
- [x] Implement LocalStorage persistence

### WhatsApp Commerce
- [x] Create WhatsApp order message generator for single product
- [x] Create WhatsApp order message generator for cart
- [x] Make WhatsApp number configurable

### Mobile Optimization
- [ ] Implement mobile-first responsive design
- [ ] Create mobile navbar (hamburger, logo, cart)
- [ ] Implement 2-column product grid on mobile
- [ ] Create sticky bottom CTA on product detail
- [ ] Ensure touch-friendly controls (min 44px interactive area)
- [ ] Eliminate horizontal overflow

### Responsive Design
- [ ] Mobile (320px – 767px) testing
- [ ] Tablet (768px – 1023px) testing
- [ ] Desktop (1024px+) testing
- [ ] Large Desktop (1440px+) testing

### SEO
- [ ] Add meta title for all pages
- [ ] Add meta description for all pages
- [ ] Add canonical URLs
- [ ] Add Open Graph tags
- [ ] Add Twitter/X card tags
- [ ] Create robots.txt
- [ ] Create sitemap.xml
- [ ] Implement Organization structured data
- [ ] Implement Product structured data
- [ ] Implement Breadcrumb structured data
- [ ] Implement FAQ structured data
- [ ] Implement Website structured data

### Performance
- [ ] Implement AVIF/WebP image format
- [ ] Implement responsive images
- [ ] Implement lazy loading for images
- [ ] Optimize font loading
- [ ] Minimize JavaScript
- [ ] Implement code splitting
- [ ] Preload critical assets
- [ ] Optimize animations
- [ ] Target: Lighthouse Performance ≥90

### Accessibility
- [ ] Use semantic HTML
- [ ] Implement keyboard navigation
- [ ] Add visible focus states
- [ ] Add alt text to all images
- [ ] Ensure proper heading hierarchy
- [ ] Create accessible buttons
- [ ] Create accessible modals
- [ ] Create accessible accordions
- [ ] Ensure sufficient color contrast
- [ ] Target: Lighthouse Accessibility ≥90

### Utils
- [x] Create `src/utils/whatsapp.ts` — WhatsApp message generator
- [x] Create `src/utils/currency.ts` — currency formatter
- [x] Create `src/utils/cart.ts` — cart utilities

---

## P1 — Should Have

### Wishlist
- [ ] Create Wishlist button on product card
- [ ] Create Wishlist active state
- [ ] Implement LocalStorage for wishlist
- [ ] Display wishlist count in navbar
- [ ] Create wishlist page or overlay

### Quick View
- [ ] Create Quick View modal
- [ ] Display product image, name, price, rating
- [ ] Add color and size selection
- [ ] Add to Cart and View Details buttons

### Reviews
- [ ] Create reviews display on product detail
- [ ] Show rating summary

### Announcement Bar Enhancement
- [ ] Add promotion support
- [ ] Make fully configurable

### Lookbook Enhancement
- [ ] Improve editorial layout
- [ ] Add horizontal scrolling
- [ ] Add collection title and season/year
- [ ] Add CTA

### Custom 404
- [ ] Create custom 404 page with brand styling
- [ ] Add Back Home and Shop Collection CTAs

### Loading & Error States
- [ ] Create skeleton loaders for products
- [ ] Create skeleton for search
- [ ] Create skeleton for cart
- [ ] Create empty state for cart
- [ ] Create error state with retry button

### Analytics Integration
- [ ] Add Google Analytics integration point
- [ ] Add Google Tag Manager integration point
- [ ] Add Meta Pixel integration point
- [ ] Make analytics configurable (enable/disable)

---

## P2 — Nice to Have

- [ ] Dark mode support
- [ ] Product comparison feature
- [ ] Advanced filtering (multiple filters combined)
- [ ] Customer account system
- [ ] Backend CMS integration
- [ ] Payment gateway integration
- [ ] Order management system

---

## Documentation

- [ ] Create README.md with installation instructions
- [ ] Document build and preview commands
- [ ] Create customization guide (brand, logo, colors, fonts)
- [ ] Create product/content update guide
- [ ] Create deployment guide (Vercel, Netlify, Cloudflare Pages)

---

## Demo Content

- [ ] Replace all content with demo/placeholder data
- [ ] Create demo brand name
- [ ] Create demo products
- [ ] Create demo customers/testimonials
- [ ] Create demo address, email, WhatsApp

---

## Deployment

- [ ] Test build command: `npm run build`
- [ ] Test on Vercel
- [ ] Test on Netlify
- [ ] Test on Cloudflare Pages
- [ ] Verify static output in `dist/`

---

## Final Checklist

### Visual
- [ ] Website looks premium
- [ ] Layout is consistent
- [ ] Typography is consistent
- [ ] Animations don't interfere with usability

### Ecommerce
- [ ] Product listing works
- [ ] Product detail works
- [ ] Search works
- [ ] Filter works
- [ ] Cart works
- [ ] Quantity can be changed
- [ ] Wishlist works
- [ ] WhatsApp order works

### Template
- [ ] Brand can be changed via config
- [ ] Products can be changed via data file
- [ ] Colors can be changed via theme
- [ ] Social media can be changed
- [ ] WhatsApp can be changed
- [ ] FAQ content can be changed
- [ ] Documentation is available

### Lighthouse Targets
- [ ] Performance ≥ 90
- [ ] Accessibility ≥ 90
- [ ] Best Practices ≥ 90
- [ ] SEO ≥ 95
- [ ] Build has 0 errors
- [ ] TypeScript has 0 errors
- [ ] Critical Bugs = 0

---

## Definition of Done

- [ ] All P0 requirements completed
- [ ] Homepage completed
- [ ] Shop page completed
- [ ] Product detail completed
- [ ] Cart completed
- [ ] WhatsApp commerce completed
- [ ] Responsive testing completed
- [ ] SEO implementation completed
- [ ] Performance optimization completed
- [ ] Accessibility testing completed
- [ ] Configuration system completed
- [ ] Documentation completed
- [ ] Demo content completed
- [ ] Deployment successful
- [ ] No critical UI/UX bugs
