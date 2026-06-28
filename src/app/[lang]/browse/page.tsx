import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { formatCurrency, getTranslation } from "@/lib/utils";

export default async function BrowsePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<React.ReactNode> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "Browse" });

  const platforms = await prisma.platform.findMany({
    take: 12,
    orderBy: { createdAt: "desc" },
    include: {
      translations: { select: { locale: true, name: true, description: true } },
      category: {
        select: {
          id: true,
          translations: { select: { locale: true, name: true } },
        },
      },
      manufacturer: {
        select: {
          id: true,
          translations: { select: { locale: true, name: true } },
        },
      },
      country: {
        select: {
          id: true,
          translations: { select: { locale: true, name: true } },
        },
      },
    },
  });

  const categories = await prisma.category.findMany({
    include: {
      translations: { select: { locale: true, name: true } },
    },
  });

  const countries = await prisma.country.findMany({
    include: {
      translations: { select: { locale: true, name: true } },
    },
  });

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-tactical-border bg-tactical-bg/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link
            href={`/${lang}`}
            className="font-tactical-display text-xl font-bold text-tactical-accent"
          >
            JETDEX
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href={`/${lang}/browse`}
              className="text-tactical-accent transition-colors hover:text-tactical-accent/80"
            >
              {t("filters.title")}
            </Link>
            <Link
              href={`/${lang}/blog`}
              className="text-tactical-text-secondary transition-colors hover:text-tactical-text"
            >
              Blog
            </Link>
            <Link
              href="/admin"
              className="rounded bg-tactical-accent/20 px-3 py-1 text-tactical-accent transition-colors hover:bg-tactical-accent/30"
            >
              Admin
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="border-b border-tactical-border bg-tactical-bg-secondary/30 px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-4 font-tactical-display text-4xl font-bold text-tactical-text">
            {t("filters.title")}
          </h1>
          <p className="text-tactical-text-secondary">
            Browse military aviation platforms from around the world
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-tactical-border bg-tactical-bg-secondary/50 px-4 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4">
          <select className="rounded border border-tactical-border bg-tactical-card px-3 py-2 text-tactical-text focus:border-tactical-accent focus:outline-none">
            <option>{t("filters.allCategories")}</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {getTranslation(cat.translations, lang)}
              </option>
            ))}
          </select>
          <select className="rounded border border-tactical-border bg-tactical-card px-3 py-2 text-tactical-text focus:border-tactical-accent focus:outline-none">
            <option>{t("filters.allCountries")}</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {getTranslation(country.translations, lang)}
              </option>
            ))}
          </select>
          <select className="rounded border border-tactical-border bg-tactical-card px-3 py-2 text-tactical-text focus:border-tactical-accent focus:outline-none">
            <option>{t("filters.allStatuses")}</option>
            <option value="Active">Active</option>
            <option value="Retired">Retired</option>
            <option value="Development">In Development</option>
          </select>
        </div>
      </section>

      {/* Platform Grid */}
      <section className="px-4 py-8">
        <div className="mx-auto max-w-7xl">
          {platforms.length === 0 ? (
            <div className="py-20 text-center">
              <h3 className="mb-2 font-tactical-display text-xl text-tactical-text">
                {t("empty.title")}
              </h3>
              <p className="text-tactical-text-secondary">
                {t("empty.description")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  className="group rounded border border-tactical-border bg-tactical-card p-6 transition-all tactical-glow hover:border-tactical-accent/50"
                >
                  {/* Status Badge */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          platform.operationalStatus === "Active"
                            ? "bg-tactical-success"
                            : platform.operationalStatus === "Development"
                              ? "bg-tactical-accent"
                              : platform.operationalStatus === "Retired"
                                ? "bg-tactical-alert"
                                : "bg-tactical-text-secondary"
                        }`}
                      />
                      <span className="text-xs text-tactical-text-secondary">
                        {platform.operationalStatus ?? "Unknown"}
                      </span>
                    </div>
                    <span className="text-xs text-tactical-text-secondary">
                      {getTranslation(
                        platform.category.translations,
                        lang,
                        "Category"
                      )}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="mb-2 font-tactical-display text-xl font-bold text-tactical-text group-hover:text-tactical-accent">
                    {getTranslation(platform.translations, lang)}
                  </h3>

                  {/* Description */}
                  <p className="mb-4 line-clamp-2 text-sm text-tactical-text-secondary">
                    {getTranslation(
                      platform.translations.map((t) => ({
                        locale: t.locale,
                        name: t.description ?? "",
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
                          platform.unitCostUsd
                            ? Number(platform.unitCostUsd)
                            : null
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-tactical-text-secondary">
                        {t("details.manufacturer")}
                      </span>
                      <span className="text-tactical-text">
                        {getTranslation(
                          platform.manufacturer.translations,
                          lang,
                          "—"
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-tactical-text-secondary">
                        {t("details.country")}
                      </span>
                      <span className="text-tactical-text">
                        {getTranslation(
                          platform.country.translations,
                          lang,
                          "—"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-tactical-border bg-tactical-bg-secondary/30 px-4 py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="font-tactical-display text-sm text-tactical-text-secondary">
            &copy; 2026 Jetdex
          </div>
        </div>
      </footer>
    </div>
  );
}
