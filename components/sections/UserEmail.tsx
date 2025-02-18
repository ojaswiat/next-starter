"use client";

import type { TUser } from "@/lib/types";

import { isEmpty } from "lodash-es";
import { useEffect } from "react";

import useUserStore from "@/stores/UserStore";
import { createClient } from "@/utils/supabase/client";

// This component is just here to demonstrate the use of User Store that you can use to save and retrieve user information

export default function UserEmail() {
    const userStore = useUserStore();
    const user = useUserStore((state) => state.user);

    const supabase = createClient();

    useEffect(() => {
        async function getUserDetails() {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!isEmpty(user)) {
                userStore.updateUser(user as TUser);
            }
        }

        getUserDetails();
    }, []);

    return <p>Hey {user.email ? `${user.email}` : ""}!</p>;
}
