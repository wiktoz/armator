'use client'

import React, {useState} from "react"
import Input from "@/app/_components/form/Input"
import { useRouter } from 'next/navigation'
import {useForm} from "react-hook-form"
import {resolver} from "@/app/_components/validation/schema/signin"
import Spinner from "@/app/_components/Spinner"

interface SignInData {
    email: string,
    password: string
}

export default function SignInPage(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<SignInData>({resolver})

    const handleSignIn = async (data: SignInData) => {
        setIsLoading(true)
        const response = await fetch("http://localhost:2137/api/v1/auth/login",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: data.email, password: data.password})
        })

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
                return router.push("/")

            setIsLoading(false)
            return setMessage("Cannot set cookie. Please enable cookie usage.")
        }

        setIsLoading(false)
        return setMessage("Incorrect data")
    }

    return(
        <div className={"flex w-full justify-center my-10"}>
            <div className={"w-2/3 md:w-1/3"}>
                <div className={"font-bold text-2xl mb-4"}>
                    Sign In
                </div>
            <form onSubmit={handleSubmit(handleSignIn)}>
                <Input id={"email"}
                       title={"email"}
                       type={"text"}
                       autoComplete={true}
                       value={email}
                       errors={errors}
                       checker={register}
                       setter={setEmail}
                />
                <Input id={"password"}
                       title={"password"}
                       type={"password"}
                       autoComplete={true}
                       value={password}
                       errors={errors}
                       checker={register}
                       setter={setPassword}
                />
                { message ?
                    <div className={"text-xs text-red-600"}>
                        {message}
                    </div>
                    : null
                }
                <button className={"w-full bg-primary p-2 text-white rounded-lg text-sm mt-2"}>
                    {
                        isLoading ?
                            <div className={"flex text-center justify-center"}><Spinner /></div>
                            : "Sign In"
                    }
                </button>
            </form>
            </div>
        </div>
    )
}