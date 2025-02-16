import type { Message } from "@/components/sections/FormMessage";

import Link from "next/link";

import { SmtpMessage } from "../smtp-message";

import { signupAction } from "@/app/actions";
import { SubmitButton } from "@/components/actions/SubmitButton";
import { FormMessage } from "@/components/sections/FormMessage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CLIENT_ROUTES } from "@/lib/constants";

export default async function Signup(props: {
    searchParams: Promise<Message>;
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
            <form className="flex flex-col min-w-64 max-w-64 mx-auto">
                <h1 className="text-2xl font-medium">Sign up</h1>
                <p className="text-sm text text-foreground">
                    Already have an account?{" "}
                    <Link
                        className="text-primary font-medium underline"
                        href={CLIENT_ROUTES.LOGIN}
                    >
                        Login
                    </Link>
                </p>
                <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        required
                        name="email"
                        placeholder="you@example.com"
                    />
                    <Label htmlFor="password">Password</Label>
                    <Input
                        required
                        minLength={6}
                        name="password"
                        placeholder="Your password"
                        type="password"
                    />
                    <SubmitButton
                        formAction={signupAction}
                        pendingText="Signing up..."
                    >
                        Sign up
                    </SubmitButton>
                    <FormMessage message={searchParams} />
                </div>
            </form>
            <SmtpMessage />
        </>
    );
}
