'use client'

import { MapContainer, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.js"
import "leaflet/dist/leaflet.css"
import {ReactElement} from "react";

const MAP_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
const MAP_ATTRIBUTION = '&copy; wiktoz, <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'

type Props = {
    children: string | ReactElement
}

const Map = ({children}: Props) => {
    return(
        <div className={"min-w-screen h-[calc(100vh-96px)] relative top-0 left-0"}>
            <MapContainer center={[52.235, 21.010]} zoom={5} scrollWheelZoom={true} className="h-[calc(100vh-96px)] min-w-screen">
                <TileLayer
                    url={MAP_URL}
                    attribution={MAP_ATTRIBUTION}
                />
                {children}
            </MapContainer>
        </div>
    )
}

export default Map