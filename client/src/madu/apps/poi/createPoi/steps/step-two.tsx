import React from "react";
import { Form, Input, Radio, Button, Upload, Icon, TimePicker, Switch } from "antd";
import styled from "styled-components";
import { rem } from "polished";
import { useHistory } from "react-router";

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
        const weekDay = [
            { value: "Lundi", key: "monday" },
            { value: "Mardi", key: "tuesday" },
            { value: "Mercredi", key: "wednesday" },
            { value: "Jeudi", key: "thursday" },
            { value: "Vendredi", key: "friday" },
            { value: "Samedi", key: "saturday" },
            { value: "Dimanche", key: "sunday" },
        ];
        const onChangeState = (field: string, value) => {
            const newStepTwoState: StepTwoState = {
                ...stepState,
                [field]: value,
            };
            onChangeStepState<StepTwoState>("stepTwo", newStepTwoState);
        };

        const { pointOfInterestStore } = useStores();
        const history = useHistory();

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

        const onSubmit = () => {
            form.validateFields((err, values) => {
                if (!err) {
                    if (pointOfInterestStore.isEditing) {
                        // Editing
                        pointOfInterestStore.edit(
                            pointOfInterestStore.byId.id,
                            pointOfInterestStore.byId
                        );
                        pointOfInterestStore.setEditing(false);
                    } else {
                        // Creating
                        pointOfInterestStore.add(pointOfInterestStore.byId);
                    }

                    pointOfInterestStore.resetId();
                    history.push("/poi/list");
                }
            });
        };

        const {
            pointOfInterestStore: { byId },
        } = useStores();

        const updateOpeningRanges = (day: string, isFrom: boolean, index: number, value: any) => {
            pointOfInterestStore.byId.openingTime[day][isFrom ? 1 : 0][
                index ? "to" : "from"
            ] = value.format("HH:mm");
        };

        return (
            <>
                <Form>
                    <TimePickerWrapper>
                        <Form.Item label="Horaires">
                            {weekDay.map(day => (
                                <div
                                    key={day.value}
                                    style={{ display: "flex", alignItems: "center" }}
                                >
                                    <h1 style={{ marginRight: "10px", fontWeight: "bold" }}>
                                        {" "}
                                        {day.value}{" "}
                                    </h1>
                                    <Switch
                                        onChange={e => onScheduleChange(day, "close", e)}
                                        checked={
                                            stepState.schedule[day.value] &&
                                            (stepState.schedule[day.value].close as boolean)
                                        }
                                    />
                                    <p style={{ marginLeft: "15px", marginRight: "5px" }}>fermé</p>
                                    <CustomTimePicker
                                        // value={moment(
                                        //     pointOfInterestStore.byId.openingTime[day.key][0].from
                                        // )}
                                        onChange={e => updateOpeningRanges(day.key, true, 0, e)}
                                    />
                                    <CustomTimePicker
                                        // value={moment(
                                        //     pointOfInterestStore.byId.openingTime[day.key][1].to
                                        // )}
                                        style={{ marginRight: "8px" }}
                                        onChange={e => updateOpeningRanges(day.key, false, 0, e)}
                                    />
                                    {"  -  "}
                                    <CustomTimePicker
                                        // value={moment(
                                        //     pointOfInterestStore.byId.openingTime[day.key][0].from
                                        // )}
                                        onChange={e => updateOpeningRanges(day.key, true, 1, e)}
                                    />
                                    <CustomTimePicker
                                        // value={moment(
                                        //     pointOfInterestStore.byId.openingTime[day.key][1].to
                                        // )}
                                        onChange={e => updateOpeningRanges(day.key, false, 1, e)}
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
                        <Form.Item style={{ marginLeft: "20px" }} label="Catégorie">
                            {form.getFieldDecorator("category", {
                                initialValue: byId.category,
                                setFieldsValue: byId.category,
                                rules: [
                                    { required: true, message: "Merci de choisir une catégorie" },
                                ],
                            })(
                                <Radio.Group onChange={e => onEdit("category", e.target.value)}>
                                    <Radio.Button value="restoration">Restaurant</Radio.Button>
                                    <Radio.Button value="shop">Boutique</Radio.Button>
                                    <Radio.Button value="experience">Expérience</Radio.Button>
                                </Radio.Group>
                            )}
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
                            rules: [{ required: true, message: "Merci de choisir une url valide" }],
                        })(<CustomInput onChange={e => onEdit("poiType", e.target.value)} />)}
                    </Form.Item>
                    {console.log(byId.category)}
                    {byId.category === "restoration" && (
                        <Form.Item label="Préférence alimentaire">
                            {form.getFieldDecorator("foodPreference", {
                                initialValue: byId.foodPreference,
                                setFieldsValue: byId.foodPreference,
                            })(
                                <CustomInput
                                    onChange={e => onEdit("foodPreference", e.target.value)}
                                />
                            )}
                        </Form.Item>
                    )}
                </InputWrapper>
                <Form.Item label="Greenscore">
                    {form.getFieldDecorator("greenscore", {
                        initialValue: byId.greenscore,
                        setFieldsValue: byId.greenscore,
                        rules: [{ required: true, message: "Merci de choisir une url valide" }],
                    })(
                        <CustomInput
                            onChange={e => onEdit("greenscore", parseInt(e.target.value))}
                        />
                    )}
                </Form.Item>
                <InputWrapper>
                    {byId.category === "restoration" && (
                        <InputWrapper>
                            <p
                                style={{
                                    marginRight: "10px",
                                    marginLeft: "10px",
                                    fontWeight: "bold",
                                }}
                            >
                                {" "}
                                A emporter{" "}
                            </p>
                            <Switch onChange={e => onEdit("takeAway", e)} checked={byId.takeAway} />
                        </InputWrapper>
                    )}
                    <InputWrapper>
                        <p style={{ marginLeft: "10px", marginRight: "10px", fontWeight: "bold" }}>
                            {" "}
                            Accessibilité fauteuil{" "}
                        </p>
                        <Switch onChange={e => onEdit("wheelchair", e)} checked={byId.wheelchair} />
                    </InputWrapper>
                </InputWrapper>
                <ButtonWrapper align="right" layout="aside">
                    <Button style={{ color: "#BFBFBF" }} size="large" onClick={() => changeStep(0)}>
                        Précedent
                    </Button>
                    <Button size="large" type="primary" onClick={() => onSubmit()}>
                        Valider
                    </Button>
                </ButtonWrapper>
            </>
        );
    }
);

export const FormStepTwo = Form.create()(FormStepTwoComponent);
