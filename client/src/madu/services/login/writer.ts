import { JsonValue } from "madu/services/commun/types";

export const loginWriter = (data): JsonValue => ({
    email: data.email,
    password: data.password,
});

export const forgotPasswordWriter = (data): JsonValue => {
    console.log("test", data);
    return {
        email: data.email,
    };
};
