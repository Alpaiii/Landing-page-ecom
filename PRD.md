PRODUCT REQUIREMENTS DOCUMENT (PRD)

Fashion UMKM Landing Page Template

Platform: Astro | Styling: Tailwind CSS | Deployment: Vercel /
Cloudflare Pages | Version: 1.0

1. Product Overview

Landing page modern untuk brand fashion UMKM yang berfungsi sebagai
katalog produk, media branding, media promosi, pengarah customer ke
WhatsApp/Instagram, showcase koleksi, dan conversion tool untuk
pembelian. Versi pertama bukan marketplace dan tidak membutuhkan
checkout kompleks.

2. Problem Statement

Banyak brand fashion kecil mengandalkan Instagram/TikTok dan WhatsApp,
tetapi belum memiliki website yang menjadi pusat informasi brand.
Customer sering harus berpindah-pindah platform untuk melihat produk,
cerita brand, dan cara membeli. Website menjadi home base brand.

3. Target User

3.1 Primary User --- Customer

Usia sekitar 17--35 tahun

Pengguna smartphone

Aktif Instagram/TikTok

Tertarik fashion lokal

Terbiasa membeli melalui WhatsApp atau marketplace

3.2 Secondary User --- Owner UMKM

Membutuhkan website profesional

Mudah diperbarui

Memerlukan katalog produk dan link WhatsApp

Menginginkan SEO dasar dan tampilan mobile

Mengutamakan biaya operasional rendah

4. Target Business

Clothing brand

Hijab

Muslim fashion

Streetwear

Local brand

Women's fashion

Men's fashion

Couple outfit

Thrift/vintage store

Accessories

5. Product Goals

Meningkatkan kredibilitas brand.

Menampilkan koleksi secara profesional.

Mempermudah customer menemukan produk.

Mengarahkan customer melakukan pembelian.

Meningkatkan conversion dari traffic social media.

Menjadi template yang dapat digunakan untuk banyak client.

Mendukung SEO, performa cepat, responsive design, dan customization.

6. Non-Goals

Payment gateway

Shopping cart kompleks

User authentication

Dashboard admin

Inventory management

ERP

Shipping integration

Database kompleks

7. User Journey

Instagram → Link in Bio → Website → Hero → Collection → Product →
Product Detail → WhatsApp → Order

Google → Website → Collection → Product → Detail → Order

Website → About → Brand Story → Social Proof → Collection

8. Information Architecture

/
├── Home
├── Shop
│ ├── All Products
│ ├── New Arrival
│ ├── Best Seller
│ └── Sale
├── Product
│ └── Product Detail
├── About
├── Lookbook
├── FAQ
└── Contact

9. Landing Page Sections

9.1 Announcement Bar

Campaign/promo strip seperti "FREE SHIPPING • NEW COLLECTION 2026".
Configurable melalui site configuration.

9.2 Navbar

Desktop: logo, Shop, Collection, About, Contact, search/cart icon
opsional, dan CTA Shop Now. Mobile menggunakan hamburger menu.

9.3 Hero Section

Section utama yang menjelaskan brand, aesthetic, dan CTA dalam 3--5
detik. CTA: Shop Collection dan Explore Lookbook.

9.4 Featured Collection

Koleksi utama dalam bentuk visual cards dengan image, title, short
description, dan CTA.

9.5 Product Showcase

New Arrivals atau Best Sellers dengan product cards: image, badge, nama,
kategori, harga, warna, dan CTA.

9.6 Category Section

Kategori visual seperti Women, Men, Accessories, dan New Arrival.

9.7 Brand Story

Cerita brand, nilai, asal-usul, dan positioning dengan visual editorial.

9.8 USP / Why Us

Quality Material, Local Crafted, Timeless Design, Made for Everyday atau
USP asli client.

9.9 Lookbook

Section editorial berbasis fotografi dengan text minimal.

9.10 Social Proof

Testimonial customer. Gunakan testimonial asli; placeholder harus jelas
jika template belum memiliki data.

9.11 Instagram / Social

Grid foto dan CTA menuju Instagram/TikTok.

9.12 FAQ

Ukuran, cara order, COD, pengiriman, retur, dan pertanyaan lain yang
configurable.

9.13 Final CTA

CTA besar seperti "Ready to Find Your Next Favorite?" dengan tombol Shop
Now.

9.14 Footer

Brand, Shop, About, Social, Contact, copyright.

10. Product Data Structure

const products = [
{
id: "oversized-essential",
name: "Oversized Essential Tee",
price: 249000,
category: "T-Shirt",
image: "/images/products/tee.webp",
badge: "New",
colors: ["Black", "White"],
sizes: ["S", "M", "L", "XL"],
description: "Premium cotton oversized t-shirt."
}
];

11. Site Configuration

export const siteConfig = {
name: "NOVA",
tagline: "Everyday Fashion, Reimagined.",
description: "Contemporary fashion brand from Indonesia.",
whatsapp: "628123456789",
instagram: "@nova",
tiktok: "@nova",
currency: "IDR",
shipping: {
freeShippingMinimum: 500000
}
};

12. Design System

Style: minimalist, editorial, premium, clean, modern, image-focused.

Hindari gradient, glassmorphism, animation berlebihan, shadow berat,
dan rounded card berlebihan.

Fotografi dan typography menjadi fokus utama.

Heading dapat menggunakan Playfair Display atau Cormorant Garamond.

Body dapat menggunakan Inter atau Manrope.

Warna harus configurable.

Theme example:
background: #F7F5F0
foreground: #171717
muted: #777777
accent: #8B6F47

13. Theme Presets

Minimal --- Black / White / Gray

Luxury --- Cream / Brown / Black

Soft --- Beige / Rose / Brown

Street --- Black / White / Red

14. Responsive Design

Mobile: < 640px
Tablet: 640--1024px
Desktop: > 1024px

Mobile-first design menjadi prioritas karena traffic social media
umumnya berasal dari smartphone.

15. Animation

Fade-in

Image reveal

Hover scale

Smooth scroll

Text reveal

Mobile menu transition

Prinsip: animation should enhance the product, not become the product.

16. Performance Requirements

Target Lighthouse Performance 90+

WebP/AVIF

Responsive images

Lazy loading

Minimize JavaScript

Astro static rendering

Preload critical fonts

Avoid unnecessary libraries

17. SEO Requirements

Title

Meta description

Canonical URL

Open Graph

Twitter/X Card

sitemap.xml

robots.txt

Product/Offer structured data untuk halaman produk bila diperlukan

BreadcrumbList structured data bila diperlukan

18. Accessibility

Semantic HTML

Alt text untuk image

Keyboard navigation

Visible focus state

Sufficient contrast

Accessible buttons

Accessible mobile menu

19. Technical Architecture

fashion-template/
├── public/
│ ├── images/
│ ├── favicon.svg
│ └── fonts/
├── src/
│ ├── components/
│ │ ├── AnnouncementBar.astro
│ │ ├── Navbar.astro
│ │ ├── Hero.astro
│ │ ├── CollectionCard.astro
│ │ ├── ProductCard.astro
│ │ ├── ProductGrid.astro
│ │ ├── CategoryGrid.astro
│ │ ├── BrandStory.astro
│ │ ├── Lookbook.astro
│ │ ├── Testimonials.astro
│ │ ├── InstagramGrid.astro
│ │ ├── FAQ.astro
│ │ ├── CTA.astro
│ │ └── Footer.astro
│ ├── layouts/
│ │ └── Layout.astro
│ ├── data/
│ │ ├── products.ts
│ │ ├── collections.ts
│ │ └── testimonials.ts
│ ├── config/
│ │ └── site.ts
│ ├── pages/
│ │ ├── index.astro
│ │ ├── shop.astro
│ │ ├── about.astro
│ │ └── products/
│ └── styles/
│ └── global.css
├── astro.config.mjs
├── package.json
└── tailwind.config.mjs

20. Recommended Tech Stack

Astro

TypeScript

Tailwind CSS

Astro Image

Lucide Icons

Minimal JavaScript

Vercel atau Cloudflare Pages

Tidak perlu React/Next.js untuk versi awal kecuali ada kebutuhan
interaktif yang memang memerlukannya.

21. CMS Strategy

MVP: No CMS. Gunakan TypeScript/JSON sebagai data source. CMS dapat
ditambahkan pada V2 jika client membutuhkan editing mandiri.

Sanity

Contentful

Strapi

Decap CMS

22. WhatsApp Integration

Halo, saya tertarik dengan:

Oversized Essential Tee
Harga: Rp249.000

Apakah produk ini masih tersedia?

Pesan dapat dibangun secara dinamis berdasarkan produk yang dipilih.

23. Analytics

Google Analytics

Google Search Console

Meta Pixel

Semua integration sebaiknya optional dan configurable.

24. MVP Definition

Responsive

Navbar

Hero

Collection

Product grid

Product card

Brand story

USP

Lookbook

Testimonials

FAQ

CTA

Footer

WhatsApp CTA

SEO

Open Graph

Responsive images

Mobile navigation

Vercel deployment

Tidak termasuk MVP: payment gateway, login, admin panel, database,
shopping cart, order management.

25. Definition of Done

Mobile responsive

Desktop responsive

Lighthouse ≥ 90

Tidak ada console error

Semua CTA berfungsi

WhatsApp berfungsi

Navigation berfungsi

Image optimization

SEO metadata

OG image

Favicon

404 page

Sitemap

robots.txt

Deployment berhasil

Source code bersih

Dokumentasi customization

26. Template Business Architecture

CORE TEMPLATE
│
├── Theme
├── Components
├── Data
└── Configuration
│
┌─────┼─────┐
▼ ▼ ▼
Client A Client B Client C

Core template tetap sama. Yang berubah per client: brand, color, font,
image, product, content, social, dan WhatsApp.

27. Suggested Product Packages

Template Only

Source code

Documentation

Basic support

Template + Setup

Template

Customization

Deployment

Domain setup

Custom

Template

Brand customization

Additional sections

SEO

Analytics

Deployment

Maintenance

Content update

Product update

Image update

Technical maintenance

28. Roadmap

Phase 1 --- Foundation

Astro, Tailwind, design system, components

Phase 2 --- Landing Page

Navbar, Hero, Collection, Products, Story, Lookbook, Testimonials, FAQ,
CTA, Footer

Phase 3 --- Conversion

WhatsApp, Instagram, Analytics, SEO, OG

Phase 4 --- Productization

Theme configuration, product configuration, documentation, demo,
deployment

Phase 5 --- Business

Template website → Portfolio → Cold outreach → Client → Customization →
Deployment → Maintenance

29. Recommended Visual Direction

Modern Editorial Fashion --- Minimal, Premium, Image-Focused. Website
sebaiknya terasa seperti website brand fashion profesional, bukan
template murah. Di balik layar, arsitekturnya tetap sederhana dan
reusable.

┌───────────────────────────────────────────┐
│ LOGO SHOP ABOUT CONTACT │
├───────────────────────────────────────────┤
│ NEW COLLECTION │
│ WEAR YOUR IDENTITY. │
│ [ SHOP NOW ] │
│ LARGE IMAGE │
├───────────────────────────────────────────┤
│ NEW ARRIVALS │
│ IMAGE IMAGE IMAGE IMAGE │
├───────────────────────────────────────────┤
│ OUR STORY │
│ IMAGE TEXT │
├───────────────────────────────────────────┤
│ LOOKBOOK │
│ LARGE EDITORIAL IMAGE │
├───────────────────────────────────────────┤
│ YOUR STYLE. YOUR STORY. │
│ [ SHOP NOW ] │
└───────────────────────────────────────────┘

30. Final Product Principle

Template harus memiliki dua karakter sekaligus: terlihat premium di sisi
customer, tetapi sangat mudah dikustomisasi di sisi developer. Prinsip
utamanya adalah reusable components + configurable content + minimal
JavaScript + strong visual identity.

