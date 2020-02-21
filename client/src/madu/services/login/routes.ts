import appConfig from "madu/app-config";

import { prependUri } from "madu/services/commun";

class LoginRoutes {
    login = (): string => "/auth/login";
    forgotPassword = (): string => "/users/password/forgotten";
    resetPassword = (): string => "/users/password/reset";
}

export const routes = prependUri(appConfig.API_BASE_URL + "")(new LoginRoutes());
