'use client'

import {
    LuMail,
    LuShip,
    LuMap
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
import LoadsContainer from "@/app/_components/LoadsContainer";
import SearchBar from "@/app/_components/form/SearchBar";
import UserBox from "@/app/_components/UserBox";
import UsersContainer from "@/app/_components/UsersContainer";
import PortPicker from "@/app/_components/PortPicker";
import Datepicker from "@/app/_components/form/Datepicker";
import NewCruise from "@/app/_components/NewCruise";
import CruisesContainer from "@/app/_components/CruisesContainer";

const MarkerBox = dynamic(() => import('@/app/_components/map/MarkerBox'), {
    ssr: false,
    loading: () => <div className={"flex items-center justify-center"}><Spinner/></div>
})
const SmallMap = dynamic(() => import('@/app/_components/map/SmallMap'), {
    ssr: false,
    loading: () => <div className={"flex items-center justify-center"}><Spinner/></div>
})

export default function Home(){
    const { data: ships, error: shipsErr, isLoading: isShipsLoading } = useSWR<Ship[]>('http://localhost:2137/api/v1/ship/all', fetcher)

    return(
        <div className={"p-8 flex flex-col gap-8"}>
            <div className={"p-8 rounded-2xl shadow bg-white"}>
                <UsersContainer/>
            </div>
            <div className={"p-8 rounded-2xl shadow bg-white"}>
                <LoadsContainer/>
            </div>
            <div className={"p-8 rounded-2xl shadow bg-white"}>
                <div className={"flex flex-row justify-between items-center mb-4 gap-6"}>
                    <div className={"my-2 flex flex-col gap-1"}>
                        <div className={"flex flex-row gap-1 text-gray-700"}>
                            <div>
                                <LuShip size={"1.5em"} className={"h-full"} />
                            </div>
                            <div className={"text-xl font-bold"}>
                                Ships
                            </div>
                        </div>
                        <div className={"text-xs text-gray-600"}>
                            Preview and manage fleet of ships
                        </div>
                    </div>
                    <Link href={"/map"}>
                    <div className={"w-8 h-8 text-xs mb-1 bg-primary text-gray-100 py-1 px-2 rounded-2xl " +
                        "text-center flex justify-center items-center hover:bg-gray-700 transition-all"}>
                            <LuMap/>
                    </div>
                    </Link>
                </div>
                <div className={"flex flex-col gap-1"}>
                    {
                        shipsErr ?
                            <FetchError message={"Cannot find API endpoint. Try again later."}/> :

                        isShipsLoading ?
                            <UsersLoader/> :

                        !ships ?
                            <FetchError message={"Authentication error. You have no permission to read this data."}/> :

                        <div className={"grid grid-cols-1 lg:grid-cols-2 gap-4"}>
                            {
                                ships && ships.length > 0 && ships.map(s => {
                                    return (
                                        <div key={s.shipId} className={"rounded-2xl shadow"}>
                                            <div className={"flex flex-row justify-between"}>
                                                <div className={"flex flex-row grow"}>
                                                    <div className={"p-4 flex items-center bg-primary text-white rounded-l-2xl border border-primary"}>
                                                        <LuShip className={"text-xl"}/>
                                                    </div>
                                                    <div className={"flex flex-col h-full grow border border-primary border-r-0 px-2"}>
                                                        <div className={"grid grid-cols-2 gap-2 my-auto mx-4"}>
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

                                                <div className={"w-32 xs:w-48 sm:w-64 lg:w-48 xl:w-64 h-48 flex items-center justify-center"}>
                                                    <SmallMap center={[s.latitude, s.longitude]} className={"w-32 xs:w-48 sm:w-64 lg:w-48 xl:w-64 h-48 rounded-r-lg overflow-hidden"}>
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
            <div className={"p-8 rounded-2xl shadow bg-white"}>
                <CruisesContainer/>
            </div>

        </div>
    )
}