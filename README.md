# Commercial Product Page (Deployment Ready)

A professional, beginner-friendly commercial product listing site with **Login/Signup**, a **Realtime Cart**, and a **Proceed → Thank You** flow (no payments). Built with **Node.js + Express**, **React (Vite)**, and **PostgreSQL**, ready for **Render** deployment.

## Tech Stack (Full)

- **Frontend**
  - React 18 (Vite)
  - React Router (routing)
  - Context API (cart + auth state)
- **Backend**
  - Node.js
  - Express (REST API)
  - `pg` (PostgreSQL)
  - `bcryptjs` (password hashing)
  - `jsonwebtoken` (JWT token issuing)
- **Database**
  - PostgreSQL (Render)
- **Deployment**
  - Render Web Service (Node runtime)
  - Render PostgreSQL

## Quick Start (Local)

### 1. Install dependencies

```bash
npm install
cd client && npm install && cd ..
```

### 2. Set up PostgreSQL

Create a database locally or use a free [Render PostgreSQL](https://render.com/docs/databases) instance.

Copy the env file and add your database URL:

```bash
copy .env.example .env
```

Edit `.env` and set:

```
DATABASE_URL=postgresql://user:password@host:port/database
```

### 3. Create tables and seed data

```bash
npm run db:setup
npm run db:seed
npm run db:seed:users
```

### Demo test login (from database)

After running `npm run db:seed:users`, you can login with:

- **Email**: `demo@commercial.test`
- **Password**: `Demo1234!`

### 4. Run the app

```bash
npm run dev
```

- **Frontend**: http://localhost:3000  
- **API**: http://localhost:5000/api/products  

## Features

- **Products page** with modern UI
- **Cart system** (live totals + live cart badge)
  - Add/remove items
  - Quantity controls
  - Persisted in browser storage
- **Auth system (database-backed)**
  - Signup/Login backed by PostgreSQL `users` table
  - Passwords stored as hashes (bcrypt)
  - JWT returned to client (beginner-friendly)
- **Checkout flow (no payment)**
  - Proceed button clears cart
  - Redirect to Thank You page

---

## Deploy to Render

### Option A: One-click (Blueprint)

1. Push this repo to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com)
3. Click **New** → **Blueprint**
4. Connect your repo and select `render.yaml`
5. Render creates the web service + PostgreSQL database
6. After deploy, run **Shell** in your service and run:
   ```bash
   npm run db:setup && npm run db:seed && npm run db:seed:users
   ```

### Option B: Manual

1. Create a **PostgreSQL** database on Render
2. Create a **Web Service**, connect your repo
3. Settings:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**:
     - `DATABASE_URL` (from your PostgreSQL service)
     - `NODE_ENV=production`
     - `JWT_SECRET` (strong random string)
4. Deploy, then run `npm run db:setup` and `npm run db:seed` via Shell

### Required environment variables on Render

- **DATABASE_URL**: set automatically when you link the Render Postgres database (recommended)
- **NODE_ENV**: `production`
- **JWT_SECRET**: set a strong secret (example: a long random string)

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get one product |
| POST | `/api/products` | Add a product (body: name, description, price, image_url, category) |
| POST | `/api/auth/signup` | Create account (name, email, password) |
| POST | `/api/auth/login` | Login (email, password) |

---

## Project Structure

```
commercial/
├── client/           # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.html
├── server/
│   ├── db/
│   │   ├── connection.js
│   │   ├── setup.js
│   │   └── seed.js
│   └── routes/
│       └── products.js
├── package.json
├── render.yaml
└── README.md
```

---

## Add Your Own Products

Use the API or run SQL:

```sql
INSERT INTO products (name, description, price, image_url, category)
VALUES ('Your Product', 'Description here', 99.99, 'https://...', 'Category');
```

Or with curl:

```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"New Product","description":"Great product","price":49.99,"category":"Electronics"}'
```

---

## License

MIT
