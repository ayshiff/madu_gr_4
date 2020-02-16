import React from "react";
import { Form, Input, Radio, Button, Upload, Icon } from "antd";
import styled from "styled-components";
import { rem } from "polished";

import { ButtonWrapper } from "styles/atoms/button-wrapper";

import { StateKeys } from "../index";

const { TextArea } = Input;

const CustomInput = styled(Input)`
    width: ${rem(300)};
    &:first-child {
        margin-right: ${rem(14)};
    }
`;

const CustomTextArea = styled(TextArea)`
    width: ${rem(300)};
`;

export type StepTwoState = {
    index: number;
    name: string;
    fileList: any[];
};

export type StepTwoProps = {
    onChangeStepState: <T>(key: StateKeys, value: T) => void;
    changeStep: (n: number) => void;
    stepState: StepTwoState;
};

export const FormStepTwo = ({ changeStep, onChangeStepState, stepState }: StepTwoProps) => {
    const onChangeState = (field: string, value) => {
        const newStepOneState: StepTwoState = {
            ...stepState,
            [field]: value,
        };
        onChangeStepState<StepTwoState>("stepTwo", newStepOneState);
    };

    const handleChange = info => {
        let fileList = [...info.fileList];

        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-2);

        // 2. Read from response and show file link
        fileList = fileList.map(file => {
            if (file.response) {
                console.log("test");
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });

        onChangeState("fileList", fileList);
    };

    return (
        <>
            <Form>
                <Form.Item label="Lien du site, réseau sociaux">
                    <CustomInput
                        onChange={e => onChangeState("name", e.target.value)}
                        value={stepState.name}
                    />
                </Form.Item>
                <Form.Item label="Upload photos">
                    <Upload onChange={handleChange} multiple={true} fileList={stepState.fileList}>
                        <Button>
                            <Icon type="upload" /> Upload
                        </Button>
                    </Upload>
                </Form.Item>
                <Form.Item label="Prix">
                    <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">€</Radio.Button>
                        <Radio.Button value="b">€€</Radio.Button>
                        <Radio.Button value="c">€€€</Radio.Button>
                        <Radio.Button value="d">€€€€</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Description">
                    <CustomTextArea rows={4} />
                </Form.Item>
            </Form>
            <ButtonWrapper align="right" layout="aside">
                <Button size="large" onClick={() => changeStep(0)}>
                    précedent
                </Button>
                <Button size="large" type="primary" onClick={() => changeStep(2)}>
                    suivant
                </Button>
            </ButtonWrapper>
        </>
    );
};
