import { cookies } from 'next/headers'
import {NextResponse} from "next/server";

export async function GET(){
    const cookie = await cookies()
    const token = await cookie.get("token")

    return NextResponse.json({ success: !!token, token: token ? token.value : null }, { status: 200 })
}