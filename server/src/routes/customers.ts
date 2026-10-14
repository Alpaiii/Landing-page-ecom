import { Router, Request, Response } from 'express';
import pool from '../config/database.js';
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
    const existingResult = await pool.query(
      'SELECT id FROM customers WHERE email = $1',
      [email]
    );

    if (existingResult.rows.length > 0) {
      res.status(409).json({ error: 'Email already registered' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO customers (email, password_hash, name, phone)
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, name, phone`,
      [email, passwordHash, name, phone || null]
    );

    const customer = result.rows[0];

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

    const result = await pool.query(
      'SELECT * FROM customers WHERE email = $1',
      [email]
    );

    const customer = result.rows[0];

    if (!customer) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const validPassword = await bcrypt.compare(password, customer.password_hash);

    if (!validPassword) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

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

    const result = await pool.query(
      'SELECT id, email, name, phone FROM customers WHERE id = $1',
      [decoded.customerId]
    );

    if (result.rows.length === 0) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }

    res.json({ success: true, customer: result.rows[0] });
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

    const result = await pool.query(
      'SELECT * FROM orders WHERE customer_id = $1 ORDER BY created_at DESC',
      [customerId]
    );

    res.json({ success: true, data: result.rows });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET customer addresses
router.get('/addresses', authenticateCustomer, async (req: any, res: Response) => {
  try {
    const { customerId } = req.customer;

    const result = await pool.query(
      'SELECT * FROM customer_addresses WHERE customer_id = $1 ORDER BY is_default DESC',
      [customerId]
    );

    res.json({ success: true, data: result.rows });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST create address
router.post('/addresses', authenticateCustomer, async (req: any, res: Response) => {
  try {
    const { customerId } = req.customer;
    const {
      label,
      full_name,
      phone,
      address_line1,
      address_line2,
      city,
      province,
      postal_code,
      country,
      is_default
    } = req.body;

    // If setting as default, unset other defaults
    if (is_default) {
      await pool.query(
        'UPDATE customer_addresses SET is_default = false WHERE customer_id = $1',
        [customerId]
      );
    }

    const result = await pool.query(
      `INSERT INTO customer_addresses (customer_id, label, full_name, phone, address_line1, address_line2, city, province, postal_code, country, is_default)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [
        customerId,
        label || null,
        full_name,
        phone,
        address_line1,
        address_line2 || null,
        city,
        province,
        postal_code,
        country || 'Indonesia',
        is_default || false
      ]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update address
router.put('/addresses/:id', authenticateCustomer, async (req: any, res: Response) => {
  try {
    const { customerId } = req.customer;
    const { id } = req.params;
    const {
      label,
      full_name,
      phone,
      address_line1,
      address_line2,
      city,
      province,
      postal_code,
      country,
      is_default
    } = req.body;

    // If setting as default, unset other defaults
    if (is_default) {
      await pool.query(
        'UPDATE customer_addresses SET is_default = false WHERE customer_id = $1',
        [customerId]
      );
    }

    const result = await pool.query(
      `UPDATE customer_addresses SET
        label = COALESCE($1, label),
        full_name = COALESCE($2, full_name),
        phone = COALESCE($3, phone),
        address_line1 = COALESCE($4, address_line1),
        address_line2 = COALESCE($5, address_line2),
        city = COALESCE($6, city),
        province = COALESCE($7, province),
        postal_code = COALESCE($8, postal_code),
        country = COALESCE($9, country),
        is_default = COALESCE($10, is_default),
        updated_at = NOW()
       WHERE id = $11 AND customer_id = $12
       RETURNING *`,
      [
        label,
        full_name,
        phone,
        address_line1,
        address_line2,
        city,
        province,
        postal_code,
        country,
        is_default,
        id,
        customerId
      ]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Address not found' });
      return;
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE address
router.delete('/addresses/:id', authenticateCustomer, async (req: any, res: Response) => {
  try {
    const { customerId } = req.customer;
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM customer_addresses WHERE id = $1 AND customer_id = $2 RETURNING id',
      [id, customerId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Address not found' });
      return;
    }

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

    const result = await pool.query(
      `UPDATE customers SET
        name = COALESCE($1, name),
        phone = COALESCE($2, phone),
        updated_at = NOW()
       WHERE id = $3
       RETURNING id, email, name, phone`,
      [name, phone, customerId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Customer not found' });
      return;
    }

    res.json({ success: true, data: result.rows[0] });
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

    const result = await pool.query(
      'SELECT password_hash FROM customers WHERE id = $1',
      [customerId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Customer not found' });
      return;
    }

    const validPassword = await bcrypt.compare(current_password, result.rows[0].password_hash);

    if (!validPassword) {
      res.status(401).json({ error: 'Current password is incorrect' });
      return;
    }

    const newPasswordHash = await bcrypt.hash(new_password, 10);

    await pool.query(
      'UPDATE customers SET password_hash = $1, updated_at = NOW() WHERE id = $2',
      [newPasswordHash, customerId]
    );

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
