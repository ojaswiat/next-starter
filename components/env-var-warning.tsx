import Link from "next/link";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

import { CLIENT_ROUTES } from "@/lib/constants";

export function EnvVarWarning() {
    return (
        <div className="flex gap-4 items-center">
            <Badge className="font-normal" variant={"outline"}>
                Supabase environment variables required
            </Badge>
            <div className="flex gap-2">
                <Button
                    asChild
                    disabled
                    className="opacity-75 cursor-none pointer-events-none"
                    size="sm"
                    variant={"outline"}
                >
                    <Link href={CLIENT_ROUTES.LOGIN}>Login</Link>
                </Button>
                <Button
                    asChild
                    disabled
                    className="opacity-75 cursor-none pointer-events-none"
                    size="sm"
                    variant={"default"}
                >
                    <Link href={CLIENT_ROUTES.SIGNUP}>Sign up</Link>
                </Button>
            </div>
        </div>
    );
}
