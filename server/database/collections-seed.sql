-- Insert collections
INSERT INTO collections (name, slug, description, short_description, image, image_hover, season, year, is_featured, display_order) VALUES
('New Arrivals', 'new-arrivals', 'Discover our latest additions to the collection. Fresh styles that define the season''s aesthetic.', 'Fresh styles just dropped.', '/images/collections/new-arrivals.webp', '/images/collections/new-arrivals-hover.webp', 'Autumn', 2026, true, 1),
('Best Sellers', 'best-sellers', 'The pieces our customers love most. Tried, tested, and approved by the community.', 'Customer favorites you''ll love.', '/images/collections/best-sellers.webp', '/images/collections/best-sellers-hover.webp', NULL, NULL, false, 2),
('Essentials', 'essentials', 'Timeless wardrobe staples designed for everyday wear. The foundation of any great outfit.', 'Wardrobe staples for every day.', '/images/collections/essentials.webp', '/images/collections/essentials-hover.webp', NULL, NULL, false, 3),
('Autumn 2026', 'autumn-2026', 'Our Autumn 2026 collection explores texture and layering. Warm tones meet minimalist silhouettes.', 'Warm tones, minimalist silhouettes.', '/images/collections/essentials.webp', '/images/collections/essentials.webp', 'Autumn', 2026, true, 4);

-- Assign products to collections
-- Get collection IDs and product IDs first, then create relationships

-- New Arrivals: All products marked is_new = true
INSERT INTO product_collections (product_id, collection_id, display_order)
SELECT p.id, c.id, ROW_NUMBER() OVER (ORDER BY p.created_at DESC)
FROM products p
CROSS JOIN collections c
WHERE p.is_new = true AND c.slug = 'new-arrivals';

-- Best Sellers: All products marked is_featured = true
INSERT INTO product_collections (product_id, collection_id, display_order)
SELECT p.id, c.id, ROW_NUMBER() OVER (ORDER BY p.created_at DESC)
FROM products p
CROSS JOIN collections c
WHERE p.is_featured = true AND c.slug = 'best-sellers';

-- Essentials: All Clothing products
INSERT INTO product_collections (product_id, collection_id, display_order)
SELECT p.id, c.id, ROW_NUMBER() OVER (ORDER BY p.created_at DESC)
FROM products p
CROSS JOIN collections c
WHERE p.category = 'Clothing' AND c.slug = 'essentials';

-- Autumn 2026: Featured products
INSERT INTO product_collections (product_id, collection_id, display_order)
SELECT p.id, c.id, ROW_NUMBER() OVER (ORDER BY p.created_at DESC)
FROM products p
CROSS JOIN collections c
WHERE p.is_featured = true AND c.slug = 'autumn-2026';
