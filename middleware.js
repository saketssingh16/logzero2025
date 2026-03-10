import { NextResponse } from "next/server";

/**
 * Global middleware to normalize URLs to lowercase.
 *
 * Any request whose pathname contains uppercase characters
 * will be 301-redirected to the lowercase version.
 */
export function middleware(request) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // Skip Next.js internals, API routes, and static asset files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // e.g. /favicon.ico, /image.png
  ) {
    return NextResponse.next();
  }

  const lowerPathname = pathname.toLowerCase();

  if (pathname !== lowerPathname) {
    url.pathname = lowerPathname;
    // Use 301 permanent redirect
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

// Apply middleware to all non-static paths
export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
