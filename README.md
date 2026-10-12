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
│   └── database/
├── public/
└── package.json
```

## Setup

### 1. Install Dependencies

**Root (Frontend)**:
```bash
npm install
```

**Backend**:
```bash
cd server
npm install
```

### 2. Configure Backend

Edit `server/.env`:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-role-key
JWT_SECRET=your-random-secret
PORT=4000
CORS_ORIGIN=http://localhost:4321
```

### 3. Setup Database

1. Buka [Supabase Dashboard](https://supabase.com/dashboard)
2. Buat project baru
3. SQL Editor → execute `server/database/schema.sql`
4. SQL Editor → execute `server/database/seed.sql`

### 4. Run Development

**Run both (Frontend + Backend)**:
```bash
npm run dev:all
```

**Or run separately**:
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run dev:server
```

- Frontend: http://localhost:4321
- Backend API: http://localhost:4000

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

## Default Admin

```
Email: admin@roquace.com
Password: admin123
```

## Tech Stack

**Frontend**:
- Astro
- Tailwind CSS
- TypeScript

**Backend**:
- Express.js
- Supabase (PostgreSQL)
- JWT Authentication
- TypeScript

## Scripts

- `npm run dev` - Run frontend only
- `npm run dev:server` - Run backend only
- `npm run dev:all` - Run both concurrently
- `npm run build` - Build frontend
- `npm run build:server` - Build backend
