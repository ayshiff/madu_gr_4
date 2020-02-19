import React, { Suspense } from "react";
import { GlobalStyle } from "../styles";

export const OuterAppFrame = ({ children }: { children: JSX.Element }) => (
    <Suspense fallback={<div>Chargement...</div>}>
        <GlobalStyle />
        {children}
    </Suspense>
);
