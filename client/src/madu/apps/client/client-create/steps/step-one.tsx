import React from "react";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import { rem } from "polished";
import { InstantSearch } from "react-instantsearch-dom";
import { observer } from "mobx-react";

import { ButtonWrapper } from "styles/atoms/button-wrapper";

import { useStores } from "madu/hooks/use-store";
import algoliasearch from "algoliasearch";
import Places from "../../../../places/widget";

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
    const {
        companyStore: { byId },
    } = useStores();

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
                        initialValue: byId.companyName,
                        setFieldsValue: byId.companyName,
                        rules: [{ required: true, message: "Merci de renseigner un nom" }],
                    })(<CustomInput onChange={e => onEdit("companyName", e.target.value)} />)}
                </Form.Item>
                <InputWrapper>
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
                    <Form.Item label="Code postal">
                        {form.getFieldDecorator("zipcode", {
                            initialValue: byId.zipcode,
                            setFieldsValue: byId.zipcode,
                            rules: [{ required: true, message: "Merci de renseigner un nom" }],
                        })(<CustomInput onChange={e => onEdit("zipcode", e.target.value)} />)}
                    </Form.Item>
                </InputWrapper>

                <InputWrapper>
                    <Form.Item label="Nom">
                        {form.getFieldDecorator("name", {
                            initialValue: byId.name,
                            setFieldsValue: byId.name,
                            rules: [{ required: true, message: "Merci de renseigner un nom" }],
                        })(<CustomInput onChange={e => onEdit("name", e.target.value)} />)}
                    </Form.Item>
                    <Form.Item label="Téléphone">
                        {form.getFieldDecorator("phoneNumber", {
                            initialValue: byId.phoneNumber,
                            setFieldsValue: byId.phoneNumber,
                            rules: [{ required: true, message: "Merci de renseigner un nom" }],
                        })(<CustomInput onChange={e => onEdit("phoneNumber", e.target.value)} />)}
                    </Form.Item>
                </InputWrapper>

                <Form.Item label="Poste">
                    {form.getFieldDecorator("companyPosition", {
                        initialValue: byId.companyPosition,
                        setFieldsValue: byId.companyPosition,
                        rules: [{ required: true, message: "Merci de renseigner un nom" }],
                    })(<CustomInput onChange={e => onEdit("companyPosition", e.target.value)} />)}
                </Form.Item>
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
