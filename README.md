# Roquace - E-commerce Monolith

Full-stack e-commerce project dengan Astro frontend dan Express backend dalam satu service Railway.

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
│   └── package.json
├── public/
├── railway.json            # Railway deployment config
└── .github/workflows/      # CI/CD
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

```bash
# Frontend
npm install

# Backend
cd server && npm install
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

```bash
# Run both frontend + backend
npm run dev

# Or separately:
npm run dev:frontend    # Frontend only
npm run dev:server      # Backend only
```

- Frontend: http://localhost:4321
- Backend API: http://localhost:4000/api

## Railway Deployment

### Quick Deploy

1. **Push to GitHub**
2. **Setup Railway:**
   - Create new project from GitHub repo
   - Add PostgreSQL database
   - Deploy service (root: `./`)
3. **Set Environment Variables:**
   - `DATABASE_URL` (auto-injected)
   - `NODE_ENV=production`
   - `JWT_SECRET` (generate with `openssl rand -base64 32`)
   - `CORS_ORIGIN` (your Railway domain)

### Auto-Deploy

Push ke `main` branch akan trigger auto-deploy via GitHub Actions.

## API Endpoints

| Endpoint | Method | Auth |
|----------|--------|------|
| `/api/products` | GET | Public |
| `/api/products/:id` | GET | Public |
| `/api/auth/login` | POST | Public |
| `/api/customers/register` | POST | Public |
| `/api/customers/customer-login` | POST | Public |
| `/api/orders` | POST | Public |
| `/api/orders/track/:id` | GET | Public |
| `/api/coupons/validate` | POST | Public |
| `/api/search/products` | GET | Public |

## Default Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@roquace.com` | `admin123` |
| Customer | `john@example.com` | `password123` |

## Scripts

- `npm run dev` - Run frontend + backend concurrently
- `npm run build` - Build frontend + backend
- `npm run build:frontend` - Build frontend only
- `npm run build:backend` - Build backend only
- `npm run start` - Start production server
- `npm run railway` - Full Railway deployment (build + migrate + seed + start)
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed database

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes (auto-injected) |
| `NODE_ENV` | Environment mode | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `CORS_ORIGIN` | Allowed CORS origin | No |
| `PORT` | Server port | No (default: 8000) |

## License

MIT
