import type { TMessage } from "@/lib/types";

import { SmtpMessage } from "../../../components/sections/SMTPMessage";

import SignupForm from "./SignupForm";

import GoogleSignin from "@/components/actions/GoogleSigninButton";
import { FormMessage } from "@/components/sections/FormMessage";

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
            <div className="mx-auto">
                <SignupForm searchParams={searchParams} />
                <GoogleSignin />
            </div>
            <SmtpMessage />
        </>
    );
}
