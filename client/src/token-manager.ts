import { Store, get, del } from "idb-keyval";
import { emitOnBroadcastChannel } from "custom-broadcast-channel";

import { login, logout } from "madu/services/login";

const authStore = new Store("madu-config", "config-store");

export type UserCredentials = {
    token: string;
    email: string;
    id: string;
};

export const BROADCAST_CHANNEL_NAME = "LOGIN_CHANNEL";
const BROADCASTED_MESSAGE = "BROADCASTED_MESSAGE";
const USER_CREDS = "USER_CREDS";

/*
 * Read credentials in IndexedDB
 */
export const getUserCreds = (): Promise<UserCredentials> => {
    return get<UserCredentials>(USER_CREDS, authStore).then(creds => creds);
};

export const signIn = () => {
    return login(_, _).then(response => {
        if (response.statusCode === 201) {
            return response.value.authToken;
        } else {
            throw Error(`Server responded ${response.statusCode}`);
        }
    });
};

export const signOut = () => {
    /**
     * Perform an API call to delete the active token.
     *
     * Broadcasting the event "new credentials stored" with no new creds
     * afterwards will a have the side effect of going back to the login
     * process.
     */
    logout().then(() => {
        // Delete the newly outdated token from IndexedDB
        del(USER_CREDS, authStore).then(() => {
            // Broadcast that there is a new token stored (Here there is not,
            // this will trigger the login process).
            emitOnBroadcastChannel(BROADCAST_CHANNEL_NAME, BROADCASTED_MESSAGE);
        });
    });
};
