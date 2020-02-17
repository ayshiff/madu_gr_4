import React from "react";
import { Layout, Menu, Icon } from "antd";

const { Sider } = Layout;

const sidebarStyle = {
    borderTopRightRadius: "45px"
}

const mainLogoStyle = {
    height: "140px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",    
}

const menuStyle = {
    marginTop: "80px"
}

export const SideBar = () => (
        <Sider style={sidebarStyle} trigger={null} collapsible width="auto">
            <div style={ mainLogoStyle } >
                <h1 style={{ color: "#FFFFFF" }}>MADU</h1>
            </div>     
            <Menu style={menuStyle} theme="dark" mode="inline">
                <Menu.Item key="1">
                    <Icon type="user" />
                    <span>P.O.I</span>
                    <a href="/poi/list">P.O.I</a>
                </Menu.Item>
                <Menu.Item key="2">
                    <Icon type="video-camera" />
                    <span>Questionnaire</span>
                    <a href="/survey">Questionnaire</a>
                </Menu.Item>
                <Menu.Item key="3">
                    <Icon type="upload" />
                    <span>Clients</span>
                    <a href="/poi/list">Clients</a>
                </Menu.Item>
            </Menu>
        </Sider>                
);
