import { Store, get, set, del } from "idb-keyval";
import { emitOnBroadcastChannel } from "custom-broascast-channel";

import { login } from "madu/services/login";

const authStore = new Store("madu-config", "config-store");

export type UserCredentials = {
    token: string;
    email: string;
    id: string;
};

export const BROADCAST_CHANNEL_NAME = "LOGIN_CHANNEL";
const BROADCASTED_MESSAGE = "BROADCASTED_MESSAGE";
export const USER_CREDS = "USER_CREDS";

/*
 * Read credentials in IndexedDB
 */
export const getUserCreds = (): Promise<UserCredentials> => {
    return get<UserCredentials>(USER_CREDS, authStore).then(creds => creds);
};

export const signIn = (email: string | null, password: string | null) => {
    if (email && password) {
        return login(email, password).then(response => {
            if (response.statusCode === 201) {
                set(USER_CREDS, { token: response.value.authToken }, authStore).then(() => {
                    emitOnBroadcastChannel(BROADCAST_CHANNEL_NAME, BROADCASTED_MESSAGE);
                });
            } else {
                throw Error(`Server responded ${response.statusCode}`);
            }
        });
    }
};

export const signOut = () => {
    del(USER_CREDS, authStore).then(() => {
        emitOnBroadcastChannel(BROADCAST_CHANNEL_NAME, BROADCASTED_MESSAGE);
    });
};
