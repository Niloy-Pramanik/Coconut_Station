import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if it's an admin route
  if (pathname.startsWith('/admin') || pathname.startsWith('/bn/admin') || pathname.startsWith('/en/admin')) {
    // Skip protection for the login page itself
    if (pathname.endsWith('/admin/login')) {
      return intlMiddleware(request)
    }

    const token = request.cookies.get('admin_token')?.value
    if (!token) {
      // Not authenticated, redirect to login
      const locale = pathname.startsWith('/bn') ? '/bn' : ''
      return NextResponse.redirect(new URL(`${locale}/admin/login`, request.url))
    }
  }
  
  if (pathname.startsWith('/api/admin')) {
    const token = request.cookies.get('admin_token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames and admin api
  matcher: ['/', '/(en|bn)/:path*', '/admin/:path*', '/api/admin/:path*']
};
