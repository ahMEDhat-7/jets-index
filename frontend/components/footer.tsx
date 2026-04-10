"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Plane, Github } from "lucide-react";

export function Footer() {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIgZmlsbD0iIzY2Njk2OCIvPjwvc3ZnPg==')] opacity-20"></div>
      <div className="relative container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 w-fit">
              <Plane className="w-6 h-6 text-amber-500" />
              <span className="text-xl font-bold text-white">Jets Index</span>
            </Link>
            <p className="text-sm text-slate-400 max-w-md mb-4">
              {isArabic
                ? "موسوعة شاملة للمنصات العسكرية والطيران. استكشف المقاتلات والدبابات والسفن الحربية من جميع أنحاء العالم."
                : "A comprehensive encyclopedia of military platforms and aviation. Explore fighter jets, tanks, and naval vessels from around the world."}
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/ahMEDhat-7/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              {isArabic ? "روابط سريعة" : "Quick Links"}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-slate-400 hover:text-amber-500 transition-colors"
                >
                  {isArabic ? "الرئيسية" : "Home"}
                </Link>
              </li>
              <li>
                <Link
                  href="/browse"
                  className="text-sm text-slate-400 hover:text-amber-500 transition-colors"
                >
                  {isArabic ? "تصفح" : "Browse"}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-slate-400 hover:text-amber-500 transition-colors"
                >
                  {isArabic ? "الأخبار" : "News"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              {isArabic ? "المصادر" : "Resources"}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-400 hover:text-amber-500 transition-colors"
                >
                  {isArabic ? "حول المشروع" : "About"}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-400 hover:text-amber-500 transition-colors"
                >
                  {isArabic ? "اتصل بنا" : "Contact"}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-400 hover:text-amber-500 transition-colors"
                >
                  {isArabic ? "سياسة الخصوصية" : "Privacy"}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-700">
          <p className="text-center text-sm text-slate-500">
            © {new Date().getFullYear()} Jets Index.{" "}
            {isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>
        </div>
      </div>

      <div className="absolute top-0 left-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl"></div>
    </footer>
  );
}