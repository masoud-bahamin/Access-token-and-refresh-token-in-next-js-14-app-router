import { userModel } from "@/models/user";
import connectToDb from "@/utils/connectToDb";
import { hashPassword } from "@/utils/hashPassword";
import { createRefreshToken, createToken } from "@/utils/jwt";
import { registerValidator } from "@/utils/validations/server/user";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
const cookie = require("cookie");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;
    const validation = registerValidator(body);
    if (validation !== true)
      return NextResponse.json({ validation }, { status: 400 });
    const hashedPassword = await hashPassword(password);
    const accesstoken = createToken(email);
    const refreshToken = createRefreshToken(email);

    connectToDb();
    const user = await userModel.create({
      email,
      password: hashedPassword,
      refreshToken
    });
 
    const date = new Date()
    const expiredToken = date.getTime() + 20000

    const Cookies = cookies()
    Cookies.set("refresh-token", refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path:"/",
      secure: true
    })
    Cookies.set("access-token", accesstoken , {httpOnly:true , maxAge : 1000})
    Cookies.set("expired-token", expiredToken.toString(), {maxAge : 30 * 24 * 60 * 60})

    const updateUser = await userModel.findOneAndUpdate({email},{refreshToken :  refreshToken} )
    return NextResponse.json(
      { resulte: true, message: "registration was successfully" },
      {
        status: 201,
        headers: {
          "Set-Cookie": cookie.serialize("access-token", accesstoken, {
            httpOnly: true,
            maxAge: 60 ,
            path: "/",
          }),
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ resulte: false, error }, { status: 500 });
  }
}
