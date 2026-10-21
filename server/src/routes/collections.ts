import { Router, Request, Response } from 'express';
import pool from '../config/database.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = Router();

// GET all collections (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM collections ORDER BY display_order ASC, created_at ASC'
    );

    res.json({ success: true, data: result.rows });
  } catch (error: any) {
    console.error('Get collections error:', error);
    res.status(500).json({ error: 'Failed to fetch collections' });
  }
});

// GET single collection by slug (public)
router.get('/slug/:slug', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM collections WHERE slug = $1',
      [req.params.slug]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Collection not found' });
      return;
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    console.error('Get collection error:', error);
    res.status(500).json({ error: 'Failed to fetch collection' });
  }
});

// POST create collection (admin only)
router.post('/', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const {
      name,
      slug,
      description,
      short_description,
      image,
      image_hover,
      season,
      year,
      is_featured,
      display_order
    } = req.body;

    if (!name || !slug) {
      res.status(400).json({ error: 'Name and slug are required' });
      return;
    }

    const result = await pool.query(
      `INSERT INTO collections
        (name, slug, description, short_description, image, image_hover, season, year, is_featured, display_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [
        name,
        slug,
        description || null,
        short_description || null,
        image || null,
        image_hover || null,
        season || null,
        year || null,
        is_featured || false,
        display_order || 0
      ]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    if (error.code === '23505') {
      res.status(409).json({ error: 'Slug already exists' });
      return;
    }
    console.error('Create collection error:', error);
    res.status(400).json({ error: 'Failed to create collection' });
  }
});

// PUT update collection (admin only)
router.put('/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const {
      name,
      slug,
      description,
      short_description,
      image,
      image_hover,
      season,
      year,
      is_featured,
      display_order
    } = req.body;

    const result = await pool.query(
      `UPDATE collections SET
        name = COALESCE($1, name),
        slug = COALESCE($2, slug),
        description = COALESCE($3, description),
        short_description = COALESCE($4, short_description),
        image = COALESCE($5, image),
        image_hover = COALESCE($6, image_hover),
        season = COALESCE($7, season),
        year = COALESCE($8, year),
        is_featured = COALESCE($9, is_featured),
        display_order = COALESCE($10, display_order),
        updated_at = NOW()
       WHERE id = $11
       RETURNING *`,
      [
        name,
        slug,
        description,
        short_description,
        image,
        image_hover,
        season,
        year,
        is_featured,
        display_order,
        req.params.id
      ]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Collection not found' });
      return;
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    if (error.code === '23505') {
      res.status(409).json({ error: 'Slug already exists' });
      return;
    }
    console.error('Update collection error:', error);
    res.status(400).json({ error: 'Failed to update collection' });
  }
});

// DELETE collection (admin only)
router.delete('/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'DELETE FROM collections WHERE id = $1 RETURNING id',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Collection not found' });
      return;
    }

    res.json({ success: true, message: 'Collection deleted' });
  } catch (error: any) {
    console.error('Delete collection error:', error);
    res.status(400).json({ error: 'Failed to delete collection' });
  }
});

export default router;
