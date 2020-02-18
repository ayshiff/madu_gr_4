import React, {  useEffect } from "react";
import mapboxgl from "mapbox-gl";


const initMap = () => {
    mapboxgl.accessToken = 'put your token here';    
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11'
    })

    return map;
}

export const Map = () => {

    useEffect(() => {
        initMap()
      });

    return (
        <div style={{ width: "100vw", height: "100vh"}}>
            <div style={{ width: "100%", height: "100%"}} id="map">
            
            </div>
        </div>

    )
}

