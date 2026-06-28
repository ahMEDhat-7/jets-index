"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface HeaderProps {
  lang: string;
  activePage?: "home" | "browse" | "blog";
}

export function Header({ lang, activePage }: HeaderProps) {
  const pathname = usePathname();
  const t = useTranslations();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const otherLang = lang === "en" ? "ar" : "en";
  const otherLangPath = pathname.replace(`/${lang}/`, `/${otherLang}/`).replace(`/${lang}`, `/${otherLang}`);

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
          JETDEX
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href={`/${lang}/browse`}
            className={linkClass("browse")}
          >
            {t("Home.hero.cta")}
          </Link>
          <Link
            href={`/${lang}/blog`}
            className={linkClass("blog")}
          >
            {t("Home.hero.ctaSecondary")}
          </Link>

          {/* Locale Switcher */}
          <div className="flex items-center gap-1 rounded border border-tactical-border bg-tactical-card px-1 py-0.5">
            <Link
              href={lang === "en" ? pathname : otherLangPath}
              className={`rounded px-2 py-0.5 text-xs font-bold transition-colors ${
                lang === "en"
                  ? "bg-tactical-accent text-tactical-bg"
                  : "text-tactical-text-secondary hover:text-tactical-text"
              }`}
            >
              EN
            </Link>
            <Link
              href={lang === "ar" ? pathname : otherLangPath}
              className={`rounded px-2 py-0.5 text-xs font-bold transition-colors ${
                lang === "ar"
                  ? "bg-tactical-accent text-tactical-bg"
                  : "text-tactical-text-secondary hover:text-tactical-text"
              }`}
            >
              AR
            </Link>
          </div>

          {/* Theme Toggle */}
          {mounted ? (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded border border-tactical-border bg-tactical-card p-1.5 text-tactical-text-secondary transition-colors hover:text-tactical-accent"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          ) : (
            <div className="h-[30px] w-[30px]" />
          )}
        </div>
      </div>
    </nav>
  );
}
