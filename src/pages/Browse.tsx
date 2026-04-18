import { useState, useEffect } from "react";
import { useDesignStore } from "../store/useDesignStore";
import type { Platform } from "../types";
import {
  Plane,
  MapPin,
  Factory,
  X,
  Search,
  Loader2,
  ChevronDown,
} from "lucide-react";

function formatCost(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  } else if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`;
  }
  return `$${value.toLocaleString()}`;
}

export default function BrowsePage() {
  const {
    platforms,
    categories,
    countries,
    manufacturers,
    isLoading,
    setIsLoading,
    fetchPlatformsIfNeeded,
    fetchCategoriesIfNeeded,
    fetchCountriesIfNeeded,
    fetchManufacturersIfNeeded,
  } = useDesignStore();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null,
  );
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function loadData() {
      if (platforms.length && categories.length && countries.length && manufacturers.length) return;
      setIsLoading(true);
      try {
        await Promise.all([
          fetchPlatformsIfNeeded(),
          fetchCategoriesIfNeeded(),
          fetchCountriesIfNeeded(),
          fetchManufacturersIfNeeded(),
        ]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    loadData();
    return () => { cancelled = true; };
  }, [platforms.length, categories.length, countries.length, manufacturers.length, setIsLoading, fetchPlatformsIfNeeded, fetchCategoriesIfNeeded, fetchCountriesIfNeeded, fetchManufacturersIfNeeded]);

  const filteredPlatforms = platforms.filter((p) => {
    const matchesSearch =
      !search || p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      !selectedCategory || p.category?.categoryName === selectedCategory;
    const matchesCountry =
      !selectedCountry || p.country?.name === selectedCountry;
    const matchesManufacturer =
      !selectedManufacturer || p.manufacturer?.name === selectedManufacturer;
    return (
      matchesSearch && matchesCategory && matchesCountry && matchesManufacturer
    );
  });

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedCountry("");
    setSelectedManufacturer("");
  };

  if (isLoading && platforms.length === 0) {
    return (
      <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[hsl(var(--muted-foreground))]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      {/* Header */}
      <div className="bg-[hsl(var(--card))] border-b border-[hsl(var(--border))] py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold text-[hsl(var(--card-foreground))]">
            Browse Platforms
          </h1>
          <p className="text-[hsl(var(--muted-foreground))] text-sm">
            {filteredPlatforms.length} platforms
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[hsl(var(--card))]/80 backdrop-blur-xl border-b border-[hsl(var(--border))] px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 items-center">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]" />
            <input
              type="text"
              placeholder="Search platforms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))] focus:outline-none focus:border-[hsl(var(--ring))] focus:ring-2 focus:ring-[hsl(var(--ring))]/20"
            />
          </div>

          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 text-sm rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] cursor-pointer hover:bg-[hsl(var(--muted))] transition-colors"
            >
              <option value="">Category ({categories.length})</option>
              {categories.map((c) => (
                <option key={c.id} value={c.categoryName}>
                  {c.categoryName}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))] pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedManufacturer}
              onChange={(e) => setSelectedManufacturer(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 text-sm rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] cursor-pointer hover:bg-[hsl(var(--muted))] transition-colors"
            >
              <option value="">Manufacturer ({manufacturers.length})</option>
              {manufacturers.map((m) => (
                <option key={m.id} value={m.name}>
                  {m.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))] pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 text-sm rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] cursor-pointer hover:bg-[hsl(var(--muted))] transition-colors"
            >
              <option value="">Country ({countries.length})</option>
              {countries.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))] pointer-events-none" />
          </div>

          {(search ||
            selectedCategory ||
            selectedManufacturer ||
            selectedCountry) && (
            <button
              onClick={clearFilters}
              className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] px-3 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Platform Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {filteredPlatforms.length === 0 ? (
          <div className="text-center py-16">
            <Plane className="w-12 h-12 text-[hsl(var(--muted-foreground))] mx-auto mb-3 opacity-50" />
            <p className="text-[hsl(var(--muted-foreground))]">
              No platforms found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {filteredPlatforms.map((platform) => (
              <div
                key={platform.id}
                onClick={() => setSelectedPlatform(platform)}
                className="group bg-[hsl(var(--card))] rounded-xl overflow-hidden cursor-pointer border border-[hsl(var(--border))] shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="relative aspect-video bg-[hsl(var(--muted))]">
                  {platform.imageUrl ? (
                    <img
                      src={platform.imageUrl}
                      alt={platform.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Plane className="w-12 h-12 text-[hsl(var(--muted-foreground))] opacity-40" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                <div className="p-5">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {platform.category && (
                      <span className="text-xs px-2.5 py-1 bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] rounded font-medium">
                        {platform.category.categoryName}
                      </span>
                    )}
                    {platform.operationalStatus && (
                      <span className="text-xs px-2.5 py-1 bg-[hsl(var(--success))]/15 text-[hsl(var(--success))] rounded font-medium">
                        {platform.operationalStatus}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-[hsl(var(--card-foreground))] text-lg leading-tight group-hover:opacity-80 transition-opacity">
                    {platform.name}
                  </h3>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-[hsl(var(--muted-foreground))]">
                    {platform.country && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {platform.country.name}
                      </span>
                    )}
                    {platform.manufacturer && (
                      <span className="flex items-center gap-1">
                        <Factory className="w-3 h-3" />
                        {platform.manufacturer.name}
                      </span>
                    )}
                  </div>
                  {platform.unitCostUsd && (
                    <div className="mt-3 text-base font-medium text-[hsl(var(--primary))">
                      {formatCost(platform.unitCostUsd)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedPlatform && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPlatform(null)}
        >
          <div
            className="bg-[hsl(var(--card))] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto shadow-xl border border-[hsl(var(--border))]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-96 bg-[hsl(var(--muted))]">
              {selectedPlatform.imageUrl ? (
                <img
                  src={selectedPlatform.imageUrl}
                  alt={selectedPlatform.name}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() =>
                    selectedPlatform.imageUrl &&
                    setFullscreenImage(selectedPlatform.imageUrl)
                  }
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Plane className="w-16 h-16 text-[hsl(var(--muted-foreground))] opacity-40" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
              <button
                onClick={() =>
                  selectedPlatform.imageUrl &&
                  setFullscreenImage(selectedPlatform.imageUrl)
                }
                className="absolute bottom-3 right-3 p-2 bg-gray-600 backdrop-blur-sm rounded-full hover:bg-white hover:cursor-pointer transition-colors"
                title="View fullscreen"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-white hover:text-gray-600"
                >
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v-3a2 2 0 0 0 2-2h3" />
                </svg>
              </button>
              <button
                onClick={() => setSelectedPlatform(null)}
                className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-5">
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedPlatform.category && (
                  <span className="text-xs px-3 py-1 bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] rounded-full font-medium">
                    {selectedPlatform.category.categoryName}
                  </span>
                )}
                {selectedPlatform.operationalStatus && (
                  <span className="text-xs px-3 py-1 bg-[hsl(var(--success))]/15 text-[hsl(var(--success))] rounded-full font-medium">
                    {selectedPlatform.operationalStatus}
                  </span>
                )}
              </div>

              <h2 className="text-xl font-semibold text-[hsl(var(--card-foreground))] mb-2">
                {selectedPlatform.name}
              </h2>
              <p className="text-[hsl(var(--muted-foreground))] text-sm mb-4">
                {selectedPlatform.description}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[hsl(var(--muted))] rounded-lg border border-[hsl(var(--border))]">
                  <div className="flex items-center gap-1.5 text-[hsl(var(--muted-foreground))] mb-1">
                    <Factory className="w-4 h-4" />
                    <span className="text-xs">Manufacturer</span>
                  </div>
                  <p className="font-medium text-[hsl(var(--foreground))]">
                    {selectedPlatform.manufacturer?.name || "-"}
                  </p>
                </div>
                <div className="p-3 bg-[hsl(var(--muted))] rounded-lg border border-[hsl(var(--border))]">
                  <div className="flex items-center gap-1.5 text-[hsl(var(--muted-foreground))] mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs">Country</span>
                  </div>
                  <p className="font-medium text-[hsl(var(--foreground))]">
                    {selectedPlatform.country?.name || "-"}
                  </p>
                </div>
                <div className="p-3 bg-[hsl(var(--muted))] rounded-lg border border-[hsl(var(--border))]">
                  <div className="flex items-center gap-1.5 text-[hsl(var(--muted-foreground))] mb-1">
                    <span className="text-xs">Category</span>
                  </div>
                  <p className="font-medium text-[hsl(var(--foreground))]">
                    {selectedPlatform.category?.categoryName || "-"}
                  </p>
                </div>
                <div className="p-3 bg-[hsl(var(--muted))] rounded-lg border border-[hsl(var(--border))]">
                  <div className="flex items-center gap-1.5 text-[hsl(var(--muted-foreground))] mb-1">
                    <span className="text-xs">Unit Cost</span>
                  </div>
                  <p className="font-medium text-[hsl(var(--primary))]">
                    {selectedPlatform.unitCostUsd
                      ? formatCost(selectedPlatform.unitCostUsd)
                      : "-"}
                  </p>
                </div>
              </div>

              {selectedPlatform.technicalSpecs &&
                Object.keys(selectedPlatform.technicalSpecs).length > 0 && (
                  <div className="mt-4 pt-4 border-t border-[hsl(var(--border))]">
                    <h3 className="text-sm font-medium text-[hsl(var(--card-foreground))] mb-3">
                      Technical Specifications
                    </h3>
                    <div className="space-y-2">
                      {Object.entries(selectedPlatform.technicalSpecs).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between items-center py-2 border-b border-[hsl(var(--border))] last:border-0"
                          >
                            <span className="text-sm text-[hsl(var(--muted-foreground))]">
                              {key}
                            </span>
                            <span className="text-sm font-medium text-[hsl(var(--foreground))]">
                              {String(value)}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-[60] bg-white/30 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setFullscreenImage(null)}
        >
          <img
            src={fullscreenImage}
            alt="Full view"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-3xl border border-amber-200"
          />
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
      )}
    </div>
  );
}
