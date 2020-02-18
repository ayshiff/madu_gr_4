import React from "react";
import { Form, Input, Button } from "antd";
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

const StepWrapper = styled.div`
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`;

export type StepTwoState = {
    index: number;
    salaryNumber: number | null;
    mailNameDomain: string | null;
};

export type StepTwoProps = {
    onChangeStepState: <T>(key: StateKeys, value: T) => void;
    changeStep: (n: number) => void;
    stepState: StepTwoState;
};

export const FormStepTwo = ({ changeStep, onChangeStepState, stepState }: StepTwoProps) => {
    const onChangeState = (field: string, value) => {
        const newStepTwoState: StepTwoState = {
            ...stepState,
            [field]: value,
        };
        onChangeStepState<StepTwoState>("stepTwo", newStepTwoState);
    };

    return (
        <StepWrapper>
            <Form>
                <Form.Item label="Nombre de salariés / élèves">
                    <CustomInput
                        onChange={e => onChangeState("salaryNumber", e.target.value)}
                        value={stepState.salaryNumber}
                    />
                </Form.Item>
                <Form.Item label="Nom de domaine mail">
                    <CustomInput
                        onChange={e => onChangeState("mailNameDomain", e.target.value)}
                        value={stepState.mailNameDomain}
                    />
                </Form.Item>
            </Form>

            <ButtonWrapper align="right" layout="aside">
                <Button size="large" onClick={() => changeStep(0)}>
                    Précedent
                </Button>
                <Button size="large" type="primary">
                    Validé
                </Button>
            </ButtonWrapper>
        </StepWrapper>
    );
};
