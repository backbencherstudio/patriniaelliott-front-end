import { NextRequest, NextResponse } from 'next/server';
import { UserService } from './service/user/user.service';

// Function to get user details from API
async function getUserDetails(token: string) {
  try {
     const response = await UserService.getData("/auth/me",token)
    return response?.data?.data; // Assuming the API returns { data: { user details } }
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null;
  }
}

// Define protected routes that require authentication
const PROTECTED_ROUTES = [
  '/profile-info',
  '/apartment-history', 
  '/hotel-history',
  '/tour-history',
  '/delete-account',
  '/vendor-verification',
  '/property-list',
  '/apartment',
  '/hotel',
  '/toure',
  '/tours'
];

// Define admin-only routes
const ADMIN_ROUTES = [
  '/dashboard'
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

  // Check if current path is a protected route
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
  const isAdminRoute = ADMIN_ROUTES.some(route => pathname.startsWith(route));
  const isPublicAuthRoute = PUBLIC_AUTH_ROUTES.some(route => pathname.startsWith(route));

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
    
    // Protected user routes
    '/profile-info/:path*',
    '/apartment-history/:path*',
    '/hotel-history/:path*', 
    '/tour-history/:path*',
    '/delete-account/:path*',
    '/vendor-verification/:path*',
    '/property-list/:path*',
    '/apartment/:path*',
    '/hotel/:path*',
    '/toure/:path*',
    '/tours/:path*',
    
    // Public auth routes
    '/login',
    '/registration',
    '/forgot-password',
    '/verify-email',
    '/otp-verification',
    '/new-password'
  ],
};


