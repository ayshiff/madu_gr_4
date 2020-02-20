import { JsonValue } from "madu/services/commun/types";

export const loginWriter = (data): JsonValue => ({
    email: data.email,
    password: data.password,
});
