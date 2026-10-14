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

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:4321',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(join(__dirname, '../../public/uploads')));

// Health check
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Roquace Backend API',
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

// API Routes
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/customers', customersRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/coupons', couponsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/search', searchRouter);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
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
});

export default app;
