import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import { CreateCountrySchema } from "@/lib/validators";
import type { ApiResponse, PaginatedResponse, CountryListItem } from "@/lib/types";

export async function GET(
  request: NextRequest
): Promise<NextResponse<PaginatedResponse<CountryListItem>>> {
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
      prisma.country.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          translations: { select: { locale: true, name: true } },
          _count: { select: { platforms: true, manufacturers: true } },
        },
      }),
      prisma.country.count({ where }),
    ]);

    return NextResponse.json({
      data: data as CountryListItem[],
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch {
    return NextResponse.json(
      { data: [], pagination: { page: 1, limit: 50, total: 0, totalPages: 0 } },
      { status: 500 }
    ) as NextResponse<PaginatedResponse<CountryListItem>>;
  }
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<{ id: string }>>> {
  try {
    const admin = await requireAdmin(request);
    if (admin instanceof NextResponse) return admin as NextResponse<ApiResponse<{ id: string }>>;

    const body = await request.json();
    const parsed = CreateCountrySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const country = await prisma.country.create({
      data: {
        translations: {
          createMany: {
            data: parsed.data.translations.map((t) => ({
              locale: t.locale,
              name: t.name,
            })),
          },
        },
      },
      select: { id: true },
    });

    return NextResponse.json({ data: country });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    ) as NextResponse<ApiResponse<{ id: string }>>;
  }
}
