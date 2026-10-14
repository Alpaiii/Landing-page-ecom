import { Router, Request, Response } from 'express';
import pool from '../config/database';
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

    let orderBy = 'created_at DESC';
    if (sort === 'highest') {
      orderBy = 'rating DESC';
    } else if (sort === 'lowest') {
      orderBy = 'rating ASC';
    } else if (sort === 'helpful') {
      orderBy = 'helpful_count DESC';
    }

    const result = await pool.query(
      `SELECT * FROM reviews 
       WHERE product_id = $1 AND is_approved = true
       ORDER BY ${orderBy}
       LIMIT $2 OFFSET $3`,
      [productId, Number(limit), Number(offset)]
    );

    // Get review stats
    const statsResult = await pool.query(
      'SELECT rating FROM reviews WHERE product_id = $1 AND is_approved = true',
      [productId]
    );

    const stats = statsResult.rows;
    const totalReviews = stats.length;
    const averageRating = totalReviews > 0
      ? stats.reduce((sum, r) => sum + r.rating, 0) / totalReviews
      : 0;

    const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
      rating,
      count: stats.filter(r => r.rating === rating).length,
      percentage: totalReviews > 0
        ? Math.round((stats.filter(r => r.rating === rating).length / totalReviews) * 100)
        : 0
    }));

    res.json({
      success: true,
      data: result.rows,
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
    const customerResult = await pool.query(
      'SELECT name FROM customers WHERE id = $1',
      [customerId]
    );

    if (customerResult.rows.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Check if already reviewed
    const existingResult = await pool.query(
      'SELECT id FROM reviews WHERE product_id = $1 AND customer_id = $2',
      [product_id, customerId]
    );

    if (existingResult.rows.length > 0) {
      return res.status(400).json({ error: 'You have already reviewed this product' });
    }

    // Check if verified purchase
    let isVerified = false;
    if (order_id) {
      const orderResult = await pool.query(
        'SELECT items FROM orders WHERE id = $1 AND customer_id = $2',
        [order_id, customerId]
      );

      if (orderResult.rows.length > 0) {
        const items = orderResult.rows[0].items;
        if (Array.isArray(items)) {
          isVerified = items.some((item: any) => item.product_id === product_id);
        }
      }
    }

    const result = await pool.query(
      `INSERT INTO reviews (product_id, customer_id, customer_name, order_id, rating, title, comment, is_verified, is_approved)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, true)
       RETURNING *`,
      [product_id, customerId, customerResult.rows[0].name, order_id || null, rating, title || null, comment || null, isVerified]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    console.error('Create review error:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
});

// PUT update review
router.put('/:id', authenticateCustomer, async (req: any, res: Response) => {
  try {
    const { customerId } = req.customer;
    const { id } = req.params;
    const { rating, title, comment } = req.body;

    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const result = await pool.query(
      `UPDATE reviews SET
        rating = COALESCE($1, rating),
        title = COALESCE($2, title),
        comment = COALESCE($3, comment),
        updated_at = NOW()
       WHERE id = $4 AND customer_id = $5
       RETURNING *`,
      [rating, title, comment, id, customerId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    console.error('Update review error:', error);
    res.status(500).json({ error: 'Failed to update review' });
  }
});

// DELETE review
router.delete('/:id', authenticateCustomer, async (req: any, res: Response) => {
  try {
    const { customerId } = req.customer;
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM reviews WHERE id = $1 AND customer_id = $2 RETURNING id',
      [id, customerId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }

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

    const result = await pool.query(
      'UPDATE reviews SET helpful_count = helpful_count + 1 WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }

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

    let whereClause = '';
    if (status === 'pending') {
      whereClause = 'WHERE is_approved = false';
    } else if (status === 'approved') {
      whereClause = 'WHERE is_approved = true';
    }

    const result = await pool.query(
      `SELECT * FROM reviews ${whereClause} ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
      [Number(limit), Number(offset)]
    );

    res.json({ success: true, data: result.rows });
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

    const result = await pool.query(
      'UPDATE reviews SET is_approved = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [is_approved, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    console.error('Approve review error:', error);
    res.status(500).json({ error: 'Failed to update review' });
  }
});

// Admin: DELETE review
router.delete('/admin/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM reviews WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json({ success: true });
  } catch (error: any) {
    console.error('Delete review error:', error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

export default router;
