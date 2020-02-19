import React, { useState, useEffect, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import datatest from "./datatest.json"

const mapStyle = {
    width: "100vw", 
    height: "100vh"
}

export const Mapboxgl = () => {
        const [map, setMap] = useState<mapboxgl.Map| null >(null);

    useEffect(():any => {
        mapboxgl.accessToken =
        "pk.eyJ1IjoiYW1hdXJ5ZmF2ZXJpZWwiLCJhIjoiY2s2cng4MHIyMDl1YTNnbnY4OGN3N3dweiJ9.vdYTg3OdzA_w9s-kj0KYUQ";

        const mapInitializer = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/streets-v11",
            center: [2.349014, 48.864716],
            zoom: 11.7,
        });

        test(mapInitializer);
        // console.log(map)
        generatePoints(map, datatest);

    }, [map]);

        
    const test = useCallback((mapInitializer) => {
        setMap(mapInitializer) 
    },[]) 
    
    return (
        <div style={ mapStyle } id="map"></div>
    );
};

const generatePoints = (map, data) => {
    if(map) {
        console.log(map);
        map.on('load', () => {
            map.addSource('points', {
                'type': 'geojson',
                'features': data
            });
            map.addLayer({
                'id': 'points',
                'type': 'symbol',
                'source': 'points',
                'layout': {
                    'icon-image': ['concat', ['get', 'icon'], '-15'],
                    'text-field': ['get', 'title'],
                    'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                    'text-offset': [0, 0.6],
                    'text-anchor': 'top'
                }
            });
        });
    }

}
