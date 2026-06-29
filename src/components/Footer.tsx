"use client";

import { useTranslations } from "next-intl";

export function Footer({ lang }: { lang: string }) {
  const t = useTranslations();

  return (
    <footer className="border-t border-tactical-border bg-tactical-bg-secondary/30 px-4 py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="font-tactical-display text-sm text-tactical-text-secondary">
          {t("Home.footer.copyright")}
        </div>
        <div className="font-tactical-display text-sm text-tactical-text-secondary">
          {t("Home.footer.tagline")}
        </div>
      </div>
    </footer>
  );
}
