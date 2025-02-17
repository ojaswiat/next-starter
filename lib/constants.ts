export const CLIENT_ROUTES = {
    HOME: "/",

    // app
    DASHBOARD: "/dashboard",
    RESET_PASSWORD: "/reset-password",

    // auth
    LOGIN: "/login",

    SIGNUP: "/sign-up",

    FORGOT_PASSWORD: "/forgot-password",

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
