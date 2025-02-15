"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";

export default function GoogleSignin() {
    const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
    const supabase = createClient();

    const searchParams = useSearchParams();

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
            toast({
                title: "Please try again.",
                description: "There was an error logging in with Google.",
                variant: "destructive",
            });
            console.error(error);
            setIsGoogleLoading(false);
        }
    }

    return (
        <Button
            className="w-full"
            disabled={isGoogleLoading}
            type="button"
            variant="outline"
            onClick={signInWithGoogle}
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
