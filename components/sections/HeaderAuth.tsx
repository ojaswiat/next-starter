import AuthActionButtons from "./actions/AuthActionButtons";
import SignOutButton from "./actions/SignOutButton";
import EnvWarningBadge from "./ui/EnvWarningBadge";

import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { createClient } from "@/utils/supabase/server";

export default async function AuthButton() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!hasEnvVars) {
        return (
            <div className="flex gap-4 items-center">
                <EnvWarningBadge />
                <AuthActionButtons disabled />
            </div>
        );
    }

    return user ? (
        <div className="flex items-center gap-4">
            Hey, {user.email}!
            <SignOutButton />
        </div>
    ) : (
        <AuthActionButtons />
    );
}
