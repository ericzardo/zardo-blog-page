import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Cache headers para assets estáticos
  if (request.nextUrl.pathname.match(/\.(jpg|jpeg|gif|png|svg|ico|webp|css|js)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }

  // Cache headers para páginas
  if (request.nextUrl.pathname === '/') {
    response.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=60')
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 