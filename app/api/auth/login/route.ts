import { userModel } from "@/models/user";
import connectToDb from "@/utils/connectToDb";
import { comparePassword } from "@/utils/hashPassword";
import { createToken } from "@/utils/jwt";
import { registerValidator } from "@/utils/validations/server/user";
import { NextResponse } from "next/server";
const cookie = require("cookie");

export async function POST(req: NextResponse) {
  try {
    const { email, password } = await req.json();
    const validation = registerValidator({ email, password });
    if (validation !== true)
      return NextResponse.json({ validation }, { status: 400 });
    connectToDb();
    const user = await userModel.findOne({ email });
    if (user === null)
      return NextResponse.json(
        { message: "email is invalid" },
        { status: 422 }
      );
    const invalidUser = await comparePassword(password, user.password);
    if (!invalidUser)
      return NextResponse.json(
        { message: "email or password is invalid" },
        { status: 422 }
      );

    const token = createToken(email);

    return NextResponse.json(
      { resulte: true, message: "logined successfully" },
      {
        status: 200,
        headers: {
          "Set-Cookie": cookie.serialize("token", token, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24,
            secure: false,
            sameSite: "strict",
          }),
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ resulte: false, error }, { status: 500 });
  }
}
