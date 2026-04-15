import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Platform, Category, Manufacturer, Country, Stats, Blog } from '../types';
import { fetchPlatforms, fetchCategories, fetchCountries, fetchManufacturers, fetchBlogs, fetchStats } from '../lib/api';

const CACHE_DURATION = 5 * 60 * 1000;

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

interface DesignStore {
  platforms: Platform[];
  categories: Category[];
  manufacturers: Manufacturer[];
  countries: Country[];
  blogs: Blog[];
  stats: Stats | null;

  platformCache: CacheEntry<Platform[]> | null;
  categoriesCache: CacheEntry<Category[]> | null;
  manufacturersCache: CacheEntry<Manufacturer[]> | null;
  countriesCache: CacheEntry<Country[]> | null;
  blogsCache: CacheEntry<Blog[]> | null;
  statsCache: CacheEntry<Stats | null> | null;

  selectedCategory: string | null;
  setSelectedCategory: (id: string | null) => void;
  selectedCountry: string | null;
  setSelectedCountry: (id: string | null) => void;
  selectedManufacturer: string | null;
  setSelectedManufacturer: (id: string | null) => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;

  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  fetchAllData: () => Promise<void>;
  fetchPlatformsIfNeeded: () => Promise<Platform[]>;
  fetchCategoriesIfNeeded: () => Promise<Category[]>;
  fetchCountriesIfNeeded: () => Promise<Country[]>;
  fetchManufacturersIfNeeded: () => Promise<Manufacturer[]>;
  fetchBlogsIfNeeded: () => Promise<Blog[]>;
  invalidateCache: () => void;
}

export const useDesignStore = create<DesignStore>()(
  persist(
    (set, get) => ({
      platforms: [],
      categories: [],
      manufacturers: [],
      countries: [],
      blogs: [],
      stats: null,

      platformCache: null,
      categoriesCache: null,
      manufacturersCache: null,
      countriesCache: null,
      blogsCache: null,
      statsCache: null,

      selectedCategory: null,
      setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
      selectedCountry: null,
      setSelectedCountry: (selectedCountry) => set({ selectedCountry }),
      selectedManufacturer: null,
      setSelectedManufacturer: (selectedManufacturer) => set({ selectedManufacturer }),

      searchQuery: '',
      setSearchQuery: (searchQuery) => set({ searchQuery }),

      isLoading: true,
      setIsLoading: (isLoading) => set({ isLoading }),

      fetchAllData: async () => {
        const state = get();
        if (!state.isLoading) return;

        set({ isLoading: true });

        const now = Date.now();

        if (state.platformCache && (now - state.platformCache.timestamp) < CACHE_DURATION) {
          set({ platforms: state.platformCache.data });
        } else {
          const platforms = await fetchPlatforms();
          set({ platforms, platformCache: { data: platforms, timestamp: now } });
        }

        if (state.categoriesCache && (now - state.categoriesCache.timestamp) < CACHE_DURATION) {
          set({ categories: state.categoriesCache.data });
        } else {
          const categories = await fetchCategories();
          set({ categories, categoriesCache: { data: categories, timestamp: now } });
        }

        if (state.countriesCache && (now - state.countriesCache.timestamp) < CACHE_DURATION) {
          set({ countries: state.countriesCache.data });
        } else {
          const countries = await fetchCountries();
          set({ countries, countriesCache: { data: countries, timestamp: now } });
        }

        if (state.manufacturersCache && (now - state.manufacturersCache.timestamp) < CACHE_DURATION) {
          set({ manufacturers: state.manufacturersCache.data });
        } else {
          const manufacturers = await fetchManufacturers();
          set({ manufacturers, manufacturersCache: { data: manufacturers, timestamp: now } });
        }

        if (state.blogsCache && (now - state.blogsCache.timestamp) < CACHE_DURATION) {
          set({ blogs: state.blogsCache.data });
        } else {
          const blogs = await fetchBlogs();
          set({ blogs, blogsCache: { data: blogs, timestamp: now } });
        }

        if (state.statsCache && (now - state.statsCache.timestamp) < CACHE_DURATION) {
          set({ stats: state.statsCache.data });
        } else {
          const stats = await fetchStats();
          set({ stats, statsCache: { data: stats, timestamp: now } });
        }

        set({ isLoading: false });
      },

      fetchPlatformsIfNeeded: async () => {
        const state = get();
        const now = Date.now();

        if (state.platformCache && (now - state.platformCache.timestamp) < CACHE_DURATION) {
          return state.platformCache.data;
        }

        const platforms = await fetchPlatforms();
        set({ platforms, platformCache: { data: platforms, timestamp: now } });
        return platforms;
      },

      fetchCategoriesIfNeeded: async () => {
        const state = get();
        const now = Date.now();

        if (state.categoriesCache && (now - state.categoriesCache.timestamp) < CACHE_DURATION) {
          return state.categoriesCache.data;
        }

        const categories = await fetchCategories();
        set({ categories, categoriesCache: { data: categories, timestamp: now } });
        return categories;
      },

      fetchCountriesIfNeeded: async () => {
        const state = get();
        const now = Date.now();

        if (state.countriesCache && (now - state.countriesCache.timestamp) < CACHE_DURATION) {
          return state.countriesCache.data;
        }

        const countries = await fetchCountries();
        set({ countries, countriesCache: { data: countries, timestamp: now } });
        return countries;
      },

      fetchManufacturersIfNeeded: async () => {
        const state = get();
        const now = Date.now();

        if (state.manufacturersCache && (now - state.manufacturersCache.timestamp) < CACHE_DURATION) {
          return state.manufacturersCache.data;
        }

        const manufacturers = await fetchManufacturers();
        set({ manufacturers, manufacturersCache: { data: manufacturers, timestamp: now } });
        return manufacturers;
      },

      fetchBlogsIfNeeded: async () => {
        const state = get();
        const now = Date.now();

        if (state.blogsCache && (now - state.blogsCache.timestamp) < CACHE_DURATION) {
          return state.blogsCache.data;
        }

        const blogs = await fetchBlogs();
        set({ blogs, blogsCache: { data: blogs, timestamp: now } });
        return blogs;
      },

      invalidateCache: () => {
        set({
          platformCache: null,
          categoriesCache: null,
          manufacturersCache: null,
          countriesCache: null,
          blogsCache: null,
          statsCache: null,
        });
      },
    }),
    {
      name: 'jets-index-storage',
      partialize: (state) => ({
        platformCache: state.platformCache,
        categoriesCache: state.categoriesCache,
        manufacturersCache: state.manufacturersCache,
        countriesCache: state.countriesCache,
        blogsCache: state.blogsCache,
        statsCache: state.statsCache,
      }),
    }
  )
);