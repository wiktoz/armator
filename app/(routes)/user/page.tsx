'use client'

import useSWR from "swr";
import {fetcher} from "@/lib/helpers";
import {LuArrowRight, LuChevronRight} from "react-icons/lu"
import {useState} from "react";
import EditPersonalData from "@/app/_components/user/EditPersonalData";
import EditAddress from "@/app/_components/user/EditAddress";
import Link from "next/link";
import FetchError from "@/app/_components/errors/FetchError";
import UsersLoader from "@/app/_components/loaders/UsersLoader";
import Cargos from "@/app/_components/user/Cargos";
import OrderCargo from "@/app/_components/user/OrderCargo";

const UserPage = () => {
    const [openTab, setOpenTab] = useState("")

    const { data: user, error: userErr, isLoading: isUserLoading, mutate }
        = useSWR<User>('http://localhost:2137/api/v1/user/me', fetcher)

    return(
        <div className={"p-4"}>
            <div className={"flex flex-col md:flex-row gap-6"}>
                <div>
                <div className={"inline-flex flex-col rounded-2xl shadow bg-white p-8"}>
                    <div className={"p-4 inline-flex flex-col"}>
                        <div className={"text-sm"}>
                            <p className="font-semibold">My account</p>
                        </div>
                        <div className={"rounded h-px bg-primary my-2"}>

                        </div>
                        <div className={"text-xs flex flex-col gap-1"}>
                            <div className={"flex flex-row gap-1 items-center hover:cursor-pointer"} onClick={() => setOpenTab("personal")}>
                                <p>Personal information</p>
                                <LuArrowRight/>
                            </div>
                            <div className={"flex flex-row gap-1 items-center hover:cursor-pointer"} onClick={() => setOpenTab("address")}>
                                <p>Address</p>
                                <LuArrowRight/>
                            </div>
                        </div>
                    </div>
                    <div className={"p-4 inline-flex flex-col"}>
                        <div className={"text-sm"}>
                            <p className="font-semibold">Cargos</p>
                        </div>
                        <div className={"rounded h-px bg-primary my-2"}>

                        </div>
                        <div className={"text-xs flex flex-col gap-1"}>
                            <div className={"flex flex-row gap-1 items-center hover:cursor-pointer"} onClick={() => setOpenTab("cargos")}>
                                <p>Ordered cargos</p>
                                <LuArrowRight/>
                            </div>
                            <div className={"flex flex-row gap-1 items-center hover:cursor-pointer"} onClick={() => setOpenTab("order")}>
                                <p>Order a new cargo</p>
                                <LuArrowRight/>
                            </div>
                        </div>
                    </div>
                    {
                        user?.role.toLowerCase() === "admin" || user?.role.toLowerCase() === "shipowner" &&
                        <div className={"p-4 inline-flex flex-col"}>
                            <div className={"text-sm"}>
                                <p className="font-semibold">Shipowner</p>
                            </div>
                            <div className={"rounded h-px bg-primary my-2"}>

                            </div>
                            <div className={"text-xs flex flex-col gap-1"}>
                                <div className={"flex flex-row gap-1 items-center"}>
                                    <Link href={"/admin"} className={"flex flex-row gap-1 items-center"}>
                                        <p>Manage</p>
                                        <LuArrowRight/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                </div>
                <div className={"flex grow p-8 rounded-2xl shadow bg-white"}>
                    {
                        openTab === "personal" ?
                            <div className={"flex flex-col gap-2 grow"}>
                                {
                                    userErr ?
                                        <FetchError message={"Cannot find API endpoint. Try again later."}/> :

                                    isUserLoading ?
                                        <UsersLoader/> :

                                    !user ?
                                        <FetchError message={"Authentication error. You have no permission to read this data."}/> :

                                    <EditPersonalData user={user} mutate={mutate}/>
                                }
                            </div>
                            :
                        openTab === "address" ?
                            <div className={"flex flex-col gap-2 grow"}>
                                {
                                    userErr ?
                                        <FetchError message={"Cannot find API endpoint. Try again later."}/> :

                                    isUserLoading ?
                                        <UsersLoader/> :

                                    !user ?
                                        <FetchError message={"Authentication error. You have no permission to read this data."}/> :

                                    <EditAddress user={user} mutate={mutate}/>
                                }
                            </div>
                            :
                        openTab === "cargos" ?
                            <div className={"flex flex-col gap-2 grow"}>
                                <Cargos/>
                            </div>
                            :
                        openTab === "order" ?
                            <div className={"flex flex-col gap-2 grow"}>
                                {
                                    userErr ?
                                        <FetchError message={"Cannot find API endpoint. Try again later."}/> :

                                    isUserLoading ?
                                        <UsersLoader/> :

                                    !user ?
                                        <FetchError message={"Authentication error. You have no permission to read this data."}/> :

                                        <OrderCargo user={user}/>
                                }
                            </div>
                            :

                        <div className={"flex flex-col my-auto"}>
                            <div className={"text-2xl font-bold"}>Hello, {user?.firstname} 👋</div>
                            <div className={"text-sm my-2"}>Pick an option from menu to begin.</div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default UserPage