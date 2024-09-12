import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function middleware(req: NextRequest) {
  const Cookies = cookies()
  const expiredToken = Cookies.get("expired-token")?.value;
  const refreshToken = Cookies.get("refresh-token")?.value;
  const accessToken = Cookies.get("access-token")?.value;

  if (!expiredToken || !accessToken) {
    return NextResponse.redirect(new URL("signin", req.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard" ],
};
