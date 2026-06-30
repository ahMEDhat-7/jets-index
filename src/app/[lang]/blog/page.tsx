import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "Blog" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<React.ReactNode> {
  const { lang } = await params;
  setRequestLocale(lang);
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
      <Header lang={lang} activePage="blog" />

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
                  translation?.title ?? fallback?.title ?? t("Common.untitled");
                const summary =
                  translation?.summary ?? fallback?.summary ?? "";

                return (
                  <Link
                    key={String(blog.id)}
                    href={`/${lang}/blog/${blog.id}`}
                    className="block rounded border border-tactical-border bg-tactical-card p-6 transition-all tactical-glow hover:border-tactical-accent/50"
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
                      <span className="text-sm font-bold text-tactical-accent hover:text-tactical-accent/80">
                        {t("readMore")} →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}
