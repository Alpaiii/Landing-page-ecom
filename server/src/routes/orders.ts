import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

// GET all orders (admin only)
router.get('/', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// GET single order (admin only)
router.get('/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ success: true, data });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// POST create order (from checkout)
router.post('/', async (req: Request, res: Response) => {
  try {
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

    // Validate required fields
    if (!customer_email || !customer_name || !customer_phone || !shipping_address || !items || !subtotal || !payment_method) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Calculate total
    const total_amount = subtotal + (shipping_cost || 0) - (discount || 0);

    // Create order
    const { data: order, error } = await supabase
      .from('orders')
      .insert([{
        customer_id: customer_id || null,
        customer_email,
        customer_name,
        customer_phone,
        shipping_address,
        shipping_method: shipping_method || 'regular',
        shipping_cost: shipping_cost || 0,
        items,
        subtotal,
        discount: discount || 0,
        discount_code: discount_code || null,
        total_amount,
        payment_method,
        payment_status: 'pending',
        status: 'pending',
        notes: notes || null
      }])
      .select()
      .single();

    if (error) throw error;

    // Decrease product stock
    for (const item of items) {
      const { data: product } = await supabase
        .from('products')
        .select('stock')
        .eq('id', item.product_id)
        .single();

      if (product && product.stock >= item.quantity) {
        await supabase
          .from('products')
          .update({ stock: product.stock - item.quantity })
          .eq('id', item.product_id);
      }
    }

    // Create initial status history
    await supabase
      .from('order_status_history')
      .insert([{
        order_id: order.id,
        status: 'pending',
        notes: 'Order placed successfully'
      }]);

    // If coupon used, track usage
    if (discount_code && discount > 0) {
      await supabase
        .from('coupon_usage')
        .insert([{
          coupon_id: null, // Will need to lookup coupon by code
          customer_id: customer_id || null,
          order_id: order.id,
          discount_amount: discount
        }]);

      // Increment coupon usage count
      await supabase.rpc('increment_coupon_usage', { coupon_code: discount_code });
    }

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Failed to create order' });
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

    const { data, error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Add to status history
    await supabase
      .from('order_status_history')
      .insert([{
        order_id: id,
        status,
        notes: notes || null
      }]);

    res.json({ success: true, data });
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

    const { data: order, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .eq('customer_email', email)
      .single();

    if (error || !order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Get status history
    const { data: history } = await supabase
      .from('order_status_history')
      .select('*')
      .eq('order_id', id)
      .order('created_at', { ascending: true });

    res.json({ success: true, data: { ...order, status_history: history || [] } });
  } catch (error) {
    console.error('Track order error:', error);
    res.status(500).json({ error: 'Failed to track order' });
  }
});

export default router;
