import React from "react";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import { rem } from "polished";
import { useHistory } from "react-router";

import { ButtonWrapper } from "styles/atoms/button-wrapper";

import { useStores } from "madu/hooks/use-store";

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
};

export type StepTwoProps = {
    changeStep: (n: number) => void;
    onEdit: (key: string, value: any) => void;
    form: any;
};

const FormStepTwoComponent = ({ onEdit, changeStep, form }: StepTwoProps) => {
    const { companyStore } = useStores();
    const history = useHistory();

    const onSubmit = () => {
        form.validateFields((err, values) => {
            if (!err) {
                if (companyStore.isEditing) {
                    // Editing
                    companyStore.edit(companyStore.byId.id, companyStore.byId);
                    companyStore.setEditing(false);
                } else {
                    // Creating
                    companyStore.add(companyStore.byId);
                }

                companyStore.resetId();
                history.push("/client/list");
            }
        });
    };

    const {
        companyStore: { byId },
    } = useStores();

    return (
        <StepWrapper>
            <Form>
                <Form.Item label="Nombre de salariés / élèves">
                    {form.getFieldDecorator("employees", {
                        initialValue: byId.employees,
                        setFieldsValue: byId.employees,
                        rules: [{ required: true, message: "Merci de renseigner un nom" }],
                    })(<CustomInput onChange={e => onEdit("employees", e.target.value)} />)}
                </Form.Item>
                <Form.Item label="Nom de domaine mail">
                    {form.getFieldDecorator("domainName", {
                        initialValue: byId.domainName,
                        setFieldsValue: byId.domainName,
                        rules: [{ required: true, message: "Merci de renseigner un nom" }],
                    })(
                        <CustomInput
                            onChange={e => onEdit("domainName", e.target.value)}
                            placeholder="domain.com"
                        />
                    )}
                </Form.Item>
            </Form>

            <ButtonWrapper align="right" layout="aside">
                <Button size="large" onClick={() => changeStep(0)}>
                    Précedent
                </Button>
                <Button size="large" type="primary" onClick={() => onSubmit()}>
                    Validé
                </Button>
            </ButtonWrapper>
        </StepWrapper>
    );
};

export const FormStepTwo = Form.create()(FormStepTwoComponent);
