import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { IBM_Plex_Mono, Share_Tech_Mono, Noto_Sans_Arabic } from "next/font/google";
import { locales, type Locale } from "@/i18n/routing";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-share-tech-mono",
  display: "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-arabic",
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "Home" });

  return {
    title: t("hero.title"),
    description: t("hero.description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}): Promise<React.ReactNode> {
  const { lang } = await params;

  if (!locales.includes(lang as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={lang}
      dir={dir}
      className={`dark ${ibmPlexMono.variable} ${shareTechMono.variable} ${notoSansArabic.variable}`}
    >
      <body className="min-h-screen bg-tactical-bg text-tactical-text antialiased" style={{ fontFamily: lang === "ar" ? "var(--font-noto-sans-arabic), sans-serif" : "var(--font-ibm-plex-mono), monospace" }}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
