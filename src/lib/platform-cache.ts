import type { PlatformListItem, PaginatedResponse } from "./types";

const CACHE_KEY = "platforms_cache";
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

interface PlatformCache {
  platforms: PlatformListItem[];
  filters: string;
  timestamp: number;
}

function isCacheValid(cache: PlatformCache, filters: string): boolean {
  return (
    cache.filters === filters && Date.now() - cache.timestamp < CACHE_TTL
  );
}

function readCache(): PlatformCache | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PlatformCache;
  } catch {
    return null;
  }
}

function writeCache(platforms: PlatformListItem[], filters: string): void {
  try {
    const cache: PlatformCache = {
      platforms,
      filters,
      timestamp: Date.now(),
    };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // sessionStorage full or unavailable — silently fail
  }
}

export function clearPlatformCache(): void {
  try {
    sessionStorage.removeItem(CACHE_KEY);
  } catch {
    // ignore
  }
}

function buildFilterKey(
  filters: Record<string, string | undefined>
): string {
  const entries = Object.entries(filters)
    .filter(([, v]) => v !== undefined && v !== "")
    .sort(([a], [b]) => a.localeCompare(b));
  return JSON.stringify(entries);
}

export async function fetchAllPlatforms(
  lang: string,
  filters: Record<string, string | undefined>,
  forceRefresh: boolean = false
): Promise<PlatformListItem[]> {
  const filterKey = buildFilterKey(filters);

  if (!forceRefresh) {
    const cached = readCache();
    if (cached && isCacheValid(cached, filterKey)) {
      return cached.platforms;
    }
  }

  const allPlatforms: PlatformListItem[] = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const params = new URLSearchParams();
    params.set("locale", lang);
    params.set("page", String(page));
    params.set("limit", "50");

    if (filters.categoryId) params.set("categoryId", filters.categoryId);
    if (filters.countryId) params.set("countryId", filters.countryId);
    if (filters.manufacturerId) params.set("manufacturerId", filters.manufacturerId);
    if (filters.status) params.set("status", filters.status);
    if (filters.search) params.set("search", filters.search);

    const res = await fetch(`/api/v1/platforms?${params.toString()}`);
    if (!res.ok) break;

    const data: PaginatedResponse<PlatformListItem> = await res.json();
    allPlatforms.push(...data.data);
    totalPages = data.pagination.totalPages;
    page++;
  }

  writeCache(allPlatforms, filterKey);
  return allPlatforms;
}
