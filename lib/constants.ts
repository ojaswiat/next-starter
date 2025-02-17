export const CLIENT_ROUTES = {
    HOME: "/",

    // app
    DASHBOARD: "/dashboard",
    RESET_PASSWORD: "/reset-password",

    // auth
    LOGIN: "/login",

    SIGNUP: "/sign-up",
    SIGNUP_CONFIRMATION: "/sign-up/confirmation",

    FORGOT_PASSWORD: "/forgot-password",
    FORGOT_PASSWORD_CONFIRMATION: "/forgot-password/confirmation",
    FORGOT_PASSWORD_RESET_PASSWORD: "/forgot-password/reset-password",

    // error
    ERROR: "/error",
};

export const SERVER_ROUTES = {
    // auth
    AUTH: "/auth",
};

export enum EServerResponseCode {
    SUCCESS,
    FAILURE,
}
