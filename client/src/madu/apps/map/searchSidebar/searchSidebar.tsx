import React from "react";
import { Tabs, Input, Icon } from "antd";

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

    const infoPanelStyle = {

    }

    const titleStyle = {
        marginLeft: "25px"
    }

    const paragraphStyle = {
        marginTop: "19px",
        marginLeft: "30px"
    }

    const iconStyle = {
        marginRight: "11px"
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
            <TabPane style={infoPanelStyle} tab="Infos" key="2">
                <h1 style={titleStyle} >{titleProperties}</h1>
                <p style={paragraphStyle} >
                    <Icon style={iconStyle} type="environment" />
                    {titleProperties}
                </p>
                <p style={paragraphStyle}>
                    <Icon style={iconStyle} type="global" />
                    {titleProperties}
                </p>
            </TabPane>
        </Tabs>
    );
};
