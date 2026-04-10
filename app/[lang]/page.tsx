import { Link } from "@/i18n/routing";
import { ArrowRight, Database, Globe, Plane } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Jets Index - Military Platform Encyclopedia",
  description:
    "Your comprehensive encyclopedia for military aviation platforms. Explore aircraft, naval vessels, and military systems from around the world.",
};

export default async function LandingPage() {
  const t = await getTranslations("Home");

  return (
    <div className="min-h-screen">
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-black dark:via-slate-900 dark:to-black">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.3),transparent_70%)]" />
        </div>

        <div className="container relative z-10 px-4 mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in">
            <Plane className="w-8 h-8 text-blue-500" />
            <span className="text-blue-400 font-mono text-sm tracking-widest">
              {t("hero.tagline")}
            </span>
          </div>

          <h1
            className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            {t("hero.title")}
          </h1>

          <p
            className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-8 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            {t("hero.subtitle")}
          </p>

          <p
            className="text-slate-400 max-w-2xl mx-auto mb-12 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            {t("hero.description")}
          </p>

          <Link
            href="/browse"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all animate-fade-in hover:scale-105"
            style={{ animationDelay: "0.4s" }}
          >
            {t("hero.cta")} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowRight className="w-6 h-6 text-slate-500 rotate-90" />
        </div>
      </section>

      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Database className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {t("mission.sections.comprehensiveData.title")}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {t("mission.sections.comprehensiveData.description")}
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Globe className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {t("mission.sections.globalCoverage.title")}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {t("mission.sections.globalCoverage.description")}
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Plane className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {t("mission.sections.openAccess.title")}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {t("mission.sections.openAccess.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container px-4 mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-12">
            {t("mission.title")}
          </h2>

          <div className="prose dark:prose-invert max-w-none">
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                {t("mission.about.vision.title")}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {t("mission.about.vision.description")}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                {t("mission.about.purpose.title")}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {t("mission.about.purpose.description")}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                {t("mission.about.creator.title")}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {t("mission.about.creator.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t("mission.cta.title")}
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            {t("mission.cta.description")}
          </p>
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-all hover:scale-105"
          >
            {t("mission.cta.button")} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
