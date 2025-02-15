import type { ReactNode } from "react";

import { redirect } from "next/navigation";
import { isEmpty } from "lodash-es";

import { CLIENT_ROUTES } from "@/lib/constants";
import { createClient } from "@/utils/supabase/server";

export default async function WithAuthLayout({
    children,
}: {
    children: ReactNode;
}) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || isEmpty(data?.user)) {
        redirect(CLIENT_ROUTES.LOGIN);
    }

    return <>{children}</>;
}
