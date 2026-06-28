import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import { UpdateManufacturerSchema } from "@/lib/validators";
import type { ApiResponse } from "@/lib/types";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<{ id: string }>>> {
  try {
    const { id } = await params;
    const manufacturer = await prisma.manufacturer.findUnique({
      where: { id },
      include: {
        translations: { select: { locale: true, name: true, specialization: true } },
        country: {
          select: { id: true, translations: { select: { locale: true, name: true } } },
        },
      },
    });

    if (!manufacturer) {
      return NextResponse.json({ error: "Manufacturer not found" }, { status: 404 });
    }

    return NextResponse.json({ data: manufacturer });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<{ id: string }>>> {
  try {
    const admin = await requireAdmin(request);
    if (admin instanceof NextResponse) return admin;

    const { id } = await params;
    const body = await request.json();
    const parsed = UpdateManufacturerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const existing = await prisma.manufacturer.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Manufacturer not found" }, { status: 404 });
    }

    const { translations, ...manufacturerData } = parsed.data;

    if (manufacturerData.countryId !== undefined) {
      await prisma.manufacturer.update({
        where: { id },
        data: { countryId: manufacturerData.countryId },
      });
    }

    if (translations) {
      for (const t of translations) {
        await prisma.manufacturerTranslation.upsert({
          where: { manufacturerId_locale: { manufacturerId: id, locale: t.locale } },
          update: {
            ...(t.name !== undefined && { name: t.name }),
            ...(t.specialization !== undefined && { specialization: t.specialization }),
          },
          create: {
            manufacturerId: id,
            locale: t.locale,
            name: t.name,
            specialization: t.specialization,
          },
        });
      }
    }

    return NextResponse.json({ data: { id } });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<null>>> {
  try {
    const admin = await requireAdmin(request);
    if (admin instanceof NextResponse) return admin;

    const { id } = await params;

    const existing = await prisma.manufacturer.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Manufacturer not found" }, { status: 404 });
    }

    await prisma.manufacturer.delete({ where: { id } });
    return NextResponse.json({ data: null, message: "Manufacturer deleted" });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
