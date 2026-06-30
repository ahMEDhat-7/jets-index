import type { Metadata } from "next";
import "./globals.css";
import { IBM_Plex_Mono, Share_Tech_Mono, Noto_Sans_Arabic } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";

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

export const metadata: Metadata = {
  title: {
    default: "Jets Index — Military Aviation Database",
    template: "%s | Jets Index",
  },
  description:
    "A comprehensive index of the world's fighter jet manufacturers, aircraft programs, and military aviation systems.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://jets-index.vercel.app"
  ),
  openGraph: {
    type: "website",
    siteName: "Jets Index",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <html
      suppressHydrationWarning
      className={`${ibmPlexMono.variable} ${shareTechMono.variable} ${notoSansArabic.variable}`}
    >
      <body className="min-h-screen bg-tactical-bg text-tactical-text antialiased" style={{ fontFamily: "var(--font-ibm-plex-mono), monospace" }}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
