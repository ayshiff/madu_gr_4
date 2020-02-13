import React from "react";
import { Form, Input } from "antd";

import { StateKeys } from "../index";

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
            <Form name="nest-messages">
                <Form.Item label="Nom">
                    <Input
                        onChange={e => onChangeState("name", e.target.value)}
                        value={stepState.name}
                    />
                </Form.Item>
                <Form.Item label="Adresse">
                    <Input />
                </Form.Item>
                <Form.Item label="Code Postal">
                    <Input />
                </Form.Item>
                <Form.Item label="Téléphone">
                    <Input />
                </Form.Item>
            </Form>
            <button onClick={() => changeStep(1)}>suivant</button>
        </>
    );
};
