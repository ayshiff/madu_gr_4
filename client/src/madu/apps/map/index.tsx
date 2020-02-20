import React, { useEffect } from "react";

import { SearchSidebar } from "./searchSidebar/searchSidebar";

import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

// import mapfunction from "./mapfunction";
import { useStores } from "../../hooks/use-store";
import { observer } from "mobx-react";

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

const Map = ReactMapboxGl({
    accessToken:
        "pk.eyJ1IjoiYW1hdXJ5ZmF2ZXJpZWwiLCJhIjoiY2s2cng4MHIyMDl1YTNnbnY4OGN3N3dweiJ9.vdYTg3OdzA_w9s-kj0KYUQ",
});

export const Mapboxgl = observer(() => {
    const { pointOfInterestStore } = useStores();

    useEffect(() => {
        pointOfInterestStore.get();
    }, []);

    return (
        <div style={containerStyle}>
            <div style={searchSidebarStyle}>
                <SearchSidebar titleProperties={"titleProperties"} />
            </div>
            <Map
                style="mapbox://styles/mapbox/streets-v9"
                containerStyle={{
                    height: "100vh",
                    width: "100vw",
                }}
                center={[2.30438232421875, 48.88007028454358]}
            >
                <Layer type="symbol" id="marker" layout={{ "icon-image": "harbor-15" }}>
                    {pointOfInterestStore.all.length
                        ? pointOfInterestStore.all.map(el => (
                              <Feature key={el.id} coordinates={[el.address.lng, el.address.lat]} />
                          ))
                        : null}
                </Layer>
            </Map>
            ;
        </div>
    );
});
