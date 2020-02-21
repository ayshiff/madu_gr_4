import React, { useEffect, useRef } from "react";
import places from "places.js";
import connect from "./connector";
import { observer } from "mobx-react";

const Places = observer(({ refine, defaultRefinement, store }) => {
    let ref = useRef(<input />);

    useEffect(() => {
        const autocomplete = places({
            container: ref.current,
        });

        autocomplete.on("change", event => {
            refine(event.suggestion.latlng);
            store.setAdress({
                value: event.suggestion.name,
                lat: parseFloat(event.suggestion.latlng.lat),
                lng: parseFloat(event.suggestion.latlng.lng),
            });
        });

        autocomplete.on("clear", () => {
            refine(defaultRefinement);
        });
    }, [defaultRefinement, refine, store]);
    return (
        <div style={{ marginBottom: 20 }}>
            <input
                defaultValue={store?.byId?.address?.value || ""}
                ref={ref}
                type="search"
                id="address-input"
                placeholder="Rechercher..."
            />
        </div>
    );
});

export default connect(Places);
