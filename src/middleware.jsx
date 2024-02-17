import { NextResponse } from "next/server";
import { VerifyToken } from "./utilities/token";

export async function middleware(req, res) {
  const path = req.nextUrl.pathname;
  try {
    const token = req.cookies.get("token")['value'];
      if (path === "/login" || path === "/sign" || path === "/checkotp") {
        return NextResponse.redirect(new URL("/", req.url));
      }

      if (path === "/" || path==='/all' || path === "/my" || path === "/new" || path === '/api/alls/createmounth' || path === `/api/alls/createperson` || path === "/api/alls/person" || path === '/api/user/logout') {
        const decode = await VerifyToken(token);
        const requestHeader = new Headers(req.headers);
        requestHeader.set("email", decode["email"]);
        requestHeader.set("id", decode["id"]);
        return NextResponse.next({ request: { headers: requestHeader } });
      }
  } catch (e) {
    if (path.startsWith('/api/alls')) {
      return NextResponse.json({ status: 'fail', data: 'you dont have any token' });
    }
    if (path === '/' || path === '/my' || path === '/api/alls/mount') {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (path === '/login' || path === '/sign') {
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: ['/', '/login','/sign','/all','/my','/new','/all'],
}