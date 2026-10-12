# Product Requirements Document (PRD)
# Roquace Fashion — E-Commerce V2

**Version:** 2.0  
**Status:** Ready for Development  
**Product:** Roquace Fashion  
**Type:** Fashion E-Commerce Website  
**Primary Goal:** Mengembangkan Roquace dari fashion landing page menjadi full-featured fashion e-commerce website yang siap digunakan sebagai template production-ready.

---

# 1. Product Overview

Roquace adalah brand fashion dengan karakter visual minimal, modern, editorial, dan premium.

Versi saat ini sudah memiliki fondasi visual yang kuat seperti:

- Hero section
- Product showcase
- Collections
- New arrivals
- Best sellers
- Brand story
- Testimonials
- FAQ
- Newsletter
- Cart drawer
- WhatsApp ordering

Namun website masih lebih terasa sebagai **fashion landing page** dibandingkan sebagai **full e-commerce platform**.

Versi V2 akan mempertahankan identitas visual Roquace tetapi menambahkan seluruh user flow e-commerce utama:

```text
Discovery
    ↓
Browse
    ↓
Product Detail
    ↓
Add to Cart
    ↓
Cart
    ↓
Checkout
    ↓
Payment
    ↓
Order Confirmation
    ↓
Order Tracking
```

---

# 2. Goals

## Primary Goals

1. Mengubah Roquace menjadi website e-commerce lengkap.
2. Memperkuat product discovery.
3. Mempermudah user menemukan produk.
4. Memperbaiki pengalaman product detail.
5. Membuat cart dan checkout yang lebih profesional.
6. Meningkatkan conversion rate.
7. Memperkuat trust terhadap brand.
8. Mempertahankan visual premium Roquace.
9. Membuat website responsive untuk desktop, tablet, dan mobile.
10. Menjadikan struktur website reusable untuk template e-commerce.

---

# 3. Non-Goals

Untuk versi V2, fitur berikut tidak wajib dibuat sebagai backend production:

- ERP
- Warehouse management
- Multi-vendor marketplace
- Advanced recommendation engine
- Real-time logistics integration
- Complex admin dashboard
- Multi-currency system
- Multi-language system

Fitur tersebut dapat dipersiapkan sebagai extension untuk versi berikutnya.

---

# 4. Target Users

## Primary User

Fashion shoppers berusia sekitar 18–35 tahun yang:

- Mobile-first
- Peduli terhadap visual
- Mencari fashion modern
- Sering browsing sebelum membeli
- Menggunakan social media sebagai referensi fashion
- Membandingkan beberapa produk sebelum checkout

## Secondary User

Customer yang sudah pernah membeli dan ingin:

- Melihat order
- Tracking order
- Membeli kembali
- Menyimpan wishlist
- Melihat produk baru

---

# 5. Information Architecture

```text
Roquace
│
├── Home
│
├── Shop
│   ├── All Products
│   ├── Women
│   ├── Men
│   ├── Accessories
│   ├── New Arrivals
│   └── Sale
│
├── Product
│
├── Lookbook
│
├── Wishlist
│
├── Cart
│
├── Checkout
│
├── Order Confirmation
│
├── Track Order
│
├── Account
│   ├── Dashboard
│   ├── Orders
│   ├── Order Detail
│   ├── Wishlist
│   ├── Addresses
│   └── Settings
│
├── About
├── Contact
├── FAQ
├── Shipping & Returns
├── Size Guide
│
└── Legal
    ├── Privacy Policy
    └── Terms
```

---

# 6. Global Navigation

## Desktop Header

Header harus memiliki:

```text
Logo

Shop
Collections
New Arrivals
Lookbook
About

Search
Wishlist
Account
Cart
```

### Requirements

- Sticky header saat scrolling.
- Header berubah appearance ketika scroll.
- Search dapat dibuka sebagai overlay.
- Cart membuka cart drawer.
- Wishlist mengarah ke wishlist.
- Account membuka authentication/account menu.

---

# 7. Announcement Bar

Tambahkan announcement bar di bagian paling atas.

Contoh:

```text
FREE SHIPPING ON ORDERS OVER RP500K
```

Behavior:

- Dapat dibuat static.
- Dapat menggunakan carousel jika terdapat beberapa announcement.
- Mobile text harus tetap readable.

---

# 8. Homepage Revision

Homepage yang sudah ada tidak perlu dirombak total.

Pertahankan:

- Hero
- New Arrivals
- Categories
- Brand Story
- Best Sellers
- Testimonials
- FAQ
- Newsletter

Tambahkan/perbaiki:

## 8.1 Shop The Look

Section:

```text
SHOP THE LOOK

[Large Fashion Image]

Oversized Essential Tee
Rp249.000

Wide Leg Pants
Rp379.000

Classic Bag
Rp299.000

[SHOP THE LOOK]
```

User dapat membuka product detail dari setiap item.

---

## 8.2 Trust Section

Tambahkan:

```text
FREE SHIPPING
Orders over Rp500K

EASY RETURNS
7-day return policy

SECURE PAYMENT
Safe & secure checkout

CUSTOMER SUPPORT
WhatsApp support
```

---

## 8.3 UGC Section

Tambahkan:

```text
@ROQUACE

[Image] [Image] [Image] [Image]
[Image] [Image] [Image] [Image]
```

CTA:

```text
FOLLOW @ROQUACE
```

---

# 9. Shop / Product Listing Page

Route:

```text
/shop
/shop/[category]
/search
```

## Layout

Desktop:

```text
SHOP

124 Products

[Filter]                         [Sort]

┌─────────┬─────────┬─────────┬─────────┐
│ Product │ Product │ Product │ Product │
├─────────┼─────────┼─────────┼─────────┤
│ Product │ Product │ Product │ Product │
└─────────┴─────────┴─────────┴─────────┘
```

---

## 9.1 Product Count

Contoh:

```text
124 Products
```

Count harus berubah berdasarkan filter/search.

---

## 9.2 Filter

Filter:

```text
Category
Price
Size
Color
Availability
Rating
Discount
```

Desktop:

```text
Filter Sidebar
```

Mobile:

```text
FILTER
```

yang membuka bottom sheet/drawer.

---

## 9.3 Sort

Options:

```text
Featured
Newest
Best Selling
Price: Low to High
Price: High to Low
Highest Rated
```

---

## 9.4 Active Filter

Contoh:

```text
Women ×
Black ×
Rp200K - Rp500K ×

Clear All
```

---

# 10. Product Card V2

Product card harus menjadi reusable component.

## Structure

```text
┌──────────────────────┐
│ NEW             ♡   │
│                      │
│      PRODUCT IMAGE   │
│                      │
│                 →    │
├──────────────────────┤
│ CATEGORY             │
│ Product Name         │
│ ★ 4.8 (32)           │
│ Rp249.000            │
│ Rp299.000   -17%     │
│                      │
│ [QUICK ADD]          │
└──────────────────────┘
```

## Features

- Product image
- Hover image
- Wishlist
- Badge
- Category
- Product name
- Rating
- Review count
- Current price
- Original price
- Discount
- Quick Add

---

# 11. Product Card States

Setiap ProductCard wajib memiliki:

```text
Default
Hover
Loading
New
Sale
Best Seller
Low Stock
Sold Out
Wishlist Active
Added To Cart
```

---

# 12. Search Experience

Search icon membuka search overlay.

## Search Overlay

```text
SEARCH

[ Search products... ]

TRENDING SEARCHES

Oversized Tee
Cargo Pants
Hoodie
Linen Shirt

POPULAR PRODUCTS

Product
Product
Product

[VIEW ALL RESULTS]
```

---

## Search Result

Search:

```text
"hoodie"
```

Result:

```text
Search results for "hoodie"

12 Products

[filters]

Product Grid
```

---

# 13. Product Detail Page

Route:

```text
/product/[slug]
```

## Desktop

```text
┌──────────────────┐   ┌────────────────────────┐
│                  │   │ BRAND                  │
│                  │   │ Product Name           │
│                  │   │ ★★★★★ 4.8 (32)        │
│                  │   │                        │
│ PRODUCT GALLERY  │   │ Rp249.000              │
│                  │   │                        │
│                  │   │ Color                  │
│                  │   │ ● Black ● White        │
│                  │   │                        │
│                  │   │ Size                   │
│                  │   │ S M L XL               │
│                  │   │                        │
│                  │   │ Quantity               │
│                  │   │ [-] 1 [+]              │
│                  │   │                        │
│                  │   │ [ADD TO CART]          │
│                  │   │ [BUY NOW]              │
└──────────────────┘   └────────────────────────┘
```

---

# 14. Product Gallery

Features:

- Main image
- Thumbnail gallery
- Image zoom
- Fullscreen
- Previous/next
- Product video
- Mobile swipe

States:

```text
Loading
Loaded
Error
Fullscreen
Zoom
```

---

# 15. Product Information

Wajib menampilkan:

- Brand
- Product name
- Rating
- Review count
- Price
- Original price
- Discount
- Color
- Size
- Size guide
- Quantity
- Stock status
- Add to cart
- Buy now
- Wishlist

---

# 16. Variant Selector

## Color

```text
COLOR

● Black
● White
● Navy
```

## Size

```text
SIZE

[XS] [S] [M] [L] [XL]
```

Jika unavailable:

```text
[L] Sold Out
```

---

# 17. Size Guide

Modal:

```text
SIZE GUIDE

Size | Chest | Length | Waist
XS   | 88cm  | 65cm   | 70cm
S    | 92cm  | 67cm   | 74cm
M    | 96cm  | 69cm   | 78cm
L    | 100cm | 71cm   | 82cm
XL   | 104cm | 73cm   | 86cm
```

CTA:

```text
How to measure
```

---

# 18. Product Information Tabs

Tambahkan:

```text
Description
Details
Materials
Size & Fit
Care Instructions
Shipping & Returns
```

Gunakan tabs atau accordion.

---

# 19. Product Reviews

Section:

```text
CUSTOMER REVIEWS

★★★★★ 4.8

Based on 128 reviews

★★★★★ 82%
★★★★☆ 12%
★★★☆☆ 4%
★★☆☆☆ 1%
★☆☆☆☆ 1%
```

Review:

```text
★★★★★

Very comfortable and premium.

John
✓ Verified Purchase

Helpful 24
```

---

# 20. Related Products

Tambahkan:

```text
YOU MAY ALSO LIKE

[Product] [Product] [Product] [Product]
```

---

# 21. Recently Viewed

Tambahkan:

```text
RECENTLY VIEWED

[Product] [Product] [Product]
```

Data dapat disimpan menggunakan localStorage pada versi frontend-only.

---

# 22. Wishlist

Route:

```text
/wishlist
```

Features:

- Add/remove product
- Persistent wishlist
- Move to cart
- Empty state

Empty state:

```text
YOUR WISHLIST IS EMPTY

Save your favorite pieces here.

[EXPLORE PRODUCTS]
```

---

# 23. Cart Drawer

Cart drawer harus menampilkan:

```text
YOUR BAG

Product
Variant
Quantity
Price
Remove
```

Tambahkan free shipping progress:

```text
Add Rp251.000 more
to get FREE SHIPPING

████████████░░
```

Order summary:

```text
Subtotal
Shipping
Discount
Total
```

CTA:

```text
[VIEW CART]
[CHECKOUT]
```

---

# 24. Full Cart Page

Route:

```text
/cart
```

Layout:

```text
YOUR CART

Cart Items                 Summary

Product                    Subtotal
Product                    Shipping
Product                    Discount
                           Total

                           [CHECKOUT]
```

Tambahkan:

- Quantity selector
- Remove
- Save for later
- Coupon
- Shipping estimator

---

# 25. Coupon System

Input:

```text
PROMO CODE

[________________] [APPLY]
```

States:

```text
Default
Loading
Success
Invalid
Expired
Already Used
```

Success:

```text
ROQUACE10 applied
- Rp50.000
```

---

# 26. Checkout

Route:

```text
/checkout
```

Flow:

```text
Cart
 ↓
Contact
 ↓
Shipping
 ↓
Payment
 ↓
Review
 ↓
Confirmation
```

---

# 27. Checkout — Contact

Fields:

```text
Email
Phone
```

Optional:

```text
Create account
```

---

# 28. Checkout — Shipping

Fields:

```text
Full Name
Phone
Address
City
Province
Postal Code
Country
```

Shipping options:

```text
Regular
Express
Same Day
```

---

# 29. Checkout — Payment

Payment methods:

```text
QRIS
Bank Transfer
E-Wallet
Credit/Debit Card
COD
```

Untuk template frontend, payment dapat dibuat sebagai mock interaction.

---

# 30. Order Summary

Selalu terlihat di desktop:

```text
ORDER SUMMARY

Product × 1        Rp249.000
Product × 2        Rp498.000

Subtotal           Rp747.000
Shipping            Rp15.000
Discount           -Rp50.000

TOTAL              Rp712.000
```

Mobile dapat menggunakan collapsible order summary.

---

# 31. Order Confirmation

Route:

```text
/order/success
```

Design:

```text
✓

ORDER CONFIRMED

Thank you for your purchase.

Order #ROQ-10291

Estimated delivery:
12–15 October 2026

[TRACK ORDER]
[CONTINUE SHOPPING]
```

---

# 32. Order Tracking

Route:

```text
/track-order
```

Timeline:

```text
✓ Order Placed
       ↓
✓ Payment Confirmed
       ↓
✓ Processing
       ↓
● Shipped
       ↓
○ Delivered
```

---

# 33. Account

Routes:

```text
/account
/account/orders
/account/orders/[id]
/account/wishlist
/account/addresses
/account/settings
```

Dashboard:

```text
HELLO, CUSTOMER

Recent Orders
Wishlist
Saved Addresses

Order #ROQ-10291
Processing

[VIEW ORDER]
```

---

# 34. Authentication

Pages:

```text
/login
/register
/forgot-password
```

Login:

```text
Email
Password

[LOGIN]

Forgot password?

──────── OR ────────

Continue with Google
```

Untuk frontend template, authentication dapat dibuat mock/local state terlebih dahulu.

---

# 35. Lookbook

Route:

```text
/lookbook
```

Design harus editorial.

```text
ROQUACE

AUTUMN / WINTER 2026

[Full Width Image]

LOOK 01
Urban Essentials

[Image] [Image]

LOOK 02
Modern Minimalism

[Image] [Image]
```

---

# 36. Shop The Look

Setiap look dapat memiliki product hotspots.

```text
                 ●
           MODEL IMAGE
       ●

Products:
Oversized Tee
Wide Leg Pants
Crossbody Bag

[SHOP THE LOOK]
```

---

# 37. Trust & Conversion

Tambahkan beberapa trust element:

```text
Free Shipping
Easy Returns
Secure Checkout
Customer Support
Verified Reviews
```

Tambahkan di area dekat CTA pembelian.

---

# 38. WhatsApp Integration

WhatsApp tetap dipertahankan.

Namun statusnya berubah menjadi:

```text
Secondary CTA
```

Primary:

```text
[ADD TO CART]
```

Secondary:

```text
[ORDER VIA WHATSAPP]
```

WhatsApp message otomatis:

```text
Hi Roquace,

I am interested in:

Product:
Oversized Essential Tee

Color:
Black

Size:
M

Quantity:
1
```

---

# 39. Mobile UX

Mobile-first requirements:

- Sticky mobile header
- Mobile menu
- Search overlay
- Filter drawer
- Sort bottom sheet
- 2-column product grid
- Swipeable product gallery
- Sticky Add to Cart
- Mobile cart drawer
- Collapsible checkout summary
- Bottom navigation

Bottom navigation:

```text
Home
Shop
Search
Wishlist
Account
```

Cart dapat tetap menggunakan floating/cart icon dengan badge.

---

# 40. Responsive Breakpoints

Minimal:

```text
Mobile
320–767px

Tablet
768–1023px

Desktop
1024–1439px

Large Desktop
1440px+
```

---

# 41. UI States

Semua interactive component wajib memiliki:

```text
Default
Hover
Active
Focus
Disabled
Loading
Success
Error
Empty
```

Contoh:

```text
Product
├── Loading
├── Available
├── Low Stock
├── Sold Out
└── Error
```

---

# 42. Empty States

Wajib dibuat:

## Empty Cart

```text
YOUR CART IS EMPTY

Discover pieces made for everyday life.

[SHOP NOW]
```

## Empty Wishlist

```text
YOUR WISHLIST IS EMPTY

Save pieces you love.

[EXPLORE COLLECTION]
```

## No Search Result

```text
NO RESULTS

We couldn't find anything for "hoodie".

Try another search.
```

---

# 43. Error States

Contoh:

```text
Something went wrong.

Please try again.

[TRY AGAIN]
```

Network/product error:

```text
Unable to load products.

[RETRY]
```

---

# 44. Loading System

Gunakan skeleton loading.

Product:

```text
┌───────────────┐
│ ████████████  │
│ ████████████  │
│               │
│ █████████     │
│ ███████       │
│ █████         │
└───────────────┘
```

Jangan menggunakan spinner untuk seluruh halaman jika skeleton dapat digunakan.

---

# 45. SEO

Setiap halaman harus memiliki:

- Unique title
- Meta description
- Canonical URL
- Open Graph
- Twitter/X Card
- Semantic HTML
- Product structured data
- Breadcrumb structured data
- Organization structured data
- Sitemap
- Robots.txt

Product:

```text
Product Name
Price
Availability
Rating
Review
Image
```

---

# 46. Performance

Target:

```text
LCP < 2.5s
CLS < 0.1
INP < 200ms
```

Requirements:

- Image optimization
- Lazy loading
- Responsive images
- WebP/AVIF
- Minimize JavaScript
- Font optimization
- Avoid layout shift
- Code splitting

---

# 47. Accessibility

Target:

**WCAG 2.2 AA**

Requirements:

- Keyboard navigation
- Visible focus state
- Semantic HTML
- Alt text
- Proper heading hierarchy
- Form labels
- ARIA only when necessary
- Sufficient contrast
- Screen reader support

---

# 48. Animation & Interaction

Roquace harus tetap terasa premium.

Gunakan:

- Fade
- Slide
- Image reveal
- Hover image transition
- Smooth drawer
- Modal transition
- Cart animation
- Button feedback
- Scroll reveal

Hindari:

- Excessive bouncing
- Excessive parallax
- Overly fast animation
- Animation yang mengganggu checkout

Animation duration:

```text
Fast: 150–200ms
Normal: 250–350ms
Slow: 400–600ms
```

---

# 49. Component Architecture

Recommended:

```text
components/
│
├── layout/
│   ├── Header
│   ├── Footer
│   ├── AnnouncementBar
│   └── MobileNavigation
│
├── navigation/
│   ├── Navbar
│   ├── MegaMenu
│   ├── Breadcrumb
│   └── Pagination
│
├── product/
│   ├── ProductCard
│   ├── ProductGrid
│   ├── ProductGallery
│   ├── ProductInfo
│   ├── VariantSelector
│   ├── SizeGuide
│   ├── ProductReviews
│   ├── RelatedProducts
│   └── RecentlyViewed
│
├── commerce/
│   ├── CartDrawer
│   ├── CartItem
│   ├── CartSummary
│   ├── Coupon
│   ├── Checkout
│   ├── OrderSummary
│   └── OrderStatus
│
├── account/
│   ├── Login
│   ├── Register
│   ├── AccountDashboard
│   ├── OrderList
│   ├── OrderDetail
│   ├── Wishlist
│   └── Address
│
├── sections/
│   ├── Hero
│   ├── Collections
│   ├── NewArrivals
│   ├── ShopTheLook
│   ├── BestSellers
│   ├── Testimonials
│   ├── UGC
│   ├── Trust
│   └── Newsletter
│
└── ui/
    ├── Button
    ├── Input
    ├── Select
    ├── Modal
    ├── Drawer
    ├── Badge
    ├── Toast
    ├── Skeleton
    └── Accordion
```

---

# 50. Data Model

Frontend mock data minimal:

```text
Product
├── id
├── slug
├── name
├── category
├── description
├── price
├── compareAtPrice
├── images
├── colors
├── sizes
├── stock
├── rating
├── reviewCount
├── badges
└── featured
```

Cart:

```text
CartItem
├── productId
├── variant
├── quantity
└── price
```

Order:

```text
Order
├── id
├── customer
├── items
├── subtotal
├── shipping
├── discount
├── total
├── paymentMethod
├── shippingAddress
├── status
└── createdAt
```

---

# 51. Recommended Routes

```text
/
 /shop
 /shop/[category]
 /search
 /product/[slug]
 /lookbook
 /wishlist
 /cart
 /checkout
 /order/success
 /track-order

 /login
 /register
 /forgot-password

 /account
 /account/orders
 /account/orders/[id]
 /account/wishlist
 /account/addresses
 /account/settings

 /about
 /contact
 /faq
 /shipping-returns
 /size-guide

 /privacy
 /terms
```

---

# 52. Priority

## P0 — Critical

Harus selesai:

- Shop
- Product Listing
- Product Card
- Search
- Filter
- Sort
- Product Detail
- Variant Selector
- Cart
- Cart Drawer
- Checkout
- Order Confirmation
- Responsive Mobile UX

## P1 — High

- Wishlist
- Reviews
- Size Guide
- Coupon
- Related Products
- Recently Viewed
- Order Tracking
- Account
- Authentication
- Trust Section

## P2 — Enhancement

- Lookbook
- Shop The Look
- UGC
- Product hotspots
- Advanced animations
- Recommendation system

---

# 53. Acceptance Criteria

Website dianggap berhasil apabila:

### Shopping

- User dapat melihat semua produk.
- User dapat filter produk.
- User dapat sorting produk.
- User dapat mencari produk.
- User dapat membuka detail produk.
- User dapat memilih variant.
- User dapat menambahkan produk ke cart.
- User dapat mengubah quantity.
- User dapat menghapus produk.

### Checkout

- User dapat mengisi informasi customer.
- User dapat mengisi alamat.
- User dapat memilih shipping.
- User dapat memilih payment.
- User dapat melihat order summary.
- User dapat melakukan mock/place order.
- User melihat confirmation page.

### Account

- User dapat login/register secara mock.
- User dapat melihat order.
- User dapat melihat wishlist.
- User dapat mengelola address.

### Responsive

Website harus usable pada:

- 320px
- 375px
- 390px
- 768px
- 1024px
- 1440px

### UX

Tidak boleh ada:

- Broken layout
- Overflow horizontal
- Dead button
- Missing loading state
- Missing empty state
- Missing error state
- CTA yang tidak jelas

---

# 54. Development Phases

## Phase 1 — E-Commerce Foundation

```text
Shop
Product Listing
Product Card
Search
Filter
Sort
Product Detail
```

## Phase 2 — Shopping

```text
Wishlist
Cart
Cart Drawer
Coupon
Recently Viewed
Related Products
```

## Phase 3 — Checkout

```text
Checkout
Shipping
Payment
Order Summary
Order Confirmation
```

## Phase 4 — Customer Account

```text
Login
Register
Account
Orders
Wishlist
Address
Order Tracking
```

## Phase 5 — Fashion Experience

```text
Lookbook
Shop The Look
UGC
Product Hotspot
Editorial Sections
```

## Phase 6 — Polish

```text
Responsive
Accessibility
SEO
Performance
Animation
Loading States
Error States
Empty States
```

---

# 55. Final Product Flow

```text
                    HOME
                      │
          ┌───────────┼───────────┐
          ↓           ↓           ↓
        SHOP       SEARCH      LOOKBOOK
          │           │
          └─────┬─────┘
                ↓
          PRODUCT LIST
                │
                ↓
         PRODUCT DETAIL
                │
       ┌────────┴────────┐
       ↓                 ↓
   WISHLIST          ADD TO CART
                         │
                         ↓
                       CART
                         │
                         ↓
                     CHECKOUT
                         │
              ┌──────────┼──────────┐
              ↓          ↓          ↓
           CONTACT    SHIPPING   PAYMENT
              └──────────┼──────────┘
                         ↓
                   ORDER REVIEW
                         │
                         ↓
                 ORDER CONFIRMED
                         │
                         ↓
                  TRACK ORDER
```

---

# 56. Definition of Done

Roquace V2 dianggap selesai apabila:

- [ ] Homepage tetap mempertahankan visual identity Roquace.
- [ ] Shop page sudah tersedia.
- [ ] Search berfungsi.
- [ ] Filter berfungsi.
- [ ] Sorting berfungsi.
- [ ] Product detail lengkap.
- [ ] Variant selection berfungsi.
- [ ] Wishlist berfungsi.
- [ ] Cart berfungsi.
- [ ] Cart drawer berfungsi.
- [ ] Coupon interaction tersedia.
- [ ] Checkout tersedia.
- [ ] Payment selection tersedia.
- [ ] Order confirmation tersedia.
- [ ] Order tracking tersedia.
- [ ] Account tersedia.
- [ ] Lookbook tersedia.
- [ ] Shop The Look tersedia.
- [ ] UGC section tersedia.
- [ ] Mobile UX selesai.
- [ ] Loading state tersedia.
- [ ] Empty state tersedia.
- [ ] Error state tersedia.
- [ ] Accessibility diperiksa.
- [ ] SEO diperiksa.
- [ ] Performance diperiksa.
- [ ] Tidak ada broken link.
- [ ] Tidak ada horizontal overflow.
- [ ] Semua CTA memiliki action yang jelas.

---

# 57. Design Direction

**Do not redesign Roquace from zero.**

Pertahankan karakter:

```text
Minimal
Editorial
Modern
Premium
Fashion-focused
Whitespace
Large imagery
Typography-driven
```

Tetapi tingkatkan:

```text
E-commerce functionality
Conversion
Product discovery
Trust
Mobile UX
Checkout UX
Product storytelling
```

Prinsip utama:

> **Keep the brand. Upgrade the commerce.**

Roquace V2 harus terlihat seperti brand fashion premium terlebih dahulu, dan terasa seperti e-commerce yang matang ketika user mulai berbelanja.