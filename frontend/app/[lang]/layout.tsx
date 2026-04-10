import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "@/app/globals.css";

export const metadata = {
  metadataBase: new URL("https://jetsindex.com"),
  title: {
    default: "Jets Index - Military Platform Encyclopedia",
    template: "%s | Jets Index",
  },
  description:
    "A comprehensive encyclopedia of military and aviation platforms. Explore fighter jets, tanks, naval vessels, and more from around the world.",
  keywords: [
    "military aircraft",
    "fighter jets",
    "military platforms",
    "defense",
    "aviation",
    "tanks",
    "naval vessels",
    "military encyclopedia",
  ],
  authors: [{ name: "Jets Index" }],
  creator: "Jets Index",
  publisher: "Jets Index",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jetsindex.com",
    siteName: "Jets Index",
    title: "Jets Index - Military Platform Encyclopedia",
    description:
      "A comprehensive encyclopedia of military and aviation platforms. Explore fighter jets, tanks, naval vessels, and more from around the world.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jets Index - Military Platform Encyclopedia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jets Index - Military Platform Encyclopedia",
    description:
      "A comprehensive encyclopedia of military and aviation platforms. Explore fighter jets, tanks, naval vessels, and more from around the world.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://jetsindex.com",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ lang: locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!routing.locales.includes(lang as typeof routing.locales[number])) {
    notFound();
  }

  const locale = lang;
  const messages = await getMessages();

  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700&family=Bebas+Neue&family=Chakra+Petch:wght@400;500;600;700&family=Fira+Code:wght@400;500&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+Arabic:wght@400;500;600;700&family=Noto+Serif:wght@400;700&family=Oswald:wght@400;500;600;700&family=Roboto+Condensed:wght@400;500;700&family=Share+Tech+Mono&family=Source+Sans+3:wght@400;500;600&family=VT323&display=swap"
          rel="stylesheet"
        />
      </head>
       <body className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
         <ThemeProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <Header />
              <main>{children}</main>
              <Footer />
            </NextIntlClientProvider>
         </ThemeProvider>
       </body>
    </html>
  );
}
