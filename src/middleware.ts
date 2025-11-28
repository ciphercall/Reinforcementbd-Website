import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip maintenance check for these paths
  const skipPaths = [
    '/maintenance',
    '/admin',
    '/api',
    '/_next',
    '/images',
    '/favicon.ico',
  ]

  const shouldSkip = skipPaths.some(path => pathname.startsWith(path))
  if (shouldSkip) {
    return NextResponse.next()
  }

  // Check maintenance mode
  try {
    const maintenanceRes = await fetch(new URL('/api/settings?key=maintenance', request.url))
    if (maintenanceRes.ok) {
      const data = await maintenanceRes.json()
      const maintenanceSettings = data.value

      if (maintenanceSettings?.enabled) {
        // Check if user is admin
        const token = await getToken({ req: request })
        
        // If admin access is allowed and user is authenticated, let them through
        if (maintenanceSettings.allowAdminAccess && token) {
          return NextResponse.next()
        }

        // Redirect to maintenance page
        return NextResponse.redirect(new URL('/maintenance', request.url))
      }
    }
  } catch (error) {
    // If there's an error checking maintenance, continue normally
    console.error('Error checking maintenance mode:', error)
  }

  return NextResponse.next()
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
