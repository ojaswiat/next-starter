import type { ReactNode } from "react";

export enum EAlertType {
    SUCCESS = "success",
    ERROR = "danger",
    ALERT = "warning",
    INFO = "secondary",
}

export type TAlert = {
    id?: string; // Added for tracking
    message: string;
    title?: string;
    duration?: number;
    action?: ReactNode;
    type?: EAlertType;
    closable?: boolean;
};
