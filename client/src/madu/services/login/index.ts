import { ApiResponse, postJson } from "madu/services/commun";
import { routes } from "madu/services/login/routes";
import { loginReader } from "madu/services/login/reader";
import { loginWriter } from "madu/services/login/writer";
import { AuthToken } from "madu/services/login/types";

export const login = (token: string): Promise<ApiResponse<AuthToken>> =>
    postJson(routes.login(), loginWriter({ deviceId }), {
        Authorization: `Bearer ${jwtToken}`,
    }).then(resp => resp.mapValue(loginReader));

export const logout = (): Promise<{}> =>
    postJson(routes.logout(), {}).then(resp => resp.mapValue(() => {}));
