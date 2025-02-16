import type { TMessage } from "@/lib/types";

import { resetPasswordAction } from "@/app/actions";
import { SubmitButton } from "@/components/actions/SubmitButton";
import { FormMessage } from "@/components/sections/FormMessage";
import { Input } from "@/components/ui/input";

export default async function ResetPassword(props: {
    searchParams: Promise<TMessage>;
}) {
    const searchParams = await props.searchParams;

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
            <SubmitButton formAction={resetPasswordAction}>
                Reset password
            </SubmitButton>
            <FormMessage message={searchParams} />
        </form>
    );
}
