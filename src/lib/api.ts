import type {
  ApiResponse,
  PaginatedResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  PlatformListItem,
  PlatformDetail,
  CategoryListItem,
  CountryListItem,
  ManufacturerListItem,
  BlogListItem,
  BlogDetail,
  DashboardStats,
} from "./types";
import type {
  CreatePlatformInput,
  CreateCategoryInput,
  CreateCountryInput,
  CreateManufacturerInput,
  CreateBlogInput,
} from "./validators";

const BASE_URL = "/api/v1";

class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const json = await res.json();

  if (!res.ok) {
    throw new ApiError(
      res.status,
      typeof json.error === "string" ? json.error : "Request failed"
    );
  }

  return (json as ApiResponse<T>).data ?? (json as T);
}

function authHeaders(token: string): Record<string, string> {
  return { Authorization: `Bearer ${token}` };
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export async function login(data: LoginRequest): Promise<LoginResponse> {
  return request<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function register(data: RegisterRequest): Promise<RegisterResponse> {
  return request<RegisterResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ─── Platforms ───────────────────────────────────────────────────────────────

export async function fetchPlatforms(
  params: Record<string, string> = {}
): Promise<PaginatedResponse<PlatformListItem>> {
  const query = new URLSearchParams(params).toString();
  return request<PaginatedResponse<PlatformListItem>>(
    `/platforms?${query}`
  );
}

export async function fetchPlatform(
  id: string,
  locale: string = "en"
): Promise<PlatformDetail> {
  return request<PlatformDetail>(`/platforms/${id}?locale=${locale}`);
}

export async function createPlatform(
  data: CreatePlatformInput,
  token: string
): Promise<PlatformDetail> {
  return request<PlatformDetail>("/platforms", {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
}

export async function updatePlatform(
  id: string,
  data: Partial<CreatePlatformInput>,
  token: string
): Promise<PlatformDetail> {
  return request<PlatformDetail>(`/platforms/${id}`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
}

export async function deletePlatform(
  id: string,
  token: string
): Promise<void> {
  await request(`/platforms/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
}

// ─── Categories ──────────────────────────────────────────────────────────────

export async function fetchCategories(
  params: Record<string, string> = {}
): Promise<PaginatedResponse<CategoryListItem>> {
  const query = new URLSearchParams(params).toString();
  return request<PaginatedResponse<CategoryListItem>>(
    `/categories?${query}`
  );
}

export async function createCategory(
  data: CreateCategoryInput,
  token: string
): Promise<CategoryListItem> {
  return request<CategoryListItem>("/categories", {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
}

export async function updateCategory(
  id: string,
  data: Partial<CreateCategoryInput>,
  token: string
): Promise<CategoryListItem> {
  return request<CategoryListItem>(`/categories/${id}`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
}

export async function deleteCategory(
  id: string,
  token: string
): Promise<void> {
  await request(`/categories/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
}

// ─── Countries ───────────────────────────────────────────────────────────────

export async function fetchCountries(
  params: Record<string, string> = {}
): Promise<PaginatedResponse<CountryListItem>> {
  const query = new URLSearchParams(params).toString();
  return request<PaginatedResponse<CountryListItem>>(
    `/countries?${query}`
  );
}

export async function createCountry(
  data: CreateCountryInput,
  token: string
): Promise<CountryListItem> {
  return request<CountryListItem>("/countries", {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
}

export async function updateCountry(
  id: string,
  data: Partial<CreateCountryInput>,
  token: string
): Promise<CountryListItem> {
  return request<CountryListItem>(`/countries/${id}`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
}

export async function deleteCountry(
  id: string,
  token: string
): Promise<void> {
  await request(`/countries/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
}

// ─── Manufacturers ───────────────────────────────────────────────────────────

export async function fetchManufacturers(
  params: Record<string, string> = {}
): Promise<PaginatedResponse<ManufacturerListItem>> {
  const query = new URLSearchParams(params).toString();
  return request<PaginatedResponse<ManufacturerListItem>>(
    `/manufacturers?${query}`
  );
}

export async function createManufacturer(
  data: CreateManufacturerInput,
  token: string
): Promise<ManufacturerListItem> {
  return request<ManufacturerListItem>("/manufacturers", {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
}

export async function updateManufacturer(
  id: string,
  data: Partial<CreateManufacturerInput>,
  token: string
): Promise<ManufacturerListItem> {
  return request<ManufacturerListItem>(`/manufacturers/${id}`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
}

export async function deleteManufacturer(
  id: string,
  token: string
): Promise<void> {
  await request(`/manufacturers/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
}

// ─── Blogs ───────────────────────────────────────────────────────────────────

export async function fetchBlogs(
  params: Record<string, string> = {}
): Promise<PaginatedResponse<BlogListItem>> {
  const query = new URLSearchParams(params).toString();
  return request<PaginatedResponse<BlogListItem>>(`/blogs?${query}`);
}

export async function fetchBlog(
  id: string,
  locale: string = "en"
): Promise<BlogDetail> {
  return request<BlogDetail>(`/blogs/${id}?locale=${locale}`);
}

export async function createBlog(
  data: CreateBlogInput,
  token: string
): Promise<BlogDetail> {
  return request<BlogDetail>("/blogs", {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
}

export async function updateBlog(
  id: string,
  data: Partial<CreateBlogInput>,
  token: string
): Promise<BlogDetail> {
  return request<BlogDetail>(`/blogs/${id}`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
}

export async function deleteBlog(
  id: string,
  token: string
): Promise<void> {
  await request(`/blogs/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
}

// ─── Stats & Health ──────────────────────────────────────────────────────────

export async function fetchStats(): Promise<DashboardStats> {
  return request<DashboardStats>("/stats");
}

export async function healthCheck(): Promise<{ status: string }> {
  return request<{ status: string }>("/health");
}
