import type { TMessage } from "@/lib/types";

import LoginForm from "./LoginForm";

import GoogleSignin from "@/components/actions/GoogleSigninButton";

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
