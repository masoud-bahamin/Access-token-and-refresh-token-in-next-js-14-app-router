import { userModel } from "@/models/user";
import connectToDb from "@/utils/connectToDb";
import { createToken, verifyToken } from "@/utils/jwt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const headers = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  'Content-Type': 'application/json',
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH"
}

export async function POST(req: NextRequest) {
  try {
    const Cookies = cookies()
    const refreshCookie = Cookies.get("refresh-token")?.value

    if (!refreshCookie)
      return NextResponse.json(
        { resulte: false, message: "token not found" },
        { status: 403, headers }
      );

    const email = verifyToken(refreshCookie)
    if (!email) {
      return NextResponse.json(
        { resulte: false, message: "refresh-token expired" },
        { status: 401, headers })
    }
    connectToDb()
    const user = await userModel.findOne({ email },)

    if (user.refreshToken !== refreshCookie) {
      return NextResponse.json(
        { resulte: false, message: "refresh-token not valid" },
        { status: 401, headers })
    }

    const accesstoken = createToken(email);
    const date = new Date()
    const expiredToken = date.getTime() + 10000

    Cookies.set({ name: "access-token", value: accesstoken, httpOnly: true, maxAge: 1000, path: "/" })
    Cookies.set("expired-token", expiredToken.toString(), { maxAge: 30 * 24 * 60 * 60, path: "/" })


    return NextResponse.json(
      { resulte: true, message: "access token changed", accesstoken, expiredToken },
      { status: 200, headers }
    );
  } catch (error) {
    return NextResponse.json({ resulte: false, error }, { status: 500, headers });
  }
}

