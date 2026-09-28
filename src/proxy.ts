import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  // The negative lookahead ignores API routes, static files, and _next internals
  matcher: ['/', '/(en|bn)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
