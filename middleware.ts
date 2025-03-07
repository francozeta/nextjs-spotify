import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  // Get the token using either NEXTAUTH_SECRET or SECRET
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET || process.env.SECRET,
  })

  const { pathname } = request.nextUrl

  // Case 1: Protected routes - redirect to login if not authenticated
  const protectedPaths = ["/library", "/playlist", "/search"]
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path))

  if (isProtectedPath && !token) {
    console.log("Redirecting to login - protected route requires authentication")
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Case 2: Auth routes - redirect to home if already authenticated
  const authRoutes = ["/login", "/signup"]
  const isAuthRoute = authRoutes.some((route) => pathname === route)

  if (isAuthRoute && token) {
    console.log("Redirecting to home - user already authenticated")
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

// Update matcher to include auth routes
export const config = {
  matcher: ["/library/:path*", "/playlist/:path*", "/search/:path*", "/login", "/signup"],
}

