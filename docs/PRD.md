# Product Requirements Document — Jetdex

## 1. Overview

**Jetdex** is a structured, data-driven platform indexing the world's fighter jet manufacturers, aircraft programs, and military aviation systems. It focuses on who builds fighter jets, how those aircraft are developed, and what distinguishes them — presented in a clean, scalable format suitable for developers, researchers, and aviation enthusiasts.

### 1.1 Purpose

Military aviation data is scattered across articles, PDFs, and unstructured sources. Jetdex solves this by providing:

- A normalized, queryable dataset of global military platforms
- Clear relationships between countries, manufacturers, and aircraft
- A foundation for APIs, dashboards, and analytics
- Full bilingual support (English and Arabic)
- A military aviation-themed UI that reflects the platform's purpose

### 1.2 Current Coverage

- 50+ Military Platforms
- 8 Categories
- 20+ Manufacturers
- 15+ Countries

---

## 2. Target Users

| User Type | Description |
|-----------|-------------|
| Defense enthusiasts | Hobbyists exploring global military platforms |
| Researchers | Academics studying military aviation systems |
| Military professionals | Seeking structured reference data |
| Developers | Building on top of aviation datasets |
| Arabic-speaking users | Full Arabic language support with RTL |

---

## 3. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js | 16.x (App Router) |
| Language | TypeScript | 5.x (strict mode) |
| UI Library | React | 19.x |
| Styling | Tailwind CSS | 4.x |
| Component Library | shadcn/ui | Radix primitives |
| State Management | Zustand | 5.x |
| ORM | Prisma | latest |
| Database | PostgreSQL | 18.x |
| Authentication | JWT (jose) + bcryptjs | — |
| Validation | Zod | — |
| i18n | next-intl | 3.x |
| Markdown | react-markdown | — |
| Icons | lucide-react | latest |
| Deployment | Vercel | — |

---

## 4. Architecture

### 4.1 System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      VERCEL DEPLOYMENT                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐    ┌──────────────┐                   │
│  │  Next.js 16  │    │  PostgreSQL  │                   │
│  │  App Router   │────│  Database    │                   │
│  │              │    │              │                   │
│  │  ┌────────┐  │    └──────────────┘                   │
│  │  │ API    │  │                                       │
│  │  │ Routes │  │                                       │
│  │  └────────┘  │                                       │
│  │  ┌────────┐  │                                       │
│  │  │ Pages  │  │                                       │
│  │  │ (SSR)  │  │                                       │
│  │  └────────┘  │                                       │
│  └──────────────┘                                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 4.2 Project Structure

```
src/
├── app/
│   ├── admin/                    # Admin dashboard
│   │   ├── layout.tsx           # Admin layout (sidebar + header)
│   │   ├── page.tsx             # Dashboard with stats
│   │   ├── login/page.tsx       # Login page
│   │   ├── platforms/           # Platform CRUD
│   │   ├── blogs/               # Blog CRUD
│   │   ├── categories/          # Category CRUD
│   │   ├── countries/           # Country CRUD
│   │   └── manufacturers/       # Manufacturer CRUD
│   │
│   ├── api/v1/                   # API routes
│   │   ├── auth/                # Authentication
│   │   ├── platforms/           # Platform CRUD
│   │   ├── categories/          # Category CRUD
│   │   ├── countries/           # Country CRUD
│   │   ├── manufacturers/       # Manufacturer CRUD
│   │   ├── blogs/               # Blog CRUD
│   │   ├── stats/               # Dashboard statistics
│   │   └── health/              # Health check
│   │
│   ├── [lang]/                   # i18n public pages
│   │   ├── layout.tsx           # Locale layout
│   │   ├── page.tsx             # Landing page
│   │   ├── browse/              # Platform gallery
│   │   └── blog/                # Blog listing
│   │
│   ├── browse/ → redirect       # Redirect to /en/browse
│   ├── blog/ → redirect         # Redirect to /en/blog
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Root redirect to /en
│   ├── globals.css              # Design system CSS
│   └── middleware.ts            # Security + auth
│
├── components/
│   ├── admin/                    # Admin components
│   ├── auth/                     # Auth components
│   ├── ui/                       # shadcn/ui primitives
│   └── [shared components]       # Header, Footer, etc.
│
├── lib/
│   ├── prisma.ts                 # Prisma singleton
│   ├── types.ts                  # TypeScript types
│   ├── auth.ts                   # JWT utilities
│   ├── auth-guard.ts             # Auth helpers
│   ├── validators.ts             # Zod schemas
│   ├── api.ts                    # API client
│   └── utils.ts                  # Utilities
│
├── stores/
│   ├── useAuthStore.ts           # Auth state
│   └── useDesignStore.ts         # App state
│
├── i18n/
│   ├── routing.ts                # Locale routing
│   └── request.ts                # i18n config
│
└── messages/
    ├── en.json                   # English translations
    └── ar.json                   # Arabic translations
```

---

## 5. Design System — Tactical Command

### 5.1 Design Philosophy

The UI should feel like a **military aviation command system** — not a generic website. Every element reinforces:

- **Military precision**: Clean, structured, data-dense
- **Aviation aesthetics**: Radar displays, status boards, flight strips
- **Command center feel**: Dark backgrounds, monospace fonts, status indicators
- **Tactical data**: Numbers, specifications, operational status

### 5.2 Color System

```css
/* Backgrounds */
--color-tactical-bg: #0a0f0a;           /* Stealth black */
--color-tactical-bg-secondary: #1a1f1a; /* Olive dark */
--color-tactical-card: #0d140d;         /* Dark green-gray */

/* Text */
--color-tactical-text: #c4d9c4;         /* Muted green (primary) */
--color-tactical-text-secondary: #7a8f7a; /* Dimmer green */

/* Accents */
--color-tactical-accent: #d4a574;       /* Tactical orange */
--color-tactical-alert: #cc4433;        /* Alert red */
--color-tactical-success: #44aa44;      /* Status green */

/* Borders */
--color-tactical-border: #2a3a2a;       /* Subtle green border */

/* Status Colors */
--status-active: #44aa44;      /* Green - Active/Operational */
--status-retired: #cc4433;     /* Red - Retired/Decommissioned */
--status-development: #d4a574; /* Orange - In Development */
--status-maintenance: #b8860b; /* Yellow - Under Maintenance */
```

### 5.3 Typography

```css
/* Display/Headers - Military command style */
--font-tactical-display: "Share Tech Mono", monospace;

/* Body - Technical documentation */
--font-tactical-body: "IBM Plex Mono", monospace;

/* Arabic fallback */
--font-arabic: "Noto Sans Arabic", sans-serif;
```

### 5.4 Components

| Component | Description |
|-----------|-------------|
| StatusBadge | Colored dot + label (● ACTIVE) |
| DataCard | Dark card with green border and glow on hover |
| CommandInput | Dark input with green border and orange focus |
| TacticalButton | Orange primary, dark secondary |
| DataTable | Dark table with green text and status indicators |
| MarkdownPreview | Split view editor + preview |
| StatCard | Dashboard stat with icon and value |
| AdminSidebar | Collapsible navigation sidebar |

### 5.5 Animations

| Animation | Description |
|-----------|-------------|
| radar-sweep | Rotating radar effect for backgrounds |
| status-blink | Blinking status indicators |
| glow-pulse | Green glow pulse on hover |
| fadeIn | Fade in from below |
| slideIn | Slide in from left |

---

## 6. Data Model

### 6.1 Base Tables

#### Users
| Column | Type | Constraints |
|--------|------|-------------|
| `id` | UUID | PRIMARY KEY |
| `email` | VARCHAR(255) | UNIQUE NOT NULL |
| `password` | VARCHAR(255) | NOT NULL |
| `role` | ENUM('ADMIN', 'USER') | DEFAULT 'USER' |
| `created_at` | TIMESTAMP | DEFAULT NOW() |
| `updated_at` | TIMESTAMP | DEFAULT NOW() |

#### Platforms
| Column | Type | Constraints |
|--------|------|-------------|
| `id` | UUID | PRIMARY KEY |
| `unit_cost_usd` | DECIMAL(15,2) | |
| `operational_status` | VARCHAR(50) | |
| `technical_specs` | JSONB | |
| `image_url` | VARCHAR(512) | |
| `category_id` | UUID | FK → Categories |
| `manufacturer_id` | UUID | FK → Manufacturers |
| `country_id` | UUID | FK → Countries |
| `created_at` | TIMESTAMP | DEFAULT NOW() |
| `updated_at` | TIMESTAMP | DEFAULT NOW() |

#### Categories
| Column | Type | Constraints |
|--------|------|-------------|
| `id` | UUID | PRIMARY KEY |
| `created_at` | TIMESTAMP | DEFAULT NOW() |

#### Countries
| Column | Type | Constraints |
|--------|------|-------------|
| `id` | UUID | PRIMARY KEY |
| `created_at` | TIMESTAMP | DEFAULT NOW() |

#### Manufacturers
| Column | Type | Constraints |
|--------|------|-------------|
| `id` | UUID | PRIMARY KEY |
| `country_id` | UUID | FK → Countries |
| `created_at` | TIMESTAMP | DEFAULT NOW() |

#### Blogs
| Column | Type | Constraints |
|--------|------|-------------|
| `id` | UUID | PRIMARY KEY |
| `published_at` | TIMESTAMP | DEFAULT NOW() |
| `updated_at` | TIMESTAMP | DEFAULT NOW() |

### 6.2 Translation Tables (Bilingual Support)

All translatable content uses separate translation tables for English and Arabic.

#### Platform Translations
| Column | Type | Constraints |
|--------|------|-------------|
| `id` | UUID | PRIMARY KEY |
| `platform_id` | UUID | FK → Platforms (CASCADE) |
| `locale` | VARCHAR(5) | 'en' or 'ar' |
| `name` | VARCHAR(255) | NOT NULL |
| `description` | TEXT | |
| `created_at` | TIMESTAMP | DEFAULT NOW() |
| | | UNIQUE(platform_id, locale) |

#### Category Translations
| Column | Type | Constraints |
|--------|------|-------------|
| `id` | UUID | PRIMARY KEY |
| `category_id` | UUID | FK → Categories (CASCADE) |
| `locale` | VARCHAR(5) | 'en' or 'ar' |
| `name` | VARCHAR(50) | NOT NULL |
| `domain` | VARCHAR(50) | |
| `created_at` | TIMESTAMP | DEFAULT NOW() |
| | | UNIQUE(category_id, locale) |

#### Country Translations
| Column | Type | Constraints |
|--------|------|-------------|
| `id` | UUID | PRIMARY KEY |
| `country_id` | UUID | FK → Countries (CASCADE) |
| `locale` | VARCHAR(5) | 'en' or 'ar' |
| `name` | VARCHAR(100) | NOT NULL |
| `created_at` | TIMESTAMP | DEFAULT NOW() |
| | | UNIQUE(country_id, locale) |

#### Manufacturer Translations
| Column | Type | Constraints |
|--------|------|-------------|
| `id` | UUID | PRIMARY KEY |
| `manufacturer_id` | UUID | FK → Manufacturers (CASCADE) |
| `locale` | VARCHAR(5) | 'en' or 'ar' |
| `name` | VARCHAR(150) | NOT NULL |
| `specialization` | VARCHAR(100) | |
| `created_at` | TIMESTAMP | DEFAULT NOW() |
| | | UNIQUE(manufacturer_id, locale) |

#### Blog Translations
| Column | Type | Constraints |
|--------|------|-------------|
| `id` | UUID | PRIMARY KEY |
| `blog_id` | UUID | FK → Blogs (CASCADE) |
| `locale` | VARCHAR(5) | 'en' or 'ar' |
| `title` | VARCHAR(255) | NOT NULL |
| `summary` | TEXT | |
| `content` | TEXT | NOT NULL |
| `created_at` | TIMESTAMP | DEFAULT NOW() |
| `updated_at` | TIMESTAMP | DEFAULT NOW() |
| | | UNIQUE(blog_id, locale) |

### 6.3 Entity Relationship Diagram

```
┌─────────────┐     ┌──────────────────────┐     ┌─────────────┐
│  Categories │────<│ CategoryTranslations │     │   Countries │
│             │     │  (locale, name,      │     │             │
└──────┬──────┘     │   domain)            │     └──────┬──────┘
       │            └──────────────────────┘            │
       │                                                │
       │            ┌──────────────────────┐            │
       │            │ ManufacturerTrans.   │            │
       │            │  (locale, name,      │            │
       └───────────>│   specialization)    │<───────────┘
                    └──────────────────────┘
                             │
                             v
┌─────────────┐     ┌──────────────────────┐
│  Platforms  │────<│ PlatformTranslations │
│             │     │  (locale, name,      │
└──────┬──────┘     │   description)       │
       │            └──────────────────────┘
       │
       │            ┌──────────────────────┐
       │            │   CountryTrans.      │
       │            │  (locale, name)      │
       └───────────>└──────────────────────┘

┌─────────────┐     ┌──────────────────────┐
│    Blogs    │────<│  BlogTranslations    │
│             │     │  (locale, title,     │
└─────────────┘     │   summary, content)  │
                    └──────────────────────┘

┌─────────────┐
│    Users    │
│  (no trans) │
└─────────────┘
```

---

## 7. API Endpoints

### 7.1 Authentication

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/v1/auth/login` | POST | Public | User login |
| `/api/v1/auth/register` | POST | Public | User registration |

### 7.2 Platforms

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/v1/platforms` | GET | Public | List platforms (paginated, searchable, locale-aware) |
| `/api/v1/platforms` | POST | Admin | Create platform with translations |
| `/api/v1/platforms/:id` | GET | Public | Get platform detail (locale-aware) |
| `/api/v1/platforms/:id` | PATCH | Admin | Update platform |
| `/api/v1/platforms/:id` | DELETE | Admin | Delete platform (cascades translations) |

### 7.3 Categories

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/v1/categories` | GET | Public | List categories (locale-aware) |
| `/api/v1/categories` | POST | Admin | Create category with translations |
| `/api/v1/categories/:id` | GET | Public | Get category (locale-aware) |
| `/api/v1/categories/:id` | PATCH | Admin | Update category |
| `/api/v1/categories/:id` | DELETE | Admin | Delete category (cascades translations) |

### 7.4 Countries

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/v1/countries` | GET | Public | List countries (locale-aware) |
| `/api/v1/countries` | POST | Admin | Create country with translations |
| `/api/v1/countries/:id` | GET | Public | Get country (locale-aware) |
| `/api/v1/countries/:id` | PATCH | Admin | Update country |
| `/api/v1/countries/:id` | DELETE | Admin | Delete country (cascades translations) |

### 7.5 Manufacturers

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/v1/manufacturers` | GET | Public | List manufacturers (locale-aware) |
| `/api/v1/manufacturers` | POST | Admin | Create manufacturer with translations |
| `/api/v1/manufacturers/:id` | GET | Public | Get manufacturer (locale-aware) |
| `/api/v1/manufacturers/:id` | PATCH | Admin | Update manufacturer |
| `/api/v1/manufacturers/:id` | DELETE | Admin | Delete manufacturer (cascades translations) |

### 7.6 Blogs

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/v1/blogs` | GET | Public | List blogs (locale-aware) |
| `/api/v1/blogs` | POST | Admin | Create blog |
| `/api/v1/blogs/:id` | GET | Public | Get blog (locale-aware) |
| `/api/v1/blogs/:id` | PATCH | Admin | Update blog metadata |
| `/api/v1/blogs/:id` | DELETE | Admin | Delete blog (cascades translations) |

### 7.7 Blog Translations

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/v1/blogs/:id/translations` | POST | Admin | Create translation |
| `/api/v1/blogs/:id/translations/:locale` | GET | Public | Get translation by locale |
| `/api/v1/blogs/:id/translations/:locale` | PATCH | Admin | Update translation |
| `/api/v1/blogs/:id/translations/:locale` | DELETE | Admin | Delete translation |

### 7.8 Statistics & Health

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/v1/stats` | GET | Public | Dashboard statistics |
| `/api/v1/health` | GET | Public | Health check |

---

## 8. Internationalization (i18n)

### 8.1 Languages Supported

| Language | Code | Direction | Font |
|----------|------|-----------|------|
| English | `en` | LTR | Share Tech Mono / IBM Plex Mono |
| Arabic | `ar` | RTL | Noto Sans Arabic |

### 8.2 i18n Strategy

#### UI Strings
- All UI text stored in `messages/en.json` and `messages/ar.json`
- Server components: `getTranslations()` from `next-intl/server`
- Client components: `useTranslations()` from `next-intl`

#### Database Content
- All translatable fields use translation tables
- API endpoints accept `locale` query parameter
- Public site always shows content in current locale
- Admin form shows both languages side-by-side

#### Date Formatting
- Locale-aware date formatting using `Intl.DateTimeFormat`
- English: "January 15, 2024"
- Arabic: "١٥ يناير 2024"

#### RTL Support
- `<html dir={lang === "ar" ? "rtl" : "ltr"}>`
- CSS logical properties (`margin-inline-start`, `padding-inline-end`)
- Sidebar flips to right side in RTL
- Text alignment flips

### 8.3 Bilingual Data Entry

Admin form for creating/editing entities:

```
┌─────────────────────────────────────────────────────┐
│  Create Platform                                    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  SHARED FIELDS (no language needed)                 │
│  Unit Cost: [80000000]                              │
│  Status: [▼ Active]                                 │
│  Image URL: [https://...]                           │
│  Category: [▼ Fighter Jet]                          │
│  Manufacturer: [▼ Lockheed Martin]                  │
│  Country: [▼ United States]                         │
│                                                     │
│  LANGUAGE FIELDS (tabs for each language)           │
│  ┌─────────────────────────────────────────────┐    │
│  │  [English] [العربية]                        │    │
│  ├─────────────────────────────────────────────┤    │
│  │  Name: [F-35 Lightning II]                  │    │
│  │  Description: [Stealth multirole fighter...]│    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  [Cancel]                          [Save Platform]  │
└─────────────────────────────────────────────────────┘
```

---

## 9. Responsive Design

### 9.1 Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 768px | Single column, collapsible sidebar, slide-out filters |
| Tablet | 768px - 1024px | 2 columns, collapsible sidebar |
| Desktop | > 1024px | 3 columns, fixed sidebar |

### 9.2 Responsive Behaviors

| Component | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| Sidebar | Overlay/drawer | Collapsible | Fixed 280px |
| Platform cards | 1 column | 2 columns | 3 columns |
| Filters | Slide-out panel | Side panel | Fixed side panel |
| Data tables | Horizontal scroll | Horizontal scroll | Full width |
| Stat cards | 2 columns | 4 columns | 4 columns |
| Markdown editor | Stacked | Side by side | Side by side |
| Navigation | Hamburger menu | Horizontal nav | Horizontal nav |

---

## 10. Authentication & Authorization

### 10.1 Authentication Flow

```
Login: POST /api/v1/auth/login {email, password}
  → Validate with Zod
  → Query user by email (Prisma parameterized query)
  → Compare password with bcryptjs
  → Sign JWT with jose (7d expiry)
  → Return { access_token, user: { id, email, role } }
```

### 10.2 Authorization

| Role | Access |
|------|--------|
| `ADMIN` | Full access (create, read, update, delete) |
| `USER` | Read-only access |
| `PUBLIC` | Read-only access (no auth required) |

### 10.3 Protected Routes

- Admin routes: `/admin/*`
- Write API endpoints: `POST`, `PATCH`, `DELETE` on all entities
- Read API endpoints: Public (no auth required)

---

## 11. Security

| Threat | Mitigation |
|--------|-----------|
| SQL Injection | Prisma parameterized queries — zero raw SQL |
| XSS | React escapes by default; blog content sanitized |
| CSRF | Same-origin policy; JWT in Authorization header |
| Brute Force | Rate limiting via middleware |
| Data Exposure | Never expose `DATABASE_URL` or `JWT_SECRET` to client |
| Error Leakage | Generic error messages in production |
| Clickjacking | `X-Frame-Options: DENY` header |
| MIME Sniffing | `X-Content-Type-Options: nosniff` header |

---

## 12. Performance

| Strategy | Implementation |
|----------|---------------|
| ISR | API routes return cached responses with `revalidate: 60` |
| Image Optimization | `next/image` with `priority`, `fill`, `sizes` |
| Font Optimization | `next/font` with auto-subsetting |
| Bundle Splitting | Dynamic imports for heavy components |
| Connection Pooling | Prisma connection pool |
| SQL Indexes | `@@index` on all foreign key columns |
| Compression | Vercel automatic gzip/brotli |

---

## 13. Deployment

### 13.1 Vercel Configuration

- Single Next.js app deployed to Vercel
- Environment variables configured in Vercel dashboard:
  - `DATABASE_URL` — PostgreSQL connection string
  - `JWT_SECRET` — JWT signing secret
- `postinstall` script: `prisma generate`

### 13.2 Database

- PostgreSQL 18 (external hosted: Supabase, Neon, or Railway)
- Prisma migrations deployed via `npx prisma migrate deploy`
- Seed script: `npx prisma db seed`

---

## 14. Success Metrics

| Metric | Target |
|--------|--------|
| Data Loss | Zero during migration |
| Lighthouse Performance | > 90 |
| API Validation | All routes validated with Zod |
| Type Safety | Zero `any` types in codebase |
| i18n Coverage | 100% UI strings in en/ar |
| Responsive | All pages work on mobile/tablet/desktop |
| Security | All endpoints properly authenticated |

---

## 15. License

Apache License 2.0 — Free to use, modify, and distribute.
