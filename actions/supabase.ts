"use server";

import type { TLoginFormSchema, TSignupFormSchema } from "@/lib/forms";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { CLIENT_ROUTES, EServerResponseCode } from "@/lib/constants";
import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";

export const signupAction = async (formData: TSignupFormSchema) => {
    const { email, password } = formData;

    const supabase = await createClient();
    const origin = (await headers()).get("origin");

    if (!email || !password) {
        return encodedRedirect(
            "error",
            CLIENT_ROUTES.SIGNUP,
            "Email and password are required",
        );
    }

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) {
        console.error(error.code + " " + error.message);

        return {
            code: EServerResponseCode.FAILURE,
            error,
            message: "Failed to signup",
        };
    } else {
        return {
            code: EServerResponseCode.SUCCESS,
            message:
                "Signup successful! Please check your mail to confirm your account",
        };
    }
};

export const loginAction = async (formData: TLoginFormSchema) => {
    const { email, password } = formData;
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error(error.code + " " + error.message);

        return {
            code: EServerResponseCode.FAILURE,
            error,
            message: "Invalid credentials",
        };
    } else {
        return {
            code: EServerResponseCode.SUCCESS,
            message: "Login successful",
        };
    }
};

export const forgotPasswordAction = async (formData: FormData) => {
    const email = formData.get("email")?.toString();
    const supabase = await createClient();
    const origin = (await headers()).get("origin");
    const callbackUrl = formData.get("callbackUrl")?.toString();

    if (!email) {
        return encodedRedirect(
            "error",
            CLIENT_ROUTES.FORGOT_PASSWORD,
            "Email is required",
        );
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/auth/callback?redirect_to=/${CLIENT_ROUTES.RESET_PASSWORD}`,
    });

    if (error) {
        console.error(error.message);

        return encodedRedirect(
            "error",
            CLIENT_ROUTES.FORGOT_PASSWORD,
            "Could not reset password",
        );
    }

    if (callbackUrl) {
        return redirect(callbackUrl);
    }

    return encodedRedirect(
        "success",
        CLIENT_ROUTES.FORGOT_PASSWORD,
        "Check your email for a link to reset your password.",
    );
};

export const resetPasswordAction = async (formData: FormData) => {
    const supabase = await createClient();

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!password || !confirmPassword) {
        encodedRedirect(
            "error",
            CLIENT_ROUTES.RESET_PASSWORD,
            "Password and confirm password are required",
        );
    }

    if (password !== confirmPassword) {
        encodedRedirect(
            "error",
            CLIENT_ROUTES.RESET_PASSWORD,
            "Passwords do not match",
        );
    }

    const { error } = await supabase.auth.updateUser({
        password: password,
    });

    if (error) {
        encodedRedirect(
            "error",
            CLIENT_ROUTES.RESET_PASSWORD,
            "Password update failed",
        );
    }

    encodedRedirect(
        "success",
        CLIENT_ROUTES.RESET_PASSWORD,
        "Password updated",
    );
};

export const signOutAction = async () => {
    const supabase = await createClient();

    await supabase.auth.signOut();

    return redirect(CLIENT_ROUTES.LOGIN);
};
