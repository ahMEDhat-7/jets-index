import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

interface HeaderProps {
  lang: string;
  activePage?: "home" | "browse" | "blog";
}

export async function Header({ lang, activePage }: HeaderProps) {
  const t = await getTranslations({ locale: lang, namespace: "Home" });
  const tc = await getTranslations({ locale: lang, namespace: "Common" });

  const linkClass = (page: string) =>
    activePage === page
      ? "text-tactical-accent transition-colors hover:text-tactical-accent/80"
      : "text-tactical-text-secondary transition-colors hover:text-tactical-text";

  return (
    <nav className="border-b border-tactical-border bg-tactical-bg/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link
          href={`/${lang}`}
          className="font-tactical-display text-xl font-bold text-tactical-accent"
        >
          Jets Index
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href={`/${lang}/browse`}
            className={linkClass("browse")}
          >
            {t("hero.cta")}
          </Link>
          <Link
            href={`/${lang}/blog`}
            className={linkClass("blog")}
          >
            {t("hero.ctaSecondary")}
          </Link>

          <LocaleSwitcher lang={lang} pathname={`/${lang}`} />
          <ThemeToggle label={tc("toggleTheme")} />
        </div>
      </div>
    </nav>
  );
}
