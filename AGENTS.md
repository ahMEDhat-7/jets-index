# AGENTS.md — Jetdex Project

## Overview

Jetdex is a full-stack military aviation database application built with Next.js 16, React 19, Prisma, PostgreSQL, and Tailwind CSS. It indexes fighter jet manufacturers, aircraft programs, and military aviation systems.

**Design Theme:** Tactical Command — dark military aesthetic with monospace fonts, status indicators, and radar-inspired effects.

**i18n:** Full bilingual support (English and Arabic) with RTL.

---

## Tech Stack

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

## Run Commands

```bash
# Development
pnpm dev              # Start dev server on port 3000

# Build & Deploy
pnpm build            # Production build
pnpm start            # Start production server

# Linting & Type Checking
pnpm lint             # Run ESLint
pnpm typecheck        # Run TypeScript type checking (tsc --noEmit)

# Database
npx prisma generate           # Generate Prisma client
npx prisma migrate dev        # Create dev migration
npx prisma migrate deploy     # Deploy migrations to production
npx prisma db seed            # Seed database (only if empty)
npx prisma studio             # Open Prisma Studio GUI
```

---

## Coding Conventions

### TypeScript Rules

1. **No `any` types** — ever. Use proper types everywhere.
2. **Strict mode** is enabled — no implicit `any`, no `null`/`undefined` without checks.
3. **Explicit return types** on all exported functions.
4. **Zod schemas** for all API input validation (in `lib/validators.ts`).
5. **Prisma-generated types** for database models — do not duplicate type definitions.

### File Naming

| Pattern | Example |
|---------|---------|
| `kebab-case` for files | `auth-guard.ts`, `use-design-store.ts` |
| `PascalCase` for components | `BlogCard.tsx`, `LoadingSpinner.tsx` |
| `camelCase` for functions/variables | `fetchPlatforms`, `formatCurrency` |
| `route.ts` for API routes | `app/api/v1/platforms/route.ts` |
| `types.ts` for type definitions | `lib/types.ts` |

### Component Patterns

```typescript
// Always type props explicitly
interface ButtonProps {
  variant?: "default" | "destructive" | "outline";
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant = "default", children, onClick }: ButtonProps) {
  return <button className={cn("btn", variant)} onClick={onClick}>{children}</button>;
}
```

### API Route Pattern

```typescript
// Every route handler is typed with request and response
import { NextRequest, NextResponse } from "next/server";
import type { ApiResponse } from "@/lib/types";

export async function GET(
  request: NextRequest
): Promise<NextResponse<ApiResponse<DataType>>> {
  // Validate → Query DB → Return typed response
}
```

### Validation Pattern

```typescript
// Zod schemas in lib/validators.ts — never use any
import { z } from "zod";

export const CreatePlatformSchema = z.object({
  name: z.string().max(255),
  unitCostUsd: z.number().positive().optional(),
  categoryId: z.string().uuid(),
});

// In route handler:
const body = await request.json();
const parsed = CreatePlatformSchema.safeParse(body);
if (!parsed.success) {
  return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
}
```

### i18n Pattern

```typescript
// Server components
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("Home");
  return <h1>{t("hero.title")}</h1>;
}

// Client components
"use client";
import { useTranslations } from "next-intl";

export function MyComponent() {
  const t = useTranslations("Browse");
  return <h1>{t("filters.title")}</h1>;
}
```

### Locale-Aware API Pattern

```typescript
// API routes accept locale parameter
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") || "en";
  
  const platforms = await prisma.platform.findMany({
    include: {
      translations: {
        where: { locale },
      },
    },
  });
  
  return NextResponse.json(platforms);
}
```

---

## Git Commit Format

Use conventional commits:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types**: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `style`, `perf`

**Examples**:
- `feat: add platforms API routes with CRUD`
- `fix: handle missing image URL in platform detail`
- `docs: update PRD with new success metrics`
- `chore: remove legacy backend code`
- `refactor: extract auth guard into separate module`
- `perf: add ISR caching to public API routes`

---

## Architecture Rules

1. **Separation of Concerns**: UI components ≠ API routes ≠ database logic ≠ auth logic.
2. **Single Responsibility**: Each file does ONE thing well.
3. **No Business Logic in Route Handlers**: Extract reusable logic into `lib/` functions.
4. **Prisma Singleton**: Always import from `@/lib/prisma` — never create new `PrismaClient` instances.
5. **Auth Helpers**: Use `requireAuth()` and `requireAdmin()` from `@/lib/auth-guard.ts`.
6. **Validation**: Always validate API input with Zod before touching the database.
7. **Error Handling**: Never expose stack traces. Return generic error messages in production.
8. **Type Exports**: All shared types go in `lib/types.ts`.
9. **i18n**: All UI strings must be in both `messages/en.json` and `messages/ar.json`.
10. **Bilingual Data**: All translatable content uses translation tables with `locale` field.

---

## Design System — Tactical Command

### Color Variables

```css
/* Backgrounds */
--color-tactical-bg: #0a0f0a;
--color-tactical-bg-secondary: #1a1f1a;
--color-tactical-card: #0d140d;

/* Text */
--color-tactical-text: #c4d9c4;
--color-tactical-text-secondary: #7a8f7a;

/* Accents */
--color-tactical-accent: #d4a574;
--color-tactical-alert: #cc4433;
--color-tactical-success: #44aa44;

/* Borders */
--color-tactical-border: #2a3a2a;
```

### Typography

```css
--font-tactical-display: "Share Tech Mono", monospace;
--font-tactical-body: "IBM Plex Mono", monospace;
```

### Component Styling

- All components use Tactical Command colors
- Dark backgrounds with green text and orange accents
- Status badges: colored dots with labels
- Cards: dark background, green border, glow on hover
- Inputs: dark background, green border, orange focus
- Buttons: orange primary, dark secondary

---

## Database Schema

### Base Tables

- `users` — Authentication and roles
- `platforms` — Military platforms (shared fields only)
- `categories` — Platform categories
- `countries` — Countries
- `manufacturers` — Aircraft manufacturers
- `blogs` — Blog posts (metadata only)

### Translation Tables

All translatable content uses separate tables:

- `platform_translations` — name, description (locale: en/ar)
- `category_translations` — name, domain (locale: en/ar)
- `country_translations` — name (locale: en/ar)
- `manufacturer_translations` — name, specialization (locale: en/ar)
- `blog_translations` — title, summary, content (locale: en/ar)

### Key Relationships

- Each base table → many translations (one-to-many)
- Translation table has `UNIQUE(base_id, locale)` constraint
- Deleting base record cascades to delete all translations

---

## Responsive Design

### Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 768px | Single column, collapsible sidebar |
| Tablet | 768px - 1024px | 2 columns, collapsible sidebar |
| Desktop | > 1024px | 3 columns, fixed sidebar |

### Tailwind Utilities

```tsx
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Responsive sidebar
<aside className="fixed inset-y-0 left-0 z-50 w-64 
  lg:relative lg:translate-x-0
  data-[open=true]:translate-x-0 -translate-x-full">

// Responsive text
<h1 className="text-2xl md:text-3xl lg:text-4xl">
```

---

## File Structure Reference

```
src/
├── app/
│   ├── admin/                    # Admin dashboard
│   ├── api/v1/                   # API routes
│   ├── [lang]/                   # i18n public pages
│   ├── globals.css              # Design system CSS
│   └── middleware.ts            # Security + auth
├── components/
│   ├── admin/                    # Admin components
│   ├── auth/                     # Auth components
│   ├── ui/                       # shadcn/ui primitives
│   └── [shared]                  # Header, Footer, etc.
├── lib/
│   ├── prisma.ts                 # Prisma singleton
│   ├── types.ts                  # TypeScript types
│   ├── auth.ts                   # JWT utilities
│   ├── auth-guard.ts             # Auth helpers
│   ├── validators.ts             # Zod schemas
│   ├── api.ts                    # API client
│   └── utils.ts                  # Utilities
├── stores/
│   ├── useAuthStore.ts           # Auth state
│   └── useDesignStore.ts         # App state
├── i18n/
│   ├── routing.ts                # Locale routing
│   └── request.ts                # i18n config
└── messages/
    ├── en.json                   # English translations
    └── ar.json                   # Arabic translations
```
