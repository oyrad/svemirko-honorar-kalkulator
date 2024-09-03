import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const protectedRoutes = ['/', '/report', '/gigs'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // If the user is trying to access /login, check if they are already authenticated
  if (pathname.startsWith('/login')) {
    const token = req.cookies.get('auth-token');

    // If the token is valid, redirect to home ('/')
    if (token) {
      try {
        await jwtVerify(
          token.value,
          new TextEncoder().encode(process.env.JWT_SECRET),
        );
        return NextResponse.redirect(new URL('/', req.url));
      } catch (error) {
        // If token verification fails, allow them to proceed to /login
        return NextResponse.next();
      }
    }

    // If there's no token, allow them to proceed to /login
    return NextResponse.next();
  }

  // Check for protected routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = req.cookies.get('auth-token');

    // If no token, redirect to /login
    if (!token) {
      console.log(req);
      return NextResponse.redirect(
        new URL(`/login?redirectTo=${req.url}`, req.url),
      );
    }

    // If token exists, verify it
    try {
      await jwtVerify(
        token.value,
        new TextEncoder().encode(process.env.JWT_SECRET),
      );
      return NextResponse.next();
    } catch (error) {
      // If verification fails, redirect to /login
      return NextResponse.redirect(
        new URL(`/login?redirectTo=${req.url}`, req.url),
      );
    }
  }

  // If the route is not protected, allow access
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/report/:path*', '/gigs/:path*', '/login'],
};
