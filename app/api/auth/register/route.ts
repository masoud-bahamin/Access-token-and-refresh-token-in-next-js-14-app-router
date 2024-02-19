import { userModel } from "@/models/user";
import connectToDb from "@/utils/connectToDb";
import { hashPassword } from "@/utils/hashPassword";
import { createToken } from "@/utils/jwt";
import { registerValidator } from "@/utils/validations/server/user";
import { NextResponse } from "next/server";
const cookie = require("cookie");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;
    console.log(body);
    const validation = registerValidator(body);
    if (validation !== true)
      return NextResponse.json({ validation }, { status: 400 });
    const hashedPassword = await hashPassword(password);

    connectToDb();
    const user = await userModel.create({
      email,
      password: hashedPassword,
    });

    const token = createToken(email);

    return NextResponse.json(
      { resulte: true, message: "registration was successfully" },
      {
        status: 201,
        headers: {
          "Set-Cookie": cookie.serialize("token", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            path: "/",
          }),
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ resulte: false, error }, { status: 500 });
  }
}
