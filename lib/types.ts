export type TMessage =
    | { success: string }
    | { error: string }
    | { message: string };
