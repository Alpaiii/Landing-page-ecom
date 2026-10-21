import { Router, Request, Response } from 'express';
import pool from '../config/database.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = Router();

// GET all products (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM products ORDER BY created_at DESC'
    );

    res.json({ success: true, data: result.rows });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET single product by ID (public)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM products WHERE id = $1',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    res.status(404).json({ error: 'Product not found' });
  }
});

// GET single product by slug (public)
router.get('/slug/:slug', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM products WHERE slug = $1',
      [req.params.slug]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    res.status(404).json({ error: 'Product not found' });
  }
});

// POST create product (admin only)
router.post('/', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const {
      name,
      slug,
      description,
      price,
      compare_price,
      category,
      subcategory,
      images,
      colors,
      sizes,
      tags,
      stock,
      is_featured,
      is_new
    } = req.body;

    // Basic validation so admin mistakes return a clear 4xx instead of a DB error.
    if (!name || !slug || !description || !category) {
      res.status(400).json({ error: 'Name, slug, description, and category are required' });
      return;
    }

    const numericPrice = Number(price);
    if (price === undefined || price === null || price === '' || Number.isNaN(numericPrice) || numericPrice < 0) {
      res.status(400).json({ error: 'Price must be a non-negative number' });
      return;
    }

    const numericComparePrice = compare_price === undefined || compare_price === null || compare_price === ''
      ? null
      : Number(compare_price);
    if (numericComparePrice !== null && (Number.isNaN(numericComparePrice) || numericComparePrice < 0)) {
      res.status(400).json({ error: 'Compare price must be a non-negative number' });
      return;
    }

    const numericStock = stock === undefined || stock === null || stock === '' ? 0 : Number(stock);
    if (!Number.isInteger(numericStock) || numericStock < 0) {
      res.status(400).json({ error: 'Stock must be a non-negative integer' });
      return;
    }

    const result = await pool.query(
      `INSERT INTO products (name, slug, description, price, compare_price, category, subcategory, images, colors, sizes, tags, stock, is_featured, is_new)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
       RETURNING *`,
      [
        name,
        slug,
        description,
        numericPrice,
        numericComparePrice,
        category,
        subcategory || null,
        JSON.stringify(images || []),
        JSON.stringify(colors || []),
        JSON.stringify(sizes || []),
        JSON.stringify(tags || []),
        numericStock,
        is_featured || false,
        is_new || false
      ]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    if (error.code === '23505') {
      res.status(409).json({ error: 'Slug already exists. Pick a different slug.' });
      return;
    }
    console.error('Create product error:', error);
    res.status(400).json({ error: 'Failed to create product' });
  }
});

// PUT update product (admin only)
router.put('/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const {
      name,
      slug,
      description,
      price,
      compare_price,
      category,
      subcategory,
      images,
      colors,
      sizes,
      tags,
      stock,
      is_featured,
      is_new
    } = req.body;

    const updates: string[] = [];
    const values: any[] = [];
    const set = (column: string, value: any) => {
      updates.push(`${column} = $${values.length + 1}`);
      values.push(value);
    };

    for (const [field, value] of Object.entries({ name, slug, description, category })) {
      if (value !== undefined) {
        if (typeof value !== 'string' || !value.trim()) {
          res.status(400).json({ error: `${field} cannot be empty` });
          return;
        }
        set(field, value.trim());
      }
    }

    if (price !== undefined) {
      const numericPrice = Number(price);
      if (price === null || price === '' || Number.isNaN(numericPrice) || numericPrice < 0) {
        res.status(400).json({ error: 'Price must be a non-negative number' });
        return;
      }
      set('price', numericPrice);
    }

    if (compare_price !== undefined) {
      if (compare_price === null || compare_price === '') {
        set('compare_price', null);
      } else {
        const numericComparePrice = Number(compare_price);
        if (Number.isNaN(numericComparePrice) || numericComparePrice < 0) {
          res.status(400).json({ error: 'Compare price must be a non-negative number' });
          return;
        }
        set('compare_price', numericComparePrice);
      }
    }

    if (stock !== undefined) {
      const numericStock = Number(stock);
      if (!Number.isInteger(numericStock) || numericStock < 0) {
        res.status(400).json({ error: 'Stock must be a non-negative integer' });
        return;
      }
      set('stock', numericStock);
    }

    if (subcategory !== undefined) set('subcategory', subcategory || null);
    if (images !== undefined) set('images', JSON.stringify(images || []));
    if (colors !== undefined) set('colors', JSON.stringify(colors || []));
    if (sizes !== undefined) set('sizes', JSON.stringify(sizes || []));
    if (tags !== undefined) set('tags', JSON.stringify(tags || []));
    if (is_featured !== undefined) set('is_featured', Boolean(is_featured));
    if (is_new !== undefined) set('is_new', Boolean(is_new));

    updates.push('updated_at = NOW()');
    values.push(req.params.id);

    const result = await pool.query(
      `UPDATE products SET ${updates.join(', ')} WHERE id = $${values.length} RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    if (error.code === '23505') {
      res.status(409).json({ error: 'Slug already exists. Pick a different slug.' });
      return;
    }
    console.error('Update product error:', error);
    res.status(400).json({ error: 'Failed to update product' });
  }
});

// DELETE product (admin only)
router.delete('/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'DELETE FROM products WHERE id = $1 RETURNING id',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.json({ success: true, message: 'Product deleted' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
