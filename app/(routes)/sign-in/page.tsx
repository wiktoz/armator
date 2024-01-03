'use client'

import React from "react"
import SignIn from '@/app/_components/SignIn'
import { cookies } from "next/headers"

export default function SignInPage(){
    const handleSignIn = async (email: string, password: string) => {
        const response = await fetch("http://localhost:2137/api/v1/auth/login",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: email, password: password})
        })

        console.log(response)

        const data = await response.json()

        console.log(data)


    }

    return(
        <SignIn handleSignIn={handleSignIn}/>
    )
}