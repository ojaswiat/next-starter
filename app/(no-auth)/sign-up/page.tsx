import type { TMessage } from "@/lib/types";

import GoogleSignin from "@/components/buttons/GoogleSigninButton";
import SignupForm from "@/components/forms/SignupForm";
import FormMessage from "@/components/sections/FormMessage";
import SmtpMessage from "@/components/sections/SMTPMessage";

export default async function Signup(props: {
    searchParams: Promise<TMessage>;
}) {
    const searchParams = await props.searchParams;

    if ("message" in searchParams) {
        return (
            <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
                <FormMessage message={searchParams} />
            </div>
        );
    }

    return (
        <>
            <SignupForm />
            <GoogleSignin />

            <SmtpMessage />
        </>
    );
}
