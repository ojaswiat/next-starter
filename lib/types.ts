import type { ReactNode } from "react";

export type TMessage =
    | { success: string }
    | { error: string }
    | { message: string };

export enum EAlertType {
    SUCCESS = "success",
    ERROR = "danger",
    ALERT = "warning",
    INFO = "secondary",
}

export type TAlert = {
    id: string;
    action?: ReactNode;
    error?: Error | string;
    message: string;
    type: EAlertType;
    duration?: number;
};
