import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { formatDate, getTranslation } from "@/lib/utils";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<React.ReactNode> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "Blog" });

  const blogs = await prisma.blog.findMany({
    orderBy: { publishedAt: "desc" },
    include: {
      translations: {
        select: { locale: true, title: true, summary: true, content: true },
      },
    },
  });

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-tactical-border bg-tactical-bg/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link
            href={`/${lang}`}
            className="font-tactical-display text-xl font-bold text-tactical-accent"
          >
            JETDEX
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href={`/${lang}/browse`}
              className="text-tactical-text-secondary transition-colors hover:text-tactical-text"
            >
              Browse
            </Link>
            <Link
              href={`/${lang}/blog`}
              className="text-tactical-accent transition-colors hover:text-tactical-accent/80"
            >
              {t("title")}
            </Link>
            <Link
              href="/admin"
              className="rounded bg-tactical-accent/20 px-3 py-1 text-tactical-accent transition-colors hover:bg-tactical-accent/30"
            >
              Admin
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="border-b border-tactical-border bg-tactical-bg-secondary/30 px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-4 font-tactical-display text-4xl font-bold text-tactical-text">
            {t("title")}
          </h1>
          <p className="text-tactical-text-secondary">
            {t("description")}
          </p>
        </div>
      </section>

      {/* Blog List */}
      <section className="px-4 py-8">
        <div className="mx-auto max-w-4xl">
          {blogs.length === 0 ? (
            <div className="py-20 text-center">
              <h3 className="mb-2 font-tactical-display text-xl text-tactical-text">
                {t("empty.title")}
              </h3>
              <p className="text-tactical-text-secondary">
                {t("empty.description")}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {blogs.map((blog) => {
                const translation = blog.translations.find(
                  (tr) => tr.locale === lang
                );
                const fallback = blog.translations.find(
                  (tr) => tr.locale === "en"
                );
                const title =
                  translation?.title ?? fallback?.title ?? "Untitled";
                const summary =
                  translation?.summary ?? fallback?.summary ?? "";

                return (
                  <article
                    key={String(blog.id)}
                    className="rounded border border-tactical-border bg-tactical-card p-6 transition-all tactical-glow hover:border-tactical-accent/50"
                  >
                    <div className="mb-3 flex items-center gap-3 text-sm text-tactical-text-secondary">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-tactical-success status-blink" />
                        {t("published")}
                      </span>
                      <span>•</span>
                      <span>{formatDate(blog.publishedAt, lang)}</span>
                    </div>

                    <h2 className="mb-3 font-tactical-display text-2xl font-bold text-tactical-text hover:text-tactical-accent">
                      {title}
                    </h2>

                    <p className="mb-4 text-tactical-text-secondary">
                      {summary}
                    </p>

                    <div className="border-t border-tactical-border pt-4">
                      <span className="cursor-pointer text-sm font-bold text-tactical-accent hover:text-tactical-accent/80">
                        {t("readMore")} →
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-tactical-border bg-tactical-bg-secondary/30 px-4 py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="font-tactical-display text-sm text-tactical-text-secondary">
            &copy; 2026 Jetdex
          </div>
        </div>
      </footer>
    </div>
  );
}
