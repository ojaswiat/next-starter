import type { TMessage } from "@/lib/types";

import { SmtpMessage } from "../../../components/sections/SMTPMessage";

import ForgotPasswordFrom from "./ForgotPasswordFrom";

export default async function ForgotPassword(props: {
    searchParams: Promise<TMessage>;
}) {
    const searchParams = await props.searchParams;

    return (
        <>
            <ForgotPasswordFrom searchParams={searchParams} />
            <SmtpMessage />
        </>
    );
}
