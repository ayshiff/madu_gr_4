import React from "react";
import { Form, Input, Button, Radio } from "antd";
import styled from "styled-components";
import { rem } from "polished";

import { ButtonWrapper } from "styles/atoms/button-wrapper";

import { StateKeys } from "../index";

const { TextArea } = Input;

const CustomTextArea = styled(TextArea)`
    width: ${rem(300)};
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
    name: string;
    email: string;
    category: string;
    webSiteLink: string;
    establishmentType: string;
    socialNetworkLink: string;
    address: string;
    zipcode: string;
    phoneNumber: string;
    description: string;
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
                <Form.Item label="Nom de l'établissement">
                    <CustomInput
                        onChange={e => onChangeState("name", e.target.value)}
                        value={stepState.name}
                    />
                </Form.Item>
                <Form.Item label="Catégorie">
                    <Radio.Group
                        onChange={e => onChangeState("category", e.target.value)}
                        value={stepState.category}
                    >
                        <Radio.Button value="a">Restaurant</Radio.Button>
                        <Radio.Button value="b">Boutique</Radio.Button>
                        <Radio.Button value="c">Expérience</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Type d'établissement">
                    <CustomInput
                        onChange={e => onChangeState("establishmentType", e.target.value)}
                        value={stepState.establishmentType}
                    />
                </Form.Item>
                <InputWrapper>
                    <Form.Item label="Adresse">
                        <CustomInput
                            onChange={e => onChangeState("address", e.target.value)}
                            value={stepState.address}
                        />
                    </Form.Item>
                    <Form.Item label="Code Postal">
                        <CustomInput
                            onChange={e => onChangeState("zipcode", e.target.value)}
                            value={stepState.zipcode}
                        />
                    </Form.Item>
                </InputWrapper>
                {/* <Form.Item label="Numéro SIRET">
                    <CustomInput
                        onChange={e => onChangeState("siretNumber", e.target.value)}
                        value={stepState.siretNumber}
                    />
                </Form.Item> */}
                <InputWrapper>
                    <Form.Item label="Email">
                        <CustomInput
                            onChange={e => onChangeState("email", e.target.value)}
                            value={stepState.email}
                        />
                    </Form.Item>
                    <Form.Item label="Téléphone">
                        <CustomInput
                            onChange={e => onChangeState("phoneNumber", e.target.value)}
                            value={stepState.phoneNumber}
                        />
                    </Form.Item>
                </InputWrapper>
                <InputWrapper>
                    <Form.Item label="Lien du Site">
                        <CustomInput
                            onChange={e => onChangeState("webSiteLink", e.target.value)}
                            value={stepState.webSiteLink}
                        />
                    </Form.Item>
                    <Form.Item label="Lien réseaux sociaux">
                        <CustomInput
                            onChange={e => onChangeState("socialNetworkLink", e.target.value)}
                            value={stepState.socialNetworkLink}
                        />
                    </Form.Item>
                </InputWrapper>
                <Form.Item label="Description">
                    <CustomTextArea
                        rows={4}
                        onChange={e => onChangeState("description", e.target.value)}
                        value={stepState.description}
                    />
                </Form.Item>
            </CustomForm>
            <ButtonWrapper align="right" layout="aside">
                <Button size="large" type="primary" onClick={() => changeStep(1)}>
                    suivant
                </Button>
            </ButtonWrapper>
        </>
    );
};
