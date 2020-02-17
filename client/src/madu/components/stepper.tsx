import React from "react";
import { Steps } from "antd";
import styled from "styled-components";
import { rem } from "polished";

const { Step } = Steps;

const CustomStep = styled(Step)`
    cursor: pointer;
`;

type StepperProps = {
    steps: number[];
    indexActiveStep: number;
    onClickStep: (n: number) => void;
};

export const Stepper = ({ steps, indexActiveStep, onClickStep }: StepperProps) => (
    <Steps current={indexActiveStep} style={{ margin: `${rem(20)} 0`}}>
        {steps.map((item, index) => (
            <CustomStep key={item} onClick={() => onClickStep(index)} />
        ))}
    </Steps>
);
