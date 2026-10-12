import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

// Middleware to authenticate customer
const authenticateCustomer = async (req: any, res: Response, next: any) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.customer = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// GET reviews for a product (public)
router.get('/product/:productId', async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { sort = 'recent', limit = 10, offset = 0 } = req.query;

    let query = supabase
      .from('reviews')
      .select('*')
      .eq('product_id', productId)
      .eq('is_approved', true);

    // Sort
    if (sort === 'recent') {
      query = query.order('created_at', { ascending: false });
    } else if (sort === 'highest') {
      query = query.order('rating', { ascending: false });
    } else if (sort === 'lowest') {
      query = query.order('rating', { ascending: true });
    } else if (sort === 'helpful') {
      query = query.order('helpful_count', { ascending: false });
    }

    // Pagination
    query = query.range(Number(offset), Number(offset) + Number(limit) - 1);

    const { data: reviews, error } = await query;

    if (error) throw error;

    // Get review stats
    const { data: stats } = await supabase
      .from('reviews')
      .select('rating')
      .eq('product_id', productId)
      .eq('is_approved', true);

    const totalReviews = stats?.length || 0;
    const averageRating = totalReviews > 0
      ? stats!.reduce((sum, r) => sum + r.rating, 0) / totalReviews
      : 0;

    // Rating breakdown
    const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
      rating,
      count: stats?.filter(r => r.rating === rating).length || 0,
      percentage: totalReviews > 0
        ? Math.round((stats!.filter(r => r.rating === rating).length / totalReviews) * 100)
        : 0
    }));

    res.json({
      success: true,
      data: reviews || [],
      stats: {
        total: totalReviews,
        average: Math.round(averageRating * 10) / 10,
        breakdown: ratingCounts
      }
    });
  } catch (error: any) {
    console.error('Get reviews error:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// POST create review (authenticated customer)
router.post('/', authenticateCustomer, async (req: any, res: Response) => {
  try {
    const { customerId } = req.customer;
    const { product_id, rating, title, comment, order_id } = req.body;

    if (!product_id || !rating) {
      return res.status(400).json({ error: 'Product ID and rating required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    // Get customer info
    const { data: customer } = await supabase
      .from('customers')
      .select('name')
      .eq('id', customerId)
      .single();

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Check if customer already reviewed this product
    const { data: existing } = await supabase
      .from('reviews')
      .select('id')
      .eq('product_id', product_id)
      .eq('customer_id', customerId)
      .single();

    if (existing) {
      return res.status(400).json({ error: 'You have already reviewed this product' });
    }

    // Check if customer purchased this product (if order_id provided)
    let isVerified = false;
    if (order_id) {
      const { data: order } = await supabase
        .from('orders')
        .select('items')
        .eq('id', order_id)
        .eq('customer_id', customerId)
        .single();

      if (order && order.items) {
        const items = order.items as any[];
        isVerified = items.some(item => item.product_id === product_id);
      }
    }

    // Create review
    const { data: review, error } = await supabase
      .from('reviews')
      .insert([{
        product_id,
        customer_id: customerId,
        customer_name: customer.name,
        order_id: order_id || null,
        rating,
        title: title || null,
        comment: comment || null,
        is_verified: isVerified,
        is_approved: true // Auto-approve, or set false for moderation
      }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, data: review });
  } catch (error: any) {
    console.error('Create review error:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
});

// PUT update review (authenticated customer, own reviews only)
router.put('/:id', authenticateCustomer, async (req: any, res: Response) => {
  try {
    const { customerId } = req.customer;
    const { id } = req.params;
    const { rating, title, comment } = req.body;

    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const { data: review, error } = await supabase
      .from('reviews')
      .update({
        rating,
        title,
        comment,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .eq('customer_id', customerId)
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, data: review });
  } catch (error: any) {
    console.error('Update review error:', error);
    res.status(500).json({ error: 'Failed to update review' });
  }
});

// DELETE review (authenticated customer, own reviews only)
router.delete('/:id', authenticateCustomer, async (req: any, res: Response) => {
  try {
    const { customerId } = req.customer;
    const { id } = req.params;

    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id)
      .eq('customer_id', customerId);

    if (error) throw error;

    res.json({ success: true });
  } catch (error: any) {
    console.error('Delete review error:', error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

// POST mark review as helpful
router.post('/:id/helpful', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Increment helpful count
    const { data: review } = await supabase
      .from('reviews')
      .select('helpful_count')
      .eq('id', id)
      .single();

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    const { error } = await supabase
      .from('reviews')
      .update({ helpful_count: (review.helpful_count || 0) + 1 })
      .eq('id', id);

    if (error) throw error;

    res.json({ success: true });
  } catch (error: any) {
    console.error('Mark helpful error:', error);
    res.status(500).json({ error: 'Failed to mark review as helpful' });
  }
});

// Admin: GET all reviews
router.get('/admin/all', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { status = 'all', limit = 50, offset = 0 } = req.query;

    let query = supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (status === 'pending') {
      query = query.eq('is_approved', false);
    } else if (status === 'approved') {
      query = query.eq('is_approved', true);
    }

    query = query.range(Number(offset), Number(offset) + Number(limit) - 1);

    const { data: reviews, error } = await query;

    if (error) throw error;

    res.json({ success: true, data: reviews || [] });
  } catch (error: any) {
    console.error('Get all reviews error:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Admin: PATCH approve/reject review
router.patch('/:id/approve', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { is_approved } = req.body;

    const { data, error } = await supabase
      .from('reviews')
      .update({ is_approved, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error: any) {
    console.error('Approve review error:', error);
    res.status(500).json({ error: 'Failed to update review' });
  }
});

// Admin: DELETE review
router.delete('/admin/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({ success: true });
  } catch (error: any) {
    console.error('Delete review error:', error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

export default router;
