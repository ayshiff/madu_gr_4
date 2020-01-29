import React, { lazy } from "react";

import { OuterAppFrame } from "madu/startup";

const TestApp = lazy(() => import("madu/apps/poi")); //App de test

const launchers = [["/poi", TestApp]];

const getApp = () => {
    const currentPath = window.document.location.pathname;

    if (currentPath === "/") {
        window.history.replaceState(null, null, "/poi");
        return TestApp;
    }

    const maybeApp = launchers.find(([pathPrefix]) => currentPath.startsWith(pathPrefix));
    if (maybeApp) {
        const [, App] = maybeApp;
        return App;
    } else {
        return undefined;
    }
};

const AppExportedWithContext = ({ App }) => {
    return (
        <OuterAppFrame>
            <App />
        </OuterAppFrame>
    );
};

const AppExported = () => {
    const App = getApp();
    if (!App) {
        const error = {
            type: 404,
            message: `Could not find an app launcher for path ${window.document.location.pathname}`,
        };
        throw error;
    } else {
        return <AppExportedWithContext App={App} />;
    }
};

export default AppExported;
