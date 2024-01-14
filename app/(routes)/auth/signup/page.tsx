'use client'

import React, {useState} from "react"
import Input from "@/app/_components/form/Input"
import { useRouter } from 'next/navigation'
import {useForm} from "react-hook-form"
import {resolver} from "@/app/_components/validation/schema/signup"
import Spinner from "@/app/_components/Spinner"
import {LuUserPlus2} from "react-icons/lu";

interface SignUpData extends Address {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    password2: string
}

export default function SignUpPage(){
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<SignUpData>({resolver})

    const handleSignIn = async (data: SignUpData) => {
        setIsLoading(true)

        try {
            const response = await fetch("http://localhost:2137/api/v1/auth/customer/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: data.email, password: data.password})
            })

            if (response.status === 200) {
                const data = await response.json()

                if(data.registered){
                    setSuccess(true)
                    setMessage("Successfully registered. Redirecting to Sign In...")

                    return setTimeout(() => {
                        return router.push("/auth/signin")
                    }, 500)
                }

                setSuccess(false)
                setMessage(data.message)
                return setIsLoading(false)
            }
        } catch (err){
            setIsLoading(false)
            return setMessage("Fetch error. Cannot connect to API.")
        }
    }

    return(
        <div className={"flex w-full justify-center my-12"}>
            <div className={"rounded-2xl shadow bg-white p-8 py-12"}>
                <div className={"font-bold text-xl flex flex-row items-center gap-1 text-gray-800"}>
                    <LuUserPlus2/>
                    <p>Sign Up</p>
                </div>
                <div className={"text-gray-500 text-xs mb-6"}>
                    Register a new customer account
                </div>
                <form onSubmit={handleSubmit(handleSignIn)}>
                    <div className={"grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8"}>
                        <div className={""}>
                            <Input id={"firstname"}
                                   title={"name"}
                                   type={"text"}
                                   autoComplete={true}
                                   errors={errors}
                                   checker={register}
                            />
                            <Input id={"lastname"}
                                   title={"surname"}
                                   type={"text"}
                                   autoComplete={true}
                                   errors={errors}
                                   checker={register}
                            />
                        </div>
                        <div className={"hidden md:cols-span-1 md:block"}></div>
                        <div className={""}>
                            <Input id={"email"}
                                   title={"email"}
                                   type={"text"}
                                   autoComplete={true}
                                   errors={errors}
                                   checker={register}
                            />
                            <Input id={"password"}
                                   title={"password"}
                                   type={"password"}
                                   autoComplete={true}
                                   errors={errors}
                                   checker={register}
                            />
                            <Input id={"password2"}
                                   title={"repeat password"}
                                   type={"password"}
                                   autoComplete={true}
                                   errors={errors}
                                   checker={register}
                            />
                        </div>
                        <div className={"my-6 h-px bg-gray-100 rounded-2xl md:hidden cols-span-2"}></div>
                        <div className={""}>
                            <Input id={"street"}
                                   title={"street"} type={"text"}
                                   errors={errors} checker={register} />
                            <div className={"flex gap-2"}>
                                <Input id={"houseNumber"}
                                       title={"house"} type={"text"}
                                       errors={errors} checker={register} />
                                <Input id={"flatNumber"} title={"flat"} type={"text"}
                                       errors={errors} checker={register} />
                            </div>

                            <div className={"flex gap-2"}>
                                <div className={"w-1/3"}>
                                    <Input id={"zipCode"}
                                           title={"zip code"} type={"text"}
                                           errors={errors} checker={register} />
                                </div>
                                <div className={"w-2/3"}>
                                    <Input id={"city"} title={"city"} type={"text"}
                                           errors={errors} checker={register} />
                                </div>
                            </div>
                        </div>
                    </div>

                    { message ?
                        <div className={"text-xs " + ( success ? "text-green-600" : "text-red-600")}>
                            {message}
                        </div>
                        : null
                    }
                    <button className={"w-full bg-primary p-2 text-white rounded-lg text-sm mt-4"}>
                        {
                            isLoading ?
                                <div className={"flex text-center justify-center"}><Spinner /></div>
                                : "Sign Up"
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}