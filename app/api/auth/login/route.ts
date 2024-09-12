import { userModel } from "@/models/user";
import connectToDb from "@/utils/connectToDb";
import { comparePassword } from "@/utils/hashPassword";
import { createRefreshToken, createToken } from "@/utils/jwt";
import { registerValidator } from "@/utils/validations/server/user";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'
const cookie = require("cookie");

const headers = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  'Content-Type': 'application/json',
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH"
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const validation = registerValidator({ email, password });
    if (validation !== true)
      return NextResponse.json({ validation }, { status: 400, headers });
    connectToDb();
    const user = await userModel.findOne({ email });
    if (user === null)
      return NextResponse.json(
        { message: "email is invalid" },
        { status: 422, headers }
      );
    const invalidUser = await comparePassword(password, user.password);
    if (!invalidUser)
      return NextResponse.json(
        { message: "email or password is invalid" },
        { status: 422, headers }
      );

    const accesstoken = createToken(email);
    const refreshToken = createRefreshToken(email);
    const date = new Date()
    const expiredToken = date.getTime() + 20000

    const Cookies = cookies()
    Cookies.set("refresh-token", refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      secure: true
    })
    Cookies.set("access-token", accesstoken, { httpOnly: true, maxAge: 1000 })
    Cookies.set("expired-token", expiredToken.toString(), { maxAge: 30 * 24 * 60 * 60 })

    const updateUser = await userModel.findOneAndUpdate({ email }, { refreshToken: refreshToken })

    return NextResponse.json(
      { resulte: true, message: "logined successfully", accesstoken, refreshToken, expiredToken },
      { status: 200, headers }
    );
  } catch (error) {
    return NextResponse.json({ resulte: false, error }, { status: 500, headers });
  }
}
