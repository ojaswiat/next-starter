"use client";

import { Button } from "@heroui/react";

import { signOutAction } from "@/app/actions";

function SignOutButton() {
    return (
        <form action={signOutAction}>
            <Button type="submit" variant="bordered">
                Sign out
            </Button>
        </form>
    );
}

export default SignOutButton;
