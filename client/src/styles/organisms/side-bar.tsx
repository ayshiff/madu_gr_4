import React from "react";
import styled from "styled-components";
import { Layout, Menu, Icon } from "antd";
import { rem } from "polished";

const { Sider } = Layout;

const CustomSider = styled(Sider)`
    width: ${rem(300)};
    background: #0a1240;
`;

const mainLogoStyle = {
    height: "140px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
};

const menuStyle = {
    marginTop: "80px",
    background: "#0A1240",
    color: "#FFF",
    border: "none",
};

export const SideBar = () => (
    <CustomSider trigger={null} collapsible>
        <div style={mainLogoStyle}>
            <h1 style={{ color: "#FFFFFF" }}>MADU</h1>
        </div>
        <Menu style={menuStyle} mode="inline">
            <Menu.Item key="1">
                <Icon type="user" />
                <span>Points d'intêret</span>
                <a href="/poi/list">Points d'intêret</a>
            </Menu.Item>
            <Menu.Item key="2">
                <Icon type="upload" />
                <span>Clients</span>
                <a href="/poi/list">Clients</a>
            </Menu.Item>
            <Menu.Item key="3">
                <Icon type="upload" />
                <span>Map</span>
                <a href="/map">Map</a>
            </Menu.Item>
        </Menu>
    </CustomSider>
);
