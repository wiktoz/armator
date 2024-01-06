'use client'

import {
    LuMail,
    LuMapPin,
    LuBox,
    LuShip,
    LuContainer,
    LuUsers2,
    LuUser2,
    LuServerOff,
    LuUserCog2,
    LuStar
} from "react-icons/lu"

import useSWR from "swr"
import {fetcher, logout} from "@/lib/helpers"
import Spinner from "@/app/_components/Spinner";
import Accordion from "@/app/_components/Accordion";
import Tooltip from "@/app/_components/Tooltip";
import FetchError from "@/app/_components/errors/FetchError";
import UsersLoader from "@/app/_components/loaders/UsersLoader";
import {useRouter} from "next/navigation";

interface Port extends Address {
    portId: number,
    maxLoadsNumber: number,
    loadsNumber: number
}

interface Load {
    loadId: number,
    content: string,
    weight: number,
    price: number,
    customer: Customer,
    srcPortId: Port,
    dstPortId: Port,
    status: string
}

interface Address {
    city: string,
    street: string,
    zipCode: string,
    houseNumber?: string,
    flatNumber?: string
}

interface Customer extends Address {
    id: number,
    companyName: string,
    email: string
}

interface User {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    role: string,
    enabled: boolean,
    accountNonExpired: boolean,
    credentialsNonExpired: boolean,
    authorities: [
        {
            authority: string
        }
    ],
    username: string,
    accountNonLocked: boolean
}

export default function Home(){
    const router = useRouter()

    const { data: user, error: userErr, isLoading: isUserLoading } = useSWR<User>('http://localhost:2137/api/v1/user/me', fetcher)
    const { data: users, error: usersErr, isLoading: isUsersLoading } = useSWR<User[]>('http://localhost:2137/api/v1/user/all', fetcher)
    const { data: loads, error: loadsErr, isLoading: isLoadsLoading } = useSWR<Load[]>('http://localhost:2137/api/v1/load/all', fetcher)

    const loggingOut = async () => {
        if(await logout()) router.push("/auth/signin")
    }

    return(
        <div>
            <div className={"p-4 pb-0 text-xs"}>
                <div className={"flex flex-row gap-1 items-center"}>
                    <div className={"align-bottom"}>Logged in as</div>
                    {
                        userErr ?
                            <div className={"text-sm font-semibold text-gray-800 flex flex-row items-center gap-1"}>
                                <LuServerOff/>
                                Fetch error
                            </div>
                            :
                        isUserLoading ?
                            <div>
                                <Spinner/>
                            </div>
                            :
                            <div className={"font-semibold text-sm"}>
                                {user?.firstname} {user?.lastname} ({user?.role.toLowerCase()})
                                <span onClick={loggingOut} className={"mx-1 font-bold"}>Logout</span>
                            </div>
                    }
                </div>
            </div>
            <div className={"p-4"}>
                <div className={"flex flex-row gap-1 text-gray-700 mb-4"}>
                    <div>
                        <LuUsers2 size={"1.5em"} className={"h-full"} />
                    </div>
                    <div className={"text-2xl font-bold"}>
                        Users
                    </div>
                </div>
                <div className={"flex flex-col gap-1 mx-4"}>
                    {
                        usersErr ?
                            <FetchError message={"Cannot find API endpoint. Try again later."}/> :

                        isUsersLoading ?
                            <UsersLoader/> :

                        !users ?
                            <FetchError message={"Authentication error. You have no permission to read this data."}/> :

                        <div className={"grid md:grid-cols-3 gap-2"}>
                            {
                            users.length > 0 && users.map(u => {
                                return(
                                    <div key={u.id} className={"rounded-lg border border-primary px-6 py-2"}>
                                        <div className={"flex flex-row gap-2"}>
                                            <div className={"my-auto text-xl"}>
                                                {
                                                    u.role.toLowerCase() === "admin" ?
                                                        <Tooltip text={"admin"}>
                                                            <LuStar/>
                                                        </Tooltip>

                                                        : <LuUser2/>
                                                }
                                            </div>
                                            <div className={"grow mx-4"}>
                                                <div className={"flex flex-row text-xs items-center"}>

                                                    <p className={"text-primary font-semibold text-xs"}>
                                                        {u.firstname} {u.lastname}
                                                    </p>
                                                </div>
                                                <p className={"text-sm font-normal"}>{u.email}</p>
                                            </div>
                                            <div className={"hover:cursor-pointer hover:text-gray-600 text-lg"}>
                                                <Tooltip text={"Manage user"}>
                                                    <LuUserCog2/>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            }
                        </div>
                    }
                </div>
            </div>
            <div className={"p-4"}>
                <div className={"flex flex-row gap-1 text-gray-700 mb-4"}>
                    <div>
                        <LuContainer size={"1.5em"} className={"h-full"} />
                    </div>
                    <div className={"text-2xl font-bold"}>
                        Loads
                    </div>
                </div>
                <div className={"flex flex-col gap-1 mx-4"}>
                    {
                        loadsErr ?
                            <FetchError message={"Cannot find API endpoint. Try again later."}/> :

                        isLoadsLoading ?
                            <UsersLoader/> :

                        !loads ?
                            <FetchError message={"Authentication error. You have no permission to read this data."}/> :

                        <div className={"grid md:grid-cols-2 gap-2"}>
                            {
                                loads && loads.length > 0 && loads.map(l => {
                                    return(
                                        <div key={l.loadId} className={"rounded-lg border border-primary px-6 py-2"}>
                                            <div className={"flex flex-row gap-2"}>
                                                <div className={"my-auto"}>
                                                    <LuBox className={"text-xl"}/>
                                                </div>
                                                <div className={"grow mx-4"}>
                                                    <div className={"grid grid-cols-3 gap-2"}>
                                                        <div className={"flex flex-col col-span-3"}>
                                                            <Accordion title={"customer"}>
                                                                <div className={"flex flex-col gap-2"}>
                                                                    <div className={"font-semibold"}>
                                                                        {l.customer.companyName}
                                                                    </div>
                                                                    <div className={"flex flex-row items-center text-sm gap-2"}>
                                                                        <LuMail className={"text-xs"}/>
                                                                        <p>{l.customer.email}</p>
                                                                    </div>
                                                                    <div className={"flex flex-row items-center text-sm gap-2"}>
                                                                        <LuMapPin className={"text-xs"}/>
                                                                        <div>
                                                                            <p>{l.customer.street} {l.customer.houseNumber}/{l.customer.flatNumber}</p>
                                                                            <p>{l.customer.zipCode} {l.customer.city}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Accordion>
                                                        </div>

                                                        <div className={"col-span-2"}>
                                                            <hr className="h-[0.5px] my-1 bg-gray-500 border-0"/>
                                                        </div>
                                                        <div></div>

                                                        <div className={"flex flex-col"}>
                                                            <div className={"text-xs font-bold"}>content</div>
                                                            <div className={"text-sm"}>{l.content}</div>
                                                        </div>
                                                        <div className={"flex flex-col"}>
                                                            <div className={"text-xs font-bold"}>weight</div>
                                                            <div className={"text-sm"}>
                                                                {l.weight}
                                                                <span className={"text-xs ml-0.5"}>kg</span>
                                                            </div>
                                                        </div>
                                                        <div></div>

                                                        <div className={"flex flex-col"}>
                                                            <div className={"text-xs font-bold"}>from</div>
                                                            <div className={"text-sm"}>{l.srcPortId.city}</div>
                                                        </div>
                                                        <div className={"flex flex-col"}>
                                                            <div className={"text-xs font-bold"}>to</div>
                                                            <div className={"text-sm"}>{l.dstPortId.city}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <span
                                                        className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
                                                        {l.status.toLowerCase()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                </div>
            </div>
            <div className={"p-4"}>
                <div className={"flex flex-row gap-1 text-gray-700 mb-4"}>
                    <div>
                        <LuShip size={"1.5em"} className={"h-full"} />
                    </div>
                    <div className={"text-2xl font-bold"}>
                        Ships
                    </div>
                </div>
                <UsersLoader/>
            </div>
        </div>
    )
}