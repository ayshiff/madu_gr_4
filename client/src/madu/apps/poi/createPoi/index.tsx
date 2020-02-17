import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Layout } from "antd";
import { createBrowserHistory as createHistory } from "history";

import { Stepper } from "madu/components/stepper";

import { FormStepOne, StepOneState } from "./steps/step-one";
import { FormStepTwo } from "./steps/step-two";
import { FormStepThree } from "./steps/step-three";

const { Header, Content } = Layout;

const history = createHistory();

export type StateKeys = "stepOne" | "stepTwo" | "stepThree";

type FormState = {
    currentStep: number;
    stepStates: {
        stepOne: StepOneState;
        stepTwo: any;
        stepThree: any;
    };
};

const stepsComponents = [FormStepOne, FormStepTwo, FormStepThree];

export const CreatePoi = () => {
    const defaultFormState: FormState = useMemo(
        () => ({
            currentStep: 0,
            stepStates: {
                stepOne: {
                    index: 0,
                    name: "",
                    email: "",
                    category: "",
                    webSiteLink: "",
                    establishmentType: "",
                    socialNetworkLink: "",
                    description: "",
                    address: "",
                    zipcode: "",
                    phoneNumber: "",
                },
                stepTwo: {
                    index: 1,
                    // schedule: {
                    //     monday: {
                    //         earlyMorning: "",
                    //         lateMorning: "",
                    //         earlyAfternoon: "",
                    //         lateAfternoon: "",
                    //         close: false,
                    //     },
                    //     thuesday: {
                    //         earlyMorning: "",
                    //         lateMorning: "",
                    //         earlyAfternoon: "",
                    //         lateAfternoon: "",
                    //         close: false,
                    //     },
                    //     wednesday: {
                    //         earlyMorning: "",
                    //         lateMorning: "",
                    //         earlyAfternoon: "",
                    //         lateAfternoon: "",
                    //         close: false,
                    //     },
                    //     thursday: {
                    //         earlyMorning: "",
                    //         lateMorning: "",
                    //         earlyAfternoon: "",
                    //         lateAfternoon: "",
                    //         close: false,
                    //     },
                    //     friday: {
                    //         earlyMorning: "",
                    //         lateMorning: "",
                    //         earlyAfternoon: "",
                    //         lateAfternoon: "",
                    //         close: false,
                    //     },
                    //     saturday: {
                    //         earlyMorning: "",
                    //         lateMorning: "",
                    //         earlyAfternoon: "",
                    //         lateAfternoon: "",
                    //         close: false,
                    //     },
                    //     sunday: {
                    //         earlyMorning: "",
                    //         lateMorning: "",
                    //         earlyAfternoon: "",
                    //         lateAfternoon: "",
                    //         close: false,
                    //     },
                    // },
                    fileList: [],
                    price: "a",
                    takeaway: false,
                    accessibility: false,
                },
                stepThree: {
                    index: 2,
                    greenScore: "",
                    description: "",
                },
            },
        }),
        []
    );

    const titleStyle = {
        marginLeft: "20px",
        fontWeight: 500,
        fontSize: "28px",
    };

    const [formState, setFormState] = useState<FormState>(defaultFormState);

    const setCurrentStep = useCallback((state: FormState) => {
        if (history.state) {
            const { currentStep } = history.state;
            setFormState({ ...state, currentStep });
        } else history.goBack();
    }, []);

    // Page load set current step at -1
    useEffect(() => {
        if (window !== undefined && history) {
            history.push({ currentStep: 0 });
            setFormState(defaultFormState);
        }
    }, [defaultFormState, setCurrentStep]);

    const listenerPopState = useCallback(() => setCurrentStep(formState), [
        setCurrentStep,
        formState,
    ]);

    // Set a listener onpopstate when the event is triggered push the new currentStep to the state
    useEffect(() => {
        if (window !== undefined && history) {
            window.addEventListener("popstate", listenerPopState);
        }
        return () => window.removeEventListener("popstate", listenerPopState);
    }, [listenerPopState]);

    const onChangeStep = (step: number) => {
        const newState = { ...formState, currentStep: step };
        history.push(newState, "");
        setFormState(newState);
    };

    const onChangeStepState = function<T>(key: StateKeys, value: T) {
        setFormState({
            ...formState,
            stepStates: { ...formState.stepStates, [key]: value },
        });
    };

    const CurrentStepComponent = {
        Component: stepsComponents[formState.currentStep],
        state: Object.values(formState.stepStates).find(
            item => item.index === formState.currentStep
        ),
    };
    console.log(formState);
    return (
        <Layout>
            <Header style={{ background: "#fff", padding: 0 }}>
                <h1 style={titleStyle}>Créer P.O.I</h1>
            </Header>
            <Layout>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        background: "#fff",
                    }}
                >
                    <Stepper
                        onClickStep={onChangeStep}
                        steps={[1, 2, 3]}
                        indexActiveStep={formState.currentStep}
                    />
                    <CurrentStepComponent.Component
                        onChangeStepState={onChangeStepState}
                        stepState={CurrentStepComponent.state}
                        changeStep={onChangeStep}
                    />
                </Content>
            </Layout>
        </Layout>
    );
};
