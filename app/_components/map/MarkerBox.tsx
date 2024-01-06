import * as ReactLeaflet from 'react-leaflet'
import Icon from './Icon'
import L from 'leaflet'
import {useEffect} from "react";

import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';

const div = document.createElement('div');
const root = createRoot(div);
flushSync(() => {
  root.render(<Icon />);
});

const { Marker, Popup } = ReactLeaflet

const MarkerBox = () => {
  const position:[number,number] = [28.672497, -53.938854]

  const icon = L.divIcon({
    className: 'custom-icon',
    html: div.innerHTML
  })

  /*const parseDate = (date) => {
    return ((Date.now() - Date.parse(date)) / 1000).toFixed(0)
  }*/

  return(
    <>
    {
      <Marker position={position} icon={icon}>
        <Popup>
          <div className='font-semibold text-sm'>
            <p><span className='text-xs font-normal'>long</span> {position[0]}</p>
            <p><span className='text-xs font-normal'>lat</span> {position[1]}</p>
          </div>
          <p className='text-xs'>
            10s ago
          </p>
        </Popup>
      </Marker>
    }
    </>
  )
}

export default MarkerBox