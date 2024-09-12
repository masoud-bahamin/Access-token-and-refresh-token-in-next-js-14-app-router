import { verifyToken } from "@/utils/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const myCookies = req.cookies.get("access-token")?.value;
  
    if (!myCookies)
      return NextResponse.json(
    { resulte: false, message: "token not found" },
    { status: 401 }
  );
  
  const info = verifyToken(myCookies);

    if (!info)
      return NextResponse.json(
        { resulte: false, message: "token not found" },
        { status: 401 }
      );
      
    return NextResponse.json(
      { resulte: true, message: "getMe", info },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ resulte: false, error }, { status: 500 });
  }
}
