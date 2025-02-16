"use client";

import { Button } from "@heroui/react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { useAlertStore } from "@/stores/AlertStore";
import { createClient } from "@/utils/supabase/client";

export default function GoogleSignin() {
    const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
    const supabase = createClient();

    const searchParams = useSearchParams();
    const alertStore = useAlertStore();

    const next = searchParams.get("next");

    async function signInWithGoogle() {
        setIsGoogleLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}/auth/callback${
                        next ? `?next=${encodeURIComponent(next)}` : ""
                    }`,
                },
            });

            if (error) {
                throw error;
            }
        } catch (error) {
            alertStore.notify({
                title: "Please try again.",
                message: "There was an error logging in with Google.",
            });
            console.error(error);
            setIsGoogleLoading(false);
        }
    }

    return (
        <Button
            className="w-full"
            color="primary"
            disabled={isGoogleLoading}
            type="button"
            variant="bordered"
            onPress={signInWithGoogle}
        >
            {isGoogleLoading ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
                <Image
                    alt="Google logo"
                    className="mr-2"
                    height={20}
                    src="https://authjs.dev/img/providers/google.svg"
                    width={20}
                />
            )}{" "}
            Sign in with Google
        </Button>
    );
}
