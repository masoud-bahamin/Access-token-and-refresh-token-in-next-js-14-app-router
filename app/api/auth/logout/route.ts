import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function POST() {
    try {
        const Cookies = cookies()
        Cookies.delete("refresh-token")
        Cookies.delete("access-token")
        Cookies.delete("expired-token")
        return NextResponse.json({ result: true })
    } catch (error) {
        return NextResponse.json({ result: false })
    }

}