import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Layout } from "antd";
import { createBrowserHistory as createHistory } from "history";
import { TabsMenu } from "madu/components/tabs-menu";
import { FormStepOne, StepOneState } from "./steps/step-one";
import { FormStepTwo } from "./steps/step-two";
import { useStores } from "madu/hooks/use-store";

const { Content } = Layout;

const history = createHistory();

export type StateKeys = "stepOne" | "stepTwo";

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
            <div
                style={{
                    background: "#fff",
                    paddingTop: 40,
                    paddingLeft: 40,
                }}
            >
                <TabsMenu
                    onClickStep={onChangeStep}
                    tabs={[
                        { key: 0, tabTitle: "Infos  de base" },
                        { key: 1, tabTitle: "Infos complémentaires" },
                    ]}
                    indexActiveStep={formState.currentStep}
                />
            </div>
            <Layout style={layoutContentStyle}>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        background: "#fff",
                    }}
                >
                    <CurrentStepComponent.Component
                        // @ts-ignore
                        onChangeStepState={onChangeStepState}
                        stepState={CurrentStepComponent.state}
                        changeStep={onChangeStep}
                        onEdit={onEdit}
                    />
                </Content>
            </Layout>
        </Layout>
    );
};
