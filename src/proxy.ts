import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/settings",
  "/studio",
  "/analytics",
  "/billing",
  "/resume",
  "/cover-letters",
  "/templates",
  "/ai-studio",
  "/github"
];
const guestOnlyRoutes = ["/sign-in", "/sign-up", "/forgot-password", "/reset-password"];

export function proxy(request: NextRequest) {
  const { nextUrl } = request;
  const path = nextUrl.pathname;

  const sessionToken =
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  const isAuthenticated = !!sessionToken;

  // 1. Redirect unauthenticated users trying to access protected routes
  const isProtected = protectedRoutes.some((route) => path.startsWith(route));
  if (isProtected && !isAuthenticated) {
    const signInUrl = new URL("/sign-in", request.url);
    // Keep track of the original page to redirect back after sign in
    signInUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(signInUrl);
  }

  // 2. Redirect authenticated users trying to access guest-only routes
  const isGuestOnly = guestOnlyRoutes.some((route) => path === route);
  if (isGuestOnly && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
