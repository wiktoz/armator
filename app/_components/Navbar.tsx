'use client'

import {LuServerOff, LuShip, LuLogOut, LuLogIn} from "react-icons/lu"
import useSWR from "swr";
import {fetcher, logout} from "@/lib/helpers";
import Spinner from "@/app/_components/Spinner";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import {useEffect} from "react";

export default function Navbar(){
    const router = useRouter()
    const pathname = usePathname()
    const { data: user, error: userErr, isLoading: isUserLoading, mutate } =
        useSWR<User>('http://localhost:2137/api/v1/user/me', fetcher)

    useEffect(() => {
        mutate()
    },[mutate, pathname])


    const loggingOut = async () => {
        if(await logout()){
            router.push("/auth/signin")
        }
    }

    return(
        <div>
            <div className={"flex flex-row bg-primary px-8 py-8 text-slate-100 justify-between"}>
                <div className={"flex flex-row items-center"}>
                    <div>
                        <LuShip size={"2em"} className={"h-full"}/>
                    </div>
                    <div>
                        <p className={"font-bold tracking-wider text-xl align-middle pt-1 pl-2"}>Shipowner</p>
                    </div>
                </div>
                <div className={"p-4"}>
                    {
                        isUserLoading || userErr || user ?
                        <div className={"flex flex-row gap-1 items-center"}>
                            <div>
                            {
                                userErr ?
                                <div className={"text-sm font-semibold flex flex-row items-center gap-1"}>
                                    <LuServerOff/>
                                    Fetch error
                                </div>
                                :
                                isUserLoading ?
                                <div>
                                    <Spinner/>
                                </div>
                                :
                                <div className={"flex flex-col gap-1 text-sm"}>
                                    <div className={"flex flex-row items-center gap-1"}>
                                        <div className={"text-xs font-normal"}>
                                            Logged in as
                                        </div>
                                        <div className={"font-semibold"}>
                                            <Link href={"/user"}>
                                                {user?.firstname} {user?.lastname} ({user?.role.toLowerCase()})
                                            </Link>
                                        </div>
                                    </div>
                                    <div className={"flex flex-row justify-end gap-1 items-center"}>
                                        <LuLogOut onClick={loggingOut} className={"hover:cursor-pointer"} />
                                        <p className={"font-normal hover:cursor-pointer"} onClick={loggingOut}>Logout</p>
                                    </div>
                                </div>
                            }
                            </div>
                        </div>
                        :
                        <div className={"text-sm"}>
                            <Link href={"/auth/signin"}>
                                <div className={"flex flex-row items-center gap-1"}>
                                    <LuLogIn/>
                                    <p>sign in</p>
                                </div>
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}