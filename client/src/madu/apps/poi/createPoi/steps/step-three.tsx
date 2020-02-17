import React from "react";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import { rem } from "polished";

import { ButtonWrapper } from "styles/atoms/button-wrapper";

import { StateKeys } from "../index";
import TextArea from "antd/lib/input/TextArea";

const CustomInput = styled(Input)`
    width: ${rem(300)};
    &:first-child {
        margin-right: ${rem(14)};
    }
`;

export type StepThreeState = {
    index: number;
    greenScore: number;
    description: number;
};

export type StepThreeProps = {
    onChangeStepState: <T>(key: StateKeys, value: T) => void;
    changeStep: (n: number) => void;
    stepState: StepThreeState;
};

export const FormStepThree = ({ changeStep, onChangeStepState, stepState }: StepThreeProps) => {
    const onChangeState = (field: string, value) => {
        const newStepThreeState: StepThreeState = {
            ...stepState,
            [field]: value,
        };
        onChangeStepState<StepThreeState>("stepThree", newStepThreeState);
    };

    return (
        <>
            <Form>
                <Form.Item label="GreenScore">
                    <CustomInput
                        onChange={e => onChangeState("greenScore", e.target.value)}
                        value={stepState.greenScore}
                    />
                </Form.Item>{" "}
                <Form.Item>
                    <TextArea
                        onChange={e => onChangeState("description", e.target.value)}
                        value={stepState.description}
                    />
                </Form.Item>
            </Form>
            <ButtonWrapper align="right" layout="aside">
                <Button size="large" onClick={() => changeStep(1)}>
                    précedent
                </Button>
                <Button size="large" type="primary">
                    validé
                </Button>
            </ButtonWrapper>
        </>
    );
};
