import { JsonValue } from "madu/services/commun/types";
import { AuthToken } from "madu/services/login/types";

export const loginReader = (json: JsonValue): AuthToken => {
    return {
        authToken: json.access_token,
    };
};

export const forgotPasswordReader = (json: JsonValue): AuthToken => {
    console.log("json", json);
    return {
        authToken: json.access_token,
    };
};
