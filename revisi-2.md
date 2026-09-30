# Product Requirements Document (PRD)

# Fashion Template V2 — Roquace

**Project:** Roquace Fashion Template
**Version:** 2.0
**Status:** Revision / Enhancement
**Framework:** Astro
**Primary Goal:** Premium, reusable, conversion-oriented fashion website template
**Target User:** UMKM fashion, clothing brand, independent fashion designer, boutique, streetwear brand, local fashion brand

---

# 1. Product Overview

Roquace Fashion Template adalah template website fashion modern yang dirancang untuk membantu brand fashion memiliki website profesional tanpa harus membangun website dari awal.

Versi V2 merupakan pengembangan dari landing page saat ini dengan fokus pada:

* Premium visual experience
* Mobile-first design
* Better ecommerce experience
* Conversion optimization
* WhatsApp commerce
* SEO
* Performance
* Reusability
* Easy customization
* White-label usage

Template harus dapat digunakan ulang oleh berbagai brand fashion hanya dengan mengganti konfigurasi, konten, gambar, produk, warna, dan informasi bisnis.

---

# 2. Product Goals

## Primary Goals

1. Meningkatkan kualitas visual website.
2. Membuat website terasa seperti fashion ecommerce profesional.
3. Menambahkan product browsing dan product detail experience.
4. Mempermudah customer melakukan pembelian melalui WhatsApp.
5. Mengoptimalkan website untuk mobile.
6. Membuat template mudah dikustomisasi oleh pembeli.
7. Memastikan SEO dan performance sudah siap digunakan.
8. Menjadikan template layak dijual sebagai produk digital.

## Secondary Goals

* Meningkatkan trust terhadap brand.
* Meningkatkan conversion rate.
* Menampilkan produk secara lebih menarik.
* Memudahkan brand mengganti konten tanpa mengubah component.
* Menyediakan struktur yang dapat dikembangkan menjadi ecommerce penuh.

---

# 3. Target Audience

## Primary

### Fashion UMKM

Contoh:

* Clothing brand
* Streetwear
* Local fashion
* Hijab brand
* Women's fashion
* Men's fashion
* Boutique
* Accessories brand

## Secondary

* Fashion designer
* Independent designer
* Small apparel company
* Clothing startup
* Personal brand

---

# 4. Design Direction

## Visual Style

Website harus mempertahankan karakter:

* Minimal
* Modern
* Premium
* Editorial
* Elegant
* Clean
* Fashion-forward

## Design Principle

> Less interface, more product.

UI tidak boleh mengambil perhatian lebih besar daripada produk.

## Animation

Gunakan animasi secara subtle:

* Fade in
* Image reveal
* Smooth hover
* Scroll reveal
* Product image transition
* Horizontal editorial movement
* Page transition

Hindari:

* Excessive bouncing
* Excessive parallax
* Cursor gimmicks
* Excessive loading animation
* Animation yang mengganggu usability

---

# 5. Information Architecture

Struktur website V2:

```text
Home
│
├── Shop
│   ├── All Products
│   ├── Women
│   ├── Men
│   ├── Accessories
│   └── New Arrivals
│
├── Product Detail
│
├── Collections
│
├── Lookbook
│
├── About
│
├── FAQ
│
└── Contact / WhatsApp
```

---

# 6. Homepage

## 6.1 Announcement Bar

Tambahkan announcement bar di bagian paling atas.

Contoh:

> FREE SHIPPING ON ORDERS OVER RP500K

atau:

> NEW COLLECTION — AUTUMN 2026

### Requirements

* Dapat diaktifkan/nonaktifkan.
* Text configurable.
* CTA configurable.
* Bisa digunakan untuk promotion.

---

# 6.2 Navbar

Navbar harus diperbarui.

### Desktop

```text
LOGO

Shop
Collections
Lookbook
About
FAQ

Search
Account
Cart
```

### Mobile

```text
☰      LOGO      Cart
```

### Requirements

* Sticky navbar.
* Transparent navbar pada hero.
* Navbar berubah background ketika scrolling.
* Responsive.
* Mobile menu.
* Search trigger.
* Cart indicator.
* Smooth transition.

---

# 6.3 Hero Section

Hero harus menjadi focal point utama.

### Content

* Large editorial image/video
* Eyebrow
* Headline
* Description
* Primary CTA
* Secondary CTA

Contoh:

```text
NEW COLLECTION

Wear Your Identity.

Contemporary fashion designed
for everyday expression.

[ Shop Collection ]
[ Explore Lookbook ]
```

### Requirements

* Responsive image.
* Optimized image loading.
* Mobile-specific image support.
* Optional video background.
* CTA configurable.

---

# 6.4 Trust / Brand Metrics

Tambahkan section setelah hero.

Contoh:

```text
10K+
Happy Customers

4.9/5
Customer Rating

50+
Products

Fast
Shipping
```

### Requirements

* Semua data configurable.
* Bisa menampilkan 3–4 metrics.
* Tidak menggunakan angka palsu pada production deployment.

---

# 6.5 Featured Collection

Menampilkan koleksi utama.

```text
Featured Collection

[ Product ]
[ Product ]
[ Product ]
[ Product ]

View All →
```

### Product Card

Setiap product card harus memiliki:

* Image
* Product name
* Price
* Badge
* Rating
* Color options
* Wishlist
* Quick view
* Add to cart

### Badge

Supported:

* New
* Best Seller
* Sale
* Limited
* Sold Out

---

# 6.6 Shop by Category

Kategori:

* Women
* Men
* Accessories
* New Arrivals

Setiap kategori menggunakan editorial photography.

### Requirements

* Image overlay.
* Category name.
* Short description.
* CTA.
* Hover animation.

---

# 6.7 Brand Story

Section:

> Crafted with Purpose.

Content:

* Brand philosophy
* Origin
* Design philosophy
* Quality statement

Tambahkan:

* Editorial image
* Optional founder image
* CTA About Us

---

# 6.8 Why Choose Us

Empat value utama:

```text
01
Quality Material

02
Local Crafted

03
Timeless Design

04
Made for Everyday
```

### Requirements

Setiap item memiliki:

* Number
* Title
* Description
* Optional icon
* Hover interaction

---

# 6.9 Lookbook

Lookbook menjadi signature section.

### Layout

Gunakan editorial layout:

```text
STYLE
IN
FOCUS

Large Image

01 Image
02 Image
03 Image
```

### Requirements

* Full-width imagery.
* Horizontal scrolling.
* Image hover.
* Collection title.
* Season/year.
* CTA.
* Responsive mobile layout.

---

# 6.10 New Arrivals

Section khusus produk terbaru.

### Features

* Product carousel/grid.
* New badge.
* Quick add.
* Product hover.
* View all CTA.

---

# 6.11 Testimonials

Testimonials harus memiliki:

* Customer name
* Customer image
* Review
* Rating
* Product purchased
* Verified Buyer badge

Contoh:

```text
★★★★★

"Materialnya bagus dan cutting-nya
sesuai dengan foto."

Rina
Verified Buyer

Purchased:
Oversized Essential Tee
```

---

# 6.12 Instagram Section

Buat Instagram-style grid.

```text
FOLLOW @ROQUACE

[ Image ][ Image ][ Image ][ Image ][ Image ]

Follow Instagram →
```

### Requirements

* 4–6 images.
* Hover overlay.
* Instagram icon.
* Link configurable.
* Mobile horizontal scroll.

---

# 6.13 FAQ

FAQ menggunakan accordion.

### Minimum FAQ

1. How do I choose my size?
2. How can I place an order?
3. Do you accept COD?
4. How long does shipping take?
5. What payment methods are available?
6. Can I return my order?
7. How can I track my order?

---

# 6.14 Final CTA

Headline:

> Find Your Next Favorite.

CTA:

```text
[ Shop Collection ]
[ Chat via WhatsApp ]
```

WhatsApp CTA harus configurable.

---

# 6.15 Newsletter

Tambahkan newsletter section.

Fields:

* Email

CTA:

> Subscribe

Optional copy:

> Join our community and get updates on new drops and exclusive offers.

---

# 6.16 Footer

Footer:

```text
Brand
Short description

Shop
Collections
New Arrivals
Best Sellers

Company
About
Contact
FAQ

Support
Shipping
Returns
Size Guide

Social
Instagram
TikTok
Pinterest

Legal
Privacy Policy
Terms & Conditions
```

---

# 7. Shop Page

Buat halaman `/shop`.

## Features

* Product grid
* Category filter
* Price filter
* Size filter
* Color filter
* Availability filter
* Search
* Sorting
* Pagination/load more

### Sorting

```text
Featured
Newest
Price: Low to High
Price: High to Low
Best Selling
```

---

# 8. Search

Search harus tersedia pada desktop dan mobile.

## Search Flow

```text
User clicks Search
        ↓
Search overlay
        ↓
Input keyword
        ↓
Search products
        ↓
Search result
```

### Example

```text
Search "hoodie"

3 products found

Classic Hoodie
Urban Hoodie
Essential Hoodie
```

---

# 9. Product Detail Page

Route:

```text
/products/[slug]
```

## Layout

```text
Product Gallery     Product Information

                    Product Name
                    Rating
                    Price
                    Description

                    Color
                    Size

                    Size Guide

                    Add to Cart
                    WhatsApp Order

                    Description
                    Material
                    Shipping
                    Returns
```

## Required Features

* Image gallery.
* Thumbnail navigation.
* Zoom.
* Product title.
* Price.
* Discount price.
* Rating.
* Reviews.
* Color selection.
* Size selection.
* Quantity.
* Add to cart.
* WhatsApp order.
* Wishlist.
* Size guide.
* Product details.
* Material.
* Shipping information.
* Return information.

---

# 10. Size Guide

Size guide harus tersedia pada product detail.

Example:

| Size | Chest | Length |
| ---- | ----: | -----: |
| S    | 52 cm |  68 cm |
| M    | 55 cm |  70 cm |
| L    | 58 cm |  72 cm |
| XL   | 61 cm |  74 cm |

### Requirements

* Modal.
* Responsive table.
* Configurable.
* Optional measurement guide image.

---

# 11. Shopping Cart

Cart harus mendukung:

* Add product
* Remove product
* Increase quantity
* Decrease quantity
* Product subtotal
* Total
* Empty cart state

Example:

```text
YOUR CART

Oversized Essential Tee
Black / M

Rp249.000

[-] 1 [+]

Subtotal
Rp249.000

[ Checkout via WhatsApp ]
```

---

# 12. WhatsApp Commerce

WhatsApp merupakan salah satu fitur utama template.

## Product WhatsApp

CTA:

> Order via WhatsApp

Message otomatis:

```text
Hi, I am interested in:

Product:
Oversized Essential Tee

Color:
Black

Size:
M

Quantity:
1

Price:
Rp249.000
```

## Cart WhatsApp

Jika cart memiliki beberapa produk:

```text
Hi, I would like to order:

1. Oversized Essential Tee
   Black / M
   Qty: 1

2. Classic Hoodie
   Grey / L
   Qty: 1

Total:
Rp698.000
```

Nomor WhatsApp harus configurable.

---

# 13. Wishlist

User dapat menyimpan produk.

### Requirements

* Heart button.
* Active state.
* LocalStorage.
* Wishlist count.
* Wishlist page/overlay.

Tidak membutuhkan login untuk V1.

---

# 14. Quick View

Ketika user melakukan hover/click product:

```text
Quick View

Product Image

Product Name
Price
Rating

Color
Size

[ Add to Cart ]
[ View Details ]
```

---

# 15. Mobile Experience

Mobile-first adalah requirement utama.

### Mobile Navbar

```text
☰     LOGO     🛒
```

### Mobile Product Grid

2-column layout.

### Mobile CTA

Sticky bottom CTA:

```text
[ Add to Cart ] [ WhatsApp ]
```

### Requirements

* Touch-friendly controls.
* Minimum 44px interactive area.
* No horizontal overflow.
* Optimized images.
* Fast loading.

---

# 16. Responsive Breakpoints

Target:

```text
Mobile
320px – 767px

Tablet
768px – 1023px

Desktop
1024px+

Large Desktop
1440px+
```

---

# 17. Configuration System

Template harus menggunakan centralized configuration.

Contoh:

```text
src/config/site.ts
```

Isi:

```ts
export const siteConfig = {
  brandName: "Roquace",
  tagline: "Wear Your Identity.",
  description: "...",

  contact: {
    whatsapp: "",
    email: "",
    address: ""
  },

  social: {
    instagram: "",
    tiktok: "",
    pinterest: ""
  },

  currency: "IDR"
}
```

---

# 18. Product Data System

Products harus dipisahkan dari component.

```text
src/data/products.ts
```

Contoh struktur:

```ts
{
  id: "oversized-essential-tee",
  name: "Oversized Essential Tee",
  slug: "oversized-essential-tee",
  price: 249000,
  category: "men",
  badge: "Best Seller",
  images: [],
  colors: [],
  sizes: [],
  description: "",
  material: "",
  rating: 4.9,
  reviews: 32,
  stock: true
}
```

---

# 19. Content Configuration

Pisahkan:

```text
site.ts
products.ts
categories.ts
collections.ts
testimonials.ts
faq.ts
navigation.ts
social.ts
```

Tujuannya agar pembeli template tidak perlu mengubah component.

---

# 20. Theme Configuration

Buat centralized theme.

```text
theme.ts
```

Configurable:

* Primary color
* Background
* Text
* Accent
* Border
* Font
* Radius
* Container width

---

# 21. SEO

Setiap halaman harus memiliki:

* Title
* Meta description
* Canonical
* Open Graph
* Twitter/X card
* Robots
* Sitemap

## Structured Data

Implementasikan:

* Organization
* Product
* Breadcrumb
* FAQ
* Website

---

# 22. Performance

Target Lighthouse:

```text
Performance: 90+
Accessibility: 90+
Best Practices: 90+
SEO: 95+
```

## Optimization

* AVIF/WebP.
* Responsive images.
* Lazy loading.
* Font optimization.
* Minimize JavaScript.
* Avoid unnecessary dependencies.
* Code splitting.
* Preload critical assets.
* Optimize animations.

---

# 23. Accessibility

Target WCAG 2.2 AA.

Requirements:

* Semantic HTML.
* Keyboard navigation.
* Visible focus state.
* Alt text.
* Proper heading hierarchy.
* Accessible buttons.
* Accessible modal.
* Accessible accordion.
* Sufficient contrast.
* Screen reader support.

---

# 24. Loading & Error States

## Loading

Gunakan skeleton pada:

* Product
* Search
* Cart

## Empty State

Contoh:

```text
YOUR CART IS EMPTY

Discover something you love.

[ Shop Collection ]
```

## Error State

Contoh:

```text
Something went wrong.

Please try again.

[ Retry ]
```

---

# 25. 404 Page

Buat custom 404.

```text
404

Looks like this page
walked off the runway.

[ Back Home ]
[ Shop Collection ]
```

Tetap mempertahankan visual branding.

---

# 26. Security

Requirements:

* Jangan expose secret key.
* Jangan menyimpan API key di frontend.
* Sanitize user input.
* WhatsApp URL harus di-encode.
* External links menggunakan safe attributes jika diperlukan.

---

# 27. Browser Compatibility

Support:

* Chrome
* Edge
* Firefox
* Safari

Desktop dan mobile.

---

# 28. Project Structure

Recommended:

```text
src/
│
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── hero/
│   ├── product/
│   ├── collection/
│   ├── lookbook/
│   ├── testimonial/
│   ├── faq/
│   ├── cart/
│   └── common/
│
├── pages/
│   ├── index.astro
│   ├── shop/
│   ├── products/
│   ├── collections/
│   ├── lookbook.astro
│   ├── about.astro
│   ├── faq.astro
│   └── 404.astro
│
├── data/
│   ├── site.ts
│   ├── products.ts
│   ├── categories.ts
│   ├── collections.ts
│   ├── testimonials.ts
│   └── faq.ts
│
├── config/
│   └── theme.ts
│
├── layouts/
│
├── styles/
│
└── utils/
    ├── whatsapp.ts
    ├── currency.ts
    └── cart.ts
```

---

# 29. Technology Stack

## Frontend

* Astro
* TypeScript
* Tailwind CSS

## Client-side Interaction

Gunakan JavaScript hanya ketika diperlukan.

Potential:

* Astro Islands
* Alpine.js atau vanilla TypeScript
* LocalStorage untuk cart/wishlist

Hindari framework tambahan jika tidak diperlukan.

---

# 30. Data Storage

V2 tidak membutuhkan database untuk demo/template dasar.

Gunakan:

```text
Static Data
+
LocalStorage
```

untuk:

* Cart
* Wishlist

Backend/database dapat menjadi versi lanjutan.

---

# 31. Analytics

Template harus menyediakan integration point untuk analytics.

Optional:

* Google Analytics
* Google Tag Manager
* Meta Pixel

Configuration harus dapat diaktifkan/nonaktifkan.

---

# 32. Deployment

Template harus siap deploy ke:

* Vercel
* Netlify
* Cloudflare Pages
* Static hosting

Build command:

```bash
npm run build
```

Output:

```text
dist/
```

---

# 33. Documentation

Karena template akan dijual, dokumentasi merupakan bagian wajib.

Dokumentasi harus menjelaskan:

## Installation

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Customization

Jelaskan cara mengubah:

* Brand name
* Logo
* Colors
* Fonts
* Products
* Prices
* Images
* WhatsApp
* Instagram
* Testimonials
* FAQ

## Deployment

Panduan:

* Vercel
* Netlify
* Cloudflare Pages

---

# 34. Content Requirements

Template harus menggunakan dummy content yang mudah diganti.

Jangan menggunakan data bisnis nyata yang tidak dapat digunakan oleh pembeli.

Gunakan:

```text
Demo Brand
Demo Product
Demo Customer
Demo Address
Demo Email
Demo WhatsApp
```

---

# 35. Image Requirements

Semua image harus:

* Optimized.
* Responsive.
* Proper aspect ratio.
* Descriptive alt text.
* Replaceable.

Gunakan struktur:

```text
/public/images/
├── hero/
├── products/
├── categories/
├── lookbook/
├── testimonials/
└── instagram/
```

---

# 36. Conversion Requirements

CTA utama:

```text
Shop Collection
```

CTA sekunder:

```text
Explore Lookbook
```

CTA commerce:

```text
Add to Cart
```

CTA direct:

```text
Order via WhatsApp
```

CTA support:

```text
Chat with Us
```

---

# 37. Conversion Flow

Primary:

```text
Landing Page
      ↓
Product
      ↓
Product Detail
      ↓
Add to Cart
      ↓
WhatsApp
```

Alternative:

```text
Landing Page
      ↓
Product
      ↓
Order via WhatsApp
```

---

# 38. UX Requirements

User harus dapat:

* Menemukan produk maksimal dalam beberapa klik.
* Mengetahui harga tanpa membuka product detail.
* Mengetahui status produk.
* Mengetahui ukuran.
* Mengetahui informasi shipping.
* Mengetahui cara order.
* Menghubungi brand dengan cepat.
* Mengakses website dengan nyaman melalui mobile.

---

# 39. Priority Matrix

## P0 — Must Have

* Responsive design
* Improved navbar
* Shop page
* Product detail
* Product card
* Search
* Cart
* WhatsApp commerce
* Mobile optimization
* SEO
* Performance
* Configuration system

## P1 — Should Have

* Wishlist
* Quick view
* Size guide
* Reviews
* Instagram grid
* Trust metrics
* Announcement bar
* Lookbook enhancement
* Custom 404

## P2 — Nice to Have

* Dark mode
* Product comparison
* Advanced filtering
* Customer account
* Backend CMS
* Payment gateway
* Order management

---

# 40. Acceptance Criteria

Project dianggap selesai apabila:

### Visual

* [ ] Website terlihat premium.
* [ ] Layout konsisten.
* [ ] Typography konsisten.
* [ ] Product photography memiliki kualitas baik.
* [ ] Animasi tidak mengganggu usability.

### Responsive

* [ ] Mobile 320px berjalan.
* [ ] Tablet berjalan.
* [ ] Desktop berjalan.
* [ ] Tidak ada horizontal overflow.
* [ ] Navigation mobile berfungsi.

### Ecommerce

* [ ] Product listing berfungsi.
* [ ] Product detail berfungsi.
* [ ] Search berfungsi.
* [ ] Filter berfungsi.
* [ ] Cart berfungsi.
* [ ] Quantity dapat diubah.
* [ ] Wishlist berfungsi.
* [ ] WhatsApp order berfungsi.

### SEO

* [ ] Metadata tersedia.
* [ ] Sitemap tersedia.
* [ ] Robots tersedia.
* [ ] Canonical tersedia.
* [ ] Structured data tersedia.
* [ ] Image alt tersedia.

### Performance

* [ ] Lighthouse Performance ≥90.
* [ ] Lighthouse Accessibility ≥90.
* [ ] Lighthouse Best Practices ≥90.
* [ ] Lighthouse SEO ≥95.

### Template

* [ ] Brand dapat diganti melalui config.
* [ ] Produk dapat diganti melalui data file.
* [ ] Warna dapat diganti melalui theme.
* [ ] Social media dapat diganti.
* [ ] WhatsApp dapat diganti.
* [ ] Konten FAQ dapat diganti.
* [ ] Dokumentasi tersedia.

---

# 41. V2 Final User Journey

```text
                    HOME
                      │
          ┌───────────┴───────────┐
          │                       │
       SHOP                    LOOKBOOK
          │                       │
      PRODUCTS                COLLECTION
          │
   PRODUCT DETAIL
          │
    ┌─────┴─────┐
    │           │
   CART      WHATSAPP
    │           │
    └─────┬─────┘
          │
       CHECKOUT
```

---

# 42. Final Product Positioning

Roquace V2 harus diposisikan sebagai:

> **Premium Fashion Website Template for Modern Brands**

Dengan selling points:

* Modern Fashion Design
* Mobile First
* WhatsApp Commerce
* Product Catalog
* Shopping Cart
* SEO Ready
* Performance Optimized
* Easy to Customize
* Astro Powered
* Ready for Vercel / Netlify / Cloudflare

---

# 43. Definition of Done

Roquace Fashion Template V2 dianggap selesai apabila:

1. Semua P0 requirements selesai.
2. Homepage selesai.
3. Shop page selesai.
4. Product detail selesai.
5. Cart selesai.
6. WhatsApp commerce selesai.
7. Responsive testing selesai.
8. SEO implementation selesai.
9. Performance optimization selesai.
10. Accessibility testing selesai.
11. Configuration system selesai.
12. Documentation selesai.
13. Demo content selesai.
14. Deployment berhasil.
15. Tidak terdapat critical UI/UX bug.

---

# 44. Future Version

Fitur berikut tidak termasuk V2 tetapi dapat dikembangkan menjadi V3:

* WordPress CMS integration
* Supabase backend
* Authentication
* Customer dashboard
* Real ecommerce checkout
* Payment gateway
* Inventory management
* Order management
* Admin dashboard
* CMS product management
* Multi-language
* Multi-currency
* Customer reviews backend

---

# 45. Success Metrics

Untuk versi template yang dijual, keberhasilan dapat diukur melalui:

* Demo-to-purchase conversion.
* Template sales.
* Download rate.
* Documentation success rate.
* Deployment success rate.
* Customer support requests.
* Lighthouse performance.
* Mobile usability.
* Customer customization time.

Target teknis:

```text
Performance      ≥ 90
Accessibility    ≥ 90
Best Practices   ≥ 90
SEO              ≥ 95
Mobile UX        Excellent
Build            0 errors
TypeScript       0 errors
Critical Bugs    0
```

---

# 46. Summary

Roquace V2 bukan hanya mempercantik landing page yang sudah ada.

Tujuan utama revisi adalah mengubah website menjadi:

```text
Fashion Landing Page
        +
Product Catalog
        +
Product Detail
        +
Shopping Cart
        +
WhatsApp Commerce
        +
SEO
        +
Performance
        +
Reusable Template
```

Dengan pendekatan ini, template dapat digunakan oleh berbagai brand fashion tanpa membutuhkan perubahan besar pada source code.

**Final positioning:**

> **A premium, conversion-focused, reusable fashion website template built for modern brands and small businesses.**