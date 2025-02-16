"use client";

import type { TMessage } from "@/lib/types";

import { Input, Link } from "@heroui/react";
import { useState } from "react";

import { forgotPasswordAction } from "@/app/actions";
import { SubmitButton } from "@/components/actions/SubmitButton";
import { FormMessage } from "@/components/sections/FormMessage";
import { CLIENT_ROUTES } from "@/lib/constants";

type TForgotPasswordFormProps = {
    searchParams: TMessage;
};

export default function ForgotPasswordFrom({
    searchParams,
}: TForgotPasswordFormProps) {
    const [loading, setLoading] = useState(false);

    async function forgotPassword(formData: FormData) {
        setLoading(true);
        await forgotPasswordAction(formData);
        setLoading(false);
    }

    return (
        <form className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-64 mx-auto">
            <div>
                <h1 className="text-2xl font-medium">Reset Password</h1>
                <p className="text-sm text-foreground">
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
                <label htmlFor="email">Email</label>
                <Input required name="email" placeholder="you@example.com" />
                <SubmitButton
                    className="text-white"
                    color="primary"
                    formAction={forgotPassword}
                    isLoading={loading}
                >
                    Reset Password
                </SubmitButton>
                <FormMessage message={searchParams} />
            </div>
        </form>
    );
}
