# Roquace - E-commerce Landing Page + Backend

Full-stack e-commerce project dengan Astro frontend dan Express backend.

## Project Structure

```
Landing Page Astro/
├── src/                    # Frontend Astro
│   ├── pages/
│   ├── components/
│   └── layouts/
├── server/                 # Backend Express
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   └── routes/
│   ├── scripts/
│   └── database/
├── public/
├── railway.json            # Backend Railway config
├── railway.frontend.json   # Frontend Railway config
└── .github/workflows/      # CI/CD pipelines
```

## Tech Stack

**Frontend:**
- Astro
- Tailwind CSS
- TypeScript

**Backend:**
- Express.js
- PostgreSQL (Railway)
- JWT Authentication
- TypeScript

## Local Development

### 1. Install Dependencies

**Root (Frontend):**
```bash
npm install
```

**Backend:**
```bash
cd server
npm install
```

### 2. Configure Backend

Edit `server/.env`:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/railway
PORT=4000
NODE_ENV=development
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:4321
```

### 3. Setup Database

```bash
cd server
npm run migrate
npm run seed
```

### 4. Run Development

**Run both (Frontend + Backend):**
```bash
npm run dev:all
```

**Or run separately:**

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run dev:server
```

- Frontend: http://localhost:4321
- Backend API: http://localhost:4000

## Railway Deployment

### Quick Deploy

1. **Push to GitHub**
2. **Setup Railway:**
   - Create new project from GitHub repo
   - Add PostgreSQL database
   - Deploy backend service (root: `server/`)
   - Deploy frontend service (root: `./`)
3. **Set Environment Variables:**
   - Backend: `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`
   - Frontend: `PUBLIC_API_URL`

### Auto-Deploy

Push ke `main` branch akan trigger auto-deploy via GitHub Actions.

## API Endpoints

### Auth
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify token

### Products
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Customers
- `POST /api/customers/register` - Customer register
- `POST /api/customers/customer-login` - Customer login
- `GET /api/customers/orders` - Get customer orders
- `GET /api/customers/addresses` - Get customer addresses

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/track/:id` - Track order

### Coupons
- `POST /api/coupons/validate` - Validate coupon
- `GET /api/coupons/active` - Get active coupons

### Reviews
- `GET /api/reviews/product/:productId` - Get product reviews
- `POST /api/reviews` - Create review

### Search
- `GET /api/search/products` - Search products
- `GET /api/search/suggestions` - Search suggestions

## Default Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@roquace.com` | `admin123` |
| Customer | `john@example.com` | `password123` |

## Scripts

- `npm run dev` - Run frontend only
- `npm run dev:server` - Run backend only
- `npm run dev:all` - Run both concurrently
- `npm run build` - Build frontend
- `npm run build:server` - Build backend
- `npm run preview` - Preview frontend build

## License

MIT
