# Implementation Tasks — Jetdex

## Overview

This document tracks all implementation tasks for the Jetdex project. Each task is organized by phase and includes the commit message format.

**Legend:**
- `[x]` = Completed
- `[ ]` = Pending
- Priority: P0 (critical), P1 (important), P2 (nice-to-have)

---

## Phase 0: Documentation

- [x] Create `docs/PRD.md` (comprehensive product requirements)
- [x] Create `docs/TASKS.md` (this file)
- [x] Create `docs/ARCHITECTURE.md` (technical architecture)
- [x] Create `AGENTS.md` (coding conventions)
- [x] Commit: `docs: add PRD, tasks, architecture docs and AGENTS.md`

---

## Phase 1: Project Initialization & Prisma

### 1.1 Project Setup
- [ ] 1.1.1 Initialize Next.js 16 project with TypeScript, Tailwind, src/ dir
- [ ] 1.1.2 Install core dependencies (next, react, react-dom)
- [ ] 1.1.3 Install UI dependencies (tailwindcss, @tailwindcss/postcss, postcss)
- [ ] 1.1.4 Install utility dependencies (clsx, tailwind-merge, class-variance-authority)
- [ ] 1.1.5 Install icon dependencies (lucide-react)
- [ ] 1.1.6 Install state management (zustand)
- [ ] 1.1.7 Install i18n dependencies (next-intl)
- [ ] 1.1.8 Install auth dependencies (jose, bcryptjs, @types/bcryptjs)
- [ ] 1.1.9 Install validation dependencies (zod)
- [ ] 1.1.10 Install ORM dependencies (prisma, @prisma/client)
- [ ] 1.1.11 Install markdown dependencies (react-markdown)
- [ ] 1.1.12 Install UI component dependencies (@radix-ui/react-dialog, @radix-ui/react-select, etc.)
- [ ] 1.1.13 Commit: `chore: initialize Next.js 16 project with dependencies`

### 1.2 Prisma Setup
- [ ] 1.2.1 Create `prisma/schema.prisma` with base models (User, Platform, Category, Country, Manufacturer, Blog)
- [ ] 1.2.2 Add translation models (PlatformTranslation, CategoryTranslation, CountryTranslation, ManufacturerTranslation, BlogTranslation)
- [ ] 1.2.3 Add Role enum (ADMIN, USER)
- [ ] 1.2.4 Add @@map directives for table name compatibility
- [ ] 1.2.5 Add @@index directives for foreign keys
- [ ] 1.2.6 Add @@unique directives for translation constraints
- [ ] 1.2.7 Commit: `feat: add Prisma schema with bilingual support`

### 1.3 Seed Script
- [ ] 1.3.1 Create `prisma/seed.ts` with typed data
- [ ] 1.3.2 Add admin user (admin@jetsindex.com / admin123)
- [ ] 1.3.3 Add regular user (user@jetsindex.com / admin123)
- [ ] 1.3.4 Add 7 countries with en/ar translations
- [ ] 1.3.5 Add 6 categories with en/ar translations
- [ ] 1.3.6 Add 8 manufacturers with en/ar translations
- [ ] 1.3.7 Add 7 platforms with en/ar translations
- [ ] 1.3.8 Add 3 blogs with en/ar translations
- [ ] 1.3.9 Commit: `feat: add database seed script with bilingual data`

### 1.4 Database Scripts
- [ ] 1.4.1 Generate Prisma client (`npx prisma generate`)
- [ ] 1.4.2 Add `postinstall` script to package.json
- [ ] 1.4.3 Add database scripts to package.json (db:generate, db:migrate, db:seed, db:studio)
- [ ] 1.4.4 Commit: `chore: generate Prisma client and add database scripts`

---

## Phase 2: Shared Utilities & Abstractions

### 2.1 Prisma Singleton
- [ ] 2.1.1 Create `lib/prisma.ts` with singleton pattern
- [ ] 2.1.2 Commit: `feat: add Prisma singleton`

### 2.2 Type Definitions
- [ ] 2.2.1 Create `lib/types.ts` with ApiResponse<T> type
- [ ] 2.2.2 Add PaginatedResponse<T> type
- [ ] 2.2.3 Add PlatformListItem type (with translations)
- [ ] 2.2.4 Add PlatformDetail type (with translations)
- [ ] 2.2.5 Add CategoryListItem type (with translations)
- [ ] 2.2.6 Add CountryListItem type (with translations)
- [ ] 2.2.7 Add ManufacturerListItem type (with translations)
- [ ] 2.2.8 Add BlogListItem type (with translations)
- [ ] 2.2.9 Add BlogDetail type (with translations)
- [ ] 2.2.10 Add JwtPayload type
- [ ] 2.2.11 Add LoginRequest, LoginResponse types
- [ ] 2.2.12 Add RegisterRequest, RegisterResponse types
- [ ] 2.2.13 Add DashboardStats type
- [ ] 2.2.14 Add PlatformFilters, CategoryFilters, etc. types
- [ ] 2.2.15 Commit: `feat: add TypeScript type definitions`

### 2.3 Authentication Utilities
- [ ] 2.3.1 Create `lib/auth.ts` with signToken function
- [ ] 2.3.2 Add verifyToken function
- [ ] 2.3.3 Add hashPassword function
- [ ] 2.3.4 Add comparePassword function
- [ ] 2.3.5 Add getSession function (extract from request)
- [ ] 2.3.6 Commit: `feat: add JWT authentication utilities`

### 2.4 Validation Schemas
- [ ] 2.4.1 Create `lib/validators.ts` with LoginSchema
- [ ] 2.4.2 Add RegisterSchema
- [ ] 2.4.3 Add CreatePlatformSchema (with translations)
- [ ] 2.4.4 Add UpdatePlatformSchema
- [ ] 2.4.5 Add CreateCategorySchema (with translations)
- [ ] 2.4.6 Add UpdateCategorySchema
- [ ] 2.4.7 Add CreateCountrySchema (with translations)
- [ ] 2.4.8 Add UpdateCountrySchema
- [ ] 2.4.9 Add CreateManufacturerSchema (with translations)
- [ ] 2.4.10 Add UpdateManufacturerSchema
- [ ] 2.4.11 Add CreateBlogSchema
- [ ] 2.4.12 Add UpdateBlogSchema
- [ ] 2.4.13 Add CreateBlogTranslationSchema
- [ ] 2.4.14 Add UpdateBlogTranslationSchema
- [ ] 2.4.15 Commit: `feat: add Zod validation schemas`

### 2.5 Auth Guard Helpers
- [ ] 2.5.1 Create `lib/auth-guard.ts` with requireAuth function
- [ ] 2.5.2 Add requireAdmin function
- [ ] 2.5.3 Commit: `feat: add auth guard helpers`

### 2.6 API Client
- [ ] 2.6.1 Create `lib/api.ts` with base URL configuration
- [ ] 2.6.2 Add fetchPlatforms function (with locale param)
- [ ] 2.6.3 Add fetchPlatform function (with locale param)
- [ ] 2.6.4 Add fetchCategories function (with locale param)
- [ ] 2.6.5 Add fetchCountries function (with locale param)
- [ ] 2.6.6 Add fetchManufacturers function (with locale param)
- [ ] 2.6.7 Add fetchBlogs function (with locale param)
- [ ] 2.6.8 Add fetchBlog function (with locale param)
- [ ] 2.6.9 Add fetchStats function
- [ ] 2.6.10 Add login function
- [ ] 2.6.11 Add register function
- [ ] 2.6.12 Add createPlatform function (with auth)
- [ ] 2.6.13 Add updatePlatform function (with auth)
- [ ] 2.6.14 Add deletePlatform function (with auth)
- [ ] 2.6.15 Add similar CRUD functions for categories, countries, manufacturers, blogs
- [ ] 2.6.16 Commit: `feat: add API client functions`

### 2.7 Utility Functions
- [ ] 2.7.1 Create `lib/utils.ts` with cn function
- [ ] 2.7.2 Add formatCurrency function
- [ ] 2.7.3 Add formatNumber function
- [ ] 2.7.4 Add formatDate function (locale-aware)
- [ ] 2.7.5 Add getStatusColor function
- [ ] 2.7.6 Add truncateText function
- [ ] 2.7.7 Commit: `feat: add utility functions`

---

## Phase 3: API Routes

### 3.1 Authentication Routes
- [ ] 3.1.1 Create `app/api/v1/auth/login/route.ts`
- [ ] 3.1.2 Create `app/api/v1/auth/register/route.ts`
- [ ] 3.1.3 Commit: `feat: add auth API routes`

### 3.2 Platform Routes
- [ ] 3.2.1 Create `app/api/v1/platforms/route.ts` (GET, POST)
- [ ] 3.2.2 Create `app/api/v1/platforms/[id]/route.ts` (GET, PATCH, DELETE)
- [ ] 3.2.3 Commit: `feat: add platforms API routes`

### 3.3 Category Routes
- [ ] 3.3.1 Create `app/api/v1/categories/route.ts` (GET, POST)
- [ ] 3.3.2 Create `app/api/v1/categories/[id]/route.ts` (GET, PATCH, DELETE)
- [ ] 3.3.3 Commit: `feat: add categories API routes`

### 3.4 Country Routes
- [ ] 3.4.1 Create `app/api/v1/countries/route.ts` (GET, POST)
- [ ] 3.4.2 Create `app/api/v1/countries/[id]/route.ts` (GET, PATCH, DELETE)
- [ ] 3.4.3 Commit: `feat: add countries API routes`

### 3.5 Manufacturer Routes
- [ ] 3.5.1 Create `app/api/v1/manufacturers/route.ts` (GET, POST)
- [ ] 3.5.2 Create `app/api/v1/manufacturers/[id]/route.ts` (GET, PATCH, DELETE)
- [ ] 3.5.3 Commit: `feat: add manufacturers API routes`

### 3.6 Blog Routes
- [ ] 3.6.1 Create `app/api/v1/blogs/route.ts` (GET, POST)
- [ ] 3.6.2 Create `app/api/v1/blogs/[id]/route.ts` (GET, PATCH, DELETE)
- [ ] 3.6.3 Create `app/api/v1/blogs/[id]/translations/route.ts` (POST)
- [ ] 3.6.4 Create `app/api/v1/blogs/[id]/translations/[locale]/route.ts` (GET, PATCH, DELETE)
- [ ] 3.6.5 Commit: `feat: add blogs API routes with translations`

### 3.7 Stats & Health Routes
- [ ] 3.7.1 Create `app/api/v1/stats/route.ts`
- [ ] 3.7.2 Create `app/api/v1/health/route.ts`
- [ ] 3.7.3 Commit: `feat: add stats and health API routes`

### 3.8 Middleware
- [ ] 3.8.1 Create `middleware.ts` with security headers
- [ ] 3.8.2 Add auth guard logic
- [ ] 3.8.3 Commit: `feat: add auth middleware`

---

## Phase 4: UI Components

### 4.1 shadcn/ui Components
- [ ] 4.1.1 Create `components/ui/button.tsx`
- [ ] 4.1.2 Create `components/ui/card.tsx`
- [ ] 4.1.3 Create `components/ui/input.tsx`
- [ ] 4.1.4 Create `components/ui/dialog.tsx`
- [ ] 4.1.5 Create `components/ui/select.tsx`
- [ ] 4.1.6 Create `components/ui/table.tsx`
- [ ] 4.1.7 Create `components/ui/badge.tsx`
- [ ] 4.1.8 Create `components/ui/dropdown-menu.tsx`
- [ ] 4.1.9 Create `components/ui/tabs.tsx`
- [ ] 4.1.10 Create `components/ui/separator.tsx`
- [ ] 4.1.11 Create `components/ui/label.tsx`
- [ ] 4.1.12 Commit: `feat: add shadcn/ui components`

### 4.2 Auth Components
- [ ] 4.2.1 Create `components/auth/auth-provider.tsx`
- [ ] 4.2.2 Create `components/auth/protected-route.tsx`
- [ ] 4.2.3 Commit: `feat: add auth components`

### 4.3 Admin Components
- [ ] 4.3.1 Create `components/admin/admin-layout.tsx`
- [ ] 4.3.2 Create `components/admin/admin-sidebar.tsx` (collapsible)
- [ ] 4.3.3 Create `components/admin/admin-header.tsx`
- [ ] 4.3.4 Create `components/admin/stat-card.tsx`
- [ ] 4.3.5 Create `components/admin/data-table.tsx` (sortable, paginated)
- [ ] 4.3.6 Create `components/admin/entity-form.tsx`
- [ ] 4.3.7 Create `components/admin/delete-dialog.tsx`
- [ ] 4.3.8 Create `components/admin/markdown-editor.tsx` (split view)
- [ ] 4.3.9 Commit: `feat: add admin components`

### 4.4 Shared Components
- [ ] 4.4.1 Create `components/header.tsx` (with admin link)
- [ ] 4.4.2 Create `components/footer.tsx`
- [ ] 4.4.3 Create `components/blog-card.tsx` (with react-markdown)
- [ ] 4.4.4 Create `components/loading-spinner.tsx`
- [ ] 4.4.5 Create `components/theme-provider.tsx`
- [ ] 4.4.6 Create `components/theme-toggle.tsx`
- [ ] 4.4.7 Create `components/mobile-menu.tsx`
- [ ] 4.4.8 Commit: `feat: add shared components`

---

## Phase 5: State Management

### 5.1 Auth Store
- [ ] 5.1.1 Create `stores/useAuthStore.ts` with token state
- [ ] 5.1.2 Add user state
- [ ] 5.1.3 Add login/logout actions
- [ ] 5.1.4 Add localStorage persistence
- [ ] 5.1.5 Commit: `feat: add auth state management`

### 5.2 App Store
- [ ] 5.2.1 Update `stores/useDesignStore.ts` with proper types
- [ ] 5.2.2 Remove any `any` types
- [ ] 5.2.3 Commit: `refactor: update app store with proper types`

---

## Phase 6: i18n Messages

### 6.1 English Messages
- [ ] 6.1.1 Create `messages/en.json` with Navigation section
- [ ] 6.1.2 Add Home section (hero, mission, features, about)
- [ ] 6.1.3 Add Browse section (filters, details, empty, loading)
- [ ] 6.1.4 Add Blog section (title, description, empty)
- [ ] 6.1.5 Add Common section (loading, error)
- [ ] 6.1.6 Add Admin section (sidebar, header, dashboard, platforms, blogs, categories, countries, manufacturers, common)
- [ ] 6.1.7 Commit: `feat: add English translations`

### 6.2 Arabic Messages
- [ ] 6.2.1 Create `messages/ar.json` with Navigation section
- [ ] 6.2.2 Add Home section (hero, mission, features, about)
- [ ] 6.2.3 Add Browse section (filters, details, empty, loading)
- [ ] 6.2.4 Add Blog section (title, description, empty)
- [ ] 6.2.5 Add Common section (loading, error)
- [ ] 6.2.6 Add Admin section (sidebar, header, dashboard, platforms, blogs, categories, countries, manufacturers, common)
- [ ] 6.2.7 Commit: `feat: add Arabic translations`

---

## Phase 7: i18n Setup

### 7.1 Routing
- [ ] 7.1.1 Create `i18n/routing.ts` with locale configuration
- [ ] 7.1.2 Create `i18n/request.ts` with request config
- [ ] 7.1.3 Commit: `feat: add i18n routing configuration`

### 7.2 Root Pages
- [ ] 7.2.1 Create `app/layout.tsx` (root layout)
- [ ] 7.2.2 Create `app/page.tsx` (redirect to /en)
- [ ] 7.2.3 Create `app/browse/page.tsx` (redirect to /en/browse)
- [ ] 7.2.4 Create `app/blog/page.tsx` (redirect to /en/blog)
- [ ] 7.2.5 Commit: `feat: add root redirect pages`

---

## Phase 8: Public Pages

### 8.1 Locale Layout
- [ ] 8.1.1 Create `app/[lang]/layout.tsx` with ThemeProvider, NextIntl, Header, Footer
- [ ] 8.1.2 Add SEO metadata
- [ ] 8.1.3 Add font loading
- [ ] 8.1.4 Add RTL support
- [ ] 8.1.5 Commit: `feat: add locale layout with i18n`

### 8.2 Landing Page
- [ ] 8.2.1 Create `app/[lang]/page.tsx` with hero section
- [ ] 8.2.2 Add features section
- [ ] 8.2.3 Add about section
- [ ] 8.2.4 Add CTA section
- [ ] 8.2.5 Commit: `feat: add landing page`

### 8.3 Browse Page
- [ ] 8.3.1 Create `app/[lang]/browse/layout.tsx`
- [ ] 8.3.2 Create `app/[lang]/browse/page.tsx` with carousel
- [ ] 8.3.3 Add filters (search, category, country)
- [ ] 8.3.4 Add platform cards grid
- [ ] 8.3.5 Add platform detail modal
- [ ] 8.3.6 Add responsive design
- [ ] 8.3.7 Commit: `feat: add browse page`

### 8.4 Blog Page
- [ ] 8.4.1 Create `app/[lang]/blog/layout.tsx`
- [ ] 8.4.2 Create `app/[lang]/blog/page.tsx` with blog list
- [ ] 8.4.3 Add react-markdown rendering
- [ ] 8.4.4 Add responsive design
- [ ] 8.4.5 Commit: `feat: add blog page`

---

## Phase 9: Admin Pages

### 9.1 Admin Login
- [ ] 9.1.1 Create `app/admin/login/page.tsx`
- [ ] 9.1.2 Add login form with validation
- [ ] 9.1.3 Add error handling
- [ ] 9.1.4 Commit: `feat: add admin login page`

### 9.2 Admin Layout
- [ ] 9.2.1 Create `app/admin/layout.tsx` with ProtectedRoute
- [ ] 9.2.2 Commit: `feat: add admin layout`

### 9.3 Admin Dashboard
- [ ] 9.3.1 Create `app/admin/page.tsx` with stat cards
- [ ] 9.3.2 Add platforms by category chart
- [ ] 9.3.3 Add platforms by country chart
- [ ] 9.3.4 Add platforms by status chart
- [ ] 9.3.5 Add recent blogs list
- [ ] 9.3.6 Commit: `feat: add admin dashboard`

### 9.4 Platform CRUD
- [ ] 9.4.1 Create `app/admin/platforms/page.tsx` (list with DataTable)
- [ ] 9.4.2 Create `app/admin/platforms/new/page.tsx` (create form with language tabs)
- [ ] 9.4.3 Create `app/admin/platforms/[id]/page.tsx` (edit form with language tabs)
- [ ] 9.4.4 Add delete functionality
- [ ] 9.4.5 Commit: `feat: add platform CRUD pages`

### 9.5 Blog CRUD
- [ ] 9.5.1 Create `app/admin/blogs/page.tsx` (list with DataTable)
- [ ] 9.5.2 Create `app/admin/blogs/new/page.tsx` (create form with language tabs + markdown editor)
- [ ] 9.5.3 Create `app/admin/blogs/[id]/page.tsx` (edit form with language tabs + markdown editor)
- [ ] 9.5.4 Add delete functionality
- [ ] 9.5.5 Commit: `feat: add blog CRUD pages`

### 9.6 Category CRUD
- [ ] 9.6.1 Create `app/admin/categories/page.tsx` (list with DataTable)
- [ ] 9.6.2 Create `app/admin/categories/new/page.tsx` (create form with language tabs)
- [ ] 9.6.3 Create `app/admin/categories/[id]/page.tsx` (edit form with language tabs)
- [ ] 9.6.4 Add delete functionality
- [ ] 9.6.5 Commit: `feat: add category CRUD pages`

### 9.7 Country CRUD
- [ ] 9.7.1 Create `app/admin/countries/page.tsx` (list with DataTable)
- [ ] 9.7.2 Create `app/admin/countries/new/page.tsx` (create form with language tabs)
- [ ] 9.7.3 Create `app/admin/countries/[id]/page.tsx` (edit form with language tabs)
- [ ] 9.7.4 Add delete functionality
- [ ] 9.7.5 Commit: `feat: add country CRUD pages`

### 9.8 Manufacturer CRUD
- [ ] 9.8.1 Create `app/admin/manufacturers/page.tsx` (list with DataTable)
- [ ] 9.8.2 Create `app/admin/manufacturers/new/page.tsx` (create form with language tabs)
- [ ] 9.8.3 Create `app/admin/manufacturers/[id]/page.tsx` (edit form with language tabs)
- [ ] 9.8.4 Add delete functionality
- [ ] 9.8.5 Commit: `feat: add manufacturer CRUD pages`

---

## Phase 10: Design System

### 10.1 CSS Variables
- [ ] 10.1.1 Update `app/globals.css` with Tactical Command color variables
- [ ] 10.1.2 Add typography variables (Share Tech Mono, IBM Plex Mono)
- [ ] 10.1.3 Add status color variables
- [ ] 10.1.4 Commit: `feat: add Tactical Command design system CSS`

### 10.2 Animations
- [ ] 10.2.1 Add radar-sweep animation
- [ ] 10.2.2 Add status-blink animation
- [ ] 10.2.3 Add glow-pulse animation
- [ ] 10.2.4 Add fadeIn animation
- [ ] 10.2.5 Add slideIn animation
- [ ] 10.2.6 Commit: `feat: add Tactical Command animations`

### 10.3 Apply Theme
- [ ] 10.3.1 Apply tactical theme to all public pages
- [ ] 10.3.2 Apply tactical theme to all admin pages
- [ ] 10.3.3 Commit: `feat: apply Tactical Command theme to all pages`

---

## Phase 11: Performance & Security

### 11.1 Performance
- [ ] 11.1.1 Add next/image optimization to all images
- [ ] 11.1.2 Add next/font for Google Fonts
- [ ] 11.1.3 Add ISR caching to API routes
- [ ] 11.1.4 Add dynamic imports for heavy components
- [ ] 11.1.5 Commit: `perf: add performance optimizations`

### 11.2 Security
- [ ] 11.2.1 Add security headers middleware
- [ ] 11.2.2 Add rate limiting
- [ ] 11.2.3 Add input sanitization
- [ ] 11.2.4 Commit: `feat: add security headers and rate limiting`

---

## Phase 12: RTL Support

- [ ] 12.1 Verify RTL in public pages
- [ ] 12.2 Verify RTL in admin pages
- [ ] 12.3 Fix any RTL issues
- [ ] 12.4 Commit: `fix: verify and fix RTL support`

---

## Phase 13: Vercel Configuration

- [ ] 13.1 Update `next.config.ts` (poweredByHeader, compress)
- [ ] 13.2 Update `package.json` scripts
- [ ] 13.3 Create `.env.local` template
- [ ] 13.4 Commit: `chore: configure Vercel deployment`

---

## Phase 14: Cleanup & Verification

- [ ] 14.1 Delete `backend/` directory
- [ ] 14.2 Delete `dist/` directory
- [ ] 14.3 Delete old `node_modules/` (root level)
- [ ] 14.4 Update `.gitignore`
- [ ] 14.5 Remove any `any` types from all files
- [ ] 14.6 Run `pnpm lint` — verify zero errors
- [ ] 14.7 Run `pnpm typecheck` — verify zero errors
- [ ] 14.8 Run `pnpm build` — verify successful build
- [ ] 14.9 Commit: `chore: remove legacy code and verify build`

---

## Commit History Summary

| # | Commit Message |
|---|---------------|
| 1 | `docs: add PRD, tasks, architecture docs and AGENTS.md` |
| 2 | `chore: initialize Next.js 16 project with dependencies` |
| 3 | `feat: add Prisma schema with bilingual support` |
| 4 | `feat: add database seed script with bilingual data` |
| 5 | `chore: generate Prisma client and add database scripts` |
| 6 | `feat: add shared utilities, types, auth helpers, and validators` |
| 7 | `feat: add all API routes with i18n support` |
| 8 | `feat: add shadcn/ui components` |
| 9 | `feat: add auth components` |
| 10 | `feat: add admin components` |
| 11 | `feat: add shared components` |
| 12 | `feat: add auth state management` |
| 13 | `feat: add app store with proper types` |
| 14 | `feat: add English and Arabic translations` |
| 15 | `feat: add i18n routing configuration` |
| 16 | `feat: add root redirect pages` |
| 17 | `feat: add locale layout with i18n` |
| 18 | `feat: add landing page` |
| 19 | `feat: add browse page` |
| 20 | `feat: add blog page` |
| 21 | `feat: add admin login page` |
| 22 | `feat: add admin layout` |
| 23 | `feat: add admin dashboard` |
| 24 | `feat: add platform CRUD pages` |
| 25 | `feat: add blog CRUD pages` |
| 26 | `feat: add category CRUD pages` |
| 27 | `feat: add country CRUD pages` |
| 28 | `feat: add manufacturer CRUD pages` |
| 29 | `feat: add Tactical Command design system CSS` |
| 30 | `feat: add Tactical Command animations` |
| 31 | `feat: apply Tactical Command theme to all pages` |
| 32 | `perf: add performance optimizations` |
| 33 | `feat: add security headers and rate limiting` |
| 34 | `fix: verify and fix RTL support` |
| 35 | `chore: configure Vercel deployment` |
| 36 | `chore: remove legacy code and verify build` |
