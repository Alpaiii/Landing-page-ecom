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

    const result = await pool.query(
      `INSERT INTO products (name, slug, description, price, compare_price, category, subcategory, images, colors, sizes, tags, stock, is_featured, is_new)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
       RETURNING *`,
      [
        name,
        slug,
        description,
        price,
        compare_price || null,
        category,
        subcategory || null,
        JSON.stringify(images || []),
        JSON.stringify(colors || []),
        JSON.stringify(sizes || []),
        JSON.stringify(tags || []),
        stock || 0,
        is_featured || false,
        is_new || false
      ]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
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

    const result = await pool.query(
      `UPDATE products SET
        name = COALESCE($1, name),
        slug = COALESCE($2, slug),
        description = COALESCE($3, description),
        price = COALESCE($4, price),
        compare_price = COALESCE($5, compare_price),
        category = COALESCE($6, category),
        subcategory = COALESCE($7, subcategory),
        images = COALESCE($8, images),
        colors = COALESCE($9, colors),
        sizes = COALESCE($10, sizes),
        tags = COALESCE($11, tags),
        stock = COALESCE($12, stock),
        is_featured = COALESCE($13, is_featured),
        is_new = COALESCE($14, is_new),
        updated_at = NOW()
       WHERE id = $15
       RETURNING *`,
      [
        name,
        slug,
        description,
        price,
        compare_price,
        category,
        subcategory,
        images ? JSON.stringify(images) : null,
        colors ? JSON.stringify(colors) : null,
        sizes ? JSON.stringify(sizes) : null,
        tags ? JSON.stringify(tags) : null,
        stock,
        is_featured,
        is_new,
        req.params.id
      ]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
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
