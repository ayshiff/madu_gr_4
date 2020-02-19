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
            const newPOI = {
                ...pointOfInterestStore.byId,
                address: {
                    value: event.suggestion.name,
                    lat: event.suggestion.latlng.lat,
                    lng: event.suggestion.latlng.lng,
                },
            };
            pointOfInterestStore.edit(pointOfInterestStore.byId.id, newPOI);
        });

        autocomplete.on("clear", () => {
            refine(defaultRefinement);
        });
    }, []);

    return (
        <div style={{ marginBottom: 20 }}>
            <input
                ref={ref}
                type="search"
                id="address-input"
                placeholder="Adresse de l'établissement"
            />
        </div>
    );
});

export default connect(Places);
