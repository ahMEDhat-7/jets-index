# Implementation Tasks

## Phase 0: Documentation

- [x] Create `docs/PRD.md`
- [x] Create `docs/TASKS.md`
- [x] Create `docs/ARCHITECTURE.md`
- [x] Create `AGENTS.md`
- [ ] Commit: `docs: add PRD, tasks, architecture docs and AGENTS.md`

## Phase 1: Project Initialization & Prisma

- [ ] 1.1 Initialize Next.js 16 project with TypeScript, Tailwind, src/ dir
- [ ] 1.1 Install dependencies (next-intl, zustand, jose, bcryptjs, zod, lucide-react, prisma, @prisma/client, radix-ui, clsx, tailwind-merge, class-variance-authority)
- [ ] 1.1 Commit: `chore: initialize Next.js 16 project with dependencies`
- [ ] 1.2 Create Prisma schema (User, Category, Country, Manufacturer, Platform, Blog, Role enum)
- [ ] 1.2 Commit: `feat: add Prisma schema matching existing PostgreSQL schema`
- [ ] 1.3 Create seed script (prisma/seed.ts) with typed data
- [ ] 1.3 Commit: `feat: add database seed script with typed data`
- [ ] 1.4 Run `npx prisma generate` and verify
- [ ] 1.4 Commit: `chore: generate Prisma client and add database scripts`

## Phase 2: Shared Utilities & Abstractions

- [ ] 2.1 Create `lib/prisma.ts` (singleton Prisma client)
- [ ] 2.2 Create `lib/types.ts` (ApiResponse, PaginatedResponse, PlatformListItem, PlatformDetail, JwtPayload, etc.)
- [ ] 2.3 Create `lib/auth.ts` (signToken, verifyToken, hashPassword, comparePassword, getSession)
- [ ] 2.4 Create `lib/validators.ts` (Zod schemas for all DTOs)
- [ ] 2.5 Create `lib/auth-guard.ts` (requireAuth, requireAdmin helpers)
- [ ] 2.5 Create `lib/api.ts` (fetchPlatforms, fetchCategories, fetchCountries, fetchManufacturers, fetchBlogs, fetchStats, fetchBlog, fetchPlatform)
- [ ] 2.5 Commit: `feat: add shared utilities, types, auth helpers, and validators`

## Phase 3: API Routes

- [ ] 3.1 Create `app/api/v1/auth/login/route.ts`
- [ ] 3.1 Create `app/api/v1/auth/register/route.ts`
- [ ] 3.1 Commit: `feat: add auth API routes (login, register)`
- [ ] 3.2 Create `app/api/v1/platforms/route.ts` (GET, POST)
- [ ] 3.2 Create `app/api/v1/platforms/[id]/route.ts` (GET, PATCH, DELETE)
- [ ] 3.2 Commit: `feat: add platforms API routes with CRUD`
- [ ] 3.3 Create `app/api/v1/categories/route.ts` (GET, POST)
- [ ] 3.3 Create `app/api/v1/categories/[id]/route.ts` (GET, PATCH, DELETE)
- [ ] 3.3 Create `app/api/v1/countries/route.ts` (GET, POST)
- [ ] 3.3 Create `app/api/v1/countries/[id]/route.ts` (GET, PATCH, DELETE)
- [ ] 3.3 Create `app/api/v1/manufacturers/route.ts` (GET, POST)
- [ ] 3.3 Create `app/api/v1/manufacturers/[id]/route.ts` (GET, PATCH, DELETE)
- [ ] 3.3 Commit: `feat: add categories, countries, manufacturers API routes`
- [ ] 3.4 Create `app/api/v1/blogs/route.ts` (GET, POST)
- [ ] 3.4 Create `app/api/v1/blogs/[id]/route.ts` (GET, PATCH, DELETE)
- [ ] 3.4 Create `app/api/v1/stats/route.ts` (GET)
- [ ] 3.4 Create `app/api/v1/health/route.ts` (GET)
- [ ] 3.4 Commit: `feat: add blogs, stats, health API routes`
- [ ] 3.5 Create `middleware.ts` for auth guards
- [ ] 3.5 Commit: `feat: add auth middleware for protected routes`

## Phase 4: Frontend Consolidation

- [ ] 4.1 Copy components from frontend/ to src/components/
- [ ] 4.2 Copy stores from frontend/stores/ to src/stores/
- [ ] 4.3 Copy i18n from frontend/i18n/ to src/i18n/
- [ ] 4.4 Copy messages from frontend/messages/ to src/messages/
- [ ] 4.5 Copy app pages from frontend/app/[lang]/ to src/app/[lang]/
- [ ] 4.6 Copy globals.css from frontend/app/globals.css to src/app/globals.css
- [ ] 4.7 Update API client to use relative paths
- [ ] 4.8 Scan all files for `any` types — replace with proper types
- [ ] 4.9 Commit: `feat: consolidate frontend components from separate frontend`

## Phase 5: Performance & Security

- [ ] 5.1 Add security headers middleware
- [ ] 5.2 Optimize images (next/image, priority, sizes)
- [ ] 5.3 Add next/font for Google Fonts optimization
- [ ] 5.4 Ensure ISR caching on API routes
- [ ] 5.5 Commit: `feat: add performance optimizations and security headers`

## Phase 6: Vercel Configuration

- [ ] 6.1 Update next.config.ts (poweredByHeader, compress)
- [ ] 6.2 Update package.json scripts (postinstall: prisma generate)
- [ ] 6.3 Create .env.local template
- [ ] 6.4 Commit: `chore: configure Vercel deployment and environment`

## Phase 7: Cleanup & Verification

- [ ] 7.1 Delete backend/ directory
- [ ] 7.2 Delete dist/ directory
- [ ] 7.3 Delete old node_modules/ (root level)
- [ ] 7.4 Update .gitignore
- [ ] 7.5 Run `pnpm lint` — verify zero errors
- [ ] 7.6 Run `pnpm typecheck` — verify zero errors
- [ ] 7.7 Run `pnpm build` — verify successful build
- [ ] 7.8 Commit: `chore: remove legacy backend and verify build passes`
