"use client";

import type { TMessage } from "@/lib/types";

import { Input, Link } from "@heroui/react";
import { useState } from "react";

import { signupAction } from "@/app/actions";
import { SubmitButton } from "@/components/actions/SubmitButton";
import { FormMessage } from "@/components/sections/FormMessage";
import { Label } from "@/components/ui/label";
import { CLIENT_ROUTES } from "@/lib/constants";

type TForgotPasswordFormProps = {
    searchParams: TMessage;
};

export default function SignupForm({ searchParams }: TForgotPasswordFormProps) {
    const [loading, setLoading] = useState(false);

    async function signup(formData: FormData) {
        setLoading(true);
        await signupAction(formData);
        setLoading(false);
    }

    return (
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
                <Input required name="email" placeholder="you@example.com" />
                <Label htmlFor="password">Password</Label>
                <Input
                    required
                    minLength={6}
                    name="password"
                    placeholder="Your password"
                    type="password"
                />
                <SubmitButton
                    className="text-white"
                    color="primary"
                    formAction={signup}
                    isLoading={loading}
                    pendingText="Signing up..."
                >
                    Sign up
                </SubmitButton>
                <FormMessage message={searchParams} />
            </div>
        </form>
    );
}
