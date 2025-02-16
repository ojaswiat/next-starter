"use client";

import type { TMessage } from "@/lib/types";

import { Input, Link } from "@heroui/react";
import { useState } from "react";

import { loginAction } from "@/app/actions";
import { SubmitButton } from "@/components/actions/SubmitButton";
import { FormMessage } from "@/components/sections/FormMessage";
import { CLIENT_ROUTES } from "@/lib/constants";

type TForgotPasswordFormProps = {
    searchParams: TMessage;
};

export default function LoginForm({ searchParams }: TForgotPasswordFormProps) {
    const [loading, setLoading] = useState(false);

    async function login(formData: FormData) {
        setLoading(true);
        await loginAction(formData);
        setLoading(false);
    }

    return (
        <form className="flex-1 flex flex-col min-w-64">
            <h1 className="text-2xl font-medium">Login</h1>
            <p className="text-sm text-foreground">
                {`Don't have an account? `}
                <Link
                    className="text-foreground font-medium underline"
                    href={CLIENT_ROUTES.SIGNUP}
                >
                    Sign up
                </Link>
            </p>
            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                <label htmlFor="email">Email</label>
                <Input required name="email" placeholder="you@example.com" />
                <div className="flex justify-between items-center">
                    <label htmlFor="password">Password</label>
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
                    className="text-white"
                    color="primary"
                    formAction={login}
                    isLoading={loading}
                    pendingText="Logging In..."
                >
                    Login
                </SubmitButton>
                <FormMessage message={searchParams} />
            </div>
        </form>
    );
}
