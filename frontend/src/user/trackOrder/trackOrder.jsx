import React, { useEffect, useState } from 'react'
import './trackOrder.css'
import "leaflet/dist/leaflet.css";


import L from 'leaflet'
import {MapContainer,Marker,Popup,TileLayer} from 'react-leaflet'

import io from 'socket.io-client'

const socket = io("http://localhost:2000")

const TrackOrder = () => {

  const [location,setLocation] = useState({lat: 48.8566, lng: 2.3522})

  useEffect(()=>{
    socket.on("locationUpdate",(newLocation)=>{
      setLocation(newLocation)
    })

    return ()=>{
      socket.off("locationUpdate")
    };
  },[])

    const deliveryIcon = new L.Icon({
      iconUrl : "https://cdn-icons-png.flaticon.com/512/3448/3448418.png",
      iconSize : [40,40]
    })

  return (
    <div className='leaflet-container'>
      <MapContainer center={[48.8566, 2.35222]} zoom={13}>
          <TileLayer 
            attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
          />

          <Marker position={location} icon={deliveryIcon}>
              <Popup>Delivery is on the Way🍔</Popup>
          </Marker>
      </MapContainer>

      
      
    </div>
  )
}

export default TrackOrder
