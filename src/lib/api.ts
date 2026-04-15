import type { Platform, Blog, Category, Country, Manufacturer, Stats } from '../types';

const API_BASE = import.meta.env.VITE_API_URL;

if (!API_BASE) {
  throw new Error('VITE_API_URL is not defined. Please set it in your .env file');
}

export async function fetchPlatforms(): Promise<Platform[]> {
  try {
    const res = await fetch(`${API_BASE}/platforms`);
    if (!res.ok) return [];
    const data = await res.json();
    const items = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
    return items.map((p: any) => ({
      id: p.platform_id || p.id || '',
      name: p.platform_name || p.name || 'Unknown',
      description: p.platform_description || p.description || '',
      unitCostUsd: p.unit_cost_usd || p.unitCostUsd || undefined,
      operationalStatus: p.operational_status || p.operationalStatus || '',
      technicalSpecs: p.technical_specs || p.technicalSpecs || undefined,
      imageUrl: p.image_url || p.imageUrl || undefined,
      category: p.category ? { id: p.category.category_id || p.category.id, categoryName: p.category.category_name || p.category.categoryName } : undefined,
      manufacturer: p.manufacturer ? { id: p.manufacturer.manu_id || p.manufacturer.id, name: p.manufacturer.manu_name || p.manufacturer.name } : undefined,
      country: p.country ? { id: p.country.country_id || p.country.id, name: p.country.country_name || p.country.name } : undefined,
      createdAt: p.created_at || '',
      updatedAt: p.updated_at || '',
    }));
  } catch (err) {
    console.error('fetchPlatforms error:', err);
    return [];
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_BASE}/categories`);
    if (!res.ok) return [];
    const data = await res.json();
    const items = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
    return items.map((c: any) => ({
      id: c.category_id || c.id,
      categoryName: c.category_name || c.categoryName,
      categoryDomain: c.category_domain || c.categoryDomain,
    }));
  } catch (err) {
    console.error('fetchCategories error:', err);
    return [];
  }
}

export async function fetchCountries(): Promise<Country[]> {
  try {
    const res = await fetch(`${API_BASE}/countries`);
    if (!res.ok) return [];
    const data = await res.json();
    const items = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
    return items.map((c: any) => ({
      id: c.country_id || c.id,
      name: c.country_name || c.name,
    }));
  } catch (err) {
    console.error('fetchCountries error:', err);
    return [];
  }
}

export async function fetchManufacturers(): Promise<Manufacturer[]> {
  try {
    const res = await fetch(`${API_BASE}/manufacturers`);
    if (!res.ok) return [];
    const data = await res.json();
    const items = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
    return items.map((m: any) => ({
      id: m.manu_id || m.id,
      name: m.manu_name || m.name,
      specialization: m.specialization || undefined,
    }));
  } catch (err) {
    console.error('fetchManufacturers error:', err);
    return [];
  }
}

export async function fetchBlogs(): Promise<Blog[]> {
  try {
    const res = await fetch(`${API_BASE}/blogs`);
    if (!res.ok) return [];
    const data = await res.json();
    const items = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
    return items.map((b: any) => ({
      id: b.blog_id || b.id,
      title: b.title,
      summary: b.summary,
      content: b.content,
      imageUrl: b.image_url || b.imageUrl,
      publishedAt: b.published_at || b.publishedAt,
      updatedAt: b.updated_at || b.updatedAt,
    }));
  } catch (err) {
    console.error('fetchBlogs error:', err);
    return [];
  }
}

export async function fetchStats(): Promise<Stats | null> {
  try {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error('fetchStats error:', err);
    return null;
  }
}

function getHeaders(token?: string): HeadersInit {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export async function login(email: string, password: string): Promise<{ token: string; user: LoginResponse['user'] } | null> {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) return null;
    const data: LoginResponse = await res.json();
    return { token: data.access_token, user: data.user };
  } catch (err) {
    console.error('login error:', err);
    return null;
  }
}

export interface CreateBlogData {
  title: string;
  summary?: string;
  content: string;
  imageUrl?: string;
}

export async function createBlog(token: string, data: CreateBlogData): Promise<Blog | null> {
  try {
    const res = await fetch(`${API_BASE}/blogs`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    const b = await res.json();
    return {
      id: b.blog_id || b.id,
      title: b.title,
      summary: b.summary,
      content: b.content,
      imageUrl: b.image_url || b.imageUrl,
      publishedAt: b.published_at || b.publishedAt,
      updatedAt: b.updated_at || b.updatedAt,
    };
  } catch (err) {
    console.error('createBlog error:', err);
    return null;
  }
}

export async function updateBlog(token: string, id: string, data: Partial<CreateBlogData>): Promise<Blog | null> {
  try {
    const res = await fetch(`${API_BASE}/blogs/${id}`, {
      method: 'PATCH',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    const b = await res.json();
    return {
      id: b.blog_id || b.id,
      title: b.title,
      summary: b.summary,
      content: b.content,
      imageUrl: b.image_url || b.imageUrl,
      publishedAt: b.published_at || b.publishedAt,
      updatedAt: b.updated_at || b.updatedAt,
    };
  } catch (err) {
    console.error('updateBlog error:', err);
    return null;
  }
}

export async function deleteBlog(token: string, id: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/blogs/${id}`, {
      method: 'DELETE',
      headers: getHeaders(token),
    });
    return res.ok;
  } catch (err) {
    console.error('deleteBlog error:', err);
    return false;
  }
}

export interface CreatePlatformData {
  name: string;
  description?: string;
  unitCostUsd?: number;
  operationalStatus?: string;
  technicalSpecs?: Record<string, unknown>;
  imageUrl?: string;
  categoryId?: string;
  manufacturerId?: string;
  countryId?: string;
}

export async function createPlatform(token: string, data: CreatePlatformData): Promise<Platform | null> {
  try {
    const res = await fetch(`${API_BASE}/platforms`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    const p = await res.json();
    return {
      id: p.platform_id || p.id,
      name: p.platform_name || p.name,
      description: p.platform_description || p.description,
      unitCostUsd: p.unit_cost_usd || p.unitCostUsd,
      operationalStatus: p.operational_status || p.operationalStatus,
      technicalSpecs: p.technical_specs || p.technicalSpecs,
      imageUrl: p.image_url || p.imageUrl,
      category: p.category ? { id: p.category.category_id || p.category.id, categoryName: p.category.category_name || p.category.categoryName } : undefined,
      manufacturer: p.manufacturer ? { id: p.manufacturer.manu_id || p.manufacturer.id, name: p.manufacturer.manu_name || p.manufacturer.name } : undefined,
      country: p.country ? { id: p.country.country_id || p.country.id, name: p.country.country_name || p.country.name } : undefined,
      createdAt: p.created_at,
      updatedAt: p.updated_at,
    };
  } catch (err) {
    console.error('createPlatform error:', err);
    return null;
  }
}

export async function updatePlatform(token: string, id: string, data: Partial<CreatePlatformData>): Promise<Platform | null> {
  try {
    const res = await fetch(`${API_BASE}/platforms/${id}`, {
      method: 'PATCH',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    const p = await res.json();
    return {
      id: p.platform_id || p.id,
      name: p.platform_name || p.name,
      description: p.platform_description || p.description,
      unitCostUsd: p.unit_cost_usd || p.unitCostUsd,
      operationalStatus: p.operational_status || p.operationalStatus,
      technicalSpecs: p.technical_specs || p.technicalSpecs,
      imageUrl: p.image_url || p.imageUrl,
      category: p.category ? { id: p.category.category_id || p.category.id, categoryName: p.category.category_name || p.category.categoryName } : undefined,
      manufacturer: p.manufacturer ? { id: p.manufacturer.manu_id || p.manufacturer.id, name: p.manufacturer.manu_name || p.manufacturer.name } : undefined,
      country: p.country ? { id: p.country.country_id || p.country.id, name: p.country.country_name || p.country.name } : undefined,
      createdAt: p.created_at,
      updatedAt: p.updated_at,
    };
  } catch (err) {
    console.error('updatePlatform error:', err);
    return null;
  }
}

export async function deletePlatform(token: string, id: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/platforms/${id}`, {
      method: 'DELETE',
      headers: getHeaders(token),
    });
    return res.ok;
  } catch (err) {
    console.error('deletePlatform error:', err);
    return false;
  }
}

export interface CreateCategoryData {
  categoryName: string;
  categoryDomain?: string;
}

export async function createCategory(token: string, data: CreateCategoryData): Promise<Category | null> {
  try {
    const res = await fetch(`${API_BASE}/categories`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    const c = await res.json();
    return {
      id: c.category_id || c.id,
      categoryName: c.category_name || c.categoryName,
      categoryDomain: c.category_domain || c.categoryDomain,
    };
  } catch (err) {
    console.error('createCategory error:', err);
    return null;
  }
}

export async function updateCategory(token: string, id: string, data: Partial<CreateCategoryData>): Promise<Category | null> {
  try {
    const res = await fetch(`${API_BASE}/categories/${id}`, {
      method: 'PATCH',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    const c = await res.json();
    return {
      id: c.category_id || c.id,
      categoryName: c.category_name || c.categoryName,
      categoryDomain: c.category_domain || c.categoryDomain,
    };
  } catch (err) {
    console.error('updateCategory error:', err);
    return null;
  }
}

export async function deleteCategory(token: string, id: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/categories/${id}`, {
      method: 'DELETE',
      headers: getHeaders(token),
    });
    return res.ok;
  } catch (err) {
    console.error('deleteCategory error:', err);
    return false;
  }
}

export interface CreateCountryData {
  name: string;
}

export async function createCountry(token: string, data: CreateCountryData): Promise<Country | null> {
  try {
    const res = await fetch(`${API_BASE}/countries`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    const c = await res.json();
    return {
      id: c.country_id || c.id,
      name: c.country_name || c.name,
    };
  } catch (err) {
    console.error('createCountry error:', err);
    return null;
  }
}

export async function updateCountry(token: string, id: string, data: Partial<CreateCountryData>): Promise<Country | null> {
  try {
    const res = await fetch(`${API_BASE}/countries/${id}`, {
      method: 'PATCH',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    const c = await res.json();
    return {
      id: c.country_id || c.id,
      name: c.country_name || c.name,
    };
  } catch (err) {
    console.error('updateCountry error:', err);
    return null;
  }
}

export async function deleteCountry(token: string, id: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/countries/${id}`, {
      method: 'DELETE',
      headers: getHeaders(token),
    });
    return res.ok;
  } catch (err) {
    console.error('deleteCountry error:', err);
    return false;
  }
}

export interface CreateManufacturerData {
  name: string;
  countryId?: string;
  specialization?: string;
}

export async function createManufacturer(token: string, data: CreateManufacturerData): Promise<Manufacturer | null> {
  try {
    const res = await fetch(`${API_BASE}/manufacturers`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    const m = await res.json();
    return {
      id: m.manu_id || m.id,
      name: m.manu_name || m.name,
      specialization: m.specialization,
    };
  } catch (err) {
    console.error('createManufacturer error:', err);
    return null;
  }
}

export async function updateManufacturer(token: string, id: string, data: Partial<CreateManufacturerData>): Promise<Manufacturer | null> {
  try {
    const res = await fetch(`${API_BASE}/manufacturers/${id}`, {
      method: 'PATCH',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    const m = await res.json();
    return {
      id: m.manu_id || m.id,
      name: m.manu_name || m.name,
      specialization: m.specialization,
    };
  } catch (err) {
    console.error('updateManufacturer error:', err);
    return null;
  }
}

export async function deleteManufacturer(token: string, id: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/manufacturers/${id}`, {
      method: 'DELETE',
      headers: getHeaders(token),
    });
    return res.ok;
  } catch (err) {
    console.error('deleteManufacturer error:', err);
    return false;
  }
}