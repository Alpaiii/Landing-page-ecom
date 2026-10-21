import { Router, Request, Response } from 'express';
import pool from '../config/database.js';
import { authenticateAdmin } from '../middleware/auth.js';

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

// GET all coupons (admin)
router.get('/', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM coupons ORDER BY created_at DESC');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Get all coupons error:', error);
    res.status(500).json({ error: 'Failed to fetch coupons' });
  }
});

// POST create coupon (admin)
router.post('/', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const {
      code,
      description,
      discount_type,
      discount_value,
      min_purchase,
      max_discount,
      usage_limit,
      per_customer_limit,
      valid_from,
      valid_until,
      is_active
    } = req.body;

    if (!code || !discount_type || discount_value === undefined || discount_value === null) {
      res.status(400).json({ error: 'Code, discount type, and discount value are required' });
      return;
    }

    if (!['percentage', 'fixed'].includes(discount_type)) {
      res.status(400).json({ error: 'Discount type must be percentage or fixed' });
      return;
    }

    const numericValue = Number(discount_value);
    if (Number.isNaN(numericValue) || numericValue < 0) {
      res.status(400).json({ error: 'Discount value must be a non-negative number' });
      return;
    }

    const result = await pool.query(
      `INSERT INTO coupons
        (code, description, discount_type, discount_value, min_purchase, max_discount,
         usage_limit, per_customer_limit, valid_from, valid_until, is_active)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       RETURNING *`,
      [
        String(code).toUpperCase().trim(),
        description || null,
        discount_type,
        numericValue,
        min_purchase === '' || min_purchase === undefined ? 0 : Number(min_purchase),
        max_discount === '' || max_discount === undefined ? null : Number(max_discount),
        usage_limit === '' || usage_limit === undefined ? null : Number(usage_limit),
        per_customer_limit === '' || per_customer_limit === undefined ? 1 : Number(per_customer_limit),
        valid_from || null,
        valid_until || null,
        is_active !== false
      ]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    if (error.code === '23505') {
      res.status(409).json({ error: 'Coupon code already exists' });
      return;
    }
    console.error('Create coupon error:', error);
    res.status(400).json({ error: 'Failed to create coupon' });
  }
});

// PUT update coupon (admin)
router.put('/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const allowed = [
      'code',
      'description',
      'discount_type',
      'discount_value',
      'min_purchase',
      'max_discount',
      'usage_limit',
      'per_customer_limit',
      'valid_from',
      'valid_until',
      'is_active'
    ];

    const updates: string[] = [];
    const values: any[] = [];

    for (const field of allowed) {
      if (req.body[field] === undefined) continue;

      let value = req.body[field];
      if (field === 'code') {
        value = String(value).toUpperCase().trim();
        if (!value) {
          res.status(400).json({ error: 'Code cannot be empty' });
          return;
        }
      }
      if (field === 'discount_type' && !['percentage', 'fixed'].includes(value)) {
        res.status(400).json({ error: 'Discount type must be percentage or fixed' });
        return;
      }
      if (['discount_value', 'min_purchase', 'max_discount', 'usage_limit', 'per_customer_limit'].includes(field)) {
        if (value === '' || value === null) {
          value = field === 'discount_value' ? null : null;
        } else {
          value = Number(value);
          if (Number.isNaN(value) || value < 0) {
            res.status(400).json({ error: `${field} must be a non-negative number` });
            return;
          }
        }
      }
      if (field === 'is_active') value = Boolean(value);

      updates.push(`${field} = $${values.length + 1}`);
      values.push(value);
    }

    if (updates.length === 0) {
      res.status(400).json({ error: 'No fields to update' });
      return;
    }

    updates.push('updated_at = NOW()');
    values.push(req.params.id);

    const result = await pool.query(
      `UPDATE coupons SET ${updates.join(', ')} WHERE id = $${values.length} RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Coupon not found' });
      return;
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    if (error.code === '23505') {
      res.status(409).json({ error: 'Coupon code already exists' });
      return;
    }
    console.error('Update coupon error:', error);
    res.status(400).json({ error: 'Failed to update coupon' });
  }
});

// DELETE coupon (admin)
router.delete('/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const result = await pool.query('DELETE FROM coupons WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Coupon not found' });
      return;
    }
    res.json({ success: true });
  } catch (error) {
    console.error('Delete coupon error:', error);
    res.status(500).json({ error: 'Failed to delete coupon' });
  }
});

export default router;
