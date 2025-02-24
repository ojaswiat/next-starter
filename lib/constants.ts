export const CLIENT_ROUTES = {
    HOME: "/",

    // app
    DASHBOARD: "/dashboard",
    RESET_PASSWORD: "/reset-password",
    DOCS: "/docs",
    FEATURES: "/features",
    SETTINGS: "/settings",
    PROFILE: "/profile",

    // auth
    LOGIN: "/login",

    SIGNUP: "/signup",

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

export const NAV_ITEMS = [
    {
        key: "dashboard",
        title: "Dashboard",
        href: CLIENT_ROUTES.DASHBOARD,
    },
    {
        key: "features",
        title: "Features",
        href: CLIENT_ROUTES.FEATURES,
    },
    {
        key: "docs",
        title: "Docs",
        href: CLIENT_ROUTES.DOCS,
    },
];
