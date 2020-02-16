import React from "react";
import { Form, Input, Radio, Button, Switch } from "antd";
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

const SwitchWrapper = styled(Form.Item)`
    display: flex;
`;

export type StepThreeState = {
    index: number;
    name: string;
    category: string;
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
            <Form name="nest-messages">
                <Form.Item label="Catégorie">
                    <Radio.Group
                        onChange={e => onChangeState("category", e.target.value)}
                        defaultValue="a"
                    >
                        <Radio.Button value="a">Restaurant</Radio.Button>
                        <Radio.Button value="b">Boutique</Radio.Button>
                        <Radio.Button value="c">Expérience</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Type d'établissement">
                    <CustomInput />
                </Form.Item>
                <Form.Item label="Préference alimentaire">
                    <CustomInput />
                </Form.Item>
                <Form.Item label="Produit">
                    <CustomInput />
                </Form.Item>
                <Form.Item label="Type cuisine">
                    <CustomInput />
                </Form.Item>
                <SwitchWrapper label="À emporté">
                    <Switch />
                </SwitchWrapper>
            </Form>
            <ButtonWrapper align="right" layout="aside">
                <Button size="large" onClick={() => changeStep(1)}>
                    précedent
                </Button>
                <Button size="large" type="primary" onClick={() => changeStep(3)}>
                    suivant
                </Button>
            </ButtonWrapper>
        </>
    );
};
