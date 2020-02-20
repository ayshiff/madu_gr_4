export default {
    generatePoints: (map, data) => {
        if (map) {
            console.log("test");
            map.on("load", () => {
                map.addSource("points", {
                    type: "geojson",
                    data: data,
                });
                map.addLayer({
                    id: "points",
                    type: "symbol",
                    source: "points",
                    layout: {
                        "icon-image": "{icon}-15",
                        "icon-size": 2,
                    },
                });
            });
        }
    },

    clickOnPoint: map => {
        map.on("click", "points", e => {
            console.log(map.getSource("oneLayer"));
            if (map.getLayer("oneLayer")) {
                map.removeLayer("oneLayer");
                map.removeSource("oneLayer");
            }

            console.log(e.features[0].properties.title);
            console.log(e.features[0]);
            map.addSource("oneLayer", {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: [
                        {
                            type: "Feature",
                            properties: {
                                title: "petit golfeur 1",
                                icon: "marker",
                            },
                            geometry: {
                                type: "Point",
                                coordinates: e.features[0].geometry.coordinates,
                            },
                        },
                    ],
                },
            });
            map.addLayer({
                id: "oneLayer",
                type: "symbol",
                source: "oneLayer",
                layout: {
                    "icon-image": "{icon}-15",
                    "icon-size": 4,
                },
            });
        });
    },

    clickOneLayer: map => {
        map.on("click", "oneLayer", () => {
            map.removeLayer("oneLayer");
            map.removeSource("oneLayer");
        });
    },
};
