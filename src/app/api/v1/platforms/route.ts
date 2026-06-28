import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import { CreatePlatformSchema } from "@/lib/validators";
import type { ApiResponse, PaginatedResponse, PlatformListItem } from "@/lib/types";

export async function GET(
  request: NextRequest
): Promise<NextResponse<PaginatedResponse<PlatformListItem>>> {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") ?? "12")));
    const locale = searchParams.get("locale") ?? "en";
    const categoryId = searchParams.get("categoryId");
    const countryId = searchParams.get("countryId");
    const manufacturerId = searchParams.get("manufacturerId");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const where: Record<string, unknown> = {};
    if (categoryId) where.categoryId = categoryId;
    if (countryId) where.countryId = countryId;
    if (manufacturerId) where.manufacturerId = manufacturerId;
    if (status) where.operationalStatus = status;
    if (search) {
      where.translations = {
        some: {
          locale,
          name: { contains: search, mode: "insensitive" },
        },
      };
    }

    const [data, total] = await Promise.all([
      prisma.platform.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          translations: {
            select: { locale: true, name: true, description: true },
          },
          category: {
            select: {
              id: true,
              translations: { select: { locale: true, name: true } },
            },
          },
          manufacturer: {
            select: {
              id: true,
              translations: { select: { locale: true, name: true } },
            },
          },
          country: {
            select: {
              id: true,
              translations: { select: { locale: true, name: true } },
            },
          },
        },
      }),
      prisma.platform.count({ where }),
    ]);

    return NextResponse.json({
      data: data as PlatformListItem[],
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
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
    if (admin instanceof NextResponse) return admin as NextResponse<ApiResponse<{ id: string }>>;

    const body = await request.json();
    const parsed = CreatePlatformSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { translations, ...platformData } = parsed.data;

    const platform = await prisma.platform.create({
      data: {
        ...platformData,
        technicalSpecs: platformData.technicalSpecs as unknown as Record<string, string> | undefined,
        translations: {
          createMany: {
            data: translations.map((t) => ({
              locale: t.locale,
              name: t.name,
              description: t.description,
            })),
          },
        },
      },
      select: { id: true },
    });

    return NextResponse.json({ data: platform }) as NextResponse<ApiResponse<{ id: string }>>;
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    ) as NextResponse<ApiResponse<{ id: string }>>;
  }
}
