import React from "react";
import styled from "styled-components";
import { Layout, Menu, Icon } from "antd";
import { rem } from "polished";

import { signOut } from "token-manager";

const client = require("assets/icons/client.svg");
const map = require("assets/icons/map.svg");
const localisation = require("assets/icons/localisation.svg");
const logout = require("assets/icons/logout.svg");

const { Sider } = Layout;

const CustomSider = styled(Sider)`
    width: ${rem(300)};
    background: #0a1240;
    & > div {
        display: flex;
        flex-direction: column;
    }
`;

const LogoutWrapper = styled.div`
    flex: 1;
    display: flex;
    & > div {
        align-self: flex-end;
        margin: 20px;
        & > i {
            color: #fff;
            font-size: ${rem(24)};
            display: flex;

            & > svg {
                align-self: flex-end;
            }
        }
    }
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
                <Icon component={() => <img src={localisation} alt="localisation" />} />
                <span>Points d'intêret</span>
                <a href="/poi/list">Points d'intêret</a>
            </Menu.Item>
            <Menu.Item key="2">
                <Icon component={() => <img src={client} alt="client" />} />
                <span>Clients</span>
                <a href="/client/list">Clients</a>
            </Menu.Item>
            <Menu.Item key="3">
                <Icon component={() => <img src={map} alt="map" />} />
                <span>Map</span>
                <a href="/poi/map">Map</a>
            </Menu.Item>
        </Menu>
        <LogoutWrapper>
            <div>
                <Icon onClick={signOut} component={() => <img src={logout} alt="logout" />} />
            </div>
        </LogoutWrapper>
    </CustomSider>
);
