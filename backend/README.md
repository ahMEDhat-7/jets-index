# Jetdex Backend

NestJS REST API for the Jetdex fighter jet database platform.

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm (or npm/yarn)
- PostgreSQL (via Docker)

### Development

```bash
# Install dependencies
pnpm install

# Copy environment file
cp .env.example .env.dev

# Start PostgreSQL with Docker
docker-compose up -d

# Start the backend in development mode
pnpm start:dev

# Access the application
# API: http://localhost:3000/api/v1
# Swagger Docs: http://localhost:3000/api/docs
```

### Environment Variables (.env.dev)

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
JWT_SECRET=your-secret-key-change-in-production
```

---

## API Documentation

All endpoints are prefixed with `/api/v1`. Swagger documentation is available at `/api/docs`.

### Authentication

The API uses JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-token>
```

#### Demo Accounts

After the seeder runs, you can login with:

| Role  | Email               | Password |
| ----- | ------------------- | -------- |
| Admin | admin@jetsindex.com | admin123 |
| User  | user@jetsindex.com  | admin123 |

---

## Endpoints

### Auth

| Method | Endpoint         | Auth   | Description       |
| ------ | ---------------- | ------ | ----------------- |
| POST   | `/auth/login`    | Public | User login        |
| POST   | `/auth/register` | Public | User registration |

**Login Request:**

```json
{
  "email": "admin@jetsindex.com",
  "password": "admin123"
}
```

**Login Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "admin@jetsindex.com",
    "role": "admin"
  }
}
```

### Health Check

| Method | Endpoint  | Auth   | Description      |
| ------ | --------- | ------ | ---------------- |
| GET    | `/health` | Public | Check app health |

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "services": {
    "database": { "status": "healthy" },
    "api": { "status": "ok" }
  }
}
```

### Stats

| Method | Endpoint | Auth   | Description          |
| ------ | -------- | ------ | -------------------- |
| GET    | `/stats` | Public | Dashboard statistics |

**Response:**

```json
{
  "totalCountries": 7,
  "totalManufacturers": 8,
  "totalCategories": 6,
  "totalPlatforms": 7,
  "totalBlogs": 3,
  "platformsByCategory": [{ "categoryName": "Fighter Jet", "count": "2" }],
  "platformsByStatus": [{ "status": "Active", "count": "7" }],
  "platformsByCountry": [{ "countryName": "United States", "count": "2" }]
}
```

### Countries

| Method | Endpoint         | Auth        | Description        |
| ------ | ---------------- | ----------- | ------------------ |
| GET    | `/countries`     | Public      | List all countries |
| GET    | `/countries/:id` | Public      | Get country by ID  |
| POST   | `/countries`     | JWT + Admin | Create country     |
| PATCH  | `/countries/:id` | JWT + Admin | Update country     |
| DELETE | `/countries/:id` | JWT + Admin | Delete country     |

**Query Parameters (GET):**

- `limit`: Number of results (default: 20, max: 100)
- `offset`: Pagination offset (default: 0)
- `search`: Search by name

### Manufacturers

| Method | Endpoint             | Auth        | Description            |
| ------ | -------------------- | ----------- | ---------------------- |
| GET    | `/manufacturers`     | Public      | List all manufacturers |
| GET    | `/manufacturers/:id` | Public      | Get manufacturer by ID |
| POST   | `/manufacturers`     | JWT + Admin | Create manufacturer    |
| PATCH  | `/manufacturers/:id` | JWT + Admin | Update manufacturer    |
| DELETE | `/manufacturers/:id` | JWT + Admin | Delete manufacturer    |

**Query Parameters (GET):**

- `limit`: Number of results (default: 20, max: 100)
- `offset`: Pagination offset (default: 0)
- `search`: Search by name or specialization

### Categories

| Method | Endpoint          | Auth        | Description         |
| ------ | ----------------- | ----------- | ------------------- |
| GET    | `/categories`     | Public      | List all categories |
| GET    | `/categories/:id` | Public      | Get category by ID  |
| POST   | `/categories`     | JWT + Admin | Create category     |
| PATCH  | `/categories/:id` | JWT + Admin | Update category     |
| DELETE | `/categories/:id` | JWT + Admin | Delete category     |

### Platforms

| Method | Endpoint         | Auth        | Description        |
| ------ | ---------------- | ----------- | ------------------ |
| GET    | `/platforms`     | Public      | List all platforms |
| GET    | `/platforms/:id` | Public      | Get platform by ID |
| POST   | `/platforms`     | JWT + Admin | Create platform    |
| PATCH  | `/platforms/:id` | JWT + Admin | Update platform    |
| DELETE | `/platforms/:id` | JWT + Admin | Delete platform    |

**Query Parameters (GET):**

- `limit`: Number of results (default: 20, max: 100)
- `offset`: Pagination offset (default: 0)
- `search`: Search by name or status

**Create Platform Request:**

```json
{
  "name": "F-22 Raptor",
  "description": "Advanced stealth fighter",
  "unitCostUsd": 35000000,
  "operationalStatus": "Active",
  "technicalSpecs": {
    "maxSpeed": "Mach 2.2",
    "rangeKm": 2960
  },
  "imageUrl": "https://example.com/f22.jpg",
  "categoryId": "uuid",
  "manufacturerId": "uuid",
  "countryId": "uuid"
}
```

### Blogs

| Method | Endpoint     | Auth        | Description    |
| ------ | ------------ | ----------- | -------------- |
| GET    | `/blogs`     | Public      | List all blogs |
| GET    | `/blogs/:id` | Public      | Get blog by ID |
| POST   | `/blogs`     | JWT + Admin | Create blog    |
| PATCH  | `/blogs/:id` | JWT + Admin | Update blog    |
| DELETE | `/blogs/:id` | JWT + Admin | Delete blog    |

---

## Database Seeder

The seeder runs automatically on application startup if no users exist. It creates:

- **Users:** admin@jetsindex.com, user@jetsindex.com (password: admin123)
- **Countries:** United States, Germany, France, China, Russia, United Kingdom, Turkey
- **Categories:** Fighter Jet, Tank, Drone, Naval Vessel, Missile System, Helicopter
- **Manufacturers:** Lockheed Martin, Boeing Defense, Airbus, Rheinmetall, BAE Systems, NORINCO, Almaz-Antey, Baykar
- **Platforms:** F-35 Lightning II, Eurofighter Typhoon, Leopard 2, M1A2 Abrams, Bayraktar TB2, Wing Loong II, S-400 Triumf
- **Blogs:** 3 sample blog posts

---

## Project Structure

```
src/
├── auth/                  # Authentication module
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── jwt.strategy.ts
│   ├── jwt-auth.guard.ts
│   ├── roles.guard.ts
│   ├── public.decorator.ts
│   ├── roles.decorator.ts
│   └── dto/
│       ├── login.dto.ts
│       └── register.dto.ts
├── users/                 # User management
│   ├── users.module.ts
│   ├── users.service.ts
│   └── entities/
│       └── user.entity.ts
├── health/                # Health check
│   ├── health.module.ts
│   ├── health.controller.ts
│   └── health.service.ts
├── stats/                 # Dashboard stats
│   ├── stats.module.ts
│   ├── stats.controller.ts
│   └── stats.service.ts
├── database/              # Database seeder
│   └── seeder.service.ts
├── countries/             # Countries module
├── manufacturers/         # Manufacturers module
├── categories/            # Categories module
├── platforms/             # Platforms module
├── blogs/                 # Blogs module
├── common/                # Shared utilities
│   └── dto/
│       └── pagination-query.dto.ts
├── app.module.ts
└── main.ts
```

---

## Scripts

```bash
# Development
pnpm start:dev           # Start with hot reload

# Build
pnpm build               # Build for production

# Testing
pnpm test                # Run unit tests
pnpm test:cov            # Run with coverage
pnpm test:e2e            # Run e2e tests

# Linting
pnpm lint                # Lint and fix
```

---

## Tech Stack

- **Framework:** NestJS 11.x
- **Language:** TypeScript 5.7.x
- **Database:** PostgreSQL
- **ORM:** TypeORM 0.3.x
- **Authentication:** JWT (passport-jwt)
- **Validation:** class-validator, class-transformer
- **API Documentation:** Swagger (OpenAPI)
