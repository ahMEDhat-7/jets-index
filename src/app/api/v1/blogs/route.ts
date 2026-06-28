import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import { CreateBlogSchema } from "@/lib/validators";
import type { ApiResponse, PaginatedResponse, BlogListItem } from "@/lib/types";

export async function GET(
  request: NextRequest
): Promise<NextResponse<PaginatedResponse<BlogListItem>>> {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") ?? "12")));
    const locale = searchParams.get("locale") ?? "en";
    const search = searchParams.get("search");

    const where: Record<string, unknown> = {};
    if (search) {
      where.translations = {
        some: {
          locale,
          title: { contains: search, mode: "insensitive" },
        },
      };
    }

    const [data, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { publishedAt: "desc" },
        include: {
          translations: {
            select: { locale: true, title: true, summary: true, content: true },
          },
        },
      }),
      prisma.blog.count({ where }),
    ]);

    return NextResponse.json({
      data: data as BlogListItem[],
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch {
    return NextResponse.json(
      { data: [], pagination: { page: 1, limit: 12, total: 0, totalPages: 0 } },
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
    const parsed = CreateBlogSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const blog = await prisma.blog.create({
      data: {
        translations: {
          createMany: {
            data: parsed.data.translations.map((t) => ({
              locale: t.locale,
              title: t.title,
              summary: t.summary,
              content: t.content,
            })),
          },
        },
      },
      select: { id: true },
    });

    return NextResponse.json({ data: { id: String(blog.id) } });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
