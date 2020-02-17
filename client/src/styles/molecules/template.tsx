import React from "react";
import { Icon } from "antd";
import styled from "styled-components";
import { rem } from "polished";

const TemplateContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: ${rem(12)} ${rem(8)};
    border: 1px solid #e8e8e8;
    border-radius: ${rem(6)};
    transition: 0.3s ease;
    cursor: pointer;

    &:hover {
        border-color: #3fa8ff;
        color: #3fa8ff;
        transition: 0.3s ease;
    }
`;

export const TemplateComponent = () => {
    const addTemplate = () => {
        console.log("add template ");
    };
    return (
        <TemplateContainer onClick={addTemplate}>
            <Icon type="plus" style={{ fontSize: rem(16), marginBottom: rem(12) }}></Icon>
            <p>Nouveau template</p>
        </TemplateContainer>
    );
};
