import { Router, Request, Response } from 'express';
import pool from '../config/database';

const router = Router();

// GET search products
router.get('/products', async (req: Request, res: Response) => {
  try {
    const { 
      q, 
      category, 
      min_price, 
      max_price, 
      in_stock,
      is_featured,
      is_new,
      sort = 'relevance',
      limit = 20,
      offset = 0
    } = req.query;

    let whereConditions = [];
    let params: any[] = [];
    let paramIndex = 1;

    if (q && typeof q === 'string' && q.trim()) {
      const searchTerm = q.trim();
      whereConditions.push(`(
        name ILIKE $${paramIndex} OR 
        description ILIKE $${paramIndex} OR 
        tags::text ILIKE $${paramIndex}
      )`);
      params.push(`%${searchTerm}%`);
      paramIndex++;
    }

    if (category) {
      whereConditions.push(`category = $${paramIndex}`);
      params.push(category);
      paramIndex++;
    }

    if (min_price) {
      whereConditions.push(`price >= $${paramIndex}`);
      params.push(Number(min_price));
      paramIndex++;
    }

    if (max_price) {
      whereConditions.push(`price <= $${paramIndex}`);
      params.push(Number(max_price));
      paramIndex++;
    }

    if (in_stock === 'true') {
      whereConditions.push('stock > 0');
    }

    if (is_featured === 'true') {
      whereConditions.push('is_featured = true');
    }

    if (is_new === 'true') {
      whereConditions.push('is_new = true');
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    let orderBy = 'created_at DESC';
    switch (sort) {
      case 'newest':
        orderBy = 'created_at DESC';
        break;
      case 'price_asc':
        orderBy = 'price ASC';
        break;
      case 'price_desc':
        orderBy = 'price DESC';
        break;
      case 'featured':
        orderBy = 'is_featured DESC, created_at DESC';
        break;
      case 'rating':
        orderBy = 'is_featured DESC, is_new DESC';
        break;
      default:
        orderBy = 'created_at DESC';
    }

    const limitNum = Math.min(Number(limit), 50);
    const offsetNum = Number(offset);

    params.push(limitNum, offsetNum);

    const result = await pool.query(
      `SELECT * FROM products ${whereClause} ORDER BY ${orderBy} LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
      params
    );

    const countResult = await pool.query(
      `SELECT COUNT(*) FROM products ${whereClause}`,
      params.slice(0, -2)
    );

    res.json({ 
      success: true, 
      data: result.rows,
      pagination: {
        limit: limitNum,
        offset: offsetNum,
        total: parseInt(countResult.rows[0].count)
      }
    });
  } catch (error: any) {
    console.error('Search products error:', error);
    res.status(500).json({ error: 'Failed to search products' });
  }
});

// GET search suggestions (autocomplete)
router.get('/suggestions', async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== 'string' || q.length < 2) {
      return res.json({ success: true, data: [] });
    }

    const searchTerm = q.trim();

    const productsResult = await pool.query(
      'SELECT name, slug, category FROM products WHERE name ILIKE $1 LIMIT 5',
      [`%${searchTerm}%`]
    );

    const categoriesResult = await pool.query(
      'SELECT name, slug FROM categories WHERE name ILIKE $1 LIMIT 3',
      [`%${searchTerm}%`]
    );

    const suggestions = [
      ...productsResult.rows.map(p => ({
        type: 'product',
        label: p.name,
        value: p.name,
        slug: p.slug,
        category: p.category
      })),
      ...categoriesResult.rows.map(c => ({
        type: 'category',
        label: c.name,
        value: c.name,
        slug: c.slug
      }))
    ];

    res.json({ success: true, data: suggestions.slice(0, 8) });
  } catch (error: any) {
    console.error('Search suggestions error:', error);
    res.status(500).json({ error: 'Failed to get suggestions' });
  }
});

export default router;
