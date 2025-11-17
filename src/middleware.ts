import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/auth/login',
    '/auth/register',
  ];
  
  // Protected routes that require authentication
  const protectedRoutes = [
    '/dashboard',
    '/profile',
  ];
  
  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // If trying to access protected route without auth, redirect to login
  if (isProtectedRoute && !request.cookies.has('auth-token')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  // If trying to access auth routes while authenticated, redirect to dashboard
  if (isPublicRoute && pathname.startsWith('/auth') && request.cookies.has('auth-token')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
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
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};