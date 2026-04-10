"use client";

import { useEffect, useState, useRef } from "react";
import { Platform, Stats, Category, Country } from "@/stores/useDesignStore";
import {
  fetchPlatforms,
  fetchStats,
  fetchCategories,
  fetchCountries,
} from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plane,
  Search,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  DollarSign,
} from "lucide-react";
import Image from "next/image";

export default function AircraftHangar() {
  const t = useTranslations("Browse");
  const tNav = useTranslations("Navigation");
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const [platformsData, statsData, categoriesData, countriesData] =
          await Promise.all([
            fetchPlatforms(),
            fetchStats(),
            fetchCategories(),
            fetchCountries(),
          ]);
        setPlatforms(platformsData);
        setStats(statsData);
        setCategories(categoriesData);
        setCountries(countriesData);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const goToSlide = (direction: "left" | "right") => {
    if (isTransitioning || platforms.length === 0) return;
    
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    
    const nextIndex = direction === "left" 
      ? (featuredIndex === 0 ? platforms.length - 1 : featuredIndex - 1)
      : (featuredIndex + 1) % platforms.length;
    
    setSlideDirection(direction);
    setIsTransitioning(true);
    
    transitionTimeoutRef.current = setTimeout(() => {
      setFeaturedIndex(nextIndex);
      setIsTransitioning(false);
    }, 800);
  };

  const getCurrentSlideClass = () => {
    if (!isTransitioning) return "translate-x-0 opacity-100";
    return slideDirection === "left" 
      ? "translate-x-full opacity-0" 
      : "-translate-x-full opacity-0";
  };

  const getNextSlideClass = () => {
    if (!isTransitioning) return "translate-x-full opacity-0";
    return slideDirection === "left"
      ? "-translate-x-0 opacity-100"
      : "translate-x-0 opacity-100";
  };

  const currentPlatform = platforms[featuredIndex];
  const nextIndex = isTransitioning 
    ? (slideDirection === "left" 
        ? (featuredIndex === 0 ? platforms.length - 1 : featuredIndex - 1)
        : (featuredIndex + 1) % platforms.length)
    : (featuredIndex + 1) % platforms.length;
  const nextPlatform = platforms[nextIndex];

  const filteredPlatforms = platforms.filter((p) => {
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || p.category?.id === selectedCategory;
    const matchesCountry =
      !selectedCountry || p.country?.id === selectedCountry;
    return matchesSearch && matchesCategory && matchesCountry;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#f59e0b] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400 font-[family-name:var(--font-display-hangar)]">
            {t("loading.text")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-slate-900 text-[#1f2937] dark:text-slate-100 font-[family-name:var(--font-body-hangar)] transition-colors">
      {currentPlatform && nextPlatform && (
        <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden">
          <div
            className={`absolute inset-0 transition-all duration-800 ease-in-out ${getCurrentSlideClass()}`}
          >
            {currentPlatform.imageUrl ? (
              <Image
                src={currentPlatform.imageUrl}
                alt={currentPlatform.name}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-slate-800 dark:bg-slate-950 flex items-center justify-center">
                <Plane className="w-12 h-12 sm:w-24 sm:h-24 text-slate-600" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 start-0 end-0 p-4 sm:p-8">
              <div className="container mx-auto max-w-7xl">
                <span className="inline-block px-2 sm:px-3 py-1 bg-[#f59e0b] text-white text-xs sm:text-sm font-semibold rounded mb-2 sm:mb-3">
                  {t("hero.featured")}
                </span>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-display-hangar)] mb-1 sm:mb-2">
                  {currentPlatform.name}
                </h1>
                <p className="text-slate-200 text-sm sm:text-lg line-clamp-2">
                  {currentPlatform.description}
                </p>
                <div className="flex items-center gap-3 sm:gap-4 mt-2 sm:mt-4 text-xs sm:text-sm">
                  <span className="flex items-center gap-1 text-slate-300">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                    {currentPlatform.country?.name}
                  </span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
                    {formatCurrency(currentPlatform.unitCostUsd)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`absolute inset-0 transition-all duration-800 ease-in-out ${getNextSlideClass()}`}
          >
            {nextPlatform.imageUrl ? (
              <Image
                src={nextPlatform.imageUrl}
                alt={nextPlatform.name}
                fill
                sizes="100vw"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-slate-800 dark:bg-slate-950 flex items-center justify-center">
                <Plane className="w-12 h-12 sm:w-24 sm:h-24 text-slate-600" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 start-0 end-0 p-4 sm:p-8">
              <div className="container mx-auto max-w-7xl">
                <span className="inline-block px-2 sm:px-3 py-1 bg-[#f59e0b] text-white text-xs sm:text-sm font-semibold rounded mb-2 sm:mb-3">
                  {t("hero.featured")}
                </span>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-display-hangar)] mb-1 sm:mb-2">
                  {nextPlatform.name}
                </h1>
                <p className="text-slate-200 text-sm sm:text-lg line-clamp-2">
                  {nextPlatform.description}
                </p>
                <div className="flex items-center gap-3 sm:gap-4 mt-2 sm:mt-4 text-xs sm:text-sm">
                  <span className="flex items-center gap-1 text-slate-300">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                    {nextPlatform.country?.name}
                  </span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
                    {formatCurrency(nextPlatform.unitCostUsd)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => goToSlide("left")}
            className="absolute start-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={() => goToSlide("right")}
            className="absolute end-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div className="absolute bottom-4 start-1/2 -translate-x-1/2 z-10 flex gap-2">
            {platforms.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (idx === featuredIndex || isTransitioning) return;
                  setSlideDirection(idx > featuredIndex ? "right" : "left");
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setFeaturedIndex(idx);
                    setIsTransitioning(false);
                  }, 800);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === featuredIndex
                    ? "bg-white w-6"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-display-hangar)]">
            {t("filters.title")}
          </h2>
          <div className="flex items-center gap-4">
            <div className="relative md:hidden flex-1 sm:w-48">
              <Input
                placeholder={t("filters.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setFilterOpen(!filterOpen)}
              className="border-2 border-slate-300 md:hidden"
            >
              <Filter className="w-4 h-4 me-2" />
              {t("filters.filters")}
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm border border-slate-200 dark:border-slate-700">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">
                  {t("filters.search")}
                </label>
                <div className="relative">
                  <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder={t("filters.searchPlaceholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="ps-10"
                  />
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm border border-slate-200 dark:border-slate-700">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 block">
                  {t("filters.category")}
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-start px-3 py-2 rounded text-sm transition-colors ${
                      !selectedCategory
                        ? "bg-[#f59e0b]/10 text-[#f59e0b] font-medium"
                        : "hover:bg-slate-50 dark:hover:bg-slate-700"
                    }`}
                  >
                    {t("filters.allCategories")}
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-start px-3 py-2 rounded text-sm transition-colors ${
                        selectedCategory === cat.id
                          ? "bg-[#f59e0b]/10 text-[#f59e0b] font-medium"
                          : "hover:bg-slate-50 dark:hover:bg-slate-700"
                      }`}
                    >
                      {cat.categoryName}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm border border-slate-200 dark:border-slate-700">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 block">
                  {t("filters.country")}
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCountry(null)}
                    className={`w-full text-start px-3 py-2 rounded text-sm transition-colors ${
                      !selectedCountry
                        ? "bg-[#f59e0b]/10 text-[#f59e0b] font-medium"
                        : "hover:bg-slate-50 dark:hover:bg-slate-700"
                    }`}
                  >
                    {t("filters.allCountries")}
                  </button>
                  {countries.map((country) => (
                    <button
                      key={country.id}
                      onClick={() => setSelectedCountry(country.id)}
                      className={`w-full text-start px-3 py-2 rounded text-sm transition-colors ${
                        selectedCountry === country.id
                          ? "bg-[#f59e0b]/10 text-[#f59e0b] font-medium"
                          : "hover:bg-slate-50 dark:hover:bg-slate-700"
                      }`}
                    >
                      {country.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {filterOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
              <div className="absolute end-0 top-0 bottom-0 w-80 bg-white dark:bg-slate-800 p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold font-[family-name:var(--font-display-hangar)] dark:text-white">
                    {t("filters.filters")}
                  </h3>
                  <button
                    onClick={() => setFilterOpen(false)}
                    className="dark:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">
                      {t("filters.search")}
                    </label>
                    <Input
                      placeholder={t("filters.searchPlaceholder")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 block">
                      {t("filters.category")}
                    </label>
                    <div className="space-y-2">
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className={`w-full text-start px-3 py-2 rounded text-sm ${
                          !selectedCategory
                            ? "bg-[#f59e0b]/10 text-[#f59e0b]"
                            : "dark:text-slate-300"
                        }`}
                      >
                        {t("filters.allCategories")}
                      </button>
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`w-full text-start px-3 py-2 rounded text-sm ${
                            selectedCategory === cat.id
                              ? "bg-[#f59e0b]/10 text-[#f59e0b]"
                              : "dark:text-slate-300"
                          }`}
                        >
                          {cat.categoryName}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 block">
                      {t("filters.country")}
                    </label>
                    <div className="space-y-2">
                      <button
                        onClick={() => setSelectedCountry(null)}
                        className={`w-full text-start px-3 py-2 rounded text-sm ${
                          !selectedCountry
                            ? "bg-[#f59e0b]/10 text-[#f59e0b]"
                            : ""
                        }`}
                      >
                        {t("filters.allCountries")}
                      </button>
                      {countries.map((country) => (
                        <button
                          key={country.id}
                          onClick={() => setSelectedCountry(country.id)}
                          className={`w-full text-start px-3 py-2 rounded text-sm ${
                            selectedCountry === country.id
                              ? "bg-[#f59e0b]/10 text-[#f59e0b]"
                              : ""
                          }`}
                        >
                          {country.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredPlatforms.map((platform) => (
                <div
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform)}
                  className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer group animate-fade-in"
                >
                  <div className="relative h-48 overflow-hidden">
                    {platform.imageUrl ? (
                      <Image
                        src={platform.imageUrl}
                        alt={platform.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                        <Plane className="w-12 h-12 text-slate-400" />
                      </div>
                    )}
                    <div className="absolute top-3 start-3">
                      <span className="px-2 py-1 bg-white/90 dark:bg-slate-900/80 text-xs font-medium rounded">
                        {platform.category?.categoryName}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold font-[family-name:var(--font-display-hangar)] mb-2 dark:text-white">
                      {platform.name}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                      {platform.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                        <MapPin className="w-3 h-3" />
                        {platform.country?.name}
                      </span>
                      <span className="font-semibold text-[#f59e0b]">
                        {formatCurrency(platform.unitCostUsd)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPlatforms.length === 0 && (
              <div className="text-center py-12">
                <Plane className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 dark:text-slate-400">
                  {t("empty.title")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedPlatform && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPlatform(null)}
        >
          <div
            className="bg-white dark:bg-slate-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-48 sm:h-64">
              {selectedPlatform.imageUrl ? (
                <Image
                  src={selectedPlatform.imageUrl}
                  alt={selectedPlatform.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                  <Plane className="w-12 sm:w-16 h-12 sm:h-16 text-slate-400" />
                </div>
              )}
              <button
                onClick={() => setSelectedPlatform(null)}
                className="absolute top-3 sm:top-4 end-3 sm:end-4 p-2 bg-white/90 dark:bg-slate-800/90 rounded-full"
              >
                <X className="w-4 sm:w-5 h-4 sm:h-5 dark:text-white" />
              </button>
            </div>
            <div className="p-4 sm:p-6">
              <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-display-hangar)] mb-3 sm:mb-4 dark:text-white">
                {selectedPlatform.name}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4 sm:mb-6 text-sm sm:text-base">
                {selectedPlatform.description}
              </p>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-3 sm:p-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase mb-1">
                    {t("details.category")}
                  </p>
                  <p className="font-semibold text-sm dark:text-white">
                    {selectedPlatform.category?.categoryName}
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-3 sm:p-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase mb-1">
                    {t("details.status")}
                  </p>
                  <p className="font-semibold text-sm dark:text-white">
                    {selectedPlatform.operationalStatus || t("details.na")}
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-3 sm:p-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase mb-1">
                    {t("details.manufacturer")}
                  </p>
                  <p className="font-semibold text-sm dark:text-white">
                    {selectedPlatform.manufacturer?.name}
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-3 sm:p-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase mb-1">
                    {t("details.country")}
                  </p>
                  <p className="font-semibold text-sm dark:text-white">
                    {selectedPlatform.country?.name}
                  </p>
                </div>
              </div>

              <div className="border-t dark:border-slate-700 pt-4">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase mb-2">
                  {t("details.unitCost")}
                </p>
                <p className="text-2xl font-bold text-[#f59e0b]">
                  {formatCurrency(selectedPlatform.unitCostUsd)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
