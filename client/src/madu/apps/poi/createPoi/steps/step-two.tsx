import React from "react";
import { Form, Input, Radio, Button, Upload, Icon, TimePicker, Switch } from "antd";
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

const TimePickerWrapper = styled.div`
    display: flex;
`;

const CustomTimePicker = styled(TimePicker)`
        margin-right: ${rem(8)};
        margin-left: ${rem(8)};
`;

const InputWrapper = styled.div`
    display: flex;
`;

export type StepTwoState = {
    index: number;
    webSiteLink: string;
    fileList: any[];
    price: string;
    category: string;
    description: string;
    schedule: Record<string, Record<string, string | boolean>>;
};

export type StepTwoProps = {
    onChangeStepState: <T>(key: StateKeys, value: T) => void;
    changeStep: (n: number) => void;
    stepState: StepTwoState;
};

export const FormStepTwo = ({ changeStep, onChangeStepState, stepState }: StepTwoProps) => {
    const weekDay = ["monday", "thuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
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

    const onScheduleChange = (day, field, value) => {
        const object = {
            ...stepState.schedule,
            [day]: {
                ...stepState.schedule[day],
                [field]: value,
            },
        };
        onChangeState("schedule", object);
    };

    return (
        <>
            <Form>
                <TimePickerWrapper>
                    <Form.Item label="Horaires">
                        {weekDay.map(value => (
                            <div style={{display: "flex", alignItems: "center"}} key={value}>
                                <h1 style={{ marginRight: "10px", fontWeight: "bold"}}> {weekDay[0]} </h1>
                                <Switch
                                    onChange={e => onScheduleChange(value, "close", e)}
                                    checked={
                                        stepState.schedule[value] &&
                                        (stepState.schedule[value].close as boolean)
                                    }
                                />
                                <p style={{ marginLeft: "15px", marginRight: "5px"}} >fermé</p>
                                <CustomTimePicker
                                    onChange={e => onScheduleChange(value, "earlyMorning", e)}
                                    value={stepState.schedule.earlyMorning}
                                />
                                <CustomTimePicker
                                    style={{ marginRight: "8px" }}
                                    onChange={e => onScheduleChange(value, "lateMorning", e)}
                                    value={stepState.schedule.lateMorning}
                                />
                                {"  -  "}
                                <CustomTimePicker
                                    onChange={e => onScheduleChange(value, "earlyAfternoon", e)}
                                    value={stepState.schedule.earlyAfternoon}
                                />
                                <CustomTimePicker
                                    onChange={e => onScheduleChange(value, "lateAfternoon", e)}
                                    value={stepState.schedule.lateAfternoon}
                                />
                            </div>
                        ))}
                    </Form.Item>
                </TimePickerWrapper>

                <Form.Item label="Lien du site, réseau sociaux">
                    <CustomInput
                        placeholder="Lien du site, réseau sociaux"
                        onChange={e => onChangeState("webSiteLink", e.target.value)}
                        value={stepState.webSiteLink}
                    />
                </Form.Item>
                <InputWrapper>
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
                    <Form.Item style={{ marginLeft: "50px" }} label="Catégorie">
                        <Radio.Group
                            onChange={e => onChangeState("category", e.target.value)}
                            value={stepState.category}
                        >
                            <Radio.Button value="a">Restaurant</Radio.Button>
                            <Radio.Button value="b">Boutique</Radio.Button>
                            <Radio.Button value="c">Expérience</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </InputWrapper>
                <Form.Item label="Upload photos">
                    <Upload onChange={handleChange} listType="picture-card" multiple={true} fileList={stepState.fileList}>
                    <div>
                        <Icon type="plus" />
                        <div className="ant-upload-text">Upload</div>
                    </div>
                    </Upload>
                </Form.Item>
            </Form>
            <ButtonWrapper align="right" layout="aside">
                <Button style={{ color: "#BFBFBF" }}size="large" onClick={() => changeStep(0)}>
                    Précedent
                </Button>
                <Button size="large" type="primary">
                    Validé
                </Button>
            </ButtonWrapper>
        </>
    );
};
