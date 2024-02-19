import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  console.log("miiiiiidll", req.nextUrl);
  const token = req.cookies.get("token");
  console.log(token);

  if (token?.value) {
    NextResponse.redirect(new URL("/home", req.url));
  }
}

export const config = {
  matcher: ["/signup"],
};
