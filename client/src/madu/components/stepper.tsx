import React from "react";
import { Steps } from "antd";

const { Step } = Steps;

type StepperProps = {
    steps: number[];
    indexActiveStep: number;
    onClickStep: (n: number) => void;
};

export const Stepper = ({ steps, indexActiveStep, onClickStep }: StepperProps) => (
    <Steps current={indexActiveStep} style={{ marginTop: "20px" }}>
        {steps.map((item, index) => (
            <Step key={item} onClick={() => onClickStep(index)} />
        ))}
    </Steps>
);
