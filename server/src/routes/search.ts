import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';

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

    let query = supabase
      .from('products')
      .select('*');

    // Text search
    if (q && q.trim()) {
      const searchTerm = q.trim();
      query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,tags.cs.{${searchTerm}}`);
    }

    // Filters
    if (category) {
      query = query.eq('category', category);
    }

    if (min_price) {
      query = query.gte('price', Number(min_price));
    }

    if (max_price) {
      query = query.lte('price', Number(max_price));
    }

    if (in_stock === 'true') {
      query = query.gt('stock', 0);
    }

    if (is_featured === 'true') {
      query = query.eq('is_featured', true);
    }

    if (is_new === 'true') {
      query = query.eq('is_new', true);
    }

    // Sorting
    switch (sort) {
      case 'newest':
        query = query.order('created_at', { ascending: false });
        break;
      case 'price_asc':
        query = query.order('price', { ascending: true });
        break;
      case 'price_desc':
        query = query.order('price', { ascending: false });
        break;
      case 'featured':
        query = query.order('is_featured', { ascending: false }).order('created_at', { ascending: false });
        break;
      case 'rating':
        query = query.order('is_featured', { ascending: false }).order('is_new', { ascending: false });
        break;
      default:
        // relevance - exact matches first, then created_at desc
        query = query.order('created_at', { ascending: false });
    }

    // Pagination
    const limitNum = Math.min(Number(limit), 50);
    const offsetNum = Number(offset);
    query = query.range(offsetNum, offsetNum + limitNum - 1);

    const { data: products, error, count } = await query;

    if (error) throw error;

    res.json({ 
      success: true, 
      data: products || [],
      pagination: {
        limit: limitNum,
        offset: offsetNum,
        total: count || 0
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

    if (!q || q.length < 2) {
      return res.json({ success: true, data: [] });
    }

    const searchTerm = q.trim();

    // Search in products
    const { data: products } = await supabase
      .from('products')
      .select('name, slug, category')
      .ilike('name', `%${searchTerm}%`)
      .limit(5);

    // Search in categories
    const { data: categories } = await supabase
      .from('categories')
      .select('name, slug')
      .ilike('name', `%${searchTerm}%`)
      .limit(3);

    const suggestions = [
      ...(products || []).map(p => ({
        type: 'product',
        label: p.name,
        value: p.name,
        slug: p.slug,
        category: p.category
      })),
      ...(categories || []).map(c => ({
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