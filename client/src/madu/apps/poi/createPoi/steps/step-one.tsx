import React from "react";
import { Form, Input, Button } from "antd";
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
                        placeholder="Nom de l'établissement"
                        onChange={e => onChangeState("name", e.target.value)}
                        value={stepState.name}
                    />
                </Form.Item>
                <Form.Item label="Type d'établissement">
                    <CustomInput
                        placeholder="Type d'établissement"
                        onChange={e => onChangeState("establishmentType", e.target.value)}
                        value={stepState.establishmentType}
                    />
                </Form.Item>
                <InputWrapper>
                    <Form.Item label="Adresse">
                        <CustomInput
                            placeholder="Adresse"
                            onChange={e => onChangeState("address", e.target.value)}
                            value={stepState.address}
                        />
                    </Form.Item>
                    <Form.Item label="Code Postal">
                        <CustomInput
                            placeholder="Code Postal"
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
                            placeholder="Email"
                            onChange={e => onChangeState("email", e.target.value)}
                            value={stepState.email}
                        />
                    </Form.Item>
                    <Form.Item label="Téléphone">
                        <CustomInput
                            placeholder="Téléphone"                            
                            onChange={e => onChangeState("phoneNumber", e.target.value)}
                            value={stepState.phoneNumber}
                        />
                    </Form.Item>
                </InputWrapper>
                <InputWrapper>
                    <Form.Item label="Lien du site">
                        <CustomInput
                            placeholder="Lien du site"
                            onChange={e => onChangeState("webSiteLink", e.target.value)}
                            value={stepState.webSiteLink}
                        />
                    </Form.Item>
                    <Form.Item label="Lien réseaux sociaux">
                        <CustomInput
                            placeholder="Lien réseaux sociaux"
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
            <ButtonWrapper style={{ position: "absolute", bottom: "0", right: "0", marginRight: "82px", marginBottom: "35px"}} align="right" layout="aside">
                <Button style={{ background: "#F5F5F5", border: "1px solid #D9D9D9", boxSizing: "border-box", borderRadius: "4px", color:"#BFBFBF"}} size="large" type="primary" onClick={() => changeStep(1)}>
                    suivant
                </Button>
            </ButtonWrapper>
        </>
    );
};
