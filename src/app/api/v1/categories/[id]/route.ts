import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import { UpdateCategorySchema } from "@/lib/validators";
import { isValidUUID } from "@/lib/utils";
import type { ApiResponse } from "@/lib/types";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<{ id: string }>>> {
  try {
    const { id } = await params;

    if (!isValidUUID(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 404 });
    }

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        translations: { select: { locale: true, name: true, domain: true } },
      },
    });

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ data: category });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 }) as NextResponse<ApiResponse<{ id: string }>>;
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<{ id: string }>>> {
  try {
    const admin = await requireAdmin(request);
    if (admin instanceof NextResponse) return admin as NextResponse<ApiResponse<{ id: string }>>;

    const { id } = await params;

    if (!isValidUUID(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 404 });
    }

    const body = await request.json();
    const parsed = UpdateCategorySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const existing = await prisma.category.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    if (parsed.data.translations) {
      for (const t of parsed.data.translations) {
        await prisma.categoryTranslation.upsert({
          where: { categoryId_locale: { categoryId: id, locale: t.locale } },
          update: {
            ...(t.name !== undefined && { name: t.name }),
            ...(t.domain !== undefined && { domain: t.domain }),
          },
          create: { categoryId: id, locale: t.locale, name: t.name, domain: t.domain },
        });
      }
    }

    return NextResponse.json({ data: { id } });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 }) as NextResponse<ApiResponse<{ id: string }>>;
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<null>>> {
  try {
    const admin = await requireAdmin(request);
    if (admin instanceof NextResponse) return admin as NextResponse<ApiResponse<null>>;

    const { id } = await params;

    if (!isValidUUID(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 404 });
    }

    const existing = await prisma.category.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ data: null, message: "Category deleted" });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 }) as NextResponse<ApiResponse<null>>;
  }
}
