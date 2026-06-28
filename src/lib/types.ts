import type { Decimal } from "@prisma/client/runtime/library";

// ─── API Response Types ──────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data?: T;
  error?: string | Record<string, unknown>;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ─── Platform Types ──────────────────────────────────────────────────────────

export interface PlatformTranslation {
  locale: string;
  name: string;
  description: string | null;
}

export interface PlatformListItem {
  id: string;
  unitCostUsd: Decimal | null;
  operationalStatus: string | null;
  technicalSpecs: unknown;
  imageUrl: string | null;
  createdAt: Date;
  translations: PlatformTranslation[];
  category: {
    id: string;
    translations: { locale: string; name: string }[];
  };
  manufacturer: {
    id: string;
    translations: { locale: string; name: string }[];
  };
  country: {
    id: string;
    translations: { locale: string; name: string }[];
  };
}

export interface PlatformDetail extends PlatformListItem {
  updatedAt: Date;
}

// ─── Category Types ──────────────────────────────────────────────────────────

export interface CategoryTranslation {
  locale: string;
  name: string;
  domain: string | null;
}

export interface CategoryListItem {
  id: string;
  createdAt: Date;
  translations: CategoryTranslation[];
  _count?: { platforms: number };
}

// ─── Country Types ───────────────────────────────────────────────────────────

export interface CountryTranslation {
  locale: string;
  name: string;
}

export interface CountryListItem {
  id: string;
  createdAt: Date;
  translations: CountryTranslation[];
  _count?: { platforms: number; manufacturers: number };
}

// ─── Manufacturer Types ──────────────────────────────────────────────────────

export interface ManufacturerTranslation {
  locale: string;
  name: string;
  specialization: string | null;
}

export interface ManufacturerListItem {
  id: string;
  countryId: string;
  createdAt: Date;
  translations: ManufacturerTranslation[];
  country?: {
    id: string;
    translations: { locale: string; name: string }[];
  };
  _count?: { platforms: number };
}

// ─── Blog Types ──────────────────────────────────────────────────────────────

export interface BlogTranslation {
  locale: string;
  title: string;
  summary: string | null;
  content: string;
}

export interface BlogListItem {
  id: string;
  publishedAt: Date;
  updatedAt: Date;
  translations: BlogTranslation[];
}

export interface BlogDetail extends BlogListItem {}

// ─── Auth Types ──────────────────────────────────────────────────────────────

export interface JwtPayload {
  sub: string;
  email: string;
  role: "ADMIN" | "USER";
  iat: number;
  exp: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export interface RegisterRequest {
  email: string;
  password: string;
  role?: "ADMIN" | "USER";
}

export interface RegisterResponse {
  id: string;
  email: string;
  role: string;
}

// ─── Dashboard Stats ─────────────────────────────────────────────────────────

export interface DashboardStats {
  platforms: number;
  categories: number;
  countries: number;
  manufacturers: number;
  blogs: number;
  platformsByCategory: { name: string; count: number }[];
  platformsByCountry: { name: string; count: number }[];
  platformsByStatus: { status: string; count: number }[];
  recentBlogs: BlogListItem[];
}

// ─── Filter Types ────────────────────────────────────────────────────────────

export interface PlatformFilters {
  page?: number;
  limit?: number;
  locale?: string;
  categoryId?: string;
  countryId?: string;
  manufacturerId?: string;
  status?: string;
  search?: string;
}

export interface CategoryFilters {
  page?: number;
  limit?: number;
  locale?: string;
  search?: string;
}

export interface CountryFilters {
  page?: number;
  limit?: number;
  locale?: string;
  search?: string;
}

export interface ManufacturerFilters {
  page?: number;
  limit?: number;
  locale?: string;
  countryId?: string;
  search?: string;
}

export interface BlogFilters {
  page?: number;
  limit?: number;
  locale?: string;
  search?: string;
}
