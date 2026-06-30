import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "ar"];
const defaultLocale = "en";

function getLocaleFromPathname(pathname: string): string {
  const segments = pathname.split("/");
  const first = segments[1];
  if (locales.includes(first)) return first;
  return defaultLocale;
}

export function proxy(request: NextRequest): NextResponse {
  const response = NextResponse.next();

  // next-intl locale header — required for server components to resolve locale
  const locale = getLocaleFromPathname(request.nextUrl.pathname);
  response.headers.set("X-NEXT-INTL-LOCALE", locale);

  // Security headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  // Admin API auth guard
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

  // Rate limiting for auth routes (simple in-memory)
  if (
    request.nextUrl.pathname === "/api/v1/auth/login" &&
    request.method === "POST"
  ) {
    // Allow through - rate limiting would need Redis in production
  }

  return response;
}

export const config = {
  matcher: ["/api/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
};
