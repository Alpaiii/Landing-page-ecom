PRD — Fashion UMKM Landing Page Template

Revision 01 — Visual & UX Refinement

Product: Fashion UMKM Landing Page Template
Platform: Astro
Styling: Tailwind CSS
Deployment: Vercel / Cloudflare Pages
Version: 1.1
Revision focus: Visual hierarchy, typography, spacing, editorial layout, conversion, and brand identity

1. Product Overview

Landing page modern untuk brand fashion UMKM yang berfungsi sebagai:

Brand showcase

Product catalog

Collection showcase

Social-media traffic destination

WhatsApp conversion channel

Brand storytelling

SEO-friendly web presence

Versi pertama tetap bukan marketplace dan tidak memerlukan checkout/payment system kompleks.

Core Flow

Instagram / TikTok / Google
            ↓
       Landing Page
            ↓
   Collection / Product
            ↓
      Product Detail
            ↓
   WhatsApp / Instagram
            ↓
          Order

2. Revision Objective

Hasil screenshot versi awal menunjukkan bahwa struktur halaman sudah lengkap, tetapi visual masih perlu diperkuat.

Masalah utama yang ditemukan

Typography terlalu kecil.

Hero headline kurang dominan.

Navbar terlalu tipis.

Section spacing terlalu rapat.

Product cards terlalu kecil.

Collection masih terasa seperti card biasa.

Testimonials terlalu corporate.

FAQ terlalu panjang.

Border terlalu banyak.

Brand identity belum terasa kuat.

Hierarchy antara visual dan copy belum konsisten.

Beberapa image/category terasa kurang konsisten dengan positioning fashion brand.

Target revisi

Website harus terasa:

Modern — Editorial — Premium — Minimal — Confident

dan bukan:

Generic corporate landing page.

3. Target Audience

Primary — Fashion Customer

Usia sekitar 17–35 tahun.

Mobile-first user.

Aktif di Instagram/TikTok.

Familiar dengan pembelian online.

Sensitif terhadap visual brand.

Membutuhkan informasi produk secara cepat.

Secondary — UMKM Owner

Clothing brand.

Hijab.

Local fashion.

Streetwear.

Muslim fashion.

Accessories.

Small lifestyle/fashion label.

4. Product Goals

Membuat brand terlihat profesional.

Menampilkan produk secara visual dan mudah dipahami.

Mengarahkan traffic social media ke satu destination.

Mempermudah customer melakukan order.

Meningkatkan perceived value brand.

Menjadi template reusable untuk banyak client.

Memiliki visual yang mudah di-custom tanpa mengubah struktur kode.

5. Design Direction

Primary Direction

Modern Editorial Fashion

Karakter:

Clean

Large typography

Large photography

Generous whitespace

Minimal UI

Subtle animation

Elegant typography

Strong alignment

Prinsip

Photography + Typography + Whitespace = Primary Visual Language

UI element hanya mendukung konten.

Hindari:

Excessive shadows

Excessive borders

Heavy gradients

Excessive rounded cards

Too many badges

Excessive animations

Too much text

Generic corporate layout

6. Brand Identity

Template harus terasa seperti satu brand, bukan kumpulan component terpisah.

Example Brand Personality

NOVA

Minimal
Contemporary
Confident
Editorial
Effortless

Identity Components

Brand
├── Logo
├── Typography
├── Color
├── Photography
├── Button style
├── Icon style
├── Spacing
├── Motion
└── Copywriting tone

Semua harus konsisten.

7. Information Architecture

/
├── Home
├── Shop
├── Collection
├── Product Detail
├── About
├── Lookbook
├── FAQ
└── Contact

Untuk landing page utama:

Announcement
↓
Navbar
↓
Hero
↓
Featured Collection
↓
New Arrivals
↓
Shop by Category
↓
Brand Story
↓
Lookbook
↓
Social Proof
↓
Instagram
↓
FAQ
↓
Final CTA
↓
Footer

8. Revised Landing Page Structure

8.1 Announcement Bar

Purpose

Campaign/promotion.

Contoh:

FREE SHIPPING • NEW COLLECTION 2026

Rules

Height kecil.

Typography jelas.

Tidak mengambil perhatian lebih besar daripada hero.

Bisa di-disable.

Configuration:

announcement: {
  enabled: true,
  text: "Free Shipping for Orders Above Rp500K"
}

8.2 Navbar

Desktop

┌──────────────────────────────────────────────┐
│ NOVA   SHOP  COLLECTION  ABOUT  CONTACT     │
│                              INSTAGRAM  CART │
└──────────────────────────────────────────────┘

Requirements

Height: ±72–88px.

Logo cukup dominan.

Navigation tidak terlalu kecil.

Spacing antar menu konsisten.

Sticky saat scrolling.

Background/transparency dapat berubah ketika scroll.

Mobile

┌──────────────────────────────────┐
│ NOVA                        ☰    │
└──────────────────────────────────┘

8.3 Hero Section — PRIORITY 1

Hero adalah visual anchor utama.

Target

Dalam 3–5 detik user mengetahui:

Brand

Collection

Positioning

CTA

Revised Layout

┌─────────────────────────────────────────────┐
│                                             │
│             NEW COLLECTION                 │
│                                             │
│          WEAR YOUR                         │
│          IDENTITY.                         │
│                                             │
│   Contemporary fashion designed            │
│   for everyday expression.                 │
│                                             │
│          [ SHOP COLLECTION ]                │
│                                             │
│              HERO IMAGE                    │
│                                             │
└─────────────────────────────────────────────┘

Typography

Desktop:

Hero eyebrow: 12–14px
Hero heading: 64–96px
Body: 16–18px
CTA: 13–15px

Mobile:

Hero heading: 42–60px
Body: 15–17px

Image

Full-width.

High-quality.

Editorial photography.

Subject tidak tertutup oleh text.

Gunakan subtle overlay bila dibutuhkan.

8.4 Featured Collection

Versi awal terlalu seragam sebagai card.

Revised Direction

Gunakan editorial composition.

FEATURED COLLECTION

[ LARGE IMAGE ]

NEW ARRIVALS
New pieces for the season.

Explore Collection →

Collection lain dapat menggunakan variasi ukuran.

Rule

Tidak semua item harus memiliki card dengan struktur identik.

8.5 New Arrivals

Objective

Menampilkan produk utama secara cepat.

NEW ARRIVALS

[ PRODUCT ] [ PRODUCT ] [ PRODUCT ] [ PRODUCT ]

                VIEW ALL →

Product Card

┌──────────────────┐
│                  │
│      IMAGE       │
│                  │
│                  │
├──────────────────┤
│ PRODUCT NAME     │
│ CATEGORY         │
│ Rp249.000        │
└──────────────────┘

Recommendation

3–4 produk di landing page.

Product image lebih besar.

Gunakan ratio 4:5.

Jangan memasukkan terlalu banyak metadata.

Hover effect subtle.

Badge hanya bila diperlukan.

8.6 Shop by Category

Kategori harus konsisten dengan brand.

Example

SHOP BY CATEGORY

[ WOMEN ] [ MEN ]

[ ACCESSORIES ] [ NEW ARRIVALS ]

Atau untuk clothing-only:

TOPS
BOTTOMS
OUTERWEAR
ACCESSORIES

Jangan mencampur kategori yang membuat positioning brand terasa ambigu tanpa alasan.

8.7 Brand Story

Revised Direction

Jadikan sebagai brand statement, bukan blok corporate.

OUR STORY

Crafted with purpose.

[ LARGE IMAGE ]

We believe fashion isn't
simply what you wear,
but how you express yourself.

Read Our Story →

Layout

Desktop:

60% image
40% content

atau asymmetric editorial layout.

Text

Tidak terlalu panjang.

Fokus pada emotional positioning.

Gunakan copy asli client pada production website.

8.8 Why Us / USP

Gunakan typography dan spacing, bukan cards berat.

WHY NOVA?

01
QUALITY MATERIAL

02
LOCAL CRAFTED

03
TIMELESS DESIGN

04
MADE FOR EVERYDAY

Bisa menggunakan divider tipis sebagai pemisah, tetapi hindari card box berlebihan.

8.9 Lookbook

Bagian ini menjadi visual highlight.

Revised Layout

LOOKBOOK

2026 / AUTUMN COLLECTION

┌───────────────────────┬────────────┐
│                       │            │
│                       │   IMAGE    │
│                       │            │
│    LARGE IMAGE        ├────────────┤
│                       │            │
│                       │   IMAGE    │
│                       │            │
└───────────────────────┴────────────┘

Rules

Foto besar.

Text minimal.

Berikan whitespace.

Gunakan image ratio yang konsisten.

Lookbook harus terasa seperti editorial campaign.

8.10 Social Proof

Versi awal terlalu menyerupai testimonial corporate.

Revised Direction

Gunakan satu quote besar atau maksimal tiga quote pendek.

WHAT THEY'RE WEARING

★★★★★

"Perfect fit, beautiful fabric,
and exactly what I expected."

— Aulia
Verified Customer

Rules

Jangan memakai testimonial palsu.

Untuk template, gunakan placeholder yang jelas.

Production client harus menggunakan testimonial asli.

8.11 Instagram / Social

FOLLOW @NOVASTUDIO

[IMG][IMG][IMG][IMG][IMG][IMG]

Interaction

Hover:

scale(1.02–1.04)

Transition halus.

Jangan menambahkan terlalu banyak overlay text pada image.

8.12 FAQ

Batasi menjadi 4–5 pertanyaan utama.

Recommended

What sizes are available?

How can I order?

Do you offer COD?

How long does shipping take?

What is your return policy?

Layout

Accordion minimal.

Hindari card yang terlalu tebal.

8.13 Final CTA

Harus menjadi conversion point yang sangat jelas.

FIND YOUR
NEXT FAVORITE.

Explore our latest collection.

[ SHOP NOW ]

Design

Typography besar.

Whitespace luas.

Background dapat menggunakan brand color atau image.

Satu CTA utama.

8.14 Footer

NOVA

Contemporary fashion
for everyday expression.

SHOP
New Arrivals
Collections
Best Sellers

ABOUT
Our Story
FAQ
Contact

FOLLOW
Instagram
TikTok

CONTACT
WhatsApp
Email

© 2026 NOVA

Footer tidak perlu terlalu besar.

9. Typography System

Desktop

Display/Hero     64–96px
Section Heading  40–56px
Subheading       20–28px
Body             16–18px
Product Name     14–16px
Navigation       12–14px
Caption          11–13px

Mobile

Hero             42–60px
Section Heading  32–42px
Body             15–17px
Product Name     14–16px
Navigation       12–14px

Rule

Jangan mengecilkan semua text hanya agar "muat lebih banyak".

White space lebih baik daripada text terlalu kecil.

10. Spacing System — PRIORITY 1

Desktop

Section padding: 100–140px
Major gap:       64–96px
Component gap:   24–48px

Mobile

Section padding: 56–80px
Major gap:       40–56px
Component gap:   16–28px

Principle

Setiap section harus memiliki "ruang bernapas".

11. Color System

Base theme:

background: "#F7F5F0"
foreground: "#171717"
muted: "#777777"
accent: "#8B6F47"

Presets

Minimal
Black / White / Gray

Luxury
Cream / Brown / Black

Soft
Beige / Rose / Brown

Street
Black / White / Red

Color harus dapat diubah melalui configuration.

12. Borders & Shadows

Revised Rule

Gunakan border hanya ketika membantu struktur.

Kurangi:

card border berlebihan

box border pada setiap component

shadow pada setiap card

Prioritas visual:

Whitespace
>
Typography
>
Photography
>
Alignment
>
Border
>
Shadow

13. Image System

Ratios

Hero:
16:9 / viewport

Product:
4:5

Collection:
4:5 / 3:4

Lookbook:
3:4 / 4:5

Instagram:
1:1

Requirements

WebP/AVIF.

Responsive sizes.

Lazy loading untuk image non-critical.

alt text.

Avoid random image ratios.

14. Motion Design

Use

Fade-in

Image reveal

Hover scale

Smooth scrolling

Menu transition

Subtle text reveal

Avoid

Heavy parallax

Constant movement

Excessive scroll effects

Long animation delay

Target:

Animation should enhance the product, not become the product.

15. Responsive Design

Breakpoints

Mobile:  < 640px
Tablet:  640–1024px
Desktop: > 1024px

Mobile priorities

Hero text remains readable.

CTA easily tappable.

Product grid becomes 1–2 columns.

Navigation transforms into drawer/menu.

Images remain large.

Horizontal overflow must be avoided.

16. Conversion Strategy

Primary CTA:

SHOP NOW

Secondary:

EXPLORE COLLECTION
VIEW LOOKBOOK

Product CTA:

VIEW PRODUCT
ORDER VIA WHATSAPP

WhatsApp Message

Halo, saya tertarik dengan:

Oversized Essential Tee
Harga: Rp249.000

Apakah produk ini masih tersedia?

Pesan dibuat secara dinamis dari data produk.

17. SEO

Required:

<title>
<meta name="description">
canonical
Open Graph
Twitter/X Card
sitemap.xml
robots.txt
favicon

Optional per product:

Product
Offer
Brand
BreadcrumbList

18. Accessibility

Required:

Semantic HTML.

alt image.

Keyboard navigation.

Visible focus.

Sufficient color contrast.

Accessible buttons.

Accessible mobile menu.

Proper heading hierarchy.

19. Performance

Target:

Lighthouse Performance: 90+

Requirements:

Static-first Astro rendering.

Minimal JavaScript.

WebP/AVIF.

Responsive images.

Lazy loading.

Avoid unnecessary dependencies.

Optimize fonts.

Avoid oversized hero image delivery.

20. Technical Architecture

fashion-template/
│
├── public/
│   ├── images/
│   ├── favicon.svg
│   └── fonts/
│
├── src/
│   ├── components/
│   │   ├── AnnouncementBar.astro
│   │   ├── Navbar.astro
│   │   ├── Hero.astro
│   │   ├── CollectionCard.astro
│   │   ├── ProductCard.astro
│   │   ├── ProductGrid.astro
│   │   ├── CategoryGrid.astro
│   │   ├── BrandStory.astro
│   │   ├── USP.astro
│   │   ├── Lookbook.astro
│   │   ├── Testimonials.astro
│   │   ├── InstagramGrid.astro
│   │   ├── FAQ.astro
│   │   ├── CTA.astro
│   │   └── Footer.astro
│   │
│   ├── layouts/
│   │   └── Layout.astro
│   │
│   ├── data/
│   │   ├── products.ts
│   │   ├── collections.ts
│   │   └── testimonials.ts
│   │
│   ├── config/
│   │   ├── site.ts
│   │   └── theme.ts
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   ├── shop.astro
│   │   ├── about.astro
│   │   └── products/
│   │
│   └── styles/
│       └── global.css
│
├── astro.config.mjs
├── package.json
└── tailwind.config.mjs

21. Reusable Configuration

site.ts

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

theme.ts

export const theme = {
  background: "#F7F5F0",
  foreground: "#171717",
  muted: "#777777",
  accent: "#8B6F47"
};

22. Product Data

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

23. Component Rules

Setiap component harus:

Reusable.

Tidak meng-hardcode brand content.

Menerima data melalui props.

Memiliki responsive state.

Tidak membutuhkan JavaScript jika tidak diperlukan.

Memiliki semantic HTML.

Contoh:

<ProductCard product={product} />

bukan:

<h3>NOVA Oversized Tee</h3>

24. CMS Strategy

MVP

Tidak menggunakan CMS.

Gunakan:

TypeScript / JSON

V2

CMS hanya ditambahkan jika client membutuhkan update konten secara mandiri.

Pilihan yang dapat dipertimbangkan:

Sanity

Contentful

Strapi

Decap CMS

25. Analytics

Optional:

Google Analytics
Google Search Console
Meta Pixel

Configuration:

analytics: {
  googleAnalytics: "",
  metaPixel: ""
}

26. Revised UX Flow

ENTRY
  ↓
HERO
  ↓
Understand Brand
  ↓
Explore Collection
  ↓
See Products
  ↓
Build Trust
  ↓
Discover Brand Story
  ↓
Lookbook / Social Proof
  ↓
FAQ
  ↓
FINAL CTA
  ↓
SHOP / WHATSAPP

27. Visual Hierarchy

Hierarchy wajib mengikuti:

1. Hero
2. Main Headline
3. Collection / Product Image
4. Section Heading
5. CTA
6. Supporting Text
7. Metadata

Jangan sampai:

small text
small heading
small button
large empty image

seperti pada versi awal.

28. Revision Checklist

Priority 1 — Must Fix

Perbesar typography.

Perkuat hero headline.

Perbesar navbar height.

Perbesar section spacing.

Perbesar product cards.

Kurangi border.

Perkuat CTA.

Pastikan contrast text cukup.

Priority 2 — Visual Refinement

Ubah Featured Collection menjadi editorial.

Buat Brand Story lebih emotional.

Buat Lookbook lebih immersive.

Ubah testimonial menjadi editorial quote.

Ringkas FAQ.

Konsistensikan category.

Standarkan image ratio.

Priority 3 — Productization

Theme config.

Site config.

Product data.

Collection data.

Documentation.

Demo deployment.

Client customization workflow.

29. Definition of Done — Revision 01

Landing page dianggap lolos revisi apabila:

Typography tidak lagi terlalu kecil.

Hero menjadi visual anchor.

Navbar mudah dibaca.

Section memiliki whitespace cukup.

Product card menjadi readable.

Collection terasa editorial.

Brand Story terasa brand-driven.

Lookbook menjadi visual highlight.

Testimonial tidak terasa corporate.

FAQ lebih ringkas.

Border tidak berlebihan.

CTA jelas.

Mobile tetap usable.

Tidak ada horizontal overflow.

Tidak ada console error.

Lighthouse target tercapai.

SEO metadata tersedia.

WhatsApp CTA berfungsi.

Semua content dapat dikustomisasi.

30. Recommended Final Layout

┌─────────────────────────────────────────────┐
│ NAVBAR                                      │
├─────────────────────────────────────────────┤
│                                             │
│              HERO                           │
│        WEAR YOUR IDENTITY.                  │
│              [SHOP NOW]                     │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│        FEATURED COLLECTION                  │
│             LARGE IMAGE                     │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│          NEW ARRIVALS                       │
│      [P] [P] [P] [P]                        │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│         SHOP BY CATEGORY                    │
│       [ ] [ ] [ ] [ ]                       │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│             OUR STORY                       │
│       [ IMAGE ]      [ TEXT ]               │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│             LOOKBOOK                        │
│          [ LARGE IMAGE ]                    │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│       WHAT THEY'RE WEARING                  │
│              "QUOTE"                        │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│          FOLLOW @NOVA                       │
│       [ ][ ][ ][ ][ ][ ]                    │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│      FIND YOUR NEXT FAVORITE.               │
│              [SHOP NOW]                     │
│                                             │
├─────────────────────────────────────────────┤
│ FOOTER                                      │
└─────────────────────────────────────────────┘

31. Business Template Architecture

Tujuan akhir bukan membuat satu website saja.

CORE FASHION TEMPLATE
          │
          ├── Components
          ├── Theme
          ├── Data
          └── Configuration
                    │
          ┌─────────┼─────────┐
          ↓         ↓         ↓
      Client A   Client B   Client C

Yang berubah per client:

Brand
Color
Font
Photography
Product
Copy
Social
WhatsApp
Domain

Struktur component tetap.

32. Business Packages

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

Content updates

Product updates

Image updates

Technical maintenance

33. Final Product Principle

Template harus memiliki dua karakter:

Customer Side

Premium
Editorial
Fast
Modern
Trustworthy

Developer Side

Reusable
Configurable
Maintainable
Lightweight
Easy to deploy

Core Principle

Premium appearance outside, simple reusable architecture inside.

34. Next Implementation Sequence

1. Lock Design Direction
        ↓
2. Create Design Tokens
        ↓
3. Build Navbar
        ↓
4. Build Hero
        ↓
5. Build Collection
        ↓
6. Build Product System
        ↓
7. Build Brand Story
        ↓
8. Build Lookbook
        ↓
9. Build Social Proof
        ↓
10. Build FAQ
        ↓
11. Build Final CTA
        ↓
12. Responsive Refinement
        ↓
13. SEO + Performance
        ↓
14. Vercel Deployment
        ↓
15. Documentation
        ↓
16. Reusable Client Template

35. Final Direction for Version 1.1

Jangan rebuild dari nol.

Base structure versi awal sudah dapat digunakan.

Fokus revisi:

TYPOGRAPHY
    +
SPACING
    +
HERO
    +
PRODUCT SCALE
    +
EDITORIAL LAYOUT
    +
BRAND IDENTITY
    +
CONVERSION

Hasil yang ditargetkan:

Dari “landing page fashion yang lengkap” menjadi “website fashion brand yang terlihat premium dan siap diproduksikan sebagai template UMKM.”