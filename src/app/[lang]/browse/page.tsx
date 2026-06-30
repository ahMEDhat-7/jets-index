import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BrowseContent } from "@/components/BrowseContent";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "Browse" });
  return {
    title: "Browse Aircraft",
    description: t("hero.description"),
  };
}

export default async function BrowsePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<React.ReactNode> {
  const { lang } = await params;
  setRequestLocale(lang);
  const t = await getTranslations({ locale: lang, namespace: "Browse" });

  return (
    <div className="min-h-screen">
      <Header lang={lang} activePage="browse" />

      {/* Hero */}
      <section className="border-b border-tactical-border bg-tactical-bg-secondary/30 px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-4 font-tactical-display text-4xl font-bold text-tactical-text">
            {t("filters.title")}
          </h1>
          <p className="text-tactical-text-secondary">
            {t("hero.description")}
          </p>
        </div>
      </section>

      {/* Filters + Grid (Client Components) */}
      <BrowseContent lang={lang} />

      <Footer lang={lang} />
    </div>
  );
}
