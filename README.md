# ✈️ Jetdex

**Jetdex** is a structured, data-driven platform that indexes the world's **fighter jet manufacturers, aircraft programs, and military aviation systems**.

It focuses on **who builds fighter jets**, how those aircraft are developed, and what distinguishes them — presented in a clean, scalable format suitable for **developers, researchers, and aviation enthusiasts**.

---

## 🎯 Purpose

Military aviation data is often scattered across articles, PDFs, and unstructured sources.  
Jetdex aims to solve this by providing:

- A **normalized, queryable dataset**
- Clear relationships between **countries, manufacturers, and aircraft**
- A foundation for **APIs, dashboards, and analytics**
- A **portfolio-grade system design project**

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- pnpm (or npm/yarn)
- Docker & Docker Compose

### Option 1: Docker Compose (Recommended)

```bash
# Clone the repository
cd jets-index

# Start all services
docker-compose -f docker-compose.full.yaml up -d

# Access the application
# Frontend: http://localhost:3001
# Backend API: http://localhost:3000/api/v1
# Swagger Docs: http://localhost:3000/api/docs
```

### Option 2: Local Development

#### Backend

```bash
cd backend

# Install dependencies
pnpm install

# Copy environment file
cp .env.example .env.dev

# Start PostgreSQL with Docker
docker-compose up -d

# Start the backend
pnpm start:dev
```

#### Frontend

```bash
cd frontend

# Install dependencies
pnpm install

# Copy environment file
cp .env.example .env.local

# Start the frontend
pnpm dev
```

---

## 📡 API Documentation

Once the backend is running, visit the Swagger UI:

- **URL**: http://localhost:3000/api/docs
- **Base URL**: http://localhost:3000/api/v1

### Authentication

The API uses JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-token>
```

### Demo Accounts

After the seeder runs, you can login with:

| Role  | Email               | Password |
| ----- | ------------------- | -------- |
| Admin | admin@jetsindex.com | admin123 |
| User  | user@jetsindex.com  | admin123 |

---

## 📁 Project Structure

```
jets-index/
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── auth/          # JWT authentication
│   │   ├── users/         # User management
│   │   ├── countries/    # Country entities
│   │   ├── manufacturers/ # Manufacturer entities
│   │   ├── equipment/    # Aircraft/equipment
│   │   ├── equipment-variants/ # Variants
│   │   ├── health/      # Health checks
│   │   ├── stats/       # Dashboard stats
│   │   └── database/    # Database seeder
│   └── Dockerfile
│
├── frontend/               # Next.js 16 App
│   ├── app/
│   │   ├── fighters/     # Fighters pages
│   │   ├── dashboard/    # Dashboard
│   │   ├── login/       # Auth pages
│   │   └── page.tsx     # Home page
│   ├── components/       # UI components
│   ├── contexts/        # React contexts
│   └── lib/             # API client
│
└── docker-compose.full.yaml  # Full stack deployment
```

---

## 🔧 Environment Variables

### Backend (.env.dev)

```env
NODE_ENV=dev
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=jetsindex_db
DB_SYNC=true
DB_LOGGING=true
JWT_SECRET=your-secret-key
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

---

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Run unit tests
pnpm test

# Run e2e tests
pnpm test:e2e

# Run with coverage
pnpm test:cov
```

---

## 📄 License

Apache License 2.0  
Free to use, modify, and distribute under the terms of the Apache License 2.0.
