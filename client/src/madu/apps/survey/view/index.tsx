import React from "react";
import { Tabs } from "antd";

import { CollapseComponent } from "styles/atoms/collapse";

const { TabPane } = Tabs;
const tabs = [
    {
        name: "Nourriture",
        id: "food",
    },
    {
        name: "Matériel",
        id: "stuff",
    },
    {
        name: "Social",
        id: "social",
    },
];

export const SurveyContainer = () => (
    <Tabs type="card">
        {tabs.map(tab => (
            <TabPane tab={tab.name} key={tab.id}>
                <CollapseComponent />
            </TabPane>
        ))}
    </Tabs>
);
