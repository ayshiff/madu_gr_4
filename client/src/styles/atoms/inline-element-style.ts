import { css } from "styled-components";
import { switchProp } from "styled-tools";

export const InlineElementStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  justify-content: ${switchProp("align", {
    left: "flex-start;",
    center: "center;",
    right: "flex-end;",
  })};
`;
