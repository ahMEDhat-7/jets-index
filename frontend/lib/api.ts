import {
  Platform,
  Category,
  Manufacturer,
  Country,
  Stats,
  Blog,
} from "@/stores/useDesignStore";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

export async function fetchPlatforms(params?: {
  offset?: number;
  limit?: number;
  search?: string;
}): Promise<Platform[]> {
  try {
    const searchParams = new URLSearchParams();
    if (params?.offset) searchParams.set("offset", String(params.offset));
    if (params?.limit) searchParams.set("limit", String(params.limit));
    if (params?.search) searchParams.set("search", params.search);

    const res = await fetch(`${API_BASE}/platforms?${searchParams}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch platforms");
    return res.json();
  } catch (e) {
    throw e;
  }
}

export async function fetchPlatform(id: string): Promise<Platform | null> {
  try {
    const res = await fetch(`${API_BASE}/platforms/${id}`);
    if (!res.ok) throw new Error("Failed to fetch platform");
    return res.json();
  } catch (e) {
    throw e;
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_BASE}/categories`);
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  } catch (e) {
    throw e;
  }
}

export async function fetchManufacturers(): Promise<Manufacturer[]> {
  try {
    const res = await fetch(`${API_BASE}/manufacturers`);
    if (!res.ok) throw new Error("Failed to fetch manufacturers");
    return res.json();
  } catch (e) {
    throw e;
  }
}

export async function fetchCountries(): Promise<Country[]> {
  try {
    const res = await fetch(`${API_BASE}/countries`);
    if (!res.ok) throw new Error("Failed to fetch countries");
    return res.json();
  } catch (e) {
    throw e;
  }
}

export async function fetchStats(): Promise<Stats> {
  try {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) throw new Error("Failed to fetch stats");
    return res.json();
  } catch (e) {
    throw e;
  }
}

export async function fetchBlogs(): Promise<Blog[]> {
  try {
    const res = await fetch(`${API_BASE}/blogs`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch blogs");
    return res.json();
  } catch (e) {
    throw e;
  }
}

export async function fetchBlog(id: string): Promise<Blog | null> {
  try {
    const res = await fetch(`${API_BASE}/blogs/${id}`);
    if (!res.ok) throw new Error("Failed to fetch blog");
    return res.json();
  } catch (e) {
    throw e;
  }
}
