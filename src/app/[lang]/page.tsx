import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const dynamic = "force-dynamic";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<React.ReactNode> {
  const { lang } = await params;
  setRequestLocale(lang);
  const t = await getTranslations({ locale: lang, namespace: "Home" });

  return (
    <div className="min-h-screen">
      <Header lang={lang} activePage="home" />

      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-tactical-border/30 opacity-20 radar-sweep" />
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-tactical-border/20 opacity-10" />
          <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-tactical-border/10 opacity-5" />
        </div>

        <div className="relative z-10 text-center">
          <div className="mb-4 text-sm tracking-widest text-tactical-text-secondary uppercase">
            {t("hero.subtitle")}
          </div>
          <h1 className="mb-6 font-tactical-display text-6xl font-bold text-tactical-accent md:text-8xl">
            {t("hero.title")}
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-tactical-text-secondary">
            {t("hero.description")}
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href={`/${lang}/browse`}
              className="rounded bg-tactical-accent px-6 py-3 font-tactical-display font-bold text-tactical-bg transition-all hover:bg-tactical-accent/90 hover:shadow-lg hover:shadow-tactical-accent/20"
            >
              {t("hero.cta")}
            </Link>
            <Link
              href={`/${lang}/blog`}
              className="rounded border border-tactical-border px-6 py-3 font-tactical-display font-bold text-tactical-text transition-all hover:border-tactical-accent hover:text-tactical-accent"
            >
              {t("hero.ctaSecondary")}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-tactical-border bg-tactical-bg-secondary/50 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center font-tactical-display text-3xl font-bold text-tactical-text">
            {t("features.title")}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded border border-tactical-border bg-tactical-card p-6 transition-all tactical-glow">
              <div className="mb-3 font-tactical-display text-2xl font-bold text-tactical-accent">
                50+
              </div>
              <div className="mb-2 font-tactical-display font-bold text-tactical-text">
                {t("features.platforms.title")}
              </div>
              <div className="text-sm text-tactical-text-secondary">
                {t("features.platforms.description")}
              </div>
            </div>
            <div className="rounded border border-tactical-border bg-tactical-card p-6 transition-all tactical-glow">
              <div className="mb-3 font-tactical-display text-2xl font-bold text-tactical-accent">
                8
              </div>
              <div className="mb-2 font-tactical-display font-bold text-tactical-text">
                {t("features.categories.title")}
              </div>
              <div className="text-sm text-tactical-text-secondary">
                {t("features.categories.description")}
              </div>
            </div>
            <div className="rounded border border-tactical-border bg-tactical-card p-6 transition-all tactical-glow">
              <div className="mb-3 font-tactical-display text-2xl font-bold text-tactical-accent">
                15+
              </div>
              <div className="mb-2 font-tactical-display font-bold text-tactical-text">
                {t("features.countries.title")}
              </div>
              <div className="text-sm text-tactical-text-secondary">
                {t("features.countries.description")}
              </div>
            </div>
            <div className="rounded border border-tactical-border bg-tactical-card p-6 transition-all tactical-glow">
              <div className="mb-3 font-tactical-display text-2xl font-bold text-tactical-accent">
                EN/AR
              </div>
              <div className="mb-2 font-tactical-display font-bold text-tactical-text">
                {t("features.bilingual.title")}
              </div>
              <div className="text-sm text-tactical-text-secondary">
                {t("features.bilingual.description")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="border-t border-tactical-border px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 font-tactical-display text-3xl font-bold text-tactical-text">
            {t("mission.title")}
          </h2>
          <p className="text-lg text-tactical-text-secondary">
            {t("mission.description")}
          </p>
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}
