# Product Requirements Document — Jetdex

## 1. Overview

**Jetdex** is a structured, data-driven platform indexing the world's fighter jet manufacturers, aircraft programs, and military aviation systems. It focuses on who builds fighter jets, how those aircraft are developed, and what distinguishes them.

## 2. Target Users

- Defense enthusiasts and researchers
- Military professionals seeking structured reference data
- Developers building on top of aviation datasets
- Aviation hobbyists exploring global military platforms

## 3. Core Features

| Feature | Description | Priority |
|---------|-------------|----------|
| Platform Gallery | Browse/search/filter military platforms by category, country, manufacturer | P0 |
| Platform Detail | View full details of a single platform (specs, cost, status) | P0 |
| Blog System | Read news and insights articles (admin-authored) | P1 |
| Authentication | JWT-based login/register with admin/user roles | P0 |
| Admin CRUD | Admin users can create, update, delete platforms, categories, countries, manufacturers, blogs | P0 |
| i18n | English and Arabic language support with RTL | P1 |
| Dark/Light Theme | User-selectable dark and light themes | P1 |
| Dashboard Stats | Aggregated counts and distributions of platforms | P1 |
| SEO | Server-rendered pages with proper metadata, sitemap, robots.txt | P0 |
| Health Check | API health endpoint for monitoring | P2 |

## 4. Data Model

### 4.1 Users
- `id`: UUID
- `email`: VARCHAR(255), unique
- `password`: VARCHAR(255), bcrypt-hashed
- `role`: ENUM ('ADMIN', 'USER')
- `created_at`, `updated_at`: timestamps

### 4.2 Countries
- `id`: UUID
- `name`: VARCHAR(100), unique
- `created_at`: timestamp

### 4.3 Categories
- `id`: UUID
- `name`: VARCHAR(50)
- `domain`: VARCHAR(50) — e.g., 'Air', 'Land', 'Sea', 'Defense'
- `created_at`: timestamp

### 4.4 Manufacturers
- `id`: UUID
- `name`: VARCHAR(150)
- `specialization`: VARCHAR(100)
- `country_id`: UUID FK → Countries
- `created_at`: timestamp

### 4.5 Platforms
- `id`: UUID
- `name`: VARCHAR(255)
- `description`: TEXT
- `unit_cost_usd`: DECIMAL(15,2)
- `operational_status`: VARCHAR(50) — e.g., 'Active', 'Retired', 'In Development'
- `technical_specs`: JSONB — flexible key-value specs
- `image_url`: VARCHAR(512)
- `category_id`: UUID FK → Categories
- `manufacturer_id`: UUID FK → Manufacturers
- `country_id`: UUID FK → Countries
- `created_at`, `updated_at`: timestamps

### 4.6 Blogs
- `id`: UUID
- `title`: VARCHAR(255)
- `summary`: TEXT
- `content`: TEXT
- `published_at`, `updated_at`: timestamps

## 5. API Endpoints

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/v1/platforms` | GET | Public | List platforms (paginated, searchable) |
| `/api/v1/platforms` | POST | Admin | Create platform |
| `/api/v1/platforms/:id` | GET | Public | Get platform detail |
| `/api/v1/platforms/:id` | PATCH | Admin | Update platform |
| `/api/v1/platforms/:id` | DELETE | Admin | Delete platform |
| `/api/v1/categories` | GET | Public | List categories |
| `/api/v1/categories` | POST | Admin | Create category |
| `/api/v1/categories/:id` | GET | Public | Get category |
| `/api/v1/categories/:id` | PATCH | Admin | Update category |
| `/api/v1/categories/:id` | DELETE | Admin | Delete category |
| `/api/v1/countries` | GET | Public | List countries |
| `/api/v1/countries` | POST | Admin | Create country |
| `/api/v1/countries/:id` | GET | Public | Get country |
| `/api/v1/countries/:id` | PATCH | Admin | Update country |
| `/api/v1/countries/:id` | DELETE | Admin | Delete country |
| `/api/v1/manufacturers` | GET | Public | List manufacturers |
| `/api/v1/manufacturers` | POST | Admin | Create manufacturer |
| `/api/v1/manufacturers/:id` | GET | Public | Get manufacturer |
| `/api/v1/manufacturers/:id` | PATCH | Admin | Update manufacturer |
| `/api/v1/manufacturers/:id` | DELETE | Admin | Delete manufacturer |
| `/api/v1/blogs` | GET | Public | List blogs |
| `/api/v1/blogs` | POST | Admin | Create blog |
| `/api/v1/blogs/:id` | GET | Public | Get blog |
| `/api/v1/blogs/:id` | PATCH | Admin | Update blog |
| `/api/v1/blogs/:id` | DELETE | Admin | Delete blog |
| `/api/v1/stats` | GET | Public | Dashboard statistics |
| `/api/v1/health` | GET | Public | Health check |
| `/api/v1/auth/login` | POST | Public | Login |
| `/api/v1/auth/register` | POST | Public | Register |

## 6. Success Metrics

- Zero data loss during migration (existing PostgreSQL data preserved)
- Lighthouse score > 90 on performance
- All API routes validated with Zod (no invalid data enters the DB)
- Zero `any` types in the codebase
- Full type safety from database to UI
