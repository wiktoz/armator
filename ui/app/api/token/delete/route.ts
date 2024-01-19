import { cookies } from "next/headers"
import {NextResponse} from "next/server";

export async function GET(req: Request, res: Response){
    await cookies().delete("token")

    return NextResponse.json({ success: true }, { status: 200 });
}