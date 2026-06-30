import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://jets-index.vercel.app";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = ["en", "ar"];

  const staticPages: MetadataRoute.Sitemap = [
    ...locales.map((lang) => ({
      url: `${BASE_URL}/${lang}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    })),
    ...locales.map((lang) => ({
      url: `${BASE_URL}/${lang}/browse`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    })),
    ...locales.map((lang) => ({
      url: `${BASE_URL}/${lang}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  try {
    const [platforms, blogs] = await Promise.all([
      prisma.platform.findMany({ select: { id: true, updatedAt: true } }),
      prisma.blog.findMany({
        select: { id: true, updatedAt: true },
        orderBy: { publishedAt: "desc" },
      }),
    ]);

    const platformPages: MetadataRoute.Sitemap = platforms.flatMap(
      (platform) =>
        locales.map((lang) => ({
          url: `${BASE_URL}/${lang}/platform/${platform.id}`,
          lastModified: platform.updatedAt,
          changeFrequency: "weekly" as const,
          priority: 0.7,
        }))
    );

    const blogPages: MetadataRoute.Sitemap = blogs.flatMap((blog) =>
      locales.map((lang) => ({
        url: `${BASE_URL}/${lang}/blog/${blog.id}`,
        lastModified: blog.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }))
    );

    return [...staticPages, ...platformPages, ...blogPages];
  } catch {
    return staticPages;
  }
}
