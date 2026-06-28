import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { formatDate, getTranslation } from "@/lib/utils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MarkdownContent } from "@/components/MarkdownContent";

export const revalidate = 60;

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<React.ReactNode> {
  const { lang, id } = await params;
  const t = await getTranslations({ locale: lang, namespace: "Blog" });

  const blog = await prisma.blog.findUnique({
    where: { id },
    include: {
      translations: {
        select: { locale: true, title: true, summary: true, content: true },
      },
    },
  });

  if (!blog) {
    notFound();
  }

  const translation = blog.translations.find((tr) => tr.locale === lang);
  const fallback = blog.translations.find((tr) => tr.locale === "en");
  const title = translation?.title ?? fallback?.title ?? "Untitled";
  const summary = translation?.summary ?? fallback?.summary ?? "";
  const content = translation?.content ?? fallback?.content ?? "";

  return (
    <div className="min-h-screen">
      <Header lang={lang} activePage="blog" />

      {/* Hero */}
      <section className="border-b border-tactical-border bg-tactical-bg-secondary/30 px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex items-center gap-3 text-sm text-tactical-text-secondary">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-tactical-success status-blink" />
              {t("published")}
            </span>
            <span>•</span>
            <span>{formatDate(blog.publishedAt, lang)}</span>
          </div>

          <h1 className="mb-4 font-tactical-display text-4xl font-bold text-tactical-accent md:text-5xl">
            {title}
          </h1>

          {summary && (
            <p className="text-lg text-tactical-text-secondary">
              {summary}
            </p>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-3xl">
          {content ? (
            <MarkdownContent content={content} />
          ) : (
            <p className="text-tactical-text-secondary">
              No content available for this article.
            </p>
          )}
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}
