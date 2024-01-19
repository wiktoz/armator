import * as ReactLeaflet from 'react-leaflet'
import L from 'leaflet'
import Flag from "react-world-flags";
import {getCountryCode} from "@/lib/countries";
import {LuMap} from "react-icons/lu"

const { Marker, Popup } = ReactLeaflet

interface Props {
  ship: Ship
}

const MarkerBox = ({ship}:Props) => {
  const icon = L.divIcon({
    className: 'custom-icon',
    html: "<img src='/img/cargo.svg' alt='ship'/>"
  })

  const printCoordinates = (lat:number, long:number) => {
    let vert: string
    let hor: string

    if(lat > 0) vert = "N"
    else vert = "S"

    if(long > 0) hor = "E"
    else hor = "W"

    return Math.abs(lat).toFixed(3) + "°" + vert + ", " + Math.abs(long).toFixed(3) + "°" + hor
  }

  return(
    <>
    {
      <Marker position={[ship.latitude, ship.longitude]} icon={icon}>
        <Popup className={"rounded-lg"}>
          <div className={"flex flex-col w-32 text-sm my-2 gap-2"}>
            <div className={"flex flex-row gap-1 items-center"}>
              <Flag className={"rounded w-4"} code={getCountryCode(ship.flag)} />
              <div className={"text-md font-semibold leading-4"}>{ship.name}</div>
              <div className={"m-0 text-xs"}>{getCountryCode(ship.flag).toUpperCase()}</div>
            </div>
            <div className={"flex flex-col"}>
              <div className={"text-xs font-bold"}>coordinates</div>
              <div className={"flex flex-row gap-1 items-center"}>
                <LuMap/>
                <div className={"text-xs"}>
                  {printCoordinates(ship.latitude, ship.longitude)}
                </div>
              </div>
            </div>
          </div>
        </Popup>
      </Marker>
    }
    </>
  )
}

export default MarkerBox