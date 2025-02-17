import AuthActionButtons from "@/components/buttons/AuthActionButtons";
import LogoutButton from "@/components/buttons/LogoutButton";
import EnvWarningBadge from "@/components/ui/EnvWarningBadge";
import HAS_ENV_VARS from "@/utils/supabase/checkEnvVars";
import { createClient } from "@/utils/supabase/server";

export default async function AuthButton() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!HAS_ENV_VARS) {
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
            <LogoutButton />
        </div>
    ) : (
        <AuthActionButtons />
    );
}
