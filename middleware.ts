import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.SECRET,
  })

  // Rutas protegidas que requieren autenticación
  const protectedPaths = ["/library", "/playlist", "/search"]
  const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/library/:path*", "/playlist/:path*", "/search/:path*"],
}

