import React from "react";
import { Layout, Menu, Icon } from "antd";

const { Sider } = Layout;

export const SideBar = () => (
    <Sider trigger={null} collapsible style={{ height: "100vh ", borderTopRightRadius: "45px" }} width="auto">
        <div style={{ height: "140px", 
                      display: "flex", 
                      justifyContent: "center", 
                      alignItems: "center",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <h1 style={{ color: "#FFFFFF" }}>MADU</h1>
        </div>
        <div style={{ display: "flex", paddingLeft: "15%"}}>
            <Menu style={{ marginTop: "80px"}} theme="dark" mode="inline">
                <Menu.Item key="1">
                    <Icon type="user" />
                    <span>Points d'intérêt</span>
                    <a href="/poi/list" />
                </Menu.Item>
                <Menu.Item key="2">
                    <Icon type="video-camera" />
                    <span>Questionnaires</span>
                    <a href="/survey" />
                </Menu.Item>
                <Menu.Item key="3">
                    <Icon type="upload" />
                    <span>Clients</span>
                    <a href="/poi/list" />
                </Menu.Item>
            </Menu>
        </div>
    </Sider>
);
