import { cookies } from 'next/headers'

export async function GET(){
    const token = cookies().get('TOKEN')

    return Response.json({ success: !!token, token: token ? token.value : null }, { status: 200 })
}