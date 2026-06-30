"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import type { PlatformFilters } from "@/lib/types";

interface FilterOption {
  id: string;
  name: string;
}

interface PlatformFiltersProps {
  lang: string;
  onFiltersChange: (filters: PlatformFilters) => void;
}

export function PlatformFilters({ lang, onFiltersChange }: PlatformFiltersProps) {
  const t = useTranslations("Browse");
  const ts = useTranslations("Statuses");
  const [categories, setCategories] = useState<FilterOption[]>([]);
  const [countries, setCountries] = useState<FilterOption[]>([]);
  const [manufacturers, setManufacturers] = useState<FilterOption[]>([]);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [countryId, setCountryId] = useState("");
  const [manufacturerId, setManufacturerId] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function fetchFilters() {
      try {
        const [catRes, countryRes, manuRes] = await Promise.all([
          fetch(`/api/v1/categories?locale=${lang}&limit=50`),
          fetch(`/api/v1/countries?locale=${lang}&limit=50`),
          fetch(`/api/v1/manufacturers?locale=${lang}&limit=50`),
        ]);

        const [catData, countryData, manuData] = await Promise.all([
          catRes.json(),
          countryRes.json(),
          manuRes.json(),
        ]);

        setCategories(
          (catData.data ?? []).map((c: { id: string; translations: { locale: string; name: string }[] }) => ({
            id: c.id,
            name: c.translations.find((tr) => tr.locale === lang)?.name ?? c.translations.find((tr) => tr.locale === "en")?.name ?? "",
          }))
        );

        setCountries(
          (countryData.data ?? []).map((c: { id: string; translations: { locale: string; name: string }[] }) => ({
            id: c.id,
            name: c.translations.find((tr) => tr.locale === lang)?.name ?? c.translations.find((tr) => tr.locale === "en")?.name ?? "",
          }))
        );

        setManufacturers(
          (manuData.data ?? []).map((m: { id: string; translations: { locale: string; name: string }[] }) => ({
            id: m.id,
            name: m.translations.find((tr) => tr.locale === lang)?.name ?? m.translations.find((tr) => tr.locale === "en")?.name ?? "",
          }))
        );
      } catch {
        // Filters fail silently — dropdowns remain empty
      }
    }

    fetchFilters();
  }, [lang]);

  const emitFilters = useCallback(
    (overrides: Partial<PlatformFilters> = {}) => {
      const filters: PlatformFilters = {
        locale: lang,
        ...(categoryId && { categoryId }),
        ...(countryId && { countryId }),
        ...(manufacturerId && { manufacturerId }),
        ...(status && { status }),
        ...(search && { search }),
        ...overrides,
      };

      Object.keys(filters).forEach((key) => {
        if (filters[key as keyof PlatformFilters] === "") {
          delete filters[key as keyof PlatformFilters];
        }
      });

      onFiltersChange(filters);
    },
    [lang, categoryId, countryId, manufacturerId, status, search, onFiltersChange]
  );

  useEffect(() => {
    emitFilters();
  }, [categoryId, countryId, manufacturerId, status, emitFilters]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      emitFilters();
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, emitFilters]);

  const hasActiveFilters = categoryId || countryId || manufacturerId || status || search;

  function clearFilters() {
    setSearch("");
    setCategoryId("");
    setCountryId("");
    setManufacturerId("");
    setStatus("");
  }

  return (
    <section className="border-b border-tactical-border bg-tactical-bg-secondary/50 px-4 py-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative min-w-[200px] flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tactical-text-secondary" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("filters.search")}
              className="w-full rounded border border-tactical-border bg-tactical-card py-2 pl-9 pr-3 text-tactical-text placeholder:text-tactical-text-secondary focus:border-tactical-accent focus:outline-none"
            />
          </div>

          {/* Category */}
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="rounded border border-tactical-border bg-tactical-card px-3 py-2 text-tactical-text focus:border-tactical-accent focus:outline-none"
          >
            <option value="">{t("filters.allCategories")}</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Country */}
          <select
            value={countryId}
            onChange={(e) => setCountryId(e.target.value)}
            className="rounded border border-tactical-border bg-tactical-card px-3 py-2 text-tactical-text focus:border-tactical-accent focus:outline-none"
          >
            <option value="">{t("filters.allCountries")}</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>

          {/* Manufacturer */}
          <select
            value={manufacturerId}
            onChange={(e) => setManufacturerId(e.target.value)}
            className="rounded border border-tactical-border bg-tactical-card px-3 py-2 text-tactical-text focus:border-tactical-accent focus:outline-none"
          >
            <option value="">{t("filters.allManufacturers")}</option>
            {manufacturers.map((manu) => (
              <option key={manu.id} value={manu.id}>
                {manu.name}
              </option>
            ))}
          </select>

          {/* Status */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded border border-tactical-border bg-tactical-card px-3 py-2 text-tactical-text focus:border-tactical-accent focus:outline-none"
          >
            <option value="">{t("filters.allStatuses")}</option>
            <option value="Active">{ts("Active")}</option>
            <option value="Retired">{ts("Retired")}</option>
            <option value="Development">{ts("Development")}</option>
          </select>

          {/* Clear */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 rounded border border-tactical-border bg-tactical-card px-3 py-2 text-sm text-tactical-text-secondary transition-colors hover:border-tactical-accent hover:text-tactical-text"
            >
              <X className="h-3 w-3" />
              {t("filters.clear")}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
