"use client";

import { Button } from "@heroui/react";
import Link from "next/link";

import { Badge } from "./ui/badge";

import { CLIENT_ROUTES } from "@/lib/constants";

export function EnvVarWarning() {
    return (
        <div className="flex gap-4 items-center">
            <Badge className="font-normal" variant={"outline"}>
                Supabase environment variables required
            </Badge>
            <div className="flex gap-2">
                <Button
                    disabled
                    className="opacity-75 cursor-none pointer-events-none"
                    size="sm"
                    variant="bordered"
                >
                    <Link href={CLIENT_ROUTES.LOGIN}>Login</Link>
                </Button>
                <Button
                    disabled
                    className="opacity-75 cursor-none pointer-events-none"
                    size="sm"
                >
                    <Link href={CLIENT_ROUTES.SIGNUP}>Sign up</Link>
                </Button>
            </div>
        </div>
    );
}
