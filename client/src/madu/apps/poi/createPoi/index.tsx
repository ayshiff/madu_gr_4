import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Layout } from "antd";
import { createBrowserHistory as createHistory } from "history";

import { Stepper } from "madu/components/stepper";
import { FormStepOne, StepOneState } from "./steps/step-one";
import { FormStepTwo } from "./steps/step-two";
import { FormStepThree } from "./steps/step-three";
import { FormStepFour } from "./steps/step-four";

const { Header, Content } = Layout;

const history = createHistory();

export type StateKeys = "stepOne" | "stepTwo" | "stepThree" | "stepFour";

type FormState = {
    currentStep: number;
    stepStates: {
        stepOne: StepOneState;
        stepTwo: any;
        stepThree: any;
        stepFour: any;
    };
};

const stepsComponents = [FormStepOne, FormStepTwo, FormStepThree, FormStepFour];

export const CreatePoi = () => {
    const defaultFormState: FormState = useMemo(
        () => ({
            currentStep: 0,
            stepStates: {
                stepOne: {
                    index: 0,
                    name: "",
                },
                stepTwo: {
                    index: 1,
                },
                stepThree: {
                    index: 2,
                },
                stepFour: {
                    index: 3,
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
        const { currentStep } = history.location;
        setFormState({ ...state, currentStep });
    }, []);

    // Page load set current step at -1
    useEffect(() => {
        if (window !== undefined && history) {
            history.push({ currentStep: 0 });
            console.log(history);
            setFormState(defaultFormState);
        }
    }, [defaultFormState, setCurrentStep]);

    const test = useCallback(() => setCurrentStep(formState), [setCurrentStep, formState]);

    // Set a listener onpopstate when the event is triggered push the new currentStep to the state
    useEffect(() => {
        if (window !== undefined && history) {
            window.addEventListener("popstate", test);
        }
        return () => window.removeEventListener("popstate", test);
    }, [test]);

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
            <Header style={{ background: "#fff", padding: 0 }}>
                <h1 style={titleStyle}>Créer P.O.I</h1>
            </Header>
            <Stepper
                onClickStep={onChangeStep}
                steps={[1, 2, 3, 4]}
                indexActiveStep={formState.currentStep}
            />
            <Content>
                <CurrentStepComponent.Component
                    onChangeStepState={onChangeStepState}
                    stepState={CurrentStepComponent.state}
                    changeStep={onChangeStep}
                />
            </Content>
        </Layout>
    );
};
