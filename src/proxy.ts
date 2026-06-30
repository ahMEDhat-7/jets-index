import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "@/i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export function proxy(request: NextRequest): NextResponse {
  const i18nResponse = handleI18nRouting(request);

  i18nResponse.headers.set("X-Frame-Options", "DENY");
  i18nResponse.headers.set("X-Content-Type-Options", "nosniff");
  i18nResponse.headers.set(
    "Referrer-Policy",
    "strict-origin-when-cross-origin"
  );
  i18nResponse.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  i18nResponse.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  if (request.nextUrl.pathname.startsWith("/api/v1")) {
    const method = request.method;
    const isWriteMethod =
      method === "POST" || method === "PATCH" || method === "DELETE";
    const isAuthRoute = request.nextUrl.pathname.startsWith("/api/v1/auth");

    if (isWriteMethod && !isAuthRoute) {
      const authHeader = request.headers.get("Authorization");
      if (!authHeader?.startsWith("Bearer ")) {
        return NextResponse.json(
          { error: "Authentication required" },
          { status: 401 }
        );
      }
    }
  }

  return i18nResponse;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
