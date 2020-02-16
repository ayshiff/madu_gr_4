import React from "react";
import { Input, Radio, Select, Form, Button } from "antd";
// import styled from "styled-components";
// import { rem } from "polished";

import { ButtonWrapper } from "styles/atoms/button-wrapper";

import { StateKeys } from "../index";

const { Option } = Select;
const { TextArea } = Input;

export type StepFourState = {
    index: number;
    value: number;
};

export type StepFourProps = {
    onChangeStepState: <T>(key: StateKeys, value: T) => void;
    stepState: StepFourState;
};

export const FormStepFour = ({ onChangeStepState, stepState }: StepFourProps) => {
    const onChangeState = (field: string, value) => {
        const newStepFourState: StepFourState = {
            ...stepState,
            [field]: value,
        };
        onChangeStepState<StepFourState>("stepThree", newStepFourState);
    };

    const radioStyle = {
        display: "block",
        height: "30px",
        lineHeight: "30px",
    };

    return (
        <>
            <Form>
                <Form.Item label="Choisir template">
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder=" "
                        optionFilterProp="children"
                    >
                        <Option value="jack">Template 1</Option>
                        <Option value="lucy">Template 2</Option>
                        <Option value="tom">Template 3</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Envoi du quest">
                    <Radio.Group
                        onChange={e => onChangeState("value", e.target.value)}
                        value={stepState.value}
                    >
                        <Radio style={radioStyle} value={1}>
                            Remplir directement le questionnaire
                        </Radio>
                        <Radio style={radioStyle} value={2}>
                            Envoyer le questionnaire au client
                        </Radio>
                    </Radio.Group>
                </Form.Item>
                {stepState.value === 2 && <TextArea rows={4} style={{ width: 400 }} />}
            </Form>
            <ButtonWrapper align="right" layout="aside">
                <Button size="large" type="primary">
                    validé
                </Button>
            </ButtonWrapper>
        </>
    );
};
