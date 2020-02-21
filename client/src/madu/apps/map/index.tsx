import React, { useEffect } from "react";
import { SearchSidebar } from "./searchSidebar/searchSidebar";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
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

const metersToPixelsAtMaxZoom = (meters, latitude) =>
    meters / 0.075 / Math.cos((latitude * Math.PI) / 180);

const Map = ReactMapboxGl({
    accessToken:
        "pk.eyJ1IjoiYW1hdXJ5ZmF2ZXJpZWwiLCJhIjoiY2s2cng4MHIyMDl1YTNnbnY4OGN3N3dweiJ9.vdYTg3OdzA_w9s-kj0KYUQ",
});

export const Mapboxgl = observer(() => {
    const { pointOfInterestStore, companyStore } = useStores();

    useEffect(() => {
        pointOfInterestStore.get();
        companyStore.get();
    }, [pointOfInterestStore]);

    return (
        <div style={containerStyle}>
            <div style={searchSidebarStyle}>
                <SearchSidebar titleProperties={"titleProperties"} />
            </div>
            <Map
                style={"mapbox://styles/mapbox/streets-v8" as string | mapboxgl.Style}
                containerStyle={{
                    height: "100vh",
                    width: "100vw",
                }}
                zoom={pointOfInterestStore.byId.address.lng ? [13.7] : [11.5]}
                center={
                    pointOfInterestStore.byId.address.lng
                        ? [
                              pointOfInterestStore.byId.address.lng,
                              pointOfInterestStore.byId.address.lat,
                          ]
                        : [2.349014, 48.864716]
                }
            >
                {/* All POI Markers */}
                <Layer type="symbol" id="marker1" layout={{ "icon-image": "grocery-15" }}>
                    {pointOfInterestStore.byId.address.lat ? (
                        <Feature
                            key={pointOfInterestStore.byId.id}
                            coordinates={[
                                pointOfInterestStore.byId.address.lng,
                                pointOfInterestStore.byId.address.lat,
                            ]}
                            onClick={e => console.log(e)}
                        />
                    ) : null}
                </Layer>
                <Layer type="symbol" id="marker3" layout={{ "icon-image": "marker-15" }}>
                    {companyStore.all.length
                        ? companyStore.all.map(el => (
                              <Feature key={el.id} coordinates={[el.address.lng, el.address.lat]} />
                          ))
                        : null}
                </Layer>
                {/* ById POI Marker */}
                <Layer type="symbol" id="marker2" layout={{ "icon-image": "grocery-15" }}>
                    {pointOfInterestStore.all.length
                        ? pointOfInterestStore.all.map(el => (
                              <Feature key={el.id} coordinates={[el.address.lng, el.address.lat]} />
                          ))
                        : null}
                </Layer>
                {/* Circle */}
                {pointOfInterestStore.byId.address.lat && (
                    <Layer
                        type="circle"
                        id="circle"
                        paint={{
                            "circle-opacity": 0.3,
                            "circle-color": "grey",
                            "circle-radius": {
                                stops: [
                                    [0, 0],
                                    [
                                        20,
                                        metersToPixelsAtMaxZoom(
                                            1000,
                                            pointOfInterestStore.byId.address.lat
                                        ),
                                    ],
                                ],
                                base: 2,
                            },
                        }}
                    >
                        <Feature
                            key="circle"
                            coordinates={[
                                pointOfInterestStore.byId.address.lng,
                                pointOfInterestStore.byId.address.lat,
                            ]}
                            onClick={e => console.log(e)}
                        />
                    </Layer>
                )}
            </Map>
            ;
        </div>
    );
});
