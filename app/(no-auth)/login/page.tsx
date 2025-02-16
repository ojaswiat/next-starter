import type { TMessage } from "@/lib/types";

import GoogleSignin from "@/components/buttons/GoogleSigninButton";
import LoginForm from "@/components/forms/LoginForm";

export default async function Login(props: {
    searchParams: Promise<TMessage>;
}) {
    const searchParams = await props.searchParams;

    return (
        <>
            <LoginForm searchParams={searchParams} />
            <GoogleSignin />
        </>
    );
}
