import React, { useState } from "react";
import { Tabs, Button, Row, Col, Layout } from "antd";
import styled from "styled-components";
import { rem } from "polished";

import { CollapseComponent } from "styles/atoms/collapse";
import { TemplateComponent } from "styles/molecules/template";

const { Content } = Layout;
const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: ${rem(12)};
`;

const TemplateContainer = styled.div`
    height: 100%;
    padding: ${rem(12)} ${rem(24)};
    border-left: 1px solid #e8e8e8;
`;

const TabsCustom = styled(Tabs)`
    padding: ${rem(12)} ${rem(24)};
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
        <Layout>
            <Content
                style={{
                    margin: "24px 16px",
                    padding: 24,
                    background: "#fff",
                }}
            >
                <Row style={{ height: "100%" }}>
                    <Col span={16}>
                        <TabsCustom type="card">
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
                        </TabsCustom>
                    </Col>
                    <Col span={8} style={{ height: "100%" }}>
                        <TemplateContainer>
                            <TemplateComponent />
                        </TemplateContainer>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};
