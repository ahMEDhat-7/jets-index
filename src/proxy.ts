import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "@/i18n/routing";

const handleI18nRouting = createMiddleware(routing);

function applySecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set(
    "Referrer-Policy",
    "strict-origin-when-cross-origin"
  );
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  return response;
}

export function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    return applySecurityHeaders(NextResponse.next());
  }

  if (pathname.startsWith("/api/v1")) {
    const method = request.method;
    const isWriteMethod =
      method === "POST" || method === "PATCH" || method === "DELETE";
    const isAuthRoute = pathname.startsWith("/api/v1/auth");

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

  const i18nResponse = handleI18nRouting(request);
  return applySecurityHeaders(i18nResponse);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
