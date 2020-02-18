import React from "react";
import { Form, Input, Button, Radio } from "antd";
import styled from "styled-components";
import { rem } from "polished";

import { ButtonWrapper } from "styles/atoms/button-wrapper";

import { StateKeys } from "../index";

import { observer } from "mobx-react";
import { useStores } from "madu/hooks/use-store";

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
};

export type StepOneProps = {
    onChangeStepState: <T>(key: StateKeys, value: T) => void;
    changeStep: (n: number) => void;
    stepState: StepOneState;
    onEdit: (key: string, value: any) => void;
    form: any;
};

const FormStepOneComponent = observer(
    ({ onChangeStepState, changeStep, onEdit, form }: StepOneProps) => {
        const {
            pointOfInterestStore: { byId },
        } = useStores();

        const checkForm = () => {
            form.validateFields((err, values) => {
                if (!err) {
                    changeStep(1);
                }
            });
        };
        console.log(form.isFieldTouched());
        return (
            <>
                <CustomForm>
                    <Form.Item label="Nom de l'établissement">
                        {form.getFieldDecorator("name", {
                            initialValue: byId.name,
                            setFieldsValue: byId.name,
                            rules: [{ required: true, message: "Merci de renseigner un nom" }],
                        })(<CustomInput onChange={e => onEdit("name", e.target.value)} />)}
                    </Form.Item>
                    <Form.Item label="Catégorie">
                        {form.getFieldDecorator("category", {
                            initialValue: byId.category,
                            setFieldsValue: byId.category,
                            rules: [{ required: true, message: "Merci de choisir une catégorie" }],
                        })(
                            <Radio.Group onChange={e => onEdit("category", e.target.value)}>
                                <Radio.Button value="a">Restaurant</Radio.Button>
                                <Radio.Button value="b">Boutique</Radio.Button>
                                <Radio.Button value="c">Expérience</Radio.Button>
                            </Radio.Group>
                        )}
                    </Form.Item>
                    <Form.Item label="Type d'établissement">
                        {form.getFieldDecorator("poiType", {
                            initialValue: byId.poiType,
                            setFieldsValue: byId.poiType,
                            rules: [
                                {
                                    required: true,
                                    message: "Merci de choisir un type d'établissement",
                                },
                            ],
                        })(<CustomInput onChange={e => onEdit("poiType", e.target.value)} />)}
                    </Form.Item>
                    <InputWrapper>
                        <Form.Item label="Adresse">
                            {form.getFieldDecorator("street", {
                                initialValue: byId.street,
                                setFieldsValue: byId.street,
                                rules: [
                                    { required: true, message: "Merci de choisir une adresse" },
                                ],
                            })(<CustomInput onChange={e => onEdit("street", e.target.value)} />)}
                        </Form.Item>
                        <Form.Item label="Code Postal">
                            {form.getFieldDecorator("zipCode", {
                                initialValue: byId.zipCode,
                                setFieldsValue: byId.zipCode,
                                rules: [
                                    { required: true, message: "Merci de choisir un code postale" },
                                ],
                            })(<CustomInput onChange={e => onEdit("zipCode", e.target.value)} />)}
                        </Form.Item>
                    </InputWrapper>
                    <InputWrapper>
                        <Form.Item label="Email">
                            {form.getFieldDecorator("email", {
                                initialValue: byId.email,
                                setFieldsValue: byId.email,
                                rules: [
                                    {
                                        required: true,
                                        message: "Merci de renseigner une adresse email",
                                    },
                                ],
                            })(<CustomInput onChange={e => onEdit("email", e.target.value)} />)}
                        </Form.Item>
                        <Form.Item label="Téléphone">
                            {form.getFieldDecorator("phone", {
                                initialValue: byId.phone,
                                setFieldsValue: byId.phone,
                                rules: [
                                    {
                                        type: "string",
                                        message: "Merci de choisir un numéro de téléphone valide",
                                    },
                                ],
                            })(<CustomInput onChange={e => onEdit("phone", e.target.value)} />)}
                        </Form.Item>
                    </InputWrapper>
                    <InputWrapper>
                        <Form.Item label="Lien du Site">
                            {form.getFieldDecorator("website", {
                                initialValue: byId.website,
                                setFieldsValue: byId.website,
                                rules: [
                                    { type: "url", message: "Merci de choisir une url valide" },
                                ],
                            })(<CustomInput onChange={e => onEdit("website", e.target.value)} />)}
                        </Form.Item>
                        <Form.Item label="Lien réseaux sociaux">
                            {form.getFieldDecorator("socialNetwork", {
                                initialValue: byId.socialNetwork,
                                setFieldsValue: byId.socialNetwork,
                                rules: [
                                    { type: "url", message: "Merci de choisir une url valide" },
                                ],
                            })(
                                <CustomInput
                                    onChange={e => onEdit("socialNetwork", e.target.value)}
                                />
                            )}
                        </Form.Item>
                    </InputWrapper>
                    <Form.Item label="Description">
                        {form.getFieldDecorator("description", {
                            initialValue: byId.description,
                            setFieldsValue: byId.description,
                            rules: [
                                { required: true, message: "Merci de choisir un code postale" },
                            ],
                        })(
                            <CustomTextArea
                                rows={4}
                                onChange={e => onEdit("description", e.target.value)}
                            />
                        )}
                    </Form.Item>
                </CustomForm>
                <ButtonWrapper
                    style={{
                        position: "absolute",
                        bottom: "0",
                        right: "0",
                        marginRight: "82px",
                        marginBottom: "35px",
                    }}
                    align="right"
                    layout="aside"
                >
                    <Button
                        size="large"
                        type="primary"
                        disabled={!form.isFieldsTouched()}
                        onClick={() => checkForm()}
                    >
                        suivant
                    </Button>
                </ButtonWrapper>
            </>
        );
    }
);

export const FormStepOne = Form.create()(FormStepOneComponent);
