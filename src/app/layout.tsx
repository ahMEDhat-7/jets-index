import type { Metadata } from "next";
import "./globals.css";
import { IBM_Plex_Mono, Share_Tech_Mono, Noto_Sans_Arabic } from "next/font/google";

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
  title: "Jetdex — Military Aviation Database",
  description:
    "A comprehensive index of the world's fighter jet manufacturers, aircraft programs, and military aviation systems.",
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
        {children}
      </body>
    </html>
  );
}
