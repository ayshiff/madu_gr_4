import React, { useState } from "react";
import { Layout, Button, Steps, message } from "antd";
import FormStep1 from "./form/formstep1";
import FormStep2 from "./form/formstep2";
import FormStep3 from "./form/formstep3";
import FormStep4 from "./form/formstep4";
import "antd/dist/antd.css";

const { Header, Content } = Layout;

export const CreatePoi = () => {
    const [current, setCurrent] = useState(0);

    const { Step } = Steps;

    const steps = [
        {
            title: "First",
            content: <FormStep1 />,
        },
        {
            title: "Second",
            content: <FormStep2 />,
        },
        {
            title: "Third",
            content: <FormStep3 />,
        },
        {
            title: "Last",
            content: <FormStep4 />,
        },
    ];

    const titleStyle = {
        marginLeft: "20px",
        fontWeight: 500,
        fontSize: "28px",
    };

    return (
        <Layout>
            <Layout>
                <Header style={{ background: "#fff", padding: 0 }}>
                    <h1 style={titleStyle}>Créer P.O.I</h1>
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        background: "#fff",
                        minHeight: 840,
                    }}
                >
                    <div>
                        <Steps current={current} style={{ marginTop: "20px" }}>
                            {steps.map(item => (
                                <Step key={item.title} />
                            ))}
                        </Steps>
                        <div
                            className="steps-content"
                            style={{ marginTop: "100px", marginBottom: "100px" }}
                        >
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
                                    Previous
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
                                    Next
                                </Button>
                            )}
                            {current === steps.length - 1 && (
                                <Button
                                    type="primary"
                                    onClick={() => message.success("Processing complete!")}
                                >
                                    Done
                                </Button>
                            )}
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};
