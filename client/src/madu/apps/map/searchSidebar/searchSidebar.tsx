import React from "react";
import { Tabs } from "antd";
import { InstantSearch } from "react-instantsearch-dom";
import Places from "madu/places/widget";
import algoliasearch from "algoliasearch";
import { Button } from "antd";
import { useHistory } from "react-router";
import { useStores } from "madu/hooks/use-store";

const searchClient = algoliasearch("latency", process.env.ALGOLIA_API_KEY);

export const SearchSidebar = ({ titleProperties }: { titleProperties: string }) => {
    const { TabPane } = Tabs;
    const history = useHistory();
    const { pointOfInterestStore } = useStores();

    const tabPaneStyle = {
        display: "flex",
        justifyContent: "center",
    };

    return (
        <Tabs defaultActiveKey="1">
            <TabPane style={tabPaneStyle} tab="Recherche" key="1">
                <InstantSearch indexName="airports" searchClient={searchClient}>
                    <div className="search-panel" style={{ position: "fixed" }}>
                        <div className="search-panel__results">
                            <Places
                                store={pointOfInterestStore}
                                style={{ position: "relative" }}
                                defaultRefinement={{
                                    lat: 37.7793,
                                    lng: -122.419,
                                }}
                            />
                        </div>
                    </div>
                </InstantSearch>
                <Button
                    style={{ marginTop: "500px" }}
                    size="large"
                    type="primary"
                    onClick={() => history.push("/poi/create")}
                >
                    Ajouter un POI
                </Button>
            </TabPane>
        </Tabs>
    );
};
