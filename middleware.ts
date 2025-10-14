import { NextRequest, NextResponse } from 'next/server';
import { AppConfig } from './config/app.config';

// Function to get user details from API using fetch (Edge-compatible)
async function getUserDetails(token: string) {
  try {
    const baseUrl = AppConfig().app.apiUrl;
    const res = await fetch(`${baseUrl}/auth/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      // Ensure no caching issues during middleware calls
      cache: 'no-store'
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? null;
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null;
  }
}

// Protect Admin Dashboard routes by checking token/role via cookies
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Cookies that may contain auth tokens across the app
  const token = request.cookies.get('tourAccessToken')?.value || '';

  // Admin dashboard protection: only allow admin users
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      url.search = '';
      return NextResponse.redirect(url);
    }

    // Get user details to check user type
    const userDetails = await getUserDetails(token);
    
    if (!userDetails) {
      // If we can't get user details, redirect to home
      const url = request.nextUrl.clone();
      url.pathname = '/';
      url.search = '';
      return NextResponse.redirect(url);
    }

    // Check if user type is admin
    if (userDetails.type !== 'admin') {
      // Redirect non-admin users to home page
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


