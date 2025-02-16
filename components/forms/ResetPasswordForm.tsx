"use client";

import type { TMessage } from "@/lib/types";

import { Input } from "@heroui/react";
import { useState } from "react";

import { resetPasswordAction } from "@/actions/supabase";
import SubmitButton from "@/components/buttons/SubmitButton";
import FormMessage from "@/components/sections/FormMessage";

type TResetPasswordFormProps = {
    searchParams: TMessage;
};

export default function ResetPasswordForm({
    searchParams,
}: TResetPasswordFormProps) {
    const [loading, setLoading] = useState(false);

    async function resetPassword(formData: FormData) {
        setLoading(true);
        await resetPasswordAction(formData);
    }

    return (
        <form className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4">
            <h1 className="text-2xl font-medium">Reset password</h1>
            <p className="text-sm text-foreground/60">
                Please enter your new password below.
            </p>
            <label htmlFor="password">New password</label>
            <Input
                required
                name="password"
                placeholder="New password"
                type="password"
            />
            <label htmlFor="confirmPassword">Confirm password</label>
            <Input
                required
                name="confirmPassword"
                placeholder="Confirm password"
                type="password"
            />
            <SubmitButton
                className="text-white"
                color="primary"
                formAction={resetPassword}
                isLoading={loading}
            >
                Reset password
            </SubmitButton>
            <FormMessage message={searchParams} />
        </form>
    );
}
