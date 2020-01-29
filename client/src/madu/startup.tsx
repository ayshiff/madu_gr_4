import React, { Suspense } from "react";

export const OuterAppFrame = ({ children }: { children: JSX.Element }) => (
    <Suspense fallback={<div>Chargement...</div>}>{children}</Suspense>
);
