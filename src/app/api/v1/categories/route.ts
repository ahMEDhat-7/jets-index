import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import { CreateCategorySchema } from "@/lib/validators";
import type { ApiResponse, PaginatedResponse, CategoryListItem } from "@/lib/types";

export async function GET(
  request: NextRequest
): Promise<NextResponse<PaginatedResponse<CategoryListItem>>> {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") ?? "50")));
    const search = searchParams.get("search");
    const locale = searchParams.get("locale") ?? "en";

    const where: Record<string, unknown> = {};
    if (search) {
      where.translations = {
        some: {
          locale,
          name: { contains: search, mode: "insensitive" },
        },
      };
    }

    const [data, total] = await Promise.all([
      prisma.category.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          translations: { select: { locale: true, name: true, domain: true } },
          _count: { select: { platforms: true } },
        },
      }),
      prisma.category.count({ where }),
    ]);

    return NextResponse.json({
      data: data as CategoryListItem[],
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch {
    return NextResponse.json(
      { data: [], pagination: { page: 1, limit: 50, total: 0, totalPages: 0 } },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<{ id: string }>>> {
  try {
    const admin = await requireAdmin(request);
    if (admin instanceof NextResponse) return admin;

    const body = await request.json();
    const parsed = CreateCategorySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: {
        translations: {
          createMany: {
            data: parsed.data.translations.map((t) => ({
              locale: t.locale,
              name: t.name,
              domain: t.domain,
            })),
          },
        },
      },
      select: { id: true },
    });

    return NextResponse.json({ data: category });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
