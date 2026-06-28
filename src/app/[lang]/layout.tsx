import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LocaleScript } from "@/components/LocaleScript";

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

  return (
    <>
      <LocaleScript lang={lang} />
      <ThemeProvider>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </ThemeProvider>
    </>
  );
}
