# Architecture Document — Jetdex

## 1. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js | 16.x |
| Language | TypeScript | 5.x (strict mode) |
| UI Library | React | 19.x |
| Styling | Tailwind CSS | 4.x |
| Component Library | shadcn/ui (Radix primitives) | latest |
| State Management | Zustand | 5.x |
| ORM | Prisma | latest |
| Database | PostgreSQL | 18.x |
| Authentication | JWT (jose) + bcryptjs | — |
| Validation | Zod | — |
| i18n | next-intl | 3.x |
| Icons | lucide-react | latest |
| Deployment | Vercel | — |

## 2. Architectural Principles

| Principle | Application |
|-----------|------------|
| **SRP** | Each file has one responsibility: route handlers handle HTTP, `lib/` handles business logic, Prisma handles data access |
| **OCP** | New resources (e.g., `reports/`) added by creating new route files — no modification of existing code |
| **LSP** | All domain types (Platform, Category, etc.) are consistent across API and UI layers |
| **ISP** | Separate type definitions for list vs. detail vs. create vs. update operations |
| **DIP** | API routes depend on `lib/prisma.ts` abstraction, not directly on `@prisma/client` internals |
| **DRY** | Shared utilities in `lib/`, shared validation schemas in `lib/validators.ts`, shared auth helpers in `lib/auth.ts` |
| **Separation of Concerns** | UI (`components/`) ≠ API (`app/api/`) ≠ Data (`prisma/`) ≠ Auth (`lib/auth.ts`) |

## 3. Project Structure

```
src/
├── app/
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Redirect to /en
│   ├── globals.css                   # Tailwind + theme CSS variables
│   ├── middleware.ts                 # Security headers + auth guards
│   ├── [lang]/                       # Locale-aware pages
│   │   ├── layout.tsx               # ThemeProvider + NextIntlClientProvider
│   │   ├── page.tsx                 # Landing page
│   │   ├── browse/page.tsx          # Platform gallery
│   │   └── blog/page.tsx            # Blog listing
│   ├── browse/ → redirect
│   ├── blog/ → redirect
│   └── api/v1/                       # API routes
│       ├── auth/
│       │   ├── login/route.ts
│       │   └── register/route.ts
│       ├── platforms/route.ts
│       ├── platforms/[id]/route.ts
│       ├── categories/route.ts
│       ├── categories/[id]/route.ts
│       ├── countries/route.ts
│       ├── countries/[id]/route.ts
│       ├── manufacturers/route.ts
│       ├── manufacturers/[id]/route.ts
│       ├── blogs/route.ts
│       ├── blogs/[id]/route.ts
│       ├── stats/route.ts
│       └── health/route.ts
├── components/
│   ├── ui/                           # shadcn/ui primitives
│   └── [app components]              # Header, Footer, BlogCard, etc.
├── lib/
│   ├── prisma.ts                     # Prisma singleton
│   ├── types.ts                      # All TypeScript types
│   ├── auth.ts                       # JWT + password utilities
│   ├── auth-guard.ts                 # requireAuth, requireAdmin
│   ├── validators.ts                 # Zod schemas
│   ├── api.ts                        # Client-side API functions
│   └── utils.ts                      # cn, formatCurrency, etc.
├── stores/
│   └── useDesignStore.ts             # Zustand state
├── i18n/
│   ├── routing.ts                    # Locale routing config
│   └── request.ts                    # Server-side i18n config
└── messages/
    ├── en.json                       # English translations
    └── ar.json                       # Arabic translations
```

## 4. Data Flow

### 4.1 Read Path (Public)

```
Browser → Next.js Server → API Route → Prisma → PostgreSQL
                ↓
         ISR Cache (revalidate: 60)
                ↓
         JSON Response → React Component → Rendered HTML
```

### 4.2 Write Path (Admin)

```
Admin Browser → API Route → Auth Guard (JWT verify)
                ↓
         Zod Validation
                ↓
         Prisma Write → PostgreSQL
                ↓
         JSON Response → UI Update
```

### 4.3 Authentication Flow

```
Login: POST /api/v1/auth/login {email, password}
  → Validate with Zod
  → Query user by email (Prisma parameterized query)
  → Compare password with bcryptjs
  → Sign JWT with jose (7d expiry)
  → Return { access_token, user: { id, email, role } }

Protected Route: GET /api/v1/platforms (POST/PUT/DELETE)
  → Extract Bearer token from Authorization header
  → Verify JWT with jose
  → Check role (ADMIN required for write operations)
  → Return 401/403 if unauthorized
```

## 5. Security Architecture

| Threat | Mitigation |
|--------|-----------|
| SQL Injection | Prisma uses parameterized queries — zero raw SQL |
| XSS | React escapes output by default; blog content sanitized |
| CSRF | Same-origin policy; JWT in Authorization header (not cookies) |
| Brute Force | Rate limiting via middleware (configurable per-route) |
| Data Exposure | Never expose `DATABASE_URL` or `JWT_SECRET` to client |
| Error Leakage | Generic error messages in production; stack traces logged server-side only |
| Clickjacking | `X-Frame-Options: DENY` header |
| MIME Sniffing | `X-Content-Type-Options: nosniff` header |
| Referrer Leakage | `Referrer-Policy: strict-origin-when-cross-origin` |

## 6. Performance Strategy

| Strategy | Implementation |
|----------|---------------|
| **ISR** | API routes return cached responses with `revalidate: 60` |
| **Static Generation** | Locale pages (`[lang]/browse`, `[lang]/blog`) statically generated at build time |
| **Image Optimization** | `next/image` with `priority` for above-fold, `fill` + `sizes` for dynamic images |
| **Font Optimization** | `next/font` with auto-subsetting and preloading |
| **Bundle Splitting** | Dynamic imports for heavy components |
| **Connection Pooling** | Prisma connection pool + Vercel Postgres PgBouncer |
| **SQL Indexes** | `@@index` on all foreign key columns |
| **Compression** | Vercel automatic gzip/brotli |

## 7. Database Schema Compatibility

The Prisma schema is designed to map **exactly** to the existing PostgreSQL schema:

| Prisma Model | Table Name | Key Mappings |
|-------------|-----------|--------------|
| User | `users` | `id` → `user_id`, `createdAt` → `created_at` |
| Category | `categories` | `id` → `category_id`, `name` → `category_name` |
| Country | `countries` | `id` → `country_id`, `name` → `country_name` |
| Manufacturer | `manufacturers` | `id` → `manu_id`, `name` → `manu_name`, FK `country_id` |
| Platform | `platforms` | `id` → `platform_id`, `name` → `platform_name`, 3 FKs |
| Blog | `blogs` | `id` → `blog_id`, `publishedAt` → `published_at` |

**Data preservation strategy:**
- Prisma `@@map()` directives ensure column name compatibility
- `ON DELETE RESTRICT` on all FKs matches existing constraints
- No destructive migrations — use `prisma migrate deploy` for production
- Seed script checks if users table is empty before seeding

## 8. Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `JWT_SECRET` | Yes | Secret key for JWT signing |
| `NODE_ENV` | No | `development` or `production` (default: production on Vercel) |
