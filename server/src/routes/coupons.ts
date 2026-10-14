import { Router, Request, Response } from 'express';
import pool from '../config/database';

const router = Router();

// POST validate coupon
router.post('/validate', async (req: Request, res: Response) => {
  try {
    const { code, subtotal, customer_id } = req.body;

    if (!code || !subtotal) {
      return res.status(400).json({ error: 'Code and subtotal required' });
    }

    const result = await pool.query(
      'SELECT * FROM coupons WHERE code = $1',
      [code.toUpperCase()]
    );

    const coupon = result.rows[0];

    if (!coupon) {
      return res.status(404).json({ error: 'Invalid coupon code' });
    }

    if (!coupon.is_active) {
      return res.status(400).json({ error: 'This coupon is no longer active' });
    }

    const now = new Date();
    if (coupon.valid_from && new Date(coupon.valid_from) > now) {
      return res.status(400).json({ error: 'This coupon is not yet valid' });
    }
    if (coupon.valid_until && new Date(coupon.valid_until) < now) {
      return res.status(400).json({ error: 'This coupon has expired' });
    }

    if (coupon.min_purchase && subtotal < coupon.min_purchase) {
      return res.status(400).json({ 
        error: `Minimum purchase of Rp ${coupon.min_purchase.toLocaleString()} required` 
      });
    }

    if (coupon.usage_limit && coupon.usage_count >= coupon.usage_limit) {
      return res.status(400).json({ error: 'This coupon has reached its usage limit' });
    }

    if (customer_id && coupon.per_customer_limit) {
      const usageResult = await pool.query(
        'SELECT COUNT(*) FROM coupon_usage WHERE coupon_id = $1 AND customer_id = $2',
        [coupon.id, customer_id]
      );

      const count = parseInt(usageResult.rows[0].count);
      if (count >= coupon.per_customer_limit) {
        return res.status(400).json({ error: 'You have already used this coupon' });
      }
    }

    let discount = 0;
    if (coupon.discount_type === 'percentage') {
      discount = (subtotal * coupon.discount_value) / 100;
      if (coupon.max_discount && discount > coupon.max_discount) {
        discount = coupon.max_discount;
      }
    } else {
      discount = coupon.discount_value;
    }

    res.json({
      success: true,
      data: {
        code: coupon.code,
        description: coupon.description,
        discount_type: coupon.discount_type,
        discount_value: coupon.discount_value,
        discount_amount: Math.round(discount),
        final_amount: subtotal - Math.round(discount)
      }
    });
  } catch (error) {
    console.error('Validate coupon error:', error);
    res.status(500).json({ error: 'Failed to validate coupon' });
  }
});

// GET all active coupons (public)
router.get('/active', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT code, description, discount_type, discount_value, min_purchase, valid_until
       FROM coupons
       WHERE is_active = true
       AND (valid_from IS NULL OR valid_from <= NOW())
       AND (valid_until IS NULL OR valid_until >= NOW())
       ORDER BY created_at DESC`
    );

    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Get coupons error:', error);
    res.status(500).json({ error: 'Failed to fetch coupons' });
  }
});

export default router;
