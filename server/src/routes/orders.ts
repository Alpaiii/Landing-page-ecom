import { Router, Request, Response } from 'express';
import pool from '../config/database';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

// GET all orders (admin only)
router.get('/', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM orders ORDER BY created_at DESC'
    );

    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// GET single order (admin only)
router.get('/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM orders WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// POST create order (from checkout)
router.post('/', async (req: Request, res: Response) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const {
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
      payment_method,
      notes
    } = req.body;

    if (!customer_email || !customer_name || !customer_phone || !shipping_address || !items || !subtotal || !payment_method) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const total_amount = subtotal + (shipping_cost || 0) - (discount || 0);

    // Create order
    const orderResult = await client.query(
      `INSERT INTO orders (
        customer_id, customer_email, customer_name, customer_phone,
        shipping_address, shipping_method, shipping_cost,
        items, subtotal, discount, discount_code,
        total_amount, payment_method, payment_status, status, notes
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 'pending', 'pending', $14)
      RETURNING *`,
      [
        customer_id || null,
        customer_email,
        customer_name,
        customer_phone,
        JSON.stringify(shipping_address),
        shipping_method || 'regular',
        shipping_cost || 0,
        JSON.stringify(items),
        subtotal,
        discount || 0,
        discount_code || null,
        total_amount,
        payment_method,
        notes || null
      ]
    );

    const order = orderResult.rows[0];

    // Decrease product stock
    for (const item of items) {
      await client.query(
        'UPDATE products SET stock = stock - $1 WHERE id = $2 AND stock >= $1',
        [item.quantity, item.product_id]
      );
    }

    // Create initial status history
    await client.query(
      `INSERT INTO order_status_history (order_id, status, notes)
       VALUES ($1, 'pending', 'Order placed successfully')`,
      [order.id]
    );

    // If coupon used, track usage
    if (discount_code && discount > 0) {
      // Get coupon by code
      const couponResult = await client.query(
        'SELECT id FROM coupons WHERE code = $1',
        [discount_code]
      );

      if (couponResult.rows.length > 0) {
        const couponId = couponResult.rows[0].id;
        
        await client.query(
          `INSERT INTO coupon_usage (coupon_id, customer_id, order_id, discount_amount)
           VALUES ($1, $2, $3, $4)`,
          [couponId, customer_id || null, order.id, discount]
        );

        // Increment coupon usage count
        await client.query(
          'UPDATE coupons SET usage_count = usage_count + 1 WHERE id = $1',
          [couponId]
        );
      }
    }

    await client.query('COMMIT');
    
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  } finally {
    client.release();
  }
});

// PATCH update order status (admin only)
router.patch('/:id/status', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const result = await pool.query(
      `UPDATE orders SET status = $1, updated_at = NOW()
       WHERE id = $2
       RETURNING *`,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Add to status history
    await pool.query(
      `INSERT INTO order_status_history (order_id, status, notes)
       VALUES ($1, $2, $3)`,
      [id, status, notes || null]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// GET order by ID and email (for tracking)
router.get('/track/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: 'Email required' });
    }

    const result = await pool.query(
      'SELECT * FROM orders WHERE id = $1 AND customer_email = $2',
      [id, email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const order = result.rows[0];

    // Get status history
    const historyResult = await pool.query(
      'SELECT * FROM order_status_history WHERE order_id = $1 ORDER BY created_at ASC',
      [id]
    );

    res.json({ success: true, data: { ...order, status_history: historyResult.rows } });
  } catch (error) {
    console.error('Track order error:', error);
    res.status(500).json({ error: 'Failed to track order' });
  }
});

export default router;
