import type { Metadata } from "next";
import "./globals.css";
import { DesignSwitcher } from "@/components/design-switcher";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Jets Index - Military Platform Encyclopedia",
  description:
    "A comprehensive encyclopedia of military and aviation platforms",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700&family=Bebas+Neue&family=Chakra+Petch:wght@400;500;600;700&family=Fira+Code:wght@400;500&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Noto+Serif:wght@400;700&family=Oswald:wght@400;500;600;700&family=Roboto+Condensed:wght@400;500;700&family=Share+Tech+Mono&family=Source+Sans+3:wght@400;500;600&family=VT323&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
        <ThemeProvider>
          <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm">
            <div className="container flex h-14 sm:h-16 items-center justify-between px-2 sm:px-4 mx-auto max-w-7xl">
              <div className="flex items-center gap-2 sm:gap-4">
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  Jets Index
                </h1>
                <div className="hidden sm:block">
                  <DesignSwitcher />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="sm:hidden">
                  <DesignSwitcher />
                </div>
                <ThemeToggle />
              </div>
            </div>
          </header>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
