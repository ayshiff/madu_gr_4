import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import datatest from "./datatest.json";
import { SearchSidebar } from "./searchSidebar/searchSidebar";

import mapfunction from "./mapfunction";

const mapStyle = {
    width: "75%",
    height: "100vh",
};

const containerStyle = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
};

const searchSidebarStyle = {
    width: "25%",
    height: "100vh",
    backgroundColor: "#ffffff",
};

export const Mapboxgl = () => {
    const [map, setMap] = useState<mapboxgl.Map | null>(null);
    const [titleProperties, setTitleProperties] = useState<string>("")

    useEffect(() => {
        if (map) {
            titlePropertiesProps(map)
            mapfunction.generatePoints(map, datatest);
            mapfunction.clickOnPoint(map);
            mapfunction.clickOneLayer(map);
            console.log(titlePropertiesProps(map));     
        }
    }, [map]);

    useEffect(() => {
        mapboxgl.accessToken =
            "pk.eyJ1IjoiYW1hdXJ5ZmF2ZXJpZWwiLCJhIjoiY2s2cng4MHIyMDl1YTNnbnY4OGN3N3dweiJ9.vdYTg3OdzA_w9s-kj0KYUQ";

        const mapInitializer = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/streets-v11",
            center: [2.349014, 48.864716],
            zoom: 11.7,
        });

        setMap(mapInitializer);
    }, []);

    const titlePropertiesProps = (map) => {
        map.on("click", "points", e => {
            setTitleProperties(e.features[0].properties.title)
            console.log(e.features[0].properties.title);    
        })
    }

    return (
        <div style={containerStyle}>
            <div style={searchSidebarStyle}>
                <SearchSidebar titleProperties={titleProperties}/>
            </div>
            <div style={mapStyle} id="map"></div>
        </div>
    );
};
