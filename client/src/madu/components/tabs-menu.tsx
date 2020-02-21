import React from "react";
import { Menu } from "antd";

type TabsMenuProps = {
    tabs: Record<string, number | string>[];
    indexActiveStep: number;
    onClickStep: (n: number) => void;
};

export const TabsMenu = ({ tabs, indexActiveStep, onClickStep }: TabsMenuProps) => (
    <Menu selectedKeys={[indexActiveStep.toString()]} mode="horizontal">
        {tabs.map((item, index) => (
            <Menu.Item key={item.key} onClick={() => onClickStep(index)}>
                {item.tabTitle}
            </Menu.Item>
        ))}
    </Menu>
);
