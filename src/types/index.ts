export interface Platform {
  id: string;
  name: string;
  description?: string;
  unitCostUsd?: number;
  operationalStatus?: string;
  technicalSpecs?: Record<string, string>;
  imageUrl?: string;
  category?: Category;
  manufacturer?: Manufacturer;
  country?: Country;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  categoryName: string;
  categoryDomain?: string;
}

export interface Manufacturer {
  id: string;
  name: string;
  specialization?: string;
  country?: Country;
}

export interface Country {
  id: string;
  name: string;
}

export interface Blog {
  id: string;
  title: string;
  summary?: string;
  content?: string;
  imageUrl?: string;
  publishedAt?: string;
  updatedAt?: string;
}

export interface Stats {
  totalCountries: number;
  totalManufacturers: number;
  totalCategories: number;
  totalPlatforms: number;
  totalBlogs: number;
  platformsByCategory: Array<{ categoryName: string; count: number }>;
  platformsByStatus: Array<{ status: string; count: number }>;
  platformsByCountry: Array<{ countryName: string; count: number }>;
}