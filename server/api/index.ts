import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes - langsung dari src karena Vercel compile otomatis
import productsRouter from '../src/routes/products';
import authRouter from '../src/routes/auth';
import customersRouter from '../src/routes/customers';
import uploadRouter from '../src/routes/upload';
import ordersRouter from '../src/routes/orders';
import couponsRouter from '../src/routes/coupons';
import reviewsRouter from '../src/routes/reviews';
import searchRouter from '../src/routes/search';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Roquace Backend API',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      auth: '/api/auth',
      customers: '/api/customers',
      orders: '/api/orders',
      coupons: '/api/coupons',
      reviews: '/api/reviews',
      search: '/api/search'
    }
  });
});

app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/customers', customersRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/coupons', couponsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/search', searchRouter);

// Error handling
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export default app;
