import {NextRequest, NextResponse} from "next/server";
import {isTokenValid, getTokenPayload} from "@/lib/helpers";

export async function middleware(req: NextRequest) {
    if(req.nextUrl.pathname.startsWith('/auth')){
        if(!req.cookies.has('token')) return NextResponse.next()

        const token = req.cookies.get('token') || {value: ""}

        const validToken = await isTokenValid(token.value)

        if(!validToken){
            req.cookies.delete('token')
            return NextResponse.next()
        }

        return NextResponse.redirect("http://localhost:3000/user")
    }


    if(req.nextUrl.pathname.startsWith('/admin')){
        if(!req.cookies.has('token')) return NextResponse.redirect("http://localhost:3000/auth/signin")

        const token = req.cookies.get('token') || {value: ""}

        if(!await isTokenValid(token.value)){
            req.cookies.delete('token')
            return NextResponse.redirect("http://localhost:3000/auth/signin")
        }

        const payload = await getTokenPayload(token.value)

        if (!payload){
            req.cookies.delete('token')
            return NextResponse.redirect("http://localhost:3000/auth/signin")
        }

        if (payload.role.toLowerCase() !== "admin" && payload.role.toLowerCase() !== "shipowner")
            return NextResponse.redirect("http://localhost:3000/user")
    }


    if(req.nextUrl.pathname.startsWith('/user')){
        if(!req.cookies.has('token')) return NextResponse.redirect("http://localhost:3000/auth/signin")

        const token = req.cookies.get('token') || {value: ""}

        if(!await isTokenValid(token.value)){
            req.cookies.delete('token')
            return NextResponse.redirect("http://localhost:3000/auth/signin")
        }
    }
}

export const config = {
    matcher: ['/admin/:path*', '/user/:path*', '/auth/:path*'],
}