import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { formatCurrency, getTranslation, isValidUUID } from "@/lib/utils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ImageGallery } from "@/components/ImageGallery";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { lang, id } = await params;
  if (!isValidUUID(id)) return {};
  const platform = await prisma.platform.findUnique({
    where: { id },
    include: {
      translations: { select: { locale: true, name: true, description: true } },
    },
  });
  if (!platform) return {};
  const translation = platform.translations.find((tr) => tr.locale === lang);
  const fallback = platform.translations.find((tr) => tr.locale === "en");
  const name = translation?.name ?? fallback?.name ?? "Aircraft";
  const description = translation?.description ?? fallback?.description ?? "";
  return {
    title: name,
    description: description.slice(0, 160),
  };
}

export default async function PlatformDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<React.ReactNode> {
  const { lang, id } = await params;
  setRequestLocale(lang);

  if (!isValidUUID(id)) {
    notFound();
  }

  const t = await getTranslations({ locale: lang, namespace: "Browse" });
  const ts = await getTranslations({ locale: lang, namespace: "Statuses" });

  const platform = await prisma.platform.findUnique({
    where: { id },
    include: {
      translations: { select: { locale: true, name: true, description: true } },
      images: {
        select: { id: true, url: true, alt: true, sortOrder: true },
        orderBy: { sortOrder: "asc" },
      },
      category: {
        select: {
          id: true,
          translations: { select: { locale: true, name: true } },
        },
      },
      manufacturer: {
        select: {
          id: true,
          translations: { select: { locale: true, name: true, specialization: true } },
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

  if (!platform) {
    notFound();
  }

  const name = getTranslation(platform.translations, lang);
  const description = getTranslation(
    platform.translations.map((tr) => ({
      locale: tr.locale,
      name: tr.description ?? "",
    })),
    lang,
    ""
  );

  let specs: Record<string, string> | null = null;
  if (platform.technicalSpecs) {
    if (typeof platform.technicalSpecs === "string") {
      try {
        specs = JSON.parse(platform.technicalSpecs) as Record<string, string>;
      } catch {
        specs = null;
      }
    } else if (typeof platform.technicalSpecs === "object") {
      specs = platform.technicalSpecs as Record<string, string>;
    }
  }

  return (
    <div className="min-h-screen">
      <Header lang={lang} activePage="browse" />

      {/* Hero with Image */}
      <section className="border-b border-tactical-border bg-tactical-bg-secondary/30 px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {platform.images.length > 0 ? (
            <div className="mb-8">
              <ImageGallery images={platform.images} name={name} />
            </div>
          ) : platform.imageUrl ? (
            <div className="mb-8 overflow-hidden rounded border border-tactical-border">
              <img
                src={platform.imageUrl}
                alt={name}
                className="h-64 w-full object-cover md:h-96"
              />
            </div>
          ) : (
            <div className="mb-8 flex h-64 items-center justify-center rounded border border-tactical-border bg-tactical-bg-secondary/50 md:h-96">
              <span className="font-tactical-display text-lg text-tactical-text-secondary">
                {t("Common.noImageAvailable")}
              </span>
            </div>
          )}

          {/* Status Badge */}
          <div className="mb-4 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  platform.operationalStatus === "Active"
                    ? "bg-tactical-success"
                    : platform.operationalStatus === "Development"
                      ? "bg-tactical-accent"
                      : platform.operationalStatus === "Retired"
                        ? "bg-tactical-alert"
                        : "bg-tactical-text-secondary"
                }`}
              />
              <span className="text-sm text-tactical-text-secondary">
                {platform.operationalStatus ? ts(platform.operationalStatus) : t("Common.unknown")}
              </span>
            </div>
            <span className="text-tactical-border">|</span>
            <span className="text-sm text-tactical-text-secondary">
              {getTranslation(platform.category.translations, lang, "Category")}
            </span>
          </div>

          <h1 className="mb-4 font-tactical-display text-4xl font-bold text-tactical-accent md:text-5xl">
            {name}
          </h1>

          {description && (
            <p className="max-w-3xl text-lg leading-relaxed text-tactical-text-secondary">
              {description}
            </p>
          )}
        </div>
      </section>

      {/* Details Grid */}
      <section className="px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Specifications */}
            <div className="rounded border border-tactical-border bg-tactical-card p-6">
              <h2 className="mb-4 font-tactical-display text-xl font-bold text-tactical-text">
                {t("platform.unitCostDetails")}
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-tactical-border pb-2">
                  <span className="text-tactical-text-secondary">
                    {t("details.unitCost")}
                  </span>
                  <span className="font-bold text-tactical-accent">
                    {formatCurrency(
                      platform.unitCostUsd
                        ? Number(platform.unitCostUsd)
                        : null
                    )}
                  </span>
                </div>
                <div className="flex justify-between border-b border-tactical-border pb-2">
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
                <div className="flex justify-between border-b border-tactical-border pb-2">
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
                <div className="flex justify-between">
                  <span className="text-tactical-text-secondary">{t("platform.status")}</span>
                  <span className="text-tactical-text">
                    {platform.operationalStatus ? ts(platform.operationalStatus) : t("Common.unknown")}
                  </span>
                </div>
              </div>
            </div>

            {/* Technical Specs */}
            {specs && Object.keys(specs).length > 0 && (
                <div className="rounded border border-tactical-border bg-tactical-card p-6">
                  <h2 className="mb-4 font-tactical-display text-xl font-bold text-tactical-text">
                    {t("platform.technicalSpecs")}
                  </h2>
                  <div className="space-y-3">
                    {Object.entries(specs).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between border-b border-tactical-border pb-2 last:border-b-0"
                      >
                        <span className="text-tactical-text-secondary">
                          {key}
                        </span>
                        <span className="text-tactical-text">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}
