'use client'

import { MapContainer, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.js"
import "leaflet/dist/leaflet.css"

const MAP_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
const MAP_ATTRIBUTION = '&copy; wiktoz, <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'

const Map = () => {
    return(
        <div className={"min-h-screen min-w-screen relative top-0 left-0"}>
            <MapContainer center={[52.235, 21.010]} zoom={5} scrollWheelZoom={false} className="min-h-screen min-w-screen">
                <TileLayer
                    url={MAP_URL}
                    attribution={MAP_ATTRIBUTION}
                />
            </MapContainer>
        </div>
    )
}

export default Map