# Roquace Backend API

Backend API untuk Roquace e-commerce dashboard admin.

## Tech Stack

- **Node.js** + **Express.js** + **TypeScript**
- **Supabase** (PostgreSQL database)
- **JWT** authentication
- **bcrypt** password hashing

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` dan isi dengan credentials Supabase:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-role-key
JWT_SECRET=your-random-secret-key
PORT=4000
CORS_ORIGIN=http://localhost:4321
```

### 3. Setup Database

1. Buka [Supabase Dashboard](https://supabase.com/dashboard)
2. Buat project baru atau gunakan existing
3. Buka **SQL Editor**
4. Copy paste isi file `database/schema.sql` dan execute
5. Copy paste isi file `database/seed.sql` dan execute (untuk sample data)

### 4. Run Development Server

```bash
npm run dev
```

Server akan jalan di `http://localhost:4000`

## API Endpoints

### Auth

**POST** `/api/auth/login`
- Login admin
- Body: `{ email, password }`
- Returns: `{ token, admin }`

**GET** `/api/auth/verify`
- Verify JWT token
- Headers: `Authorization: Bearer <token>`

### Products

**GET** `/api/products`
- Get all products (public)

**GET** `/api/products/:id`
- Get single product (public)

**POST** `/api/products`
- Create product (admin only)
- Headers: `Authorization: Bearer <token>`
- Body: product data

**PUT** `/api/products/:id`
- Update product (admin only)
- Headers: `Authorization: Bearer <token>`

**DELETE** `/api/products/:id`
- Delete product (admin only)
- Headers: `Authorization: Bearer <token>`

## Default Admin Account

```
Email: admin@roquace.com
Password: admin123
```

## Project Structure

```
roquace-backend/
├── src/
│   ├── config/
│   │   └── supabase.ts       # Supabase client
│   ├── middleware/
│   │   └── auth.ts            # JWT authentication
│   ├── routes/
│   │   ├── auth.ts            # Auth endpoints
│   │   └── products.ts        # Product CRUD
│   └── index.ts               # Express app entry
├── database/
│   ├── schema.sql             # Database schema
│   └── seed.sql               # Sample data
├── .env.example
├── package.json
└── tsconfig.json
```

## Scripts

- `npm run dev` - Development server with hot reload
- `npm run build` - Build for production
- `npm start` - Run production build

## Security Notes

- Passwords di-hash dengan bcrypt (10 rounds)
- JWT expires dalam 7 hari
- Admin routes protected dengan middleware
- CORS configured untuk frontend origin
