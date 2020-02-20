import { JsonValue } from "madu/services/commun/types";
import { AuthToken } from "madu/services/login/types";

export const loginReader = (json: JsonValue): AuthToken => {
    return {
        authToken: json.access_token,
    };
};
