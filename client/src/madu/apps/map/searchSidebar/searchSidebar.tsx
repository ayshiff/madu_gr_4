import React from "react";
import { Tabs, Input } from 'antd';


export const SearchSidebar = ():any => {

    const { TabPane } = Tabs;
    const { Search } = Input;

    const tabPaneStyle = {
        display: "flex",
        justifyContent: "center"
    }

    const searchBarStyle = {
        marginTop: "20px",
        width: "280px"
    }

    return (
        <Tabs defaultActiveKey="1">
            <TabPane style={tabPaneStyle} tab="Recherche" key="1">
                <Search
                placeholder="Rechercher une adresse"
                onSearch={value => console.log(value)}
                style={searchBarStyle}
                />                
            </TabPane>
            <TabPane style={tabPaneStyle} tab="Infos" key="2">
                <p></p>
            </TabPane>
      </Tabs>
    )
};
