# Jets-Index Frontend Specification

## Project Overview

**Project Name**: Jets-Index Frontend  
**Type**: Encyclopedia/Reference Web Application  
**Core Functionality**: A database of military/aviation platforms with 10 distinct UI design concepts for user review  
**Target Users**: Defense enthusiasts, researchers, military professionals

---

## Tech Stack

| Technology   | Version |
| ------------ | ------- |
| Next.js      | 16.x    |
| React        | 19.x    |
| Tailwind CSS | 4.x     |
| shadcn/ui    | latest  |
| Zustand      | 5.x     |
| TypeScript   | 5.x     |

---

## Backend API Endpoints

The frontend connects to NestJS backend at `http://localhost:3001`:

| Endpoint         | Method | Auth   | Description                    |
| ---------------- | ------ | ------ | ------------------------------ |
| `/platforms`     | GET    | Public | List all platforms (paginated) |
| `/platforms/:id` | GET    | Public | Get single platform            |
| `/categories`    | GET    | Public | List categories                |
| `/manufacturers` | GET    | Public | List manufacturers             |
| `/countries`     | GET    | Public | List countries                 |
| `/stats`         | GET    | Public | Dashboard statistics           |
| `/auth/login`    | POST   | Public | User login                     |
| `/auth/register` | POST   | Public | User registration              |

---

## Design Concepts

### Design 1: "Tactical Command" - Military Dashboard Style

**Route**: `/design/1`

**Concept**: Real-time command center aesthetic with dark mode, tactical map backgrounds, status indicators

**Theme Colors**:

- `--color-tactical-bg`: #0a0f0a (Stealth black)
- `--color-tactical-bg-secondary`: #1a1f1a (Olive dark)
- `--color-tactical-card`: #0d140d (Dark green-gray)
- `--color-tactical-text`: #c4d9c4 (Muted green)
- `--color-tactical-accent`: #d4a574 (Tactical orange)
- `--color-tactical-alert`: #cc4433 (Alert red)
- `--color-tactical-success`: #44aa44 (Status green)
- `--color-tactical-border`: #2a3a2a (Subtle border)

**Typography**:

- Display: "Share Tech Mono", monospace
- Body: "IBM Plex Mono", monospace

**Layout**:

- Sidebar: Fixed left 280px with navigation
- Main: Full remaining space
- Grid: 3-column stats cards at top, data table below

**Components**:

- Stats cards with live count animations
- Data table with status indicators (colored dots)
- Radar-style category distribution
- Status badges with blinking animation

---

### Design 2: "Aircraft Hangar" - Gallery/Showcase

**Route**: `/design/2`

**Concept**: Visual-first card-based gallery like an aircraft exhibition

**Theme Colors**:

- `--color-hangar-bg`: #f8f9fa (Light gray)
- `--color-hangar-bg-secondary`: #ffffff (White)
- `--color-hangar-accent`: #f59e0b (Hangar yellow)
- `--color-hangar-metallic`: #9ca3af (Metallic silver)
- `--color-hangar-text`: #1f2937 (Dark gray)
- `--color-hangar-text-secondary`: #6b7280 (Medium gray)

**Typography**:

- Display: "Oswald", sans-serif
- Body: "Source Sans 3", sans-serif

**Layout**:

- Hero: Full-width featured platform with large image
- Content: Masonry grid gallery (3-col → 2-col → 1-col)
- Filter: Slide-out sidebar

**Components**:

- Large platform cards with hover zoom effect
- Filter chips by category/country
- Lightbox modal for details

---

### Design 3: "War Room" - Intel/Analysis Dashboard

**Route**: `/design/3`

**Concept**: Classified document feel with maps, charts, intelligence card

**Theme Colors**:

- `--color-war-bg`: #1a2a4a (Blueprint blue)
- `--color-war-paper`: #f5f0e6 (Paper cream)
- `--color-war-text`: #2a2a2a (Dark gray)
- `--color-war-accent`: #3b82f6 (Blueprint blue)
- `--color-war-redacted`: #000000 (Black)

**Typography**:

- Display: "Noto Serif", serif
- Body: "Source Sans 3", sans-serif
- Mono: "IBM Plex Mono", monospace

**Layout**:

- Header with breadcrumb navigation
- 2-column: Stats left (30%), Charts right (70%)
- Full-width data table below

**Components**:

- Intel cards with "CLASSIFIED" stamp
- Pie/bar charts for distribution
- Comparison tables
- Redacted text effect

---

### Design 4: "Flight Deck" - Air Traffic Control Interface

**Route**: `/design/4`

**Concept**: ATC tower screen aesthetic with flight strips, radar display

**Theme Colors**:

- `--color-flight-bg`: #0a1520 (Radar dark)
- `--color-flight-radar`: #00ff41 (Radar green)
- `--color-flight-amber`: #ffb000 (CRT amber)
- `--color-flight-atc`: #1e3a5f (ATC blue)
- `--color-flight-text`: #e5e5e5 (Light gray)

**Typography**:

- Display: "Fira Code", monospace
- Body: "Inter", sans-serif

**Layout**:

- Top: Flight information strip
- Left: Departure board (platforms)
- Right: Arrival board (platforms)
- Bottom: Status timeline

**Components**:

- Departure/Arrival boards (tabular format)
- Radar display animation
- Blinking status indicators
- CRT scan line effect

---

### Design 5: "Scramble" - Quick Reference/Flashcard

**Route**: `/design/5`

**Concept**: Rapid-access reference cards for quick lookups

**Theme Colors**:

- `--color-scramble-bg`: #000000 (Black)
- `--color-scramble-text`: #ffffff (White)
- `--color-scramble-accent`: #ff0000 (Alert red)
- `--color-scramble-success`: #00ff00 (Signal green)
- `--color-scramble-secondary`: #333333 (Dark gray)

**Typography**:

- Display: "Chakra Petch", sans-serif
- Body: "Inter", sans-serif

**Layout**:

- Centered search bar (hero)
- Grid of quick stats (4 columns)
- Expandable flashcard details

**Components**:

- Instant search with debounce
- Flashcard flip animation
- Quick stats counters with animations

---

### Design 6: "Hangar Bay" - Accordion/Tree Navigation

**Route**: `/design/6`

**Concept**: Hierarchical explorer sidebar with expandable tree structure

**Theme Colors**:

- `--color-bay-bg`: #1e2328 (Industrial)
- `--color-bay-bg-secondary`: #282e34 (Darker)
- `--color-bay-accent`: #fbbf24 (Warning yellow)
- `--color-bay-text`: #e5e5e5 (Light gray)
- `--color-bay-border`: #3a4248 (Border gray)

**Typography**:

- Display: "Roboto Condensed", sans-serif
- Body: "Inter", sans-serif

**Layout**:

- Left: Collapsible tree navigation (280px, becomes accordion on mobile)
- Right: Detail panel (flex-grow)
- Breadcrumb navigation at top

**Components**:

- Tree view with expand/collapse icons
- Detail panel with tabs
- Breadcrumb trail

---

### Design 7: "Mission Control" - Full-Screen Hero

**Route**: `/design/7`

**Concept**: Immersive full-screen platform cards with video/image backgrounds

**Theme Colors**:

- `--color-mission-bg`: #000000 (Black)
- `--color-mission-gradient-start`: rgba(0,0,0,0.7)
- `--color-mission-gradient-end`: rgba(0,0,0,0.3)
- `--color-mission-text`: #ffffff (White)
- `--color-mission-accent`: #ef4444 (Red)

**Typography**:

- Display: "Bebas Neue", sans-serif
- Body: "Inter", sans-serif

**Layout**:

- Full-screen hero cards (100vh)
- Modal overlays for details
- Swipe navigation between cards
- Dot indicators at bottom

**Components**:

- Hero card with background image
- Modal with backdrop blur
- Swipe gesture support
- Full-screen detail view

---

### Design 8: "Black Box" - Minimal Technical Reference

**Route**: `/design/8`

**Concept**: Ultra-minimal technical documentation style

**Theme Colors**:

- `--color-blackbox-bg`: #000000 (Black)
- `--color-blackbox-bg-secondary`: #0a0a0a (Almost black)
- `--color-blackbox-text`: #e5e5e5 (Light gray)
- `--color-blackbox-accent`: #3b82f6 (Blue)
- `--color-blackbox-border`: #262626 (Border)

**Typography**:

- Display: "JetBrains Mono", monospace
- Body: "JetBrains Mono", monospace

**Layout**:

- Minimal header (sticky)
- Content-focused, no distractions
- Technical specs table

**Components**:

- Specs table with zebra striping
- Minimal navigation breadcrumb
- Technical monospace typography

---

### Design 9: "NATO Standard" - Structured Data Forms

**Route**: `/design/9`

**Concept**: Standardized form layouts similar to military documentation

**Theme Colors**:

- `--color-nato-bg`: #3a4a3a (NATO green)
- `--color-nato-bg-secondary`: #4a5a4a (Darker green)
- `--color-nato-bg-card`: #2a3a2a (Card)
- `--color-nato-text`: #e5e5e5 (Light)
- `--color-nato-accent`: #c9a227 (NATO gold)
- `--color-nato-border`: #5a6a5a (Border)

**Typography**:

- Display: "Barlow Condensed", sans-serif
- Body: "Inter", sans-serif

**Layout**:

- Fixed header with title and actions
- Structured grid content
- Sticky labels on forms

**Components**:

- Structured data grids
- Labeled field groups
- Data entry forms (read-only mode)
- Standard military documentation style

---

### Design 10: "Retro Terminal" - Vintage Computing Aesthetic

**Route**: `/design/10`

**Concept**: 1980s military computer terminal with scan lines

**Theme Colors**:

- `--color-retro-bg`: #000000 (Black)
- `--color-retro-phosphor`: #33ff33 (Phosphor green)
- `--color-retro-amber`: #ffb000 (Amber option)
- `--color-retro-dim`: #1a3a1a (Dim green)
- `--color-retro-scanline`: rgba(0,0,0,0.3)

**Typography**:

- Display: "VT323", monospace
- Body: "VT323", monospace

**Layout**:

- Terminal-style listing
- ASCII art borders (box-drawing characters)
- Command input at bottom

**Components**:

- CLI-style interface
- Scan line overlay effect
- Blinking cursor
- Keyboard navigation hints

---

## Shared Components

All designs share these shadcn/ui base components:

- Button
- Input
- Card
- Table
- Dialog/Modal
- Select/Dropdown
- Badge
- Skeleton (loading)
- Tabs
- ScrollArea

---

## State Management (Zustand)

```typescript
interface DesignStore {
  // Design switching
  currentDesign: number;
  setCurrentDesign: (id: number) => void;

  // Platform data
  platforms: Platform[];
  setPlatforms: (platforms: Platform[]) => void;
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  manufacturers: Manufacturer[];
  setManufacturers: (manufacturers: Manufacturer[]) => void;
  countries: Country[];
  setCountries: (countries: Country[]) => void;

  // Filters
  selectedCategory: string | null;
  setSelectedCategory: (id: string | null) => void;
  selectedCountry: string | null;
  setSelectedCountry: (id: string | null) => void;
  selectedManufacturer: string | null;
  setSelectedManufacturer: (id: string | null) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Stats
  stats: Stats | null;
  setStats: (stats: Stats) => void;

  // Loading states
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}
```

---

## Data Types

```typescript
interface Platform {
  id: string;
  name: string;
  description?: string;
  unitCostUsd?: number;
  operationalStatus?: string;
  technicalSpecs?: object;
  imageUrl?: string;
  category?: Category;
  manufacturer?: Manufacturer;
  country?: Country;
  createdAt: Date;
  updatedAt: Date;
}

interface Category {
  id: string;
  categoryName: string;
  categoryDomain?: string;
}

interface Manufacturer {
  id: string;
  name: string;
  specialization?: string;
  country?: Country;
}

interface Country {
  id: string;
  name: string;
}

interface Stats {
  totalCountries: number;
  totalManufacturers: number;
  totalCategories: number;
  totalPlatforms: number;
  totalBlogs: number;
  platformsByCategory: Array<{ categoryName: string; count: number }>;
  platformsByStatus: Array<{ status: string; count: number }>;
  platformsByCountry: Array<{ countryName: string; count: number }>;
}
```

---

## File Structure

```
frontend/
├── app/
│   ├── layout.tsx                    # Root layout with design switcher
│   ├── page.tsx                  # Home redirect
│   ├── globals.css              # Tailwind CSS 4 base + themes
│   ├── (shared)/
│   │   ├── components/       # Shared UI components
│   │   ├── hooks/            # Custom hooks
│   │   └── lib/              # Utilities, API client
│   ├── design/
│   │   ├── 1/
│   │   │   └── page.tsx       # Tactical Command
│   │   ├── 2/
│   │   │   └── page.tsx       # Aircraft Hangar
│   │   ├── 3/
│   │   │   └── page.tsx       # War Room
│   │   ├── 4/
│   │   │   └── page.tsx       # Flight Deck
│   │   ├── 5/
│   │   │   └── page.tsx       # Scramble
│   │   ├── 6/
│   │   │   └── page.tsx       # Hangar Bay
│   │   ├── 7/
│   │   │   └── page.tsx       # Mission Control
│   │   ├── 8/
│   │   │   └── page.tsx       # Black Box
│   │   ├── 9/
│   │   │   └── page.tsx       # NATO Standard
│   │   └── 10/
│   │       └── page.tsx       # Retro Terminal
│   └── api/                     # API routes
├── components/
│   ├── ui/                     # shadcn/ui components
│   └── designs/                # Design-specific components
├── stores/
│   └── useDesignStore.ts       # Zustand store
├── lib/
│   ├── api.ts                  # API client
│   └── utils.ts               # Utilities
└── public/
    └── fonts/                  # Custom fonts
```

---

## Implementation Order

1. Create SPEC.md (this document)
2. Initialize Next.js 16 project
3. Configure Tailwind CSS 4 with themes
4. Install shadcn/ui and add components
5. Create Zustand store
6. Implement API client
7. Implement shared layout
8. Implement Design 1 (Tactical Command)
9. Implement Design 2 (Aircraft Hangar)
10. Implement Designs 3-10
11. Add design switcher
12. Test and lint

---

## Acceptance Criteria

- [ ] All 10 designs are accessible via /design/1 through /design/10
- [ ] Each design has distinct visual identity
- [ ] Data loads from backend API (or mock data when unavailable)
- [ ] Design switcher allows navigation between designs
- [ ] Responsive on mobile devices
- [ ] No lint errors
- [ ] TypeScript compiles without errors
