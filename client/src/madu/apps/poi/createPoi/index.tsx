import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Layout } from "antd";
import { createBrowserHistory as createHistory } from "history";
import { Stepper } from "madu/components/stepper";
import { FormStepOne, StepOneState } from "./steps/step-one";
import { FormStepTwo } from "./steps/step-two";
import { useStores } from "madu/hooks/use-store";
import { CustomContent } from "../listPoi";
import styled from "styled-components";

const { Header } = Layout;

const history = createHistory();

export type StateKeys = "stepOne" | "stepTwo";

const CustomHeader = styled(Header)`
    background: #fff;
    paddingleft: 20%;
    paddingright: 20%;
`;

type FormState = {
    currentStep: number;
    stepStates: {
        stepOne: StepOneState;
        stepTwo: any;
    };
};

const stepsComponents = [FormStepOne, FormStepTwo];

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
                    schedule: [],
                    fileList: [],
                },
            },
        }),
        []
    );

    const layoutContentStyle = {
        backgroundColor: "#ffffff",
    };

    const [formState, setFormState] = useState<FormState>(defaultFormState);

    const { pointOfInterestStore } = useStores();

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

    const onEdit = (key: string, value: any) => {
        pointOfInterestStore.setStep({ [key]: value });
    };

    return (
        <Layout>
            <CustomHeader>
                <Stepper
                    onClickStep={onChangeStep}
                    steps={[1, 2]}
                    indexActiveStep={formState.currentStep}
                />
            </CustomHeader>
            <Layout style={layoutContentStyle}>
                <CustomContent>
                    <CurrentStepComponent.Component
                        // @ts-ignore
                        onChangeStepState={onChangeStepState}
                        stepState={CurrentStepComponent.state}
                        changeStep={onChangeStep}
                        onEdit={onEdit}
                    />
                </CustomContent>
            </Layout>
        </Layout>
    );
};
