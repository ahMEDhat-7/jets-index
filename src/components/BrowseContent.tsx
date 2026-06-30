"use client";

import { useState, useCallback } from "react";
import { PlatformFilters } from "@/components/PlatformFilters";
import { PlatformGrid } from "@/components/PlatformGrid";
import type { PlatformFilters as PlatformFiltersType } from "@/lib/types";

export function BrowseContent({ lang }: { lang: string }) {
  const [filters, setFilters] = useState<PlatformFiltersType>({ locale: lang });

  const handleFiltersChange = useCallback((newFilters: PlatformFiltersType) => {
    setFilters(newFilters);
  }, []);

  return (
    <>
      <PlatformFilters lang={lang} onFiltersChange={handleFiltersChange} />
      <PlatformGrid lang={lang} initialFilters={filters} />
    </>
  );
}
