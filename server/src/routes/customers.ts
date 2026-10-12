import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = Router();

// Customer register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, name, phone } = req.body;

    if (!email || !password || !name) {
      res.status(400).json({ error: 'Email, password, and name are required' });
      return;
    }

    // Check if customer exists
    const { data: existingCustomer } = await supabase
      .from('customers')
      .select('id')
      .eq('email', email)
      .single();

    if (existingCustomer) {
      res.status(409).json({ error: 'Email already registered' });
      return;
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create customer
    const { data: customer, error } = await supabase
      .from('customers')
      .insert([{
        email,
        password_hash: passwordHash,
        name,
        phone: phone || null
      }])
      .select()
      .single();

    if (error) throw error;

    // Generate JWT
    const token = jwt.sign(
      { customerId: customer.id, email: customer.email },
      process.env.JWT_SECRET!,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      success: true,
      token,
      customer: {
        id: customer.id,
        email: customer.email,
        name: customer.name,
        phone: customer.phone
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Customer login
router.post('/customer-login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password required' });
      return;
    }

    // Get customer from database
    const { data: customer, error } = await supabase
      .from('customers')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !customer) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, customer.password_hash);

    if (!validPassword) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Generate JWT
    const token = jwt.sign(
      { customerId: customer.id, email: customer.email },
      process.env.JWT_SECRET!,
      { expiresIn: '30d' }
    );

    res.json({
      success: true,
      token,
      customer: {
        id: customer.id,
        email: customer.email,
        name: customer.name,
        phone: customer.phone
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Verify customer token
router.get('/customer-verify', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    // Get fresh customer data
    const { data: customer, error } = await supabase
      .from('customers')
      .select('id, email, name, phone')
      .eq('id', decoded.customerId)
      .single();

    if (error || !customer) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }

    res.json({ success: true, customer });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Middleware to authenticate customer
const authenticateCustomer = async (req: any, res: Response, next: any) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.customer = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// GET customer orders
router.get('/orders', authenticateCustomer, async (req: any, res: Response) => {
  try {
    const { customerId } = req.customer;

    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ success: true, data: orders || [] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET customer addresses
router.get('/addresses', authenticateCustomer, async (req: any, res: Response) => {
  try {
    const { customerId } = req.customer;

    const { data: addresses, error } = await supabase
      .from('customer_addresses')
      .select('*')
      .eq('customer_id', customerId)
      .order('is_default', { ascending: false });

    if (error) throw error;

    res.json({ success: true, data: addresses || [] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST create address
router.post('/addresses', authenticateCustomer, async (req: any, res: Response) => {
  try {
    const { customerId } = req.customer;
    const addressData = { ...req.body, customer_id: customerId };

    // If setting as default, unset other defaults
    if (addressData.is_default) {
      await supabase
        .from('customer_addresses')
        .update({ is_default: false })
        .eq('customer_id', customerId);
    }

    const { data, error } = await supabase
      .from('customer_addresses')
      .insert([addressData])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update address
router.put('/addresses/:id', authenticateCustomer, async (req: any, res: Response) => {
  try {
    const { customerId } = req.customer;
    const { id } = req.params;
    const addressData = req.body;

    // If setting as default, unset other defaults
    if (addressData.is_default) {
      await supabase
        .from('customer_addresses')
        .update({ is_default: false })
        .eq('customer_id', customerId);
    }

    const { data, error } = await supabase
      .from('customer_addresses')
      .update(addressData)
      .eq('id', id)
      .eq('customer_id', customerId)
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE address
router.delete('/addresses/:id', authenticateCustomer, async (req: any, res: Response) => {
  try {
    const { customerId } = req.customer;
    const { id } = req.params;

    const { error } = await supabase
      .from('customer_addresses')
      .delete()
      .eq('id', id)
      .eq('customer_id', customerId);

    if (error) throw error;

    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update profile
router.put('/profile', authenticateCustomer, async (req: any, res: Response) => {
  try {
    const { customerId } = req.customer;
    const { name, phone } = req.body;

    const { data, error } = await supabase
      .from('customers')
      .update({ name, phone, updated_at: new Date().toISOString() })
      .eq('id', customerId)
      .select('id, email, name, phone')
      .single();

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PUT change password
router.put('/password', authenticateCustomer, async (req: any, res: Response) => {
  try {
    const { customerId } = req.customer;
    const { current_password, new_password } = req.body;

    if (!current_password || !new_password) {
      res.status(400).json({ error: 'Current and new password required' });
      return;
    }

    // Get customer
    const { data: customer } = await supabase
      .from('customers')
      .select('password_hash')
      .eq('id', customerId)
      .single();

    if (!customer) {
      res.status(404).json({ error: 'Customer not found' });
      return;
    }

    // Verify current password
    const validPassword = await bcrypt.compare(current_password, customer.password_hash);

    if (!validPassword) {
      res.status(401).json({ error: 'Current password is incorrect' });
      return;
    }

    // Hash new password
    const password_hash = await bcrypt.hash(new_password, 10);

    // Update password
    const { error } = await supabase
      .from('customers')
      .update({ password_hash, updated_at: new Date().toISOString() })
      .eq('id', customerId);

    if (error) throw error;

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
