import React, { useState } from "react";
import { Layout, Button, Steps, message } from "antd";
import FormStep1 from "./form/formstep1";
import FormStep2 from "./form/formstep2";
import FormStep3 from "./form/formstep3";
import "antd/dist/antd.css";

const { Header, Content } = Layout;

export const CreatePoi = () => {
    const [current, setCurrent] = useState(0);

    const { Step } = Steps;

    const steps = [
        {
            title: "En cours",
            desc: "Infos de base",
            content: <FormStep1 />,
        },
        {
            title: "En cours",
            desc: "Infos complémentaires",
            content: <FormStep2 />,
        },
        {
            title: "En cours",
            desc: "Questionnaire",
            content: <FormStep3 />,
        },
    ];

    // const titleStyle = {
    //     marginLeft: "20px",
    //     fontWeight: 500,
    //     fontSize: "28px",
    // };

    return (
        <Layout>
            <Layout>
                <Header style={{ background: "#fff", padding: 0 }}>
                    <Steps
                        size="small"
                        current={current}
                        style={{ marginTop: "20px", paddingLeft: "20%", paddingRight: "20%" }}
                    >
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} description={item.desc} />
                        ))}
                    </Steps>
                </Header>
                <Content
                    style={{
                        padding: 24,
                        background: "#fff",
                        minHeight: 840,
                    }}
                >
                    <div>
                        <div className="steps-content" style={{ marginTop: "24px" }}>
                            {steps[current].content}
                        </div>
                        <div
                            className="steps-action"
                            style={{ display: "flex", justifyContent: "flex-end" }}
                        >
                            {current > 0 && (
                                <Button
                                    style={{ marginLeft: 8 }}
                                    onClick={() => setCurrent(current - 1)}
                                >
                                    Précedent
                                </Button>
                            )}
                            {current < steps.length - 1 && (
                                <Button
                                    type="primary"
                                    onClick={e => {
                                        e.preventDefault();
                                        setCurrent(current + 1);
                                    }}
                                >
                                    Suivant
                                </Button>
                            )}
                            {current === steps.length - 1 && (
                                <Button
                                    type="primary"
                                    onClick={() => message.success("Processing complete!")}
                                >
                                    Validé
                                </Button>
                            )}
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};
