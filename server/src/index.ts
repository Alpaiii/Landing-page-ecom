import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import productsRouter from './routes/products.js';
import authRouter from './routes/auth.js';
import customersRouter from './routes/customers.js';
import uploadRouter from './routes/upload.js';
import ordersRouter from './routes/orders.js';
import couponsRouter from './routes/coupons.js';
import reviewsRouter from './routes/reviews.js';
import searchRouter from './routes/search.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8000;
const distPath = join(__dirname, '../../dist');

// Middleware
const corsOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({
  origin: corsOrigin === '*' ? true : corsOrigin,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/customers', customersRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/coupons', couponsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/search', searchRouter);

// Serve uploaded files
app.use('/uploads', express.static(join(__dirname, '../../public/uploads')));

// Health check. Registered before the SPA fallback so it is reachable: a
// browser navigating to `/` sends Accept: text/html and gets the built
// homepage, while a health probe gets the JSON status.
app.get('/', (req: Request, res: Response) => {
  if (req.headers.accept?.includes('text/html')) {
    return res.sendFile(join(distPath, 'index.html'));
  }

  res.json({
    message: 'Roquace API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      products: '/api/products',
      auth: '/api/auth',
      customers: '/api/customers',
      orders: '/api/orders',
      coupons: '/api/coupons',
      reviews: '/api/reviews',
      search: '/api/search',
      upload: '/api/upload'
    }
  });
});

// Serve Astro frontend build
app.use(express.static(distPath));

// API 404. Registered before the SPA fallback so an unmatched /api path
// returns JSON instead of being swallowed by the frontend shell.
app.use('/api', (req: Request, res: Response) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// SPA fallback. Express 5 dropped bare '*' in favour of a named wildcard.
app.get('/*splat', (req: Request, res: Response) => {
  res.sendFile(join(distPath, 'index.html'));
});

// Error handling
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Frontend: http://localhost:${PORT}`);
  console.log(`🔌 API: http://localhost:${PORT}/api`);
});

export default app;
