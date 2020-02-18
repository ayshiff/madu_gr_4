import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Layout } from "antd";
import { createBrowserHistory as createHistory } from "history";

import { Stepper } from "madu/components/stepper";

import { FormStepOne, StepOneState } from "./steps/step-one";
import { FormStepTwo, StepTwoState } from "./steps/step-two";

const { Header, Content } = Layout;

const history = createHistory();

export type StateKeys = "stepOne" | "stepTwo";

type FormState = {
    currentStep: number;
    stepStates: {
        stepOne: StepOneState;
        stepTwo: StepTwoState;
    };
};

const stepsComponents = [FormStepOne, FormStepTwo];

export const CreateClient = () => {
    const defaultFormState: FormState = useMemo(
        () => ({
            currentStep: 0,
            stepStates: {
                stepOne: {
                    index: 0,
                    companyName: "",
                    address: "",
                    zipcode: "",
                    name: "",
                    phoneNumber: "",
                    companyPosition: "",
                },
                stepTwo: {
                    index: 1,
                    salaryNumber: null,
                    mailNameDomain: null,
                },
            },
        }),
        []
    );

    const layoutContentStyle = {
        backgroundColor: "#ffffff",
    };

    const [formState, setFormState] = useState<FormState>(defaultFormState);

    const setCurrentStep = useCallback((state: FormState) => {
        if (history.state) {
            const { currentStep } = history.state;
            setFormState({ ...state, currentStep });
        } else history.goBack();
    }, []);

    // Page load set current step at 0
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
    return (
        <Layout>
            <Header style={{ background: "#fff", paddingLeft: "20%", paddingRight: "20%" }}>
                <Stepper
                    onClickStep={onChangeStep}
                    steps={[1, 2]}
                    indexActiveStep={formState.currentStep}
                />
            </Header>
            <Layout style={layoutContentStyle}>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        background: "#fff",
                    }}
                >
                    <CurrentStepComponent.Component
                        onChangeStepState={onChangeStepState}
                        stepState={CurrentStepComponent.state as StepOneState & StepTwoState}
                        changeStep={onChangeStep}
                    />
                </Content>
            </Layout>
        </Layout>
    );
};
