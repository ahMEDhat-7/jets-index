"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Loader2, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { fetchAllPlatforms, clearPlatformCache } from "@/lib/platform-cache";
import type { PlatformListItem, PlatformFilters } from "@/lib/types";

const PAGE_SIZE = 12;

interface PlatformGridProps {
  lang: string;
  initialFilters: PlatformFilters;
}

function getStatusDot(status: string | null): string {
  switch (status) {
    case "Active":
      return "bg-tactical-success";
    case "Development":
      return "bg-tactical-accent";
    case "Retired":
      return "bg-tactical-alert";
    default:
      return "bg-tactical-text-secondary";
  }
}

function getTranslation(
  translations: { locale: string; name: string }[],
  locale: string,
  fallback: string = ""
): string {
  const t = translations.find((tr) => tr.locale === locale);
  if (t) return t.name || fallback;
  const en = translations.find((tr) => tr.locale === "en");
  if (en) return en.name || fallback;
  return fallback;
}

function matchesFilter(
  platform: PlatformListItem,
  filters: PlatformFilters
): boolean {
  if (filters.categoryId && platform.category.id !== filters.categoryId) return false;
  if (filters.countryId && platform.country.id !== filters.countryId) return false;
  if (filters.manufacturerId && platform.manufacturer.id !== filters.manufacturerId) return false;
  if (filters.status && platform.operationalStatus !== filters.status) return false;
  if (filters.search) {
    const q = filters.search.toLowerCase();
    const nameMatch = platform.translations.some(
      (tr) => tr.name?.toLowerCase().includes(q)
    );
    const descMatch = platform.translations.some(
      (tr) => tr.description?.toLowerCase().includes(q)
    );
    if (!nameMatch && !descMatch) return false;
  }
  return true;
}

export function PlatformGrid({ lang, initialFilters }: PlatformGridProps) {
  const t = useTranslations("Browse");
  const ts = useTranslations("Statuses");
  const tc = useTranslations("Common");

  const [allPlatforms, setAllPlatforms] = useState<PlatformListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const loadPlatforms = useCallback(
    async (filters: PlatformFilters, forceRefresh: boolean = false) => {
      setLoading(true);
      try {
        const platforms = await fetchAllPlatforms(
          lang,
          {
            categoryId: filters.categoryId,
            countryId: filters.countryId,
            manufacturerId: filters.manufacturerId,
            status: filters.status,
            search: filters.search,
          },
          forceRefresh
        );
        setAllPlatforms(platforms);
      } catch {
        setAllPlatforms([]);
      } finally {
        setLoading(false);
      }
    },
    [lang]
  );

  useEffect(() => {
    setPage(1);
    loadPlatforms(initialFilters);
  }, [initialFilters, loadPlatforms]);

  const filteredPlatforms = useMemo(
    () => allPlatforms.filter((p) => matchesFilter(p, initialFilters)),
    [allPlatforms, initialFilters]
  );

  const totalPages = Math.max(1, Math.ceil(filteredPlatforms.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginatedPlatforms = useMemo(
    () => filteredPlatforms.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [filteredPlatforms, safePage]
  );

  useEffect(() => {
    setPage(1);
  }, [initialFilters]);

  function handleRefresh() {
    clearPlatformCache();
    loadPlatforms(initialFilters, true);
  }

  if (loading) {
    return (
      <section className="px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-tactical-accent" />
            <span className="ml-3 text-tactical-text-secondary">{t("loading")}</span>
          </div>
        </div>
      </section>
    );
  }

  if (filteredPlatforms.length === 0) {
    return (
      <section className="px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="py-20 text-center">
            <h3 className="mb-2 font-tactical-display text-xl text-tactical-text">
              {t("empty.title")}
            </h3>
            <p className="text-tactical-text-secondary">
              {t("empty.description")}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Results count + Refresh */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-tactical-text-secondary">
            {filteredPlatforms.length} {filteredPlatforms.length === 1 ? "aircraft" : "aircraft"} found
          </p>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1 rounded border border-tactical-border bg-tactical-card px-3 py-1.5 text-xs text-tactical-text-secondary transition-colors hover:border-tactical-accent hover:text-tactical-text"
          >
            <RefreshCw className="h-3 w-3" />
            Refresh
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {paginatedPlatforms.map((platform) => (
            <Link
              key={platform.id}
              href={`/${lang}/platform/${platform.id}`}
              className="group block rounded border border-tactical-border bg-tactical-card p-6 transition-all tactical-glow hover:border-tactical-accent/50"
            >
              {/* Image */}
              {platform.images.length > 0 ? (
                <div className="mb-4 overflow-hidden rounded border border-tactical-border">
                  <img
                    src={platform.images[0].url}
                    alt={platform.images[0].alt ?? getTranslation(platform.translations, lang)}
                    className="h-40 w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              ) : platform.imageUrl ? (
                <div className="mb-4 overflow-hidden rounded border border-tactical-border">
                  <img
                    src={platform.imageUrl}
                    alt={getTranslation(platform.translations, lang)}
                    className="h-40 w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="mb-4 flex h-40 items-center justify-center rounded border border-tactical-border bg-tactical-bg-secondary/50">
                  <span className="font-tactical-display text-sm text-tactical-text-secondary">
                    {tc("noImage")}
                  </span>
                </div>
              )}

              {/* Status Badge */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${getStatusDot(platform.operationalStatus)}`} />
                  <span className="text-xs text-tactical-text-secondary">
                    {platform.operationalStatus ? ts(platform.operationalStatus) : tc("unknown")}
                  </span>
                </div>
                <span className="text-xs text-tactical-text-secondary">
                  {getTranslation(platform.category.translations, lang, "Category")}
                </span>
              </div>

              {/* Name */}
              <h3 className="mb-2 font-tactical-display text-xl font-bold text-tactical-text group-hover:text-tactical-accent">
                {getTranslation(platform.translations, lang)}
              </h3>

              {/* Description */}
              <p className="mb-4 line-clamp-2 text-sm text-tactical-text-secondary">
                {getTranslation(
                  platform.translations.map((tr) => ({
                    locale: tr.locale,
                    name: tr.description ?? "",
                  })),
                  lang,
                  ""
                )}
              </p>

              {/* Details */}
              <div className="space-y-2 border-t border-tactical-border pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-tactical-text-secondary">
                    {t("details.unitCost")}
                  </span>
                  <span className="text-tactical-accent">
                    {formatCurrency(
                      platform.unitCostUsd ? Number(platform.unitCostUsd) : null
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-tactical-text-secondary">
                    {t("details.manufacturer")}
                  </span>
                  <span className="text-tactical-text">
                    {getTranslation(platform.manufacturer.translations, lang, "—")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-tactical-text-secondary">
                    {t("details.country")}
                  </span>
                  <span className="text-tactical-text">
                    {getTranslation(platform.country.translations, lang, "—")}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="flex items-center gap-1 rounded border border-tactical-border bg-tactical-card px-3 py-2 text-sm text-tactical-text transition-colors hover:border-tactical-accent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </button>
            <span className="text-sm text-tactical-text-secondary">
              Page {safePage} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="flex items-center gap-1 rounded border border-tactical-border bg-tactical-card px-3 py-2 text-sm text-tactical-text transition-colors hover:border-tactical-accent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
