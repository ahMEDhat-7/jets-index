import { NextResponse } from "next/server";
import { getSession } from "./auth";
import { prisma } from "./prisma";

export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

export async function requireAuth(
  request: Request
): Promise<AuthUser | NextResponse> {
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: session.sub },
    select: { id: true, email: true, role: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }

  return {
    id: user.id,
    email: user.email,
    role: user.role,
  };
}

export async function requireAdmin(
  request: Request
): Promise<AuthUser | NextResponse> {
  const result = await requireAuth(request);
  if (result instanceof NextResponse) {
    return result;
  }

  if (result.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Admin access required" },
      { status: 403 }
    );
  }

  return result;
}
