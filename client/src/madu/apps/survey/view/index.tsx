import React, { useState } from "react";
import { Tabs, Button } from "antd";
import styled from "styled-components";
import { rem } from "polished";

import { CollapseComponent } from "styles/atoms/collapse";

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: ${rem(12)};
`;

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

export const SurveyContainer = () => {
    const [datas, setDatas] = useState<Record<any, any>[]>([]);

    const addData = () => {
        setDatas([...datas, { title: "test" }]);
    };

    const onDelete = index => {
        const dataCopy = [...datas];
        dataCopy.splice(index, 1);
        setDatas(dataCopy);
    };

    return (
        <Tabs type="card">
            {tabs.map(tab => (
                <TabPane tab={tab.name} key={tab.id}>
                    <ButtonWrapper>
                        <Button size={"large"} icon="plus" onClick={addData}>
                            Ajouter critère
                        </Button>
                    </ButtonWrapper>
                    <CollapseComponent datas={datas} onDelete={onDelete} />
                </TabPane>
            ))}
        </Tabs>
    );
};
