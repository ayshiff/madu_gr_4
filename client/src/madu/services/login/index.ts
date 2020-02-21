import { ApiResponse, postJson, apiPut } from "madu/services/commun";
import { routes } from "madu/services/login/routes";
import { loginReader } from "madu/services/login/reader";
import { loginWriter } from "madu/services/login/writer";
import { AuthToken } from "madu/services/login/types";

export const login = (email: string, password: string): Promise<ApiResponse<AuthToken>> =>
    postJson(routes.login(), loginWriter({ email, password })).then(resp =>
        resp.mapValue(loginReader)
    );

export const forgotPassword = (email: string): Promise<ApiResponse<AuthToken>> =>
    apiPut(routes.forgotPassword(), JSON.stringify({ email }), {
        "Content-Type": "application/json",
    });

export const resetPassword = (password: string, token: string): Promise<ApiResponse<AuthToken>> =>
    apiPut(routes.resetPassword(), JSON.stringify({ password, token }), {
        "Content-Type": "application/json",
    });
