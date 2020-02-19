import React, { lazy } from "react";

import { OuterAppFrame } from "madu/startup";
import { stores, StoreProvider } from "./stores/index";
import "antd/dist/antd.css";

const PoiApp = lazy(() => import("madu/apps/poi"));
const ClientApp = lazy(() => import("madu/apps/client"));

const launchers = [
    ["/poi", PoiApp],
    ["/client", ClientApp],
];

const getApp = () => {
    const currentPath = window.document.location.pathname;

    if (currentPath === "/") {
        window.history.replaceState(null, null, "/poi/list");
        return PoiApp;
    }

    const maybeApp = launchers.find(([pathPrefix]) => currentPath.startsWith(pathPrefix));
    if (maybeApp) {
        const [, App] = maybeApp;
        return App;
    } else {
        return undefined;
    }
};

// For easier debugging
window._____APP_STATE_____ = stores;

const AppExportedWithContext = ({ App }) => {
    return (
        <OuterAppFrame>
            <StoreProvider value={stores}>
                <App />
            </StoreProvider>
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
