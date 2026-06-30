"use client";

import Link from "next/link";

interface LocaleSwitcherProps {
  lang: string;
  pathname: string;
}

export function LocaleSwitcher({ lang, pathname }: LocaleSwitcherProps) {
  const otherLang = lang === "en" ? "ar" : "en";
  const otherLangPath = pathname
    .replace(`/${lang}/`, `/${otherLang}/`)
    .replace(`/${lang}`, `/${otherLang}`);

  return (
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
  );
}
