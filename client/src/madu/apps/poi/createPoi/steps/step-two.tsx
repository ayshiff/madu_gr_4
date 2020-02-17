import React from "react";
import { Form, Input, Radio, Button, Upload, Icon, TimePicker, Switch } from "antd";
import styled from "styled-components";
import { rem } from "polished";

import { ButtonWrapper } from "styles/atoms/button-wrapper";

import { StateKeys } from "../index";

const CustomInput = styled(Input)`
    width: ${rem(20)};
    &:first-child {
        margin-right: ${rem(14)};
    }
`;

const TimePickerWrapper = styled.div`
    display: flex;
`;

const CustomTimePicker = styled(TimePicker)`
    &:not(:last-child) {
        margin-right: ${rem(14)};
    }
    &:nth-child(3) {
        margin-left: ${rem(14)};
    }
`;

export type StepTwoState = {
    index: number;
    webSiteLink: string;
    fileList: any[];
    price: string;
    description: string;
    schedule:Record<string,Record<string,string|boolean>>
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

    const handleChange = info => {
        let fileList = [...info.fileList];

        fileList = fileList.slice(-2);

        fileList = fileList.map(file => {
            if (file.response) {
                file.url = file.response.url;
            }
            return file;
        });

        onChangeState("fileList", fileList);
    };

    return (
        <>
            <Form>
                <TimePickerWrapper>
                    <Form.Item label="Horaires">
                        <Switch 
                            //  onChange={e => onChangeState("close", e)}
                            //  checked={stepState.schedule.monday.close}
                        />
                        <CustomTimePicker 
                             onChange={e => onChangeState("earlyMorning", e.target.value)}
                             value={stepState.schedule.earlyMorning}                                              
                        />
                        <CustomTimePicker
                            onChange={e => onChangeState("lateMorning", e.target.value)}
                            value={stepState.schedule.lateMorning}
                        />
                        {"  -  "}
                        <CustomTimePicker
                            onChange={e => onChangeState("earlyAfternoon", e.target.value)}
                            value={stepState.schedule.earlyAfternoon}
                        />
                        <CustomTimePicker
                            onChange={e => onChangeState("lateAfternoon", e.target.value)}
                            value={stepState.schedule.lateAfternoon}
                        />
                    </Form.Item>
                </TimePickerWrapper>
                <Form.Item label="Lien du site, réseau sociaux">
                    <CustomInput
                        onChange={e => onChangeState("webSiteLink", e.target.value)}
                        value={stepState.webSiteLink}
                    />
                </Form.Item>

                <Form.Item label="Prix">
                    <Radio.Group
                        buttonStyle="solid"
                        onChange={e => onChangeState("price", e.target.value)}
                        value={stepState.price}
                    >
                        <Radio.Button value="a">€</Radio.Button>
                        <Radio.Button value="b">€€</Radio.Button>
                        <Radio.Button value="c">€€€</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Upload photos">
                    <Upload onChange={handleChange} multiple={true} fileList={stepState.fileList}>
                        <Button>
                            <Icon type="upload" /> Upload
                        </Button>
                    </Upload>
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
