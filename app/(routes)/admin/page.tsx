'use client'

import {
    LuMail,
    LuMapPin,
    LuBox,
    LuShip,
    LuContainer,
    LuUsers2,
    LuUser2,
    LuUserCog2,
    LuStar
} from "react-icons/lu"

import useSWR from "swr"
import {fetcher} from "@/lib/helpers"
import Accordion from "@/app/_components/Accordion";
import Tooltip from "@/app/_components/Tooltip";
import FetchError from "@/app/_components/errors/FetchError";
import UsersLoader from "@/app/_components/loaders/UsersLoader";
import Flag from 'react-world-flags'
import {getCountryCode} from "@/lib/countries";
import Link from "next/link";
import dynamic from "next/dynamic";
import Spinner from "@/app/_components/Spinner";

const MarkerBox = dynamic(() => import('@/app/_components/map/MarkerBox'), {
    ssr: false,
    loading: () => <div className={"flex items-center justify-center"}><Spinner/></div>
})
const SmallMap = dynamic(() => import('@/app/_components/map/SmallMap'), {
    ssr: false,
    loading: () => <div className={"flex items-center justify-center"}><Spinner/></div>
})

export default function Home(){
    const { data: users, error: usersErr, isLoading: isUsersLoading } = useSWR<User[]>('http://localhost:2137/api/v1/user/all', fetcher)
    const { data: loads, error: loadsErr, isLoading: isLoadsLoading } = useSWR<Load[]>('http://localhost:2137/api/v1/load/all', fetcher)
    const { data: ships, error: shipsErr, isLoading: isShipsLoading } = useSWR<Ship[]>('http://localhost:2137/api/v1/ship/all', fetcher)

    return(
        <div className={"p-4"}>
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
                                    <div key={u.id} className={"rounded-lg border border-primary"}>
                                        <div className={"flex flex-row gap-2"}>
                                            <div className={"flex items-center text-xl text-white bg-primary rounded-l-lg px-4"}>
                                                {
                                                    u.role.toLowerCase() === "admin" ?
                                                        <LuStar/> : <LuUser2/>
                                                }
                                            </div>
                                            <div className={"grow p-4"}>
                                                <p className={"text-primary font-semibold text-xs"}>
                                                    {u.firstname} {u.lastname}
                                                </p>
                                                <p className={"text-xs font-normal mb-1"}>{u.role.toLowerCase()}</p>
                                                <p className={"text-sm font-normal"}>{u.email}</p>
                                            </div>
                                            <div className={"hover:cursor-pointer hover:text-gray-600 text-lg flex items-center p-2"}>
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
                                        <div key={l.loadId} className={"rounded-lg border border-primary"}>
                                            <div className={"flex flex-row gap-2"}>
                                                <div className={"flex items-center text-white bg-primary rounded-l-lg px-4"}>
                                                    <LuBox className={"text-xl"}/>
                                                </div>
                                                <div className={"grow mx-4 p-4"}>
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
                    <div className={"text-sm mx-2 flex items-end mb-1"}>
                        <Link href={"/map"}>
                            show map
                        </Link>
                    </div>
                </div>
                <div className={"flex flex-col gap-1 mx-4"}>
                    {
                        shipsErr ?
                            <FetchError message={"Cannot find API endpoint. Try again later."}/> :

                        isShipsLoading ?
                            <UsersLoader/> :

                        !ships ?
                            <FetchError message={"Authentication error. You have no permission to read this data."}/> :

                        <div className={"grid md:grid-cols-2 gap-2"}>
                            {
                                ships && ships.length > 0 && ships.map(s => {
                                    return (
                                        <div key={s.shipId} className={"rounded-lg border border-primary"}>
                                            <div className={"flex flex-row justify-between gap-2"}>
                                                <div className={"flex flex-row gap-2 grow"}>
                                                    <div className={"p-4 flex items-center bg-primary text-white rounded-l-lg"}>
                                                        <LuShip className={"text-xl"}/>
                                                    </div>
                                                    <div className={"flex flex-col mx-4 grow self-center"}>
                                                        <div className={"grid grid-cols-2 gap-2"}>
                                                            <div className={"flex flex-col col-span-2"}>
                                                                <div className={"flex flex-row w-full justify-start items-center gap-2 text-sm my-2"}>
                                                                    <Tooltip text={s.flag}>
                                                                        <Flag className={"rounded w-6"} code={getCountryCode(s.flag)} />
                                                                    </Tooltip>
                                                                    <div className={"text-sm font-semibold"}>{s.name}</div>
                                                                </div>
                                                            </div>
                                                            <div className={"flex flex-col"}>
                                                                <div className={"text-xs font-bold"}>max loads</div>
                                                                <div className={"text-sm"}>
                                                                    {s.maxLoadsNumber}
                                                                </div>
                                                            </div>
                                                            <div className={"flex flex-col"}>
                                                                <div className={"text-xs font-bold"}>max speed</div>
                                                                <div className={"text-sm"}>
                                                                    {s.maxKnots}
                                                                    <span className={"text-xs ml-0.5"}>knots</span>
                                                                </div>
                                                            </div>
                                                            <div className={"flex flex-col col-span-2"}>
                                                                <Accordion title={"owner"}>
                                                                    <div className={"flex flex-col gap-2"}>
                                                                        <div className={"font-semibold text-sm"}>
                                                                            {s.shipOwner.user.firstname} {s.shipOwner.user.lastname}
                                                                        </div>
                                                                        <div className={"flex flex-row items-center text-sm gap-2"}>
                                                                            <LuMail className={"text-xs"}/>
                                                                            <p>{s.shipOwner.user.email}</p>
                                                                        </div>

                                                                    </div>
                                                                </Accordion>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={"w-64 h-48 flex items-center justify-center"}>
                                                    <SmallMap center={[s.latitude, s.longitude]} className={"w-64 h-48 rounded-r-lg overflow-hidden"}>
                                                        <MarkerBox ship={s}/>
                                                    </SmallMap>
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
        </div>
    )
}