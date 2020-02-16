import React from "react";
import { Form, Input, TimePicker, Button } from "antd";
import styled from "styled-components";
import { rem } from "polished";

import { ButtonWrapper } from "styles/atoms/button-wrapper";

import { StateKeys } from "../index";

const CustomInput = styled(Input)`
    width: ${rem(300)};
    &:first-child {
        margin-right: ${rem(14)};
    }
`;

const CustomForm = styled(Form)`
    margin-bottom: ${rem(20)};
`;

const TimePickerWrapper = styled.div`
    display: flex;
`;

const CustomTimePicker = styled(TimePicker)`
    &:not(:last-child) {
        margin-right: ${rem(14)};
    }
    &:nth-child(3) {
        margin-left: ${rem(14)};
    }
`;

const InputWrapper = styled.div`
    display: flex;
`;

export type StepOneState = {
    index: number;
    name: string;
};

export type StepOneProps = {
    onChangeStepState: <T>(key: StateKeys, value: T) => void;
    changeStep: (n: number) => void;
    stepState: StepOneState;
};

export const FormStepOne = ({ changeStep, onChangeStepState, stepState }: StepOneProps) => {
    const onChangeState = (field: string, value) => {
        const newStepOneState: StepOneState = {
            ...stepState,
            [field]: value,
        };
        onChangeStepState<StepOneState>("stepOne", newStepOneState);
    };

    return (
        <>
            <CustomForm>
                <Form.Item label="Nom">
                    <CustomInput
                        onChange={e => onChangeState("name", e.target.value)}
                        value={stepState.name}
                    />
                </Form.Item>
                <InputWrapper>
                    <Form.Item label="Adresse">
                        <CustomInput />
                    </Form.Item>
                    <Form.Item label="Code Postal">
                        <CustomInput />
                    </Form.Item>
                </InputWrapper>

                <Form.Item label="Téléphone">
                    <CustomInput />
                </Form.Item>
                <TimePickerWrapper>
                    <Form.Item label="TimePicker">
                        <CustomTimePicker />
                        <CustomTimePicker />
                        {"  -  "}
                        <CustomTimePicker />
                        <CustomTimePicker />
                    </Form.Item>
                </TimePickerWrapper>
            </CustomForm>
            <ButtonWrapper align="right" layout="aside">
                <Button size="large" type="primary" onClick={() => changeStep(1)}>
                    suivant
                </Button>
            </ButtonWrapper>
        </>
    );
};
