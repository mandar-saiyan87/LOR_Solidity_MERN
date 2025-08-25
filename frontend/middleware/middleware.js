import { NextResponse } from "next/server";

export function middleware(req) {
    const token = req.cookies.get("auth_token").value

    const url = req.nextUrl.close()

    if (!token) {
        url.pathname = "/auth/login"
        return NextResponse.redirect(new URL('/login'))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard/:path*"]
}