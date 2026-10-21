import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import productsRouter from './routes/products.js';
import authRouter from './routes/auth.js';
import customersRouter from './routes/customers.js';
import uploadRouter from './routes/upload.js';
import ordersRouter from './routes/orders.js';
import couponsRouter from './routes/coupons.js';
import reviewsRouter from './routes/reviews.js';
import searchRouter from './routes/search.js';
import collectionsRouter from './routes/collections.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8000;
const distPath = join(__dirname, '../../dist');

// Middleware
// Railway terminates TLS in front of the app, so trust one proxy hop to make
// req.ip (used by the login rate limiter) the real client address.
app.set('trust proxy', 1);
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      // Astro emits inline JSON islands and a few inline scripts.
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
      imgSrc: ["'self'", 'data:', 'blob:', 'https:'],
      connectSrc: ["'self'"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      frameAncestors: ["'self'"],
      upgradeInsecureRequests: null
    }
  },
  crossOriginEmbedderPolicy: false
}));
const corsOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({
  origin: corsOrigin === '*' ? true : corsOrigin,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Astro is configured with trailingSlash: 'never', but the Node middleware
// adapter still 404s URLs that arrive with a trailing slash (e.g. /shop/).
// Normalise them here so shared or hand-typed links keep working.
app.use((req: Request, res: Response, next: any) => {
  if (req.path.length > 1 && req.path.endsWith('/')) {
    const queryIndex = req.url.indexOf('?');
    const query = queryIndex >= 0 ? req.url.slice(queryIndex) : '';
    res.redirect(301, `${req.path.replace(/\/+$/, '')}${query}`);
    return;
  }
  next();
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
app.use('/api/collections', collectionsRouter);

// Serve uploaded files
const uploadsPath = process.env.UPLOAD_DIR || join(__dirname, '../../public/uploads');
app.use('/uploads', express.static(uploadsPath));

// Health check endpoint for monitoring
app.get('/health', (req: Request, res: Response) => {
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
      collections: '/api/collections',
      upload: '/api/upload'
    }
  });
});

// API 404. Registered before the SSR handler so an unmatched /api path
// returns JSON instead of the frontend shell.
app.use('/api', (req: Request, res: Response) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Serve Astro's static assets, then hand every remaining request to the
// Astro SSR handler (mode: middleware). Pages are rendered from the Postgres
// data at request time, so admin changes are visible immediately.
async function start() {
  try {
    const clientPath = join(__dirname, '../../dist/client');
    app.use(express.static(clientPath));

    const { handler } = await import(pathToFileURL(join(__dirname, '../../dist/server/entry.mjs')).href);
    app.use(handler);
  } catch (error) {
    console.error('Failed to load Astro SSR handler:', error);
  }

  // Error handling
  app.use((err: any, req: Request, res: Response, next: any) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 Frontend: http://localhost:${PORT}`);
    console.log(`🔌 API: http://localhost:${PORT}/api`);
  });
}

start();

export default app;
