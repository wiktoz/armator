'use client'

import { MapContainer, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.js"
import "leaflet/dist/leaflet.css"
import {ReactElement, useLayoutEffect, useState} from "react";
import Spinner from "@/app/_components/Spinner";

const MAP_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
const MAP_ATTRIBUTION = '&copy; wiktoz, <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'

type Props = {
    children?: ReactElement | string
}

const Map = ({children}: Props) => {
    const [unmountMap, setUnmountMap] = useState(false);

    useLayoutEffect(() => {
        setUnmountMap(false);
        return () => {
            setUnmountMap(true);
        };
    }, [])

    return(
        <div className={"min-w-screen h-[calc(100vh-140px)] relative top-0 left-0"}>
            {
                !unmountMap ?
                    <MapContainer center={[52.235, 21.010]} zoom={5} scrollWheelZoom={true} className="h-[calc(100vh-140px)] min-w-screen">
                        <TileLayer
                            url={MAP_URL}
                            attribution={MAP_ATTRIBUTION}
                        />
                        {children}
                    </MapContainer> :
                    <div className={"flex items-center justify-center"}>
                        <Spinner/>
                    </div>
            }
        </div>
    )
}

export default Map