import appConfig from "madu/app-config";
import { Router } from "./types";

type Call = () => Promise<Response>;
type CustomRequestHeaders = Record<string, string>;

export interface EmptyApiResponse extends ApiResponse<void> {}

const timeout = (delay: number): Promise<any> =>
    new Promise(resolve => setTimeout(() => resolve(), delay));

export const orTimeout = <T, R>(
    promise: Promise<T>,
    rejectedValue: R,
    delayMs = 3000
): Promise<T> => Promise.race([promise, timeout(delayMs).then(_ => Promise.reject(rejectedValue))]);

const withTimeout = <T>(
    p: Promise<T>,
    delaysMs: number,
    extraTimeoutContext?: Object
): Promise<T> =>
    orTimeout(
        p,
        { timeoutError: true, ...(extraTimeoutContext ? extraTimeoutContext : {}) },
        delaysMs
    );

export class ApiResponse<T> {
    statusCode: number;
    headers: Headers;
    value: T;

    constructor(status: number, headers: Headers, value: T) {
        this.statusCode = status;
        this.headers = headers;
        this.value = value;
    }

    static json = <T>(resp: Response): Promise<ApiResponse<T | null>> =>
        resp.json().then(
            json => new ApiResponse<T>(resp.status, resp.headers, json),
            () => Promise.resolve(new ApiResponse<null>(resp.status, resp.headers, null))
        );

    static empty = (resp: Response): ApiResponse<null> =>
        new ApiResponse<null>(resp.status, resp.headers, null);

    mapValue<U>(f: (a: T) => U): ApiResponse<U> {
        return new ApiResponse(this.statusCode, this.headers, f(this.value));
    }
}

const doCall = <T>(
    withTimeoutMs?: number,
    extraTimeoutContext?: Object
): ((call: Call) => Promise<ApiResponse<T>>) => (call: Call): Promise<ApiResponse<T>> => {
    const _doCall = <T>(call: Call): Promise<ApiResponse<T>> =>
        call().then(response => {
            switch (true) {
                case response.status === 204:
                    return ApiResponse.empty(response);
                case response.status < 400:
                    return ApiResponse.json(response);
                case response.status === 440:
                    return appConfig.reloadUser
                        ? appConfig.reloadUser().then(() => _doCall(call))
                        : Promise.reject();
                default:
                    return ApiResponse.json(response).then(r => Promise.reject(r));
            }
        }, handleError);

    return withTimeoutMs
        ? withTimeout(_doCall(call), withTimeoutMs, extraTimeoutContext)
        : _doCall(call);
};

const handleError = (error: string): Promise<never> => Promise.reject({ fetchError: error });

const buildHeaders = (headers?: CustomRequestHeaders): Headers =>
    new Headers({
        ...headers,
        Authorization: `Bearer ${appConfig["ID_TOKEN"]}`,
    });

export const get = <T>(url: string, headers?: CustomRequestHeaders): Promise<ApiResponse<T>> =>
    doCall<T>(5000, { url })(() =>
        fetch(url, {
            method: "GET",
            headers: buildHeaders(headers),
        })
    );

export const post = <T>(
    url,
    payload,
    headers?: CustomRequestHeaders,
    withTimeoutMs?: number
): Promise<ApiResponse<T>> =>
    doCall<T>(withTimeoutMs, { url })(() =>
        fetch(url, {
            method: "POST",
            headers: buildHeaders(headers),
            ...(payload && { body: payload }),
        })
    );

export const apiPut = <T>(
    url,
    payload,
    headers?: CustomRequestHeaders,
    withTimeoutMs?: number
): Promise<ApiResponse<T>> =>
    doCall<T>(withTimeoutMs, { url })(() =>
        fetch(url, {
            method: "PUT",
            headers: buildHeaders(headers),
            ...(payload && { body: payload }),
        })
    );

export const postJson = <T>(
    url: string,
    payload: {},
    extraHeaders?: CustomRequestHeaders,
    withTimeoutMs: number = 5000
): Promise<ApiResponse<T>> =>
    post(
        url,
        JSON.stringify(payload),
        {
            ...extraHeaders,
            Authorization: `Bearer ${appConfig["ID_TOKEN"]}`,
            "Content-Type": "application/json",
        },
        withTimeoutMs
    );

export const apiDelete = (url, headers?: CustomRequestHeaders): Promise<EmptyApiResponse> =>
    doCall<void>(5000, { url })(() =>
        fetch(url, {
            method: "DELETE",
            headers: buildHeaders(headers),
        })
    );

export const prependUri = (prefix: string) => <T>(router: Router<T>): Router<T> =>
    Object.keys(router).reduce((acc, key) => {
        const route = router[key];
        return {
            ...acc,
            [key]: (...args: string[]): string => prefix + route.apply(null, args),
        };
    }, {}) as Router<T>;
