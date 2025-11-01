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

// Define protected routes that require authentication (but not a specific role)
// Important: Keep only general user-protected routes here. Role-specific routes
// (e.g., admin or vendor) are handled in their own arrays so public routes never
// become private by accident due to overlapping checks.
const PROTECTED_ROUTES = [
  '/profile-info',
  '/apartment-history', 
  '/hotel-history',
  '/tour-history',
  '/delete-account',
  '/property-list',
  '/toure/:path*/booking',  // Tour booking pages require login
  '/apartment/:path*/booking',  // Apartment booking pages require login
  '/hotel/:path*/booking'   // Hotel booking pages require login
  // Note: /toure, /tours, /apartment, /hotel removed from protected routes to allow public access
];

// Define admin-only routes
const ADMIN_ROUTES = [
  '/dashboard'
];

// Define vendor-only routes
// New: These routes require the authenticated user to have a vendor role.
// This separation ensures public routes remain public, and vendor pages are
// explicitly restricted without impacting other routes.
const VENDOR_ROUTES = [
  '/vendor-profile',
  '/vendor-verification'
];

// Define public routes that should redirect logged-in users
const PUBLIC_AUTH_ROUTES = [
  '/login',
  '/registration', 
  '/forgot-password',
  '/verify-email',
  '/otp-verification',
  '/new-password',
  '/admin/login'
];

// Protect routes by checking token/role via cookies
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Cookies that may contain auth tokens across the app
  const token = request.cookies.get('tourAccessToken')?.value || '';

  // Check if current path matches a configured route group
  // Note: Order of checks below matters — role-specific checks (admin/vendor)
  // run before general protected checks so that role enforcement is not bypassed.
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
  const isAdminRoute = ADMIN_ROUTES.some(route => pathname.startsWith(route));
  const isVendorRoute = VENDOR_ROUTES.some(route => pathname.startsWith(route));
  const isPublicAuthRoute = PUBLIC_AUTH_ROUTES.some(route => pathname.startsWith(route));

  // Handle admin routes
  if (isAdminRoute) {
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      url.search = '';
      return NextResponse.redirect(url);
    }
    // Get user details to check user type
    const userDetails = await getUserDetails(token);
    
    if (!userDetails) {
      // If we can't get user details, redirect to admin login
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
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

  // Handle vendor routes
  if (isVendorRoute) {
    if (!token) {
      // New: Vendor pages require authentication; redirect unauthenticated users to login
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.search = '';
      return NextResponse.redirect(url);
    }

    // New: Validate token and ensure the user has the vendor role
    const userDetails = await getUserDetails(token);

    if (!userDetails) {
      // New: If token is invalid, redirect to login to re-authenticate
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.search = '';
      return NextResponse.redirect(url);
    }

    if (userDetails.type !== 'vendor') {
      // New: Block access for non-vendor users and send them to their appropriate area
      const url = request.nextUrl.clone();
      // If an admin tries to access vendor-only pages, take them to admin dashboard
      if (userDetails.type === 'admin') {
        url.pathname = '/dashboard';
      } else {
        // Regular users go to their profile
        url.pathname = '/profile-info';
      }
      url.search = '';
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  // Handle protected routes (user profile, booking history, etc.)
  if (isProtectedRoute) {
    if (!token) {
      // Redirect to login page if no token
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.search = '';
      return NextResponse.redirect(url);
    }

    // Get user details to verify token is valid
    const userDetails = await getUserDetails(token);
    
    if (!userDetails) {
      // If token is invalid, redirect to login
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.search = '';
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  // Handle public auth routes - redirect logged-in users away from login pages
  if (isPublicAuthRoute && token) {
    // Verify token is valid
    const userDetails = await getUserDetails(token);
    
    if (userDetails) {
      // If user is logged in and trying to access login pages, redirect appropriately
      if (pathname.startsWith('/admin/login')) {
        // Admin users go to dashboard
        if (userDetails.type === 'admin') {
          const url = request.nextUrl.clone();
          url.pathname = '/dashboard';
          url.search = '';
          return NextResponse.redirect(url);
        }
      } else {
        // Regular users go to profile
        const url = request.nextUrl.clone();
        url.pathname = '/profile-info';
        url.search = '';
        return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next();
}

// Limit middleware to relevant routes
export const config = {
  matcher: [
    // Admin routes
    '/dashboard/:path*',
    '/admin/login',
    
    // Vendor routes
    '/vendor-profile/:path*',
    '/vendor-verification/:path*',

    // Protected user routes
    '/profile-info/:path*',
    '/apartment-history/:path*',
    '/hotel-history/:path*', 
    '/tour-history/:path*',
    '/delete-account/:path*',
    '/property-list/:path*',
    '/toure/:path*/booking',  // Tour booking pages require login
    '/apartment/:path*/booking',  // Apartment booking pages require login
    '/hotel/:path*/booking',   // Hotel booking pages require login
    // Note: /toure, /tours, /apartment, /hotel removed from matcher to allow public access
    
    // Public auth routes
    '/login',
    '/registration',
    '/forgot-password',
    '/verify-email',
    '/otp-verification',
    '/new-password'
  ],
};


