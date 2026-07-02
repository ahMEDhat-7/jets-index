import type { PlatformListItem, PaginatedResponse } from "./types";

const CACHE_KEY = "platforms_cache";
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

interface PlatformCache {
  platforms: PlatformListItem[];
  lang: string;
  timestamp: number;
}

export interface FetchResult {
  platforms: PlatformListItem[];
  error: boolean;
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

function isCacheValid(cache: PlatformCache, lang: string): boolean {
  return cache.lang === lang && Date.now() - cache.timestamp < CACHE_TTL;
}

function writeCache(platforms: PlatformListItem[], lang: string): void {
  try {
    const cache: PlatformCache = {
      platforms,
      lang,
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

export async function fetchAllPlatforms(
  lang: string,
  forceRefresh: boolean = false
): Promise<FetchResult> {
  if (!forceRefresh) {
    const cached = readCache();
    if (cached && isCacheValid(cached, lang)) {
      return { platforms: cached.platforms, error: false };
    }
  }

  const allPlatforms: PlatformListItem[] = [];
  let page = 1;
  let totalPages = 1;
  let fetchError = false;

  try {
    while (page <= totalPages) {
      const params = new URLSearchParams();
      params.set("locale", lang);
      params.set("page", String(page));
      params.set("limit", "50");

      const res = await fetch(`/api/v1/platforms?${params.toString()}`);
      if (!res.ok) {
        fetchError = true;
        break;
      }

      const data: PaginatedResponse<PlatformListItem> = await res.json();
      allPlatforms.push(...data.data);
      totalPages = data.pagination.totalPages;
      page++;
    }
  } catch {
    fetchError = true;
  }

  if (!fetchError && allPlatforms.length > 0) {
    writeCache(allPlatforms, lang);
  }

  return { platforms: allPlatforms, error: fetchError };
}
