import { NextRequest, NextResponse } from 'next/server';

// Protect Admin Dashboard routes by checking token/role via cookies
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Cookies that may contain auth tokens across the app
  const token = request.cookies.get('tourAccessToken')?.value || '';

  // Admin dashboard protection: only allow when token exists
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      url.search = '';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Prevent logged-in users from seeing the admin login page
  if (pathname === '/admin/login' && token) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    url.search = '';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Limit middleware to relevant routes
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/login',
  ],
};


