"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface LocaleSwitcherProps {
  lang: string;
}

export function LocaleSwitcher({ lang }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const otherLang = lang === "en" ? "ar" : "en";
  const segments = pathname.split("/");
  segments[1] = otherLang;
  const otherLangPath = segments.join("/") || `/${otherLang}`;

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
