import type { TMessage } from "@/lib/types";

import ForgotPasswordFrom from "@/components/forms/ForgotPasswordFrom";
import SmtpMessage from "@/components/sections/SMTPMessage";

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
