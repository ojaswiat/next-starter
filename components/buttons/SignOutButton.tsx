"use client";

import { Button } from "@heroui/react";

import { signOutAction } from "@/actions/supabase";

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
