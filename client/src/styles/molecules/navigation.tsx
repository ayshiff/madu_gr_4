import React from "react";
import { Tabs } from "antd";

const { TabPane } = Tabs;

export const Navigation = ({ tabs }) => (
    <Tabs type="card">
        {tabs.map((tab, i) => (
            <TabPane tab={tab.name} key={i}>
                {tab.content}
            </TabPane>
        ))}
    </Tabs>
);
