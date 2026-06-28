import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import { UpdatePlatformSchema } from "@/lib/validators";
import type { ApiResponse, PlatformDetail } from "@/lib/types";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<PlatformDetail>>> {
  try {
    const { id } = await params;

    const platform = await prisma.platform.findUnique({
      where: { id },
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
    });

    if (!platform) {
      return NextResponse.json(
        { error: "Platform not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: platform as PlatformDetail });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
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
    const body = await request.json();
    const parsed = UpdatePlatformSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { translations, ...platformData } = parsed.data;

    const existing = await prisma.platform.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Platform not found" },
        { status: 404 }
      );
    }

    const updateData: Record<string, unknown> = {};
    if (platformData.unitCostUsd !== undefined) updateData.unitCostUsd = platformData.unitCostUsd;
    if (platformData.operationalStatus !== undefined) updateData.operationalStatus = platformData.operationalStatus;
    if (platformData.technicalSpecs !== undefined) updateData.technicalSpecs = platformData.technicalSpecs;
    if (platformData.imageUrl !== undefined) updateData.imageUrl = platformData.imageUrl;
    if (platformData.categoryId !== undefined) updateData.categoryId = platformData.categoryId;
    if (platformData.manufacturerId !== undefined) updateData.manufacturerId = platformData.manufacturerId;
    if (platformData.countryId !== undefined) updateData.countryId = platformData.countryId;

    if (Object.keys(updateData).length > 0) {
      await prisma.platform.update({
        where: { id },
        data: updateData,
      });
    }

    if (translations) {
      for (const t of translations) {
        await prisma.platformTranslation.upsert({
          where: {
            platformId_locale: { platformId: id, locale: t.locale },
          },
          update: {
            ...(t.name !== undefined && { name: t.name }),
            ...(t.description !== undefined && { description: t.description }),
          },
          create: {
            platformId: id,
            locale: t.locale,
            name: t.name,
            description: t.description,
          },
        });
      }
    }

    return NextResponse.json({ data: { id } });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
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

    const existing = await prisma.platform.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Platform not found" },
        { status: 404 }
      );
    }

    await prisma.platform.delete({ where: { id } });

    return NextResponse.json({ data: null, message: "Platform deleted" });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
