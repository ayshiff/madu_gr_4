import React from "react";
import { Tabs, Input } from "antd";

export const SearchSidebar = ({ titleProperties }: { titleProperties: string }) => {
    const { TabPane } = Tabs;
    const { Search } = Input;

    const tabPaneStyle = {
        display: "flex",
        justifyContent: "center",
    };

    const searchBarStyle = {
        marginTop: "20px",
        width: "280px",
    };

    return (
        <Tabs defaultActiveKey="1">
            <TabPane style={tabPaneStyle} tab="Recherche" key="1">
                <Search placeholder="Rechercher une adresse" style={searchBarStyle} />
            </TabPane>
            <TabPane style={tabPaneStyle} tab="Infos" key="2">
                <p>{titleProperties}</p>
            </TabPane>
        </Tabs>
    );
};
