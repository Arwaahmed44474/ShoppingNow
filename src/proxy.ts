
// only one 

import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
    '/cart',
    '/cheakout',
    '/profile',
    '/wishlist',
    '/myorders'
];

const authRoutes = [
    '/login',
    '/signup',
    '/forget-password',
    '/reset-password'
];
export function proxy (request:NextRequest) {
    const { pathname } = request.nextUrl  // /cart   /login
    
    const token = request.cookies.get('token')?.value || null;

    // !! convert value to boolean
    const isAuth = !!token;


    const isProtectedRoute = protectedRoutes.some((route) => {
        pathname == route || pathname.startsWith(`${route}/`);
    });

    const isAuthRouted = authRoutes.some((route) => {
        pathname == route || pathname.startsWith(`${route}/`);
    })

    if (isProtectedRoute && !isAuth) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    if (isAuthRouted && isAuth) {
        const loginUrl = new URL('/', request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}


export const config = {
    matcher: [
    '/profile/:path*',
    '/checkout/:path*',
    '/cart/:path*',
    '/wishlist/:path*',
    '/myorders/:path*',
    '/login/:path*',
    '/signup/:path*',
    '/forget-password/:path*',
    '/reset-password/:path*',
  ],
}