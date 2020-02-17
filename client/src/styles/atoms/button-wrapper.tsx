import React from "react";
import styled, { css } from "styled-components";
import { switchProp } from "styled-tools";

import { responsiveHelpers as rh } from "styles/utils";

import { InlineElementStyle } from "styles/atoms/inline-element-style";

import { space } from "styles/const";

const ButtonWrapperStyle = styled.div`
    ${InlineElementStyle};
    ${switchProp("layout", {
        aside: css`
            & > :not(:last-child) {
                margin-right: ${space.sm};
            }
        `,
        join: css`
            & > button:not(:first-child) {
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
            }
            & > button:not(:last-child) {
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
                border-right: none;
            }
        `,
        opposed: css`
            flex-grow: 1;
        `,
    })};
    ${rh.belowPortraitTablet`
    justify-content : ${switchProp("alignMobile", {
        left: "flex-start;",
        center: "center;",
        right: "flex-end;",
    })};
  `};
`;

type ButtonWrapperProps = {
    children?: React.ReactNode;
    align?: "left" | "center" | "right";
    layout?: "opposed" | "aside" | "join";
    alignMobile?: "left" | "center" | "right";
    style?: React.CSSProperties;
};

export const ButtonWrapper = ({
    children,
    align,
    layout = "join",
    alignMobile,
    style,
}: ButtonWrapperProps) => (
    <ButtonWrapperStyle style={style} layout={layout} align={align} alignMobile={alignMobile}>
        {children}
    </ButtonWrapperStyle>
);
