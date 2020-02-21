import React from "react";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import { rem } from "polished";
import { InstantSearch } from "react-instantsearch-dom";
import { observer } from "mobx-react";

import { ButtonWrapper } from "styles/atoms/button-wrapper";

import { useStores } from "madu/hooks/use-store";
import algoliasearch from "algoliasearch";
import Places from "madu/places/widget";

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
};

export type StepOneProps = {
    changeStep: (n: number) => void;
    onEdit: (key: string, value: any) => void;
    form: any;
};

const searchClient = algoliasearch("latency", "97797269710d54d6054b399b1f777c5c");

const FormStepOneComponent = observer(({ onEdit, changeStep, form }: StepOneProps) => {
    const { companyStore } = useStores();

    const checkForm = () => {
        form.validateFields((err, values) => {
            if (!err) {
                changeStep(1);
            }
        });
    };

    return (
        <StepWrapper>
            <CustomForm>
                <Form.Item label="Nom de l’entreprise/ école">
                    {form.getFieldDecorator("companyName", {
                        initialValue: companyStore.byId.companyName,
                        setFieldsValue: companyStore.byId.companyName,
                        rules: [{ required: true, message: "Merci de renseigner un nom" }],
                    })(<CustomInput onChange={e => onEdit("companyName", e.target.value)} />)}
                </Form.Item>
                <Form.Item label="Adresse">
                    <InstantSearch indexName="airports" searchClient={searchClient}>
                        <div className="search-panel" style={{ width: "300px" }}>
                            <div className="search-panel__results">
                                <Places
                                    store={companyStore}
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
                    <Form.Item label="Nom du contact">
                        {form.getFieldDecorator("lastName", {
                            initialValue: companyStore.byId.lastName,
                            setFieldsValue: companyStore.byId.lastName,
                            rules: [{ required: true, message: "Merci de renseigner un nom" }],
                        })(<CustomInput onChange={e => onEdit("lastName", e.target.value)} />)}
                    </Form.Item>
                    <Form.Item label="Prénom du contact">
                        {form.getFieldDecorator("name", {
                            initialValue: companyStore.byId.name,
                            setFieldsValue: companyStore.byId.name,
                            rules: [{ required: true, message: "Merci de renseigner un prénom" }],
                        })(<CustomInput onChange={e => onEdit("name", e.target.value)} />)}
                    </Form.Item>
                </InputWrapper>

                <InputWrapper>
                    <Form.Item label="Email">
                        {form.getFieldDecorator("email", {
                            initialValue: companyStore.byId.email,
                            setFieldsValue: companyStore.byId.email,
                            rules: [{ required: true, message: "Merci de renseigner un nom" }],
                        })(
                            <CustomInput
                                onChange={e => onEdit("email", e.target.value)}
                                placeholder="exemple@gmail.com"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Numéro de téléphone">
                        {form.getFieldDecorator("phoneNumber", {
                            initialValue: companyStore.byId.phoneNumber,
                            setFieldsValue: companyStore.byId.phoneNumber,
                            rules: [{ required: true, message: "Format requis 0100000000" }],
                        })(<CustomInput onChange={e => onEdit("phoneNumber", e.target.value)} />)}
                    </Form.Item>
                </InputWrapper>
            </CustomForm>

            <ButtonWrapper align="right" layout="aside">
                <Button size="large" type="primary" onClick={() => checkForm()}>
                    suivant
                </Button>
            </ButtonWrapper>
        </StepWrapper>
    );
});

export const FormStepOne = Form.create()(FormStepOneComponent);
