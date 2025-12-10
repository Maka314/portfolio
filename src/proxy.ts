import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function proxy(request: NextRequest) {
  console.log(request.cookies.get('admin_token')?.value);
  
  if (request.nextUrl.pathname.startsWith('/login') && request.cookies.get('admin_token')?.value){
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  // Only protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || 'default_secret_key_change_me'
      )
      await jwtVerify(token, secret)
      return NextResponse.next()
    } catch {
      // Token invalid or expired
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
