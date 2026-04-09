import { create } from "zustand";

export interface Platform {
  id: string;
  name: string;
  description?: string;
  unitCostUsd?: number;
  operationalStatus?: string;
  technicalSpecs?: Record<string, unknown>;
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

interface DesignStore {
  currentDesign: number;
  setCurrentDesign: (id: number) => void;

  platforms: Platform[];
  setPlatforms: (platforms: Platform[]) => void;

  categories: Category[];
  setCategories: (categories: Category[]) => void;

  manufacturers: Manufacturer[];
  setManufacturers: (manufacturers: Manufacturer[]) => void;

  countries: Country[];
  setCountries: (countries: Country[]) => void;

  selectedCategory: string | null;
  setSelectedCategory: (id: string | null) => void;

  selectedCountry: string | null;
  setSelectedCountry: (id: string | null) => void;

  selectedManufacturer: string | null;
  setSelectedManufacturer: (id: string | null) => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;

  stats: Stats | null;
  setStats: (stats: Stats) => void;

  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  error: string | null;
  setError: (error: string | null) => void;
}

export const useDesignStore = create<DesignStore>((set) => ({
  currentDesign: 1,
  setCurrentDesign: (id) => set({ currentDesign: id }),

  platforms: [],
  setPlatforms: (platforms) => set({ platforms }),

  categories: [],
  setCategories: (categories) => set({ categories }),

  manufacturers: [],
  setManufacturers: (manufacturers) => set({ manufacturers }),

  countries: [],
  setCountries: (countries) => set({ countries }),

  selectedCategory: null,
  setSelectedCategory: (id) => set({ selectedCategory: id }),

  selectedCountry: null,
  setSelectedCountry: (id) => set({ selectedCountry: id }),

  selectedManufacturer: null,
  setSelectedManufacturer: (id) => set({ selectedManufacturer: id }),

  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),

  stats: null,
  setStats: (stats) => set({ stats }),

  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),

  error: null,
  setError: (error) => set({ error }),
}));
