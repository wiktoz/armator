import { cookies } from "next/headers"

export async function POST(req: Request, res: Response){
    const body = await req.json()

    cookies().set({
        name: 'token',
        value: body.token,
        maxAge: 60 * 60, // one hour
        httpOnly: true,
        path: '/',
    })

    return Response.json({ success: true }, { status: 200 });
}