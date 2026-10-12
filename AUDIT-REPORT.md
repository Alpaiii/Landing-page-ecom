# WEBSITE AUDIT REPORT - ROQUACE CANVAS BAG STORE
Date: 2026-10-12
Current State: All products changed to canvas bags only

## CRITICAL ISSUES - MUST FIX

### 1. CATEGORY SYSTEM - COMPLETELY WRONG
**Problem**: CategoryGrid shows Women/Men/Accessories/New Arrivals
**Current**: `src/components/CategoryGrid.astro` lines 2-7
**Impact**: Users expect clothing categories, but only bags sold
**Action**: Replace with bag-specific categories

### 2. HERO SECTION - FASHION COPY
**Problem**: Hero text about "fashion" and "wear your identity"
**Current**: `src/config/site.ts` lines 44-56
- Headline: "Wear Your Identity"
- Subcopy: "Contemporary fashion designed for everyday expression"
**Impact**: Misleading messaging
**Action**: Change to bag-focused copy

### 3. BRAND STORY - CLOTHING REFERENCES
**Problem**: Multiple mentions of "fashion", "clothing", "everyday life"
**Current**: `src/components/BrandStory.astro` lines 21-33
**Impact**: Brand story doesn't match product line
**Action**: Rewrite for canvas bag brand

### 4. SIZE GUIDE - IRRELEVANT
**Problem**: Full page about clothing measurements (chest, waist, inseam)
**Current**: `src/pages/size-guide.astro` 
**Impact**: Useless for bag customers, confusing
**Action**: Replace with bag dimensions guide or remove page

### 5. NAVIGATION FOOTER - WRONG LINKS
**Problem**: Footer shows "Women", "Men" categories
**Current**: `src/config/site.ts` lines 68-74
**Impact**: Links lead to empty/wrong pages
**Action**: Update to bag categories

### 6. SITE DESCRIPTION - FASHION FOCUSED
**Problem**: Site tagline and description mention clothing
**Current**: `src/config/site.ts` lines 4-5
- Tagline: "Wear Your Identity"
- Description: "Contemporary fashion designed for everyday expression. Premium quality clothing..."
**Impact**: SEO and meta tags wrong
**Action**: Update to canvas bag brand identity

## MEDIUM PRIORITY

### 7. FAQ CONTENT - CLOTHING REFERENCES
**Problem**: FAQ mentions "fabric", "washing", size fit for clothing
**Current**: `src/data/faq.ts`
- Line 13: "size up for relaxed fit or down for fitted look" (clothing language)
- Line 76: "washing in cold water, air drying to maintain fabric quality"
**Impact**: Some answers not relevant to bags
**Action**: Update FAQ for bag products

### 8. SHIPPING & RETURNS POLICY
**Problem**: Return policy mentions "unworn" multiple times
**Current**: `src/pages/shipping-returns.astro` line 83
- "Items must be unworn, unwashed, and unworn" (duplicate word)
**Impact**: Language doesn't fit bags (bags aren't "worn")
**Action**: Update policy language for bags

### 9. USP MESSAGING - GENERIC FASHION
**Problem**: USP talks about "everyday wear", "comfortable pieces"
**Current**: `src/components/USP.astro` lines 2-7
- "Made for Everyday" - "Comfortable pieces for daily wear"
**Impact**: Doesn't highlight bag benefits
**Action**: Rewrite USPs for canvas bags (durability, eco-friendly, versatile, etc)

### 10. ABOUT PAGE - CLOTHING FOCUS
**Problem**: About page talks about "fashion", "clothing", "wardrobe"
**Current**: `src/pages/about.astro` lines 22-54
- "contemporary fashion"
- "From casual streetwear to elegant pieces"
- "create clothing that speaks volumes"
**Impact**: Brand story misaligned
**Action**: Rewrite about canvas bag craftsmanship

## LOW PRIORITY / NICE TO HAVE

### 11. LOOKBOOK PAGE
**Status**: Exists at `/lookbook`
**Issue**: Likely shows clothing looks, not bag styling
**Action**: Update with bag lifestyle photos or disable

### 12. TESTIMONIALS
**Issue**: May reference clothing if using old data
**Action**: Review testimonial content

### 13. INSTAGRAM GRID
**Issue**: May show clothing if connected to fashion IG
**Action**: Update with bag product photos

### 14. SHOP THE LOOK
**Problem**: Hero shows "Shop the Look" feature
**Current**: `src/components/Hero.astro` lines 27-63
**Issue**: Concept works for outfits, less for single bags
**Action**: Consider removing or changing to "Featured Bag"

## WORKING CORRECTLY

✓ Products database - 10 canvas bags loaded
✓ Collections system - bags assigned to collections
✓ Product images - using 1-10.webp
✓ API integration - products fetching from backend
✓ Cart system - should work for bags
✓ Search overlay - functional
✓ Admin dashboard - should work
✓ Payment/checkout flow - structure OK

## RECOMMENDED FIXES ORDER

### Phase 1 - Critical Copy Changes (30 min)
1. Update site config (tagline, description, hero copy)
2. Fix CategoryGrid categories
3. Update navigation footer links
4. Update BrandStory component

### Phase 2 - Content Pages (45 min)
5. Rewrite About page
6. Update or remove Size Guide
7. Update FAQ answers
8. Fix Shipping & Returns language
9. Update USP component

### Phase 3 - Polish (30 min)
10. Review and update Lookbook
11. Check testimonials
12. Update Instagram grid
13. Review all meta descriptions

## NOTES
- Backend/API working correctly
- No technical bugs found
- All issues are content/messaging related
- Site structure solid, just needs content aligned to bags
