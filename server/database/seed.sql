-- Insert sample admin (password: admin123)
-- Hash generated using bcrypt with 10 rounds
INSERT INTO admins (email, password_hash, name) VALUES
('admin@roquace.com', '$2b$10$rKvHLz1YvV5Ng1cZ.nU3GeGZE9LqP9Ot7sBqJDk8xL5xL6ZJq.qZS', 'Admin Roquace');

-- Insert sample products
INSERT INTO products (name, slug, description, price, compare_price, category, subcategory, images, colors, sizes, tags, stock, is_featured, is_new) VALUES
('Oversized Graphic Tee', 'oversized-graphic-tee', 'Premium cotton oversized t-shirt with unique graphic print', 249000, 349000, 'Clothing', 'Tops', 
  '["/images/products/1.webp"]'::jsonb,
  '["Black", "White", "Gray"]'::jsonb,
  '["S", "M", "L", "XL"]'::jsonb,
  '["tee", "oversized", "graphic"]'::jsonb,
  45, true, true),

('Minimalist Hoodie', 'minimalist-hoodie', 'Comfortable premium hoodie with clean minimalist design', 449000, 599000, 'Clothing', 'Tops',
  '["/images/products/2.webp"]'::jsonb,
  '["Black", "Navy", "Cream", "Gray"]'::jsonb,
  '["S", "M", "L", "XL"]'::jsonb,
  '["hoodie", "minimalist", "cotton"]'::jsonb,
  60, true, true),

('Wide Leg Cargo Pants', 'wide-leg-cargo-pants', 'Relaxed fit cargo pants with multiple pockets', 389000, 499000, 'Clothing', 'Bottoms',
  '["/images/products/3.webp"]'::jsonb,
  '["Khaki", "Black", "Olive"]'::jsonb,
  '["S", "M", "L", "XL"]'::jsonb,
  '["cargo", "pants", "wide-leg"]'::jsonb,
  50, true, false),

('Relaxed Fit Jeans', 'relaxed-fit-jeans', 'Classic denim jeans with comfortable relaxed fit', 359000, 459000, 'Clothing', 'Bottoms',
  '["/images/products/4.webp"]'::jsonb,
  '["Dark Blue", "Light Blue", "Black"]'::jsonb,
  '["28", "30", "32", "34", "36"]'::jsonb,
  '["jeans", "denim", "relaxed"]'::jsonb,
  70, false, false),

('Linen Button Shirt', 'linen-button-shirt', 'Breathable linen shirt perfect for summer', 299000, 399000, 'Clothing', 'Tops',
  '["/images/products/5.webp"]'::jsonb,
  '["White", "Beige", "Light Blue"]'::jsonb,
  '["S", "M", "L", "XL"]'::jsonb,
  '["shirt", "linen", "summer"]'::jsonb,
  40, true, false),

('Varsity Bomber Jacket', 'varsity-bomber-jacket', 'Vintage-inspired varsity jacket with embroidered details', 649000, 799000, 'Clothing', 'Outerwear',
  '["/images/products/6.webp"]'::jsonb,
  '["Black/White", "Navy/Cream"]'::jsonb,
  '["S", "M", "L", "XL"]'::jsonb,
  '["jacket", "bomber", "varsity"]'::jsonb,
  30, true, true),

('Canvas Tote Bag', 'canvas-tote-bag', 'Spacious canvas tote bag with leather handles', 179000, 249000, 'Accessories', 'Bags',
  '["/images/products/7.webp"]'::jsonb,
  '["Natural", "Black", "Navy"]'::jsonb,
  '["One Size"]'::jsonb,
  '["bag", "tote", "canvas"]'::jsonb,
  80, false, false),

('Minimalist Backpack', 'minimalist-backpack', 'Water-resistant backpack with laptop compartment', 499000, 649000, 'Accessories', 'Bags',
  '["/images/products/8.webp"]'::jsonb,
  '["Black", "Gray", "Navy"]'::jsonb,
  '["One Size"]'::jsonb,
  '["backpack", "minimalist", "laptop"]'::jsonb,
  55, true, false),

('Classic White Sneakers', 'classic-white-sneakers', 'Premium leather sneakers with iconic silhouette', 549000, 699000, 'Footwear', 'Sneakers',
  '["/images/products/9.webp"]'::jsonb,
  '["White", "White/Black"]'::jsonb,
  '["39", "40", "41", "42", "43", "44"]'::jsonb,
  '["sneakers", "leather", "classic"]'::jsonb,
  65, true, true),

('Chunky Dad Sneakers', 'chunky-dad-sneakers', 'Retro-inspired chunky sneakers with bold design', 599000, 749000, 'Footwear', 'Sneakers',
  '["/images/products/10.webp"]'::jsonb,
  '["White/Gray", "Black/Red"]'::jsonb,
  '["39", "40", "41", "42", "43", "44"]'::jsonb,
  '["sneakers", "chunky", "retro"]'::jsonb,
  50, false, true);
