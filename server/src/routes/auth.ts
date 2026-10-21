import { Router, Request, Response } from 'express';
import pool from '../config/database.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { retryAfterSeconds, recordFailure, clearFailures, loginKey } from '../utils/rateLimit.js';
import { ADMIN_COOKIE, ADMIN_COOKIE_MAX_AGE_MS, getAdminToken } from '../utils/cookies.js';

const router = Router();

const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_ATTEMPTS = 10;

// Admin login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const key = loginKey(email);
    const retryAfter = await retryAfterSeconds(key, LOGIN_MAX_ATTEMPTS);
    if (retryAfter > 0) {
      res.setHeader('Retry-After', String(retryAfter));
      res.status(429).json({ error: 'Too many login attempts. Try again later.', retryAfter });
      return;
    }

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password required' });
      return;
    }

    const result = await pool.query(
      'SELECT * FROM admins WHERE email = $1',
      [email]
    );

    const admin = result.rows[0];

    if (!admin) {
      await recordFailure(key, LOGIN_WINDOW_MS);
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const validPassword = await bcrypt.compare(password, admin.password_hash);

    if (!validPassword) {
      await recordFailure(key, LOGIN_WINDOW_MS);
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    await clearFailures(key);

    const token = jwt.sign(
      { adminId: admin.id, email: admin.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.cookie(ADMIN_COOKIE, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: ADMIN_COOKIE_MAX_AGE_MS
    });

    res.json({
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Verify token
router.get('/verify', async (req: Request, res: Response) => {
  try {
    const token = getAdminToken(req);

    if (!token) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    res.json({ success: true, admin: decoded });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Clear the admin session cookie.
router.post('/logout', (req: Request, res: Response) => {
  res.clearCookie(ADMIN_COOKIE, { path: '/' });
  res.json({ success: true });
});

export default router;
