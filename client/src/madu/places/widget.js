import React, { useEffect, useRef } from "react";
import places from "places.js";
import connect from "./connector";
import { observer } from "mobx-react";
import { useStores } from "madu/hooks/use-store";

const Places = observer(({ refine, defaultRefinement }) => {
    let ref = useRef(<input />);
    const { pointOfInterestStore } = useStores();

    useEffect(() => {
        const autocomplete = places({
            container: ref.current,
        });

        autocomplete.on("change", event => {
            refine(event.suggestion.latlng);
            pointOfInterestStore.setAdress({
                value: event.suggestion.name,
                lat: parseFloat(event.suggestion.latlng.lat),
                lng: parseFloat(event.suggestion.latlng.lng),
            });
        });

        autocomplete.on("clear", () => {
            refine(defaultRefinement);
        });
    }, []);

    return (
        <div style={{ marginBottom: 20 }}>
            <input ref={ref} type="search" id="address-input" placeholder="Rechercher..." />
        </div>
    );
});

export default connect(Places);
