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
| React        | 19.x    |
| Tailwind CSS | 4.x     |
| shadcn/ui    | latest  |
| Zustand      | 5.x     |
| TypeScript   | 5.x     |

---

## Design Concepts

### Design : "Aircraft Hangar" - Gallery/Showcase

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

## State Management (Zustand)

```typescript
interface DesignStore {
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

## Implementation Order

1. Read SPEC.md
2. Initialize React project
3. Configure Tailwind CSS 4 with themes
4. Install shadcn/ui and add components
5. Create Zustand store
6. Implement API client
7. Implement shared layout
8. Implement Design 2 (Aircraft Hangar)
9. Test and lint
