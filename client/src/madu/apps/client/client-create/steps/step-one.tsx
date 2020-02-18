import React from "react";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import { rem } from "polished";

import { ButtonWrapper } from "styles/atoms/button-wrapper";

import { StateKeys } from "../index";

const StepWrapper = styled.div`
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`;

const CustomInput = styled(Input)`
    width: ${rem(300)};
    &:first-child {
        margin-right: ${rem(14)};
    }
`;

const CustomForm = styled(Form)`
    margin-bottom: ${rem(20)};
`;

const InputWrapper = styled.div`
    display: flex;
`;

export type StepOneState = {
    index: number;
    companyName: string;
    address: string;
    zipcode: string;
    name: string;
    phoneNumber: string;
    companyPosition: string;
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
        <StepWrapper>
            <CustomForm>
                <Form.Item label="Nom de l’entreprise/ école">
                    <CustomInput
                        onChange={e => onChangeState("companyName", e.target.value)}
                        value={stepState.companyName}
                    />
                </Form.Item>
                <InputWrapper>
                    <Form.Item label="Adresse">
                        <CustomInput
                            onChange={e => onChangeState("address", e.target.value)}
                            value={stepState.address}
                        />
                    </Form.Item>
                    <Form.Item label="Code postal">
                        <CustomInput
                            onChange={e => onChangeState("zipcode", e.target.value)}
                            value={stepState.zipcode}
                        />
                    </Form.Item>
                </InputWrapper>

                <InputWrapper>
                    <Form.Item label="Nom">
                        <CustomInput
                            onChange={e => onChangeState("name", e.target.value)}
                            value={stepState.name}
                        />
                    </Form.Item>
                    <Form.Item label="Téléphone">
                        <CustomInput
                            onChange={e => onChangeState("phoneNumber", e.target.value)}
                            value={stepState.phoneNumber}
                        />
                    </Form.Item>
                </InputWrapper>

                <Form.Item label="Poste">
                    <CustomInput
                        onChange={e => onChangeState("companyPosition", e.target.value)}
                        value={stepState.companyPosition}
                    />
                </Form.Item>
            </CustomForm>

            <ButtonWrapper align="right" layout="aside">
                <Button size="large" type="primary" onClick={() => changeStep(1)}>
                    suivant
                </Button>
            </ButtonWrapper>
        </StepWrapper>
    );
};
