'use client'

import React from "react"
import SignIn from '@/app/_components/SignIn'
import { useRouter } from 'next/navigation'

export default function SignInPage(){
    const router = useRouter()
    const handleSignIn = async (email: string, password: string) => {
        const response = await fetch("http://localhost:2137/api/v1/auth/login",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: email, password: password})
        })

        console.log(response)

        if(response.status === 200){
            //setting token to cookie

            const data = await response.json()
            const setCookie = await fetch("http://localhost:3000/api/token/set", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({token: data.token})
            })

            if(setCookie.status === 200)
                return router.push("/map")
        }

        console.log("Error")
    }

    return(
        <SignIn handleSignIn={handleSignIn}/>
    )
}