import React from "react";
import { Form, Input, Radio, Button, Upload, Icon, TimePicker, Switch } from "antd";
import styled from "styled-components";
import { rem } from "polished";

import { ButtonWrapper } from "styles/atoms/button-wrapper";

import { StateKeys } from "../index";

import { observer } from "mobx-react";
import { useStores } from "madu/hooks/use-store";

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
    onEdit: (key: string, value: any) => void;
    form: any;
};

const FormStepTwoComponent = observer(
    ({ changeStep, onChangeStepState, stepState, onEdit, form }: StepTwoProps) => {
        const weekDay = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
        const onChangeState = (field: string, value) => {
            const newStepTwoState: StepTwoState = {
                ...stepState,
                [field]: value,
            };
            onChangeStepState<StepTwoState>("stepTwo", newStepTwoState);
        };

        const { pointOfInterestStore } = useStores();

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

        const isFieldsValidated = !Object.entries(form.getFieldsError()).some(value => value[1]);

        const onSubmit = () => {
            pointOfInterestStore.add(pointOfInterestStore.byId);
            pointOfInterestStore.resetId();
        };

        const {
            pointOfInterestStore: { byId },
        } = useStores();

        return (
            <>
                <Form>
                    <TimePickerWrapper>
                        <Form.Item label="Horaires">
                            {weekDay.map(value => (
                                <div key={value} style={{ display: "flex", alignItems: "center" }}>
                                    <h1 style={{ marginRight: "10px", fontWeight: "bold" }}>
                                        {" "}
                                        {value}{" "}
                                    </h1>
                                    <Switch
                                        onChange={e => onScheduleChange(value, "close", e)}
                                        checked={
                                            stepState.schedule[value] &&
                                            (stepState.schedule[value].close as boolean)
                                        }
                                    />
                                    <p style={{ marginLeft: "15px", marginRight: "5px" }}>fermé</p>
                                    <CustomTimePicker
                                        onChange={e => onScheduleChange(value, "earlyMorning", e)}
                                    />
                                    <CustomTimePicker
                                        style={{ marginRight: "8px" }}
                                        onChange={e => onScheduleChange(value, "lateMorning", e)}
                                    />
                                    {"  -  "}
                                    <CustomTimePicker
                                        onChange={e => onScheduleChange(value, "earlyAfternoon", e)}
                                    />
                                    <CustomTimePicker
                                        onChange={e => onScheduleChange(value, "lateAfternoon", e)}
                                    />
                                </div>
                            ))}
                        </Form.Item>
                    </TimePickerWrapper>

                    <Form.Item label="Lien du site, réseau sociaux">
                        {form.getFieldDecorator("website", {
                            initialValue: byId.website,
                            setFieldsValue: byId.website,
                            rules: [{ type: "url", message: "Merci de choisir une url valide" }],
                        })(<CustomInput onChange={e => onEdit("website", e.target.value)} />)}
                    </Form.Item>

                    <InputWrapper>
                        <Form.Item label="Prix">
                            {form.getFieldDecorator("priceRange", {
                                initialValue: byId.priceRange,
                                setFieldsValue: byId.priceRange,
                                rules: [
                                    { type: "string", message: "Merci de choisir un type de prix" },
                                ],
                            })(
                                <Radio.Group
                                    buttonStyle="solid"
                                    onChange={e => onEdit("priceRange", e.target.value)}
                                >
                                    <Radio.Button value="€">€</Radio.Button>
                                    <Radio.Button value="€€">€€</Radio.Button>
                                    <Radio.Button value="€€€">€€€</Radio.Button>
                                </Radio.Group>
                            )}
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
                        <Upload
                            onChange={handleChange}
                            listType="picture-card"
                            multiple={true}
                            fileList={stepState.fileList}
                        >
                            <Button>
                                <Icon type="upload" /> Upload
                            </Button>
                        </Upload>
                    </Form.Item>
                </Form>
                <InputWrapper>
                    <Form.Item label="Type d'établissement">
                        {form.getFieldDecorator("poiType", {
                            initialValue: byId.poiType,
                            setFieldsValue: byId.poiType,
                            rules: [{ type: "url", message: "Merci de choisir une url valide" }],
                        })(<CustomInput onChange={e => onEdit("poiType", e.target.value)} />)}
                    </Form.Item>
                    <Form.Item label="Préférence alimentaire">
                        {form.getFieldDecorator("foodPreference", {
                            initialValue: byId.foodPreference,
                            setFieldsValue: byId.foodPreference,
                            rules: [{ type: "url", message: "Merci de choisir une url valide" }],
                        })(
                            <CustomInput onChange={e => onEdit("foodPreference", e.target.value)} />
                        )}
                    </Form.Item>
                </InputWrapper>
                <Form.Item label="Greenscore">
                    {form.getFieldDecorator("greenscore", {
                        initialValue: byId.greenscore,
                        setFieldsValue: byId.greenscore,
                        rules: [{ type: "url", message: "Merci de choisir une url valide" }],
                    })(<CustomInput onChange={e => onEdit("greenscore", e.target.value)} />)}
                </Form.Item>
                <InputWrapper>
                    <InputWrapper>
                        <p style={{ marginRight: "10px", marginLeft: "10px", fontWeight: "bold" }}>
                            {" "}
                            A emporter{" "}
                        </p>
                        <Switch
                        // onChange={e => onScheduleChange(value, "close", e)}
                        // checked={
                        //     stepState.schedule[value] &&
                        //     (stepState.schedule[value].close as boolean)
                        // }
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <p style={{ marginLeft: "10px", marginRight: "10px", fontWeight: "bold" }}>
                            {" "}
                            Accessibilité fauteuil{" "}
                        </p>
                        <Switch
                        // onChange={e => onScheduleChange(value, "close", e)}
                        // checked={
                        //     stepState.schedule[value] &&
                        //     (stepState.schedule[value].close as boolean)
                        // }
                        />
                    </InputWrapper>
                </InputWrapper>
                <ButtonWrapper align="right" layout="aside">
                    <Button style={{ color: "#BFBFBF" }} size="large" onClick={() => changeStep(0)}>
                        Précedent
                    </Button>
                    <Button
                        size="large"
                        disabled={!isFieldsValidated}
                        type="primary"
                        onClick={() => isFieldsValidated && onSubmit()}
                    >
                        Valider
                    </Button>
                </ButtonWrapper>
            </>
        );
    }
);

export const FormStepTwo = Form.create()(FormStepTwoComponent);
