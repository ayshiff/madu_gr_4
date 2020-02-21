import appConfig from "madu/app-config";

import { prependUri } from "madu/services/commun";

class LoginRoutes {
    login = (): string => "/auth/login";
}

export const routes = prependUri(appConfig.API_BASE_URL + "")(new LoginRoutes());
