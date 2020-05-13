import React, { useState, useEffect } from "react";
import { Form, Input, Radio, Button, Upload, Icon, TimePicker, Switch, Select } from "antd";
import moment from "moment";
import styled from "styled-components";
import { rem } from "polished";
import { useHistory } from "react-router";
import { ButtonWrapper } from "styles/atoms/button-wrapper";
import { observer } from "mobx-react";
import { useStores } from "madu/hooks/use-store";
const { Option } = Select;

const format = "HH:mm";

const CustomInput = styled(Input)`
    width: ${rem(300)};
    &:first-child {
        margin-right: ${rem(14)};
    }
`;

const CustomSelect = styled(Select)`
    min-width: ${rem(300)};
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
    changeStep: (n: number) => void;
    stepState: StepTwoState;
    onEdit: (key: string, value: any) => void;
    form: any;
};

const FormStepTwoComponent = observer(({ changeStep, stepState, onEdit, form }: StepTwoProps) => {
    const [defaultCategory, setDefaultCategory] = useState("restoration");
    const weekDay = [
        { value: "Lundi", key: "monday" },
        { value: "Mardi", key: "tuesday" },
        { value: "Mercredi", key: "wednesday" },
        { value: "Jeudi", key: "thursday" },
        { value: "Vendredi", key: "friday" },
        { value: "Samedi", key: "saturday" },
        { value: "Dimanche", key: "sunday" },
    ];

    const poiTypeArray = ["restaurant", "café-thé", "bar-pub", "snack", "boulangerie-patisserie"];
    const foodPreferenceArray = [
        "gluten free",
        "végétarien",
        "vegan friendly",
        "vegan",
        "cru",
        "bio",
        "local",
    ];

    const { pointOfInterestStore } = useStores();
    const history = useHistory();

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

    useEffect(() => {
        if (byId.category) {
            setDefaultCategory(byId.category);
        }
    }, [byId.category]);

    return (
        <>
            <Form>
                <TimePickerWrapper>
                    <Form.Item label="Horaires">
                        {weekDay.map(day => (
                            <div
                                key={day.value}
                                style={{ display: "flex", alignItems: "center", flex: 1 }}
                            >
                                <p style={{ marginRight: "10px", fontWeight: "bold", flex: 1 }}>
                                    {day.value}
                                </p>

                                <div>
                                    <CustomTimePicker
                                        format={format}
                                        defaultValue={
                                            pointOfInterestStore.byId.openingTime[day.key][0].from
                                                ? moment(
                                                      pointOfInterestStore.byId.openingTime[
                                                          day.key
                                                      ][0].from,
                                                      "HH:mm"
                                                  )
                                                : null
                                        }
                                        onChange={e => updateOpeningRanges(day.key, false, 0, e)}
                                    />
                                    <CustomTimePicker
                                        format={format}
                                        defaultValue={
                                            pointOfInterestStore.byId.openingTime[day.key][0].to
                                                ? moment(
                                                      pointOfInterestStore.byId.openingTime[
                                                          day.key
                                                      ][0].to,
                                                      "HH:mm"
                                                  )
                                                : null
                                        }
                                        style={{ marginRight: "8px" }}
                                        onChange={e => updateOpeningRanges(day.key, false, 1, e)}
                                    />
                                    {"  -  "}
                                    <CustomTimePicker
                                        format={format}
                                        defaultValue={
                                            pointOfInterestStore.byId.openingTime[day.key][1].from
                                                ? moment(
                                                      pointOfInterestStore.byId.openingTime[
                                                          day.key
                                                      ][1].from,
                                                      "HH:mm"
                                                  )
                                                : null
                                        }
                                        onChange={e => updateOpeningRanges(day.key, true, 0, e)}
                                    />
                                    <CustomTimePicker
                                        format={format}
                                        defaultValue={
                                            pointOfInterestStore.byId.openingTime[day.key][1].to
                                                ? moment(
                                                      pointOfInterestStore.byId.openingTime[
                                                          day.key
                                                      ][1].to,
                                                      "HH:mm"
                                                  )
                                                : null
                                        }
                                        onChange={e => updateOpeningRanges(day.key, true, 1, e)}
                                    />
                                </div>
                            </div>
                        ))}
                    </Form.Item>
                </TimePickerWrapper>

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
                            initialValue: defaultCategory,
                            setFieldsValue: byId.category,
                            rules: [{ required: true, message: "Merci de choisir une catégorie" }],
                        })(
                            <Radio.Group onChange={e => onEdit("category", e.target.value)}>
                                <Radio.Button value="restoration">Restauration</Radio.Button>
                                <Radio.Button value="shop">Boutique</Radio.Button>
                                <Radio.Button value="experience">Expérience</Radio.Button>
                            </Radio.Group>
                        )}
                    </Form.Item>
                </InputWrapper>
                <Form.Item label="Upload photos">
                    <Upload listType="picture-card" multiple={true} fileList={stepState.fileList}>
                        <Button>
                            <Icon type="upload" /> Upload
                        </Button>
                    </Upload>
                </Form.Item>
            </Form>
            <InputWrapper>
                {defaultCategory === "restoration" && (
                    <>
                        <Form.Item label="Type d'établissement">
                            {form.getFieldDecorator("poiType", {
                                initialValue: byId.poiType,
                                setFieldsValue: byId.poiType,
                                rules: [
                                    {
                                        required: true,
                                        message: "Merci de choisir un type d'établissement valide",
                                    },
                                ],
                            })(
                                <CustomSelect
                                    mode="multiple"
                                    style={{ width: "100%" }}
                                    placeholder="Please select"
                                    onChange={e => onEdit("poiType", e)}
                                >
                                    {poiTypeArray.map((poiType, i) => (
                                        <Option key={i}>{poiType}</Option>
                                    ))}
                                </CustomSelect>
                            )}
                        </Form.Item>
                        <Form.Item label="Préférence alimentaire">
                            {form.getFieldDecorator("foodPreference", {
                                initialValue: byId.foodPreference,
                                setFieldsValue: byId.foodPreference,
                            })(
                                <CustomSelect
                                    mode="multiple"
                                    style={{ width: "100%" }}
                                    placeholder="Please select"
                                    onChange={e => onEdit("foodPreference", e)}
                                >
                                    {foodPreferenceArray.map((foodPreference, i) => (
                                        <Option key={i}>{foodPreference}</Option>
                                    ))}
                                </CustomSelect>
                            )}
                        </Form.Item>
                    </>
                )}
            </InputWrapper>
            <Form.Item label="Greenscore">
                {form.getFieldDecorator("greenscore", {
                    initialValue: byId.greenscore,
                    setFieldsValue: byId.greenscore,
                    rules: [{ required: true, message: "Merci de choisir un greenscore valide" }],
                })(<CustomInput onChange={e => onEdit("greenscore", parseInt(e.target.value))} />)}
            </Form.Item>
            <InputWrapper>
                {defaultCategory === "restoration" && (
                    <InputWrapper>
                        <p
                            style={{
                                marginRight: "10px",
                                marginLeft: "10px",
                                fontWeight: "bold",
                            }}
                        >
                            A emporter
                        </p>
                        <Switch onChange={e => onEdit("takeAway", e)} checked={byId.takeAway} />
                    </InputWrapper>
                )}
                <InputWrapper>
                    <p style={{ marginLeft: "10px", marginRight: "10px", fontWeight: "bold" }}>
                        Accessibilité fauteuil
                    </p>
                    <Switch onChange={e => onEdit("wheelchair", e)} checked={byId.wheelchair} />
                </InputWrapper>
            </InputWrapper>
            <ButtonWrapper align="right" layout="aside">
                <Button size="large" onClick={() => changeStep(0)}>
                    Précedent
                </Button>
                <Button size="large" type="primary" onClick={() => onSubmit()}>
                    Valider
                </Button>
            </ButtonWrapper>
        </>
    );
});

export const FormStepTwo = Form.create()(FormStepTwoComponent);
