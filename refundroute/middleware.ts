import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

/**
 * Middleware for protecting routes with JWT authentication
 * 
 * Public Routes:
 * - / (Home)
 * - /login
 * - /api/auth/* (Authentication endpoints)
 * 
 * Protected Routes:
 * - /dashboard
 * - /users/*
 * - /refunds/*
 * 
 * Behavior:
 * - Public routes: Allow access without authentication
 * - Protected routes: Require valid JWT token in cookies
 * - Unauthorized access: Redirect to /login
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public routes
  if (
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/api/auth")
  ) {
    return NextResponse.next();
  }

  // Protect private routes
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/users") ||
    pathname.startsWith("/refunds")
  ) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      jwt.verify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      loginUrl.searchParams.set("error", "invalid_token");
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/users/:path*",
    "/refunds/:path*",
  ],
};
