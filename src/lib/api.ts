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