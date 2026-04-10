"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/routing";
import { useTransition, useState } from "react";
import { Plane, Menu, X, Globe } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
    setIsLangOpen(false);
  };

  const navItems = [
    { href: "/", label: locale === "ar" ? "الرئيسية" : "Home" },
    { href: "/browse", label: locale === "ar" ? "تصفح" : "Browse" },
    { href: "/blog", label: locale === "ar" ? "الأخبار" : "News" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm">
      <div className="container flex h-14 sm:h-16 items-center justify-between px-2 sm:px-4 mx-auto max-w-7xl">
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Plane className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Jets Index
            </h1>
          </Link>
          <nav className="hidden md:flex items-center gap-6 ml-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
              aria-label="Change language"
            >
              <Globe className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </button>
            {isLangOpen && (
              <div className="absolute end-0 mt-2 w-32 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden z-50">
                <button
                  onClick={() => handleLocaleChange("en")}
                  disabled={isPending}
                  className={`w-full px-4 py-2 text-start text-sm transition-colors ${
                    locale === "en"
                      ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                      : "hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => handleLocaleChange("ar")}
                  disabled={isPending}
                  className={`w-full px-4 py-2 text-start text-sm transition-colors ${
                    locale === "ar"
                      ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                      : "hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  العربية
                </button>
              </div>
            )}
          </div>
          <ThemeToggle />
          <MobileMenu
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            navItems={navItems}
          />
        </div>
      </div>
    </header>
  );
}

function MobileMenu({
  isOpen,
  setIsOpen,
  navItems,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  navItems: Array<{ href: string; label: string }>;
}) {
  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-14 sm:top-16 start-0 end-0 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-lg">
          <nav className="flex flex-col p-4 gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 py-2"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
