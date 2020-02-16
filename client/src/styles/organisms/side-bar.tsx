import React from "react";
import { Layout, Menu, Icon } from "antd";

const { Sider } = Layout;

export const SideBar = () => (
    <Sider trigger={null} collapsible width="auto">
        <Menu theme="dark" mode="inline">
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
