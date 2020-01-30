import React from "react";
import styled from "styled-components";
import { rem } from "polished";

const ContainerStyle = styled.div`
  width: 100%;
  max-width: ${rem(1100)};
  margin: 0 auto;
  padding: ${rem(50)} ${rem(62)};
  background: #fff;
`;

export const Container = ({ children }: React.PropsWithChildren<{}>) => (
  <ContainerStyle>{children}</ContainerStyle>
);
