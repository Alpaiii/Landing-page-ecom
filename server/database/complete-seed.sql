-- Seed data for complete schema

-- Sample customers (password: password123)
INSERT INTO customers (email, password_hash, name, phone) VALUES
('john@example.com', '$2b$10$rKvHLz1YvV5Ng1cZ.nU3GeGZE9LqP9Ot7sBqJDk8xL5xL6ZJq.qZS', 'John Doe', '+6281234567890'),
('jane@example.com', '$2b$10$rKvHLz1YvV5Ng1cZ.nU3GeGZE9LqP9Ot7sBqJDk8xL5xL6ZJq.qZS', 'Jane Smith', '+6281234567891'),
('test@example.com', '$2b$10$rKvHLz1YvV5Ng1cZ.nU3GeGZE9LqP9Ot7sBqJDk8xL5xL6ZJq.qZS', 'Test User', '+6281234567892')
ON CONFLICT (email) DO NOTHING;

-- Sample addresses
INSERT INTO customer_addresses (customer_id, label, full_name, phone, address_line1, address_line2, city, province, postal_code, is_default)
SELECT 
  c.id,
  'Home',
  'John Doe',
  '+6281234567890',
  'Jl. Sudirman No. 123',
  'Apt 45',
  'Jakarta',
  'DKI Jakarta',
  '12190',
  true
FROM customers c WHERE c.email = 'john@example.com'
ON CONFLICT DO NOTHING;

INSERT INTO customer_addresses (customer_id, label, full_name, phone, address_line1, city, province, postal_code, is_default)
SELECT 
  c.id,
  'Office',
  'John Doe',
  '+6281234567890',
  'Jl. Thamrin No. 456',
  'Jakarta',
  'DKI Jakarta',
  '10230',
  false
FROM customers c WHERE c.email = 'john@example.com'
ON CONFLICT DO NOTHING;

-- Sample coupons
INSERT INTO coupons (code, description, discount_type, discount_value, min_purchase, max_discount, usage_limit, valid_from, valid_until, is_active) VALUES
('WELCOME10', 'Welcome discount 10%', 'percentage', 10.00, 100000, 50000, 100, NOW(), NOW() + INTERVAL '30 days', true),
('SAVE20', 'Save 20% on all bags', 'percentage', 20.00, 200000, 100000, 50, NOW(), NOW() + INTERVAL '30 days', true),
('FREESHIP', 'Free shipping', 'fixed', 15000, 0, NULL, 1000, NOW(), NOW() + INTERVAL '30 days', true),
('NEWYEAR2026', 'New Year special 25%', 'percentage', 25.00, 300000, 150000, 200, NOW(), NOW() + INTERVAL '60 days', true),
('FLAT50K', 'Flat Rp 50,000 off', 'fixed', 50000, 250000, NULL, 150, NOW(), NOW() + INTERVAL '30 days', true)
ON CONFLICT (code) DO NOTHING;

-- Sample orders
INSERT INTO orders (
  customer_id,
  customer_email,
  customer_name,
  customer_phone,
  shipping_address,
  shipping_method,
  shipping_cost,
  items,
  subtotal,
  discount,
  discount_code,
  total_amount,
  payment_method,
  payment_status,
  status
)
SELECT 
  c.id,
  'john@example.com',
  'John Doe',
  '+6281234567890',
  jsonb_build_object(
    'full_name', 'John Doe',
    'phone', '+6281234567890',
    'address_line1', 'Jl. Sudirman No. 123',
    'address_line2', 'Apt 45',
    'city', 'Jakarta',
    'province', 'DKI Jakarta',
    'postal_code', '12190',
    'country', 'Indonesia'
  ),
  'express',
  15000,
  jsonb_build_array(
    jsonb_build_object(
      'product_id', 'sample-001',
      'name', 'Canvas Backpack',
      'slug', 'canvas-backpack',
      'price', 350000,
      'quantity', 1,
      'image', '/images/products/bag.webp'
    )
  ),
  350000,
  35000,
  'WELCOME10',
  330000,
  'bank_transfer',
  'paid',
  'processing'
FROM customers c WHERE c.email = 'john@example.com'
LIMIT 1;

INSERT INTO orders (
  customer_id,
  customer_email,
  customer_name,
  customer_phone,
  shipping_address,
  shipping_method,
  shipping_cost,
  items,
  subtotal,
  discount,
  total_amount,
  payment_method,
  payment_status,
  status
)
SELECT 
  c.id,
  'jane@example.com',
  'Jane Smith',
  '+6281234567891',
  jsonb_build_object(
    'full_name', 'Jane Smith',
    'phone', '+6281234567891',
    'address_line1', 'Jl. Gatot Subroto No. 789',
    'city', 'Jakarta',
    'province', 'DKI Jakarta',
    'postal_code', '12930',
    'country', 'Indonesia'
  ),
  'regular',
  0,
  jsonb_build_array(
    jsonb_build_object(
      'product_id', 'sample-002',
      'name', 'Leather Tote Bag',
      'slug', 'leather-tote-bag',
      'price', 550000,
      'quantity', 2,
      'image', '/images/products/bag.webp'
    )
  ),
  1100000,
  0,
  1100000,
  'qris',
  'paid',
  'delivered'
FROM customers c WHERE c.email = 'jane@example.com'
LIMIT 1;

-- Sample order status history
INSERT INTO order_status_history (order_id, status, notes)
SELECT 
  o.id,
  'pending',
  'Order placed'
FROM orders o
WHERE o.customer_email = 'john@example.com';

INSERT INTO order_status_history (order_id, status, notes)
SELECT 
  o.id,
  'processing',
  'Payment confirmed, preparing shipment'
FROM orders o
WHERE o.customer_email = 'john@example.com';

-- Sample reviews
INSERT INTO reviews (product_id, customer_id, customer_name, order_id, rating, title, comment, is_verified)
SELECT 
  p.id,
  c.id,
  'John Doe',
  o.id,
  5,
  'Amazing quality!',
  'The bag is exactly what I needed. Great quality materials and the design is perfect for daily use.',
  true
FROM products p
CROSS JOIN customers c
CROSS JOIN orders o
WHERE c.email = 'john@example.com'
AND o.customer_email = 'john@example.com'
LIMIT 1;

INSERT INTO reviews (product_id, customer_id, customer_name, rating, title, comment, is_verified)
SELECT 
  p.id,
  c.id,
  'Jane Smith',
  4,
  'Great bag, good value',
  'Really happy with this purchase. The bag is spacious and looks stylish.',
  false
FROM products p
CROSS JOIN customers c
WHERE c.email = 'jane@example.com'
LIMIT 1;

COMMIT;
