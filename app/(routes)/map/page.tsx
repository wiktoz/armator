'use client'

import dynamic from "next/dynamic"
import {fetcher} from "@/lib/helpers";
import useSWR from "swr";
import FetchError from "@/app/_components/errors/FetchError";

const Map = dynamic(() => import('@/app/_components/map/Map'), {
    ssr: false
})

const MarkerBox = dynamic(() => import("@/app/_components/map/MarkerBox"), {
    ssr: false
})

export default function ShipMap() {
    const { data: ships, error: shipsErr, isLoading: isShipsLoading } = useSWR<Ship[]>('http://localhost:2137/api/v1/ship/all', fetcher)

    return (
    <main className="min-w-screen h-[calc(100vh-140px)] overflow-hidden relative">
        <Map>
            <div>
                {
                    isShipsLoading ?
                        <div>Loading ships...</div> :
                    shipsErr ?
                        <FetchError message={"Cannot fetch ships."}/>
                        :

                    ships && ships.length > 0 ? ships.map((s) => {
                        return(
                            <div key={s.shipId}>
                                <MarkerBox ship={s}/>
                            </div>
                        )
                    }) : null
                }
            </div>
        </Map>
    </main>
  )
}
