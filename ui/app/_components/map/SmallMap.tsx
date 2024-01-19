'use client'

import { MapContainer, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.js"
import "leaflet/dist/leaflet.css"
import {ReactElement, useLayoutEffect, useState} from "react";
import Spinner from "@/app/_components/Spinner";

const MAP_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
const MAP_ATTRIBUTION = ''

type Props = {
    children?: string | ReactElement
    center: [number, number]
    className: string
}

const SmallMap = ({children, center, className}: Props) => {
    const [unmountMap, setUnmountMap] = useState(false);

    useLayoutEffect(() => {
        setUnmountMap(false);
        return () => {
            setUnmountMap(true);
        };
    }, [])

    return(
        <div className={className}>
            {
                !unmountMap ?

                <MapContainer center={center} zoom={5} scrollWheelZoom={true} zoomControl={false} className="w-full h-full">
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

export default SmallMap