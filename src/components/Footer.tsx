import { getTranslations } from "next-intl/server";

interface FooterProps {
  lang: string;
}

export async function Footer({ lang }: FooterProps) {
  const t = await getTranslations({ locale: lang, namespace: "Home" });

  return (
    <footer className="border-t border-tactical-border bg-tactical-bg-secondary/30 px-4 py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="font-tactical-display text-sm text-tactical-text-secondary">
          {t("footer.copyright")}
        </div>
        <div className="font-tactical-display text-sm text-tactical-text-secondary">
          {t("footer.tagline")}
        </div>
      </div>
    </footer>
  );
}
