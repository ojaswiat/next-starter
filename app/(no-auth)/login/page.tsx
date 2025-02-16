import type { Message } from "@/components/sections/FormMessage";

import Link from "next/link";

import { loginAction } from "@/app/actions";
import GoogleSignin from "@/components/actions/GoogleSigninButton";
import { SubmitButton } from "@/components/actions/SubmitButton";
import { FormMessage } from "@/components/sections/FormMessage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CLIENT_ROUTES } from "@/lib/constants";

export default async function Login(props: { searchParams: Promise<Message> }) {
    const searchParams = await props.searchParams;

    return (
        <>
            <form className="flex-1 flex flex-col min-w-64">
                <h1 className="text-2xl font-medium">Login</h1>
                <p className="text-sm text-foreground">
                    {`Don't have an account?`}
                    <Link
                        className="text-foreground font-medium underline"
                        href={CLIENT_ROUTES.SIGNUP}
                    >
                        Sign up
                    </Link>
                </p>
                <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        required
                        name="email"
                        placeholder="you@example.com"
                    />
                    <div className="flex justify-between items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link
                            className="text-xs text-foreground underline"
                            href="/forgot-password"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                    <Input
                        required
                        name="password"
                        placeholder="Your password"
                        type="password"
                    />
                    <SubmitButton
                        formAction={loginAction}
                        pendingText="Logging In..."
                    >
                        Login
                    </SubmitButton>
                    <FormMessage message={searchParams} />
                </div>
            </form>
            <GoogleSignin />
        </>
    );
}
