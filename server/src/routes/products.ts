import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

// GET all products (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET single product by ID (public)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error: any) {
    res.status(404).json({ error: 'Product not found' });
  }
});

// POST create product (admin only)
router.post('/', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, data });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update product (admin only)
router.put('/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .update(req.body)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE product (admin only)
router.delete('/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;

    res.json({ success: true, message: 'Product deleted' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
