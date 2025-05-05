import { NextResponse, NextRequest } from "next/server";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/protected/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}; 

const subdomainPaths = ["/dashboard", "/login", "/signup", "/judge"];

const otherPaths = ["/manifest.json", "/images"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hostname = req.headers.get("host") || '';

  const isAuthenticated = req.cookies.has("token") || req.cookies.has("next-auth.session-token");

  if (!hostname.startsWith("app.")) {
    if (subdomainPaths.includes(pathname) && !otherPaths.includes(pathname)) {
      const url = new URL(req.url);
      url.host = `app.${url.host}`;
      return NextResponse.redirect(url);
    }
  } else if (hostname.startsWith("app.")) {
    if (!subdomainPaths.includes(pathname) && otherPaths.includes(pathname)) {
      return NextResponse.redirect(new URL(`/login`, req.url));
    }
  }

  if (pathname.startsWith("/dashboard") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
