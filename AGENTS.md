# AGENTS.md — Jetdex Project

## Overview

Jetdex is a full-stack military aviation database application built with Next.js 16, React 19, Prisma, PostgreSQL, and Tailwind CSS. It indexes fighter jet manufacturers, aircraft programs, and military aviation systems.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.x (strict mode)
- **UI**: React 19, Tailwind CSS 4, shadcn/ui (Radix primitives)
- **State**: Zustand 5
- **ORM**: Prisma (PostgreSQL)
- **Auth**: JWT (jose) + bcryptjs
- **Validation**: Zod
- **i18n**: next-intl (English, Arabic)
- **Deployment**: Vercel

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

## Coding Conventions

### TypeScript Rules

1. **No `any` types** — ever. Use proper types everywhere.
2. **Strict mode** is enabled — no implicit `any`, no `null`/`undefined` without checks.
3. **Explicit return types** on all exported functions.
4. **Zod schemas** for all API input validation (in `lib/validators.ts`).
5. **Prisma-generated types** for database models — do not duplicate type definitions.

### File Naming

- `kebab-case` for files: `auth-guard.ts`, `use-design-store.ts`
- `PascalCase` for components: `BlogCard.tsx`, `LoadingSpinner.tsx`
- `camelCase` for functions/variables: `fetchPlatforms`, `formatCurrency`
- Route files: `route.ts` (Next.js convention)
- Types file: `types.ts` (single source of truth)

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

## Architecture Rules

1. **Separation of Concerns**: UI components ≠ API routes ≠ database logic ≠ auth logic.
2. **Single Responsibility**: Each file does ONE thing well.
3. **No Business Logic in Route Handlers**: Extract reusable logic into `lib/` functions.
4. **Prisma Singleton**: Always import from `@/lib/prisma` — never create new `PrismaClient` instances.
5. **Auth Helpers**: Use `requireAuth()` and `requireAdmin()` from `@/lib/auth-guard.ts`.
6. **Validation**: Always validate API input with Zod before touching the database.
7. **Error Handling**: Never expose stack traces. Return generic error messages in production.
8. **Type Exports**: All shared types go in `lib/types.ts`.
