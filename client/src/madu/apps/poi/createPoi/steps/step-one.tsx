import React from "react";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import { rem } from "polished";
import { ButtonWrapper } from "styles/atoms/button-wrapper";
import { StateKeys } from "../index";
import { observer } from "mobx-react";
import { useStores } from "madu/hooks/use-store";
import { InstantSearch } from "react-instantsearch-dom";
import algoliasearch from "algoliasearch";
import Places from "../../../../places/widget";

const searchClient = algoliasearch("latency", "97797269710d54d6054b399b1f777c5c");

const { TextArea } = Input;

const CustomTextArea = styled(TextArea)`
    width: ${rem(614)};
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

const FormStepOneComponent = observer(({ changeStep, onEdit, form }: StepOneProps) => {
    const { pointOfInterestStore } = useStores();

    const checkForm = () => {
        form.validateFields((err, values) => {
            if (!err) {
                changeStep(1);
            }
        });
    };
    return (
        <>
            <CustomForm hideRequiredMark>
                <Form.Item label="Nom de l'établissement">
                    {form.getFieldDecorator("name", {
                        initialValue: pointOfInterestStore.byId.name,
                        setFieldsValue: pointOfInterestStore.byId.name,
                        rules: [
                            {
                                required: true,
                                message: "Merci de renseigner un nom d'établissement",
                            },
                        ],
                    })(<CustomInput onChange={e => onEdit("name", e.target.value)} />)}
                </Form.Item>
                <Form.Item label="Adresse">
                    <InstantSearch indexName="airports" searchClient={searchClient}>
                        <div className="search-panel" style={{ width: "300px" }}>
                            <div className="search-panel__results">
                                <Places
                                    store={pointOfInterestStore}
                                    defaultRefinement={{
                                        lat: 37.7793,
                                        lng: -122.419,
                                    }}
                                />
                            </div>
                        </div>
                    </InstantSearch>
                </Form.Item>
                <InputWrapper>
                    <Form.Item label="Email">
                        {form.getFieldDecorator("email", {
                            initialValue: pointOfInterestStore.byId.email,
                            setFieldsValue: pointOfInterestStore.byId.email,
                            rules: [
                                {
                                    required: true,
                                    message: "Merci de renseigner une adresse email",
                                },
                            ],
                        })(
                            <CustomInput
                                onChange={e => onEdit("email", e.target.value)}
                                placeholder="exemple@gmail.com"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Téléphone">
                        {form.getFieldDecorator("phone", {
                            initialValue: pointOfInterestStore.byId.phone,
                            setFieldsValue: pointOfInterestStore.byId.phone,
                            rules: [
                                {
                                    type: "string",
                                    message: "Format requis 0100000000",
                                },
                            ],
                        })(<CustomInput onChange={e => onEdit("phone", e.target.value)} />)}
                    </Form.Item>
                </InputWrapper>
                <InputWrapper>
                    <Form.Item label="Lien du Site">
                        {form.getFieldDecorator("website", {
                            initialValue: pointOfInterestStore.byId.website,
                            setFieldsValue: pointOfInterestStore.byId.website,
                            rules: [
                                {
                                    required: true,
                                    type: "url",
                                    message: "Merci de choisir une url valide",
                                },
                            ],
                        })(
                            <CustomInput
                                onChange={e => onEdit("website", e.target.value)}
                                placeholder=" http://www.exemple.fr"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Lien réseaux sociaux">
                        {form.getFieldDecorator("socialNetwork", {
                            initialValue: pointOfInterestStore.byId.socialNetwork,
                            setFieldsValue: pointOfInterestStore.byId.socialNetwork,
                            rules: [
                                {
                                    required: true,
                                    type: "url",
                                    message: "Merci de choisir une url valide",
                                },
                            ],
                        })(<CustomInput onChange={e => onEdit("socialNetwork", e.target.value)} />)}
                    </Form.Item>
                </InputWrapper>
                <Form.Item label="Description">
                    {form.getFieldDecorator("description", {
                        initialValue: pointOfInterestStore.byId.description,
                        setFieldsValue: pointOfInterestStore.byId.description,
                        rules: [
                            {
                                required: true,
                                message: "Merci de rentrer une description",
                            },
                        ],
                    })(
                        <CustomTextArea
                            rows={6}
                            onChange={e => onEdit("description", e.target.value)}
                        />
                    )}
                </Form.Item>
            </CustomForm>
            <ButtonWrapper align="right" layout="aside">
                <Button size="large" type="primary" onClick={() => checkForm()}>
                    suivant
                </Button>
            </ButtonWrapper>
        </>
    );
});

export const FormStepOne = Form.create()(FormStepOneComponent);
