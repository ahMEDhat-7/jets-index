import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { DashboardStats } from "@/lib/types";

export async function GET(): Promise<NextResponse<DashboardStats>> {
  try {
    const [
      platforms,
      categories,
      countries,
      manufacturers,
      blogs,
      platformsByCategory,
      platformsByCountry,
      platformsByStatus,
      recentBlogs,
    ] = await Promise.all([
      prisma.platform.count(),
      prisma.category.count(),
      prisma.country.count(),
      prisma.manufacturer.count(),
      prisma.blog.count(),
      prisma.platform.groupBy({
        by: ["categoryId"],
        _count: { id: true },
      }),
      prisma.platform.groupBy({
        by: ["countryId"],
        _count: { id: true },
      }),
      prisma.platform.groupBy({
        by: ["operationalStatus"],
        _count: { id: true },
      }),
      prisma.blog.findMany({
        take: 5,
        orderBy: { publishedAt: "desc" },
        include: {
          translations: {
            select: { locale: true, title: true, summary: true, content: true },
          },
        },
      }),
    ]);

    const categoryIds = platformsByCategory.map((p) => p.categoryId);
    const countryIds = platformsByCountry.map((p) => p.countryId);

    const [categoryTranslations, countryTranslations] = await Promise.all([
      prisma.categoryTranslation.findMany({
        where: { categoryId: { in: categoryIds }, locale: "en" },
        select: { categoryId: true, name: true },
      }),
      prisma.countryTranslation.findMany({
        where: { countryId: { in: countryIds }, locale: "en" },
        select: { countryId: true, name: true },
      }),
    ]);

    const categoryMap = new Map(
      categoryTranslations.map((t) => [t.categoryId, t.name])
    );
    const countryMap = new Map(
      countryTranslations.map((t) => [t.countryId, t.name])
    );

    return NextResponse.json({
      platforms,
      categories,
      countries,
      manufacturers,
      blogs,
      platformsByCategory: platformsByCategory.map((p) => ({
        name: categoryMap.get(p.categoryId) ?? "Unknown",
        count: p._count.id,
      })),
      platformsByCountry: platformsByCountry.map((p) => ({
        name: countryMap.get(p.countryId) ?? "Unknown",
        count: p._count.id,
      })),
      platformsByStatus: platformsByStatus.map((p) => ({
        status: p.operationalStatus ?? "Unknown",
        count: p._count.id,
      })),
      recentBlogs: recentBlogs as DashboardStats["recentBlogs"],
    });
  } catch {
    return NextResponse.json(
      {
        platforms: 0,
        categories: 0,
        countries: 0,
        manufacturers: 0,
        blogs: 0,
        platformsByCategory: [],
        platformsByCountry: [],
        platformsByStatus: [],
        recentBlogs: [],
      },
      { status: 500 }
    );
  }
}
