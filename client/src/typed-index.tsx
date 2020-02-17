import React, { useEffect, useState, useCallback } from "react";

import { listenOnBroadcastChannel } from "custom-broadcast-channel";

import appConfig from "madu/app-config";

import {
    The404,
    BadRequest,
    HoustonWeveGotAProblem,
    Loading,
    LoginStandaloneApp,
} from "./outside-components";

import "scss/main.scss";
import {
    getUserCreds as getUserCredsService,
    BROADCAST_CHANNEL_NAME,
    UserCredentials,
} from "./token-manager";

type InsideContainerState = {
    errorType?: number;
};

class InsideContainer extends React.PureComponent<{}, InsideContainerState> {
    constructor(props) {
        super(props);
        this.state = { errorType: undefined };
    }

    componentDidCatch(error) {
        const errorType = error.type || 520;
        this.setState({ errorType });
    }

    errorTypeToComponent = (errorType?: number) => {
        switch (true) {
            case !errorType:
                return null;
            case errorType === 400:
                return BadRequest;
            case errorType === 404:
                return The404;
            default:
                return HoustonWeveGotAProblem;
        }
    };

    render() {
        const { errorType } = this.state;

        const ErrorComponent = this.errorTypeToComponent(errorType);
        // Error boundaries
        if (ErrorComponent) {
            return <ErrorComponent />;
        }
        const ShellContainer = React.lazy(() => import("./madu/main"));
        // const GlobalStyle = React.lazy(() => import("./styles"));
        return (
            <React.Suspense fallback={<Loading />}>
                <>
                    {/* <GlobalStyle /> */}
                    <ShellContainer />
                </>
            </React.Suspense>
        );
    }
}

const UserStateContainer = () => {
    const [userCreds, setUserCreds] = useState<
        UserCredentials | undefined | null // undefined is initial state, null when no creds are fetch from idb
    >(undefined);

    const stampUserCreds = useCallback(() => {
        getUserCredsService().then(creds => {
            setUserCreds(creds || null);
            // If there is no credentials cached, this might be undefined.
            if (creds) {
                appConfig["ID_TOKEN"] = creds.token;
                appConfig["USER_MAIL"] = creds.email;
                appConfig["USER_UID"] = creds.id;
            }
        });
    }, []);

    useEffect(() => {
        stampUserCreds();
        return listenOnBroadcastChannel(BROADCAST_CHANNEL_NAME, () => {
            stampUserCreds();
        });
    }, [stampUserCreds]);

    // While IndexedDB is fetching, prompt a spinner
    if (userCreds === undefined) {
        return <Loading />;
    }

    // If IndexedDB is done fetching but there is no credentials, trigger login process
    else if (userCreds === null) {
        return <LoginStandaloneApp />;
    }

    // If credentials are available, load the app,
    return <InsideContainer />;
};

export const App = () => <UserStateContainer />;
