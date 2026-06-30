import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { ThemeProvider } from "@/components/ThemeProvider";
import { DirectionSetter } from "@/components/DirectionSetter";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

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

  setRequestLocale(lang);
  const messages = await getMessages({ locale: lang });

  return (
    <>
      <DirectionSetter lang={lang} />
      <ThemeProvider>
        <NextIntlClientProvider messages={messages} locale={lang}>
          {children}
        </NextIntlClientProvider>
      </ThemeProvider>
    </>
  );
}
