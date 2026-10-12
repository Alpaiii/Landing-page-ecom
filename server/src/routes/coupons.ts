import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';

const router = Router();

// POST validate coupon
router.post('/validate', async (req: Request, res: Response) => {
  try {
    const { code, subtotal, customer_id } = req.body;

    if (!code || !subtotal) {
      return res.status(400).json({ error: 'Code and subtotal required' });
    }

    // Get coupon
    const { data: coupon, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', code.toUpperCase())
      .single();

    if (error || !coupon) {
      return res.status(404).json({ error: 'Invalid coupon code' });
    }

    // Check if active
    if (!coupon.is_active) {
      return res.status(400).json({ error: 'This coupon is no longer active' });
    }

    // Check date validity
    const now = new Date();
    if (coupon.valid_from && new Date(coupon.valid_from) > now) {
      return res.status(400).json({ error: 'This coupon is not yet valid' });
    }
    if (coupon.valid_until && new Date(coupon.valid_until) < now) {
      return res.status(400).json({ error: 'This coupon has expired' });
    }

    // Check minimum purchase
    if (coupon.min_purchase && subtotal < coupon.min_purchase) {
      return res.status(400).json({ 
        error: `Minimum purchase of Rp ${coupon.min_purchase.toLocaleString()} required` 
      });
    }

    // Check usage limit
    if (coupon.usage_limit && coupon.usage_count >= coupon.usage_limit) {
      return res.status(400).json({ error: 'This coupon has reached its usage limit' });
    }

    // Check per customer limit
    if (customer_id && coupon.per_customer_limit) {
      const { count } = await supabase
        .from('coupon_usage')
        .select('*', { count: 'exact', head: true })
        .eq('coupon_id', coupon.id)
        .eq('customer_id', customer_id);

      if (count && count >= coupon.per_customer_limit) {
        return res.status(400).json({ error: 'You have already used this coupon' });
      }
    }

    // Calculate discount
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
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from('coupons')
      .select('code, description, discount_type, discount_value, min_purchase, valid_until')
      .eq('is_active', true)
      .or(`valid_from.is.null,valid_from.lte.${now}`)
      .or(`valid_until.is.null,valid_until.gte.${now}`)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    console.error('Get coupons error:', error);
    res.status(500).json({ error: 'Failed to fetch coupons' });
  }
});

export default router;
