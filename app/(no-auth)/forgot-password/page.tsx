import type { Message } from "@/components/sections/FormMessage";

import Link from "next/link";

import { SmtpMessage } from "../smtp-message";

import { forgotPasswordAction } from "@/app/actions";
import { SubmitButton } from "@/components/actions/SubmitButton";
import { FormMessage } from "@/components/sections/FormMessage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CLIENT_ROUTES } from "@/lib/constants";

export default async function ForgotPassword(props: {
    searchParams: Promise<Message>;
}) {
    const searchParams = await props.searchParams;

    return (
        <>
            <form className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-64 mx-auto">
                <div>
                    <h1 className="text-2xl font-medium">Reset Password</h1>
                    <p className="text-sm text-secondary-foreground">
                        Already have an account?{" "}
                        <Link
                            className="text-primary underline"
                            href={CLIENT_ROUTES.LOGIN}
                        >
                            Login
                        </Link>
                    </p>
                </div>
                <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        required
                        name="email"
                        placeholder="you@example.com"
                    />
                    <SubmitButton formAction={forgotPasswordAction}>
                        Reset Password
                    </SubmitButton>
                    <FormMessage message={searchParams} />
                </div>
            </form>
            <SmtpMessage />
        </>
    );
}
