"use client";

import { Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import PasswordEye from "../ui/PasswordEye";

import { signupAction } from "@/actions/supabase";
import { EServerResponseCode } from "@/lib/constants";
import { SignupFormSchema, type TSignupFormSchema } from "@/lib/forms";
import { EAlertType } from "@/lib/types";
import { useAlertStore } from "@/stores/AlertStore";

export default function SignupForm() {
    const [loading, setLoading] = useState(false);
    const alertStore = useAlertStore();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TSignupFormSchema>({
        resolver: zodResolver(SignupFormSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: TSignupFormSchema) => {
        try {
            setLoading(true);
            const response = await signupAction(data);

            if (response.code === EServerResponseCode.SUCCESS) {
                alertStore.notify({
                    message: response.message,
                    type: EAlertType.SUCCESS,
                });
            } else {
                alertStore.notify({
                    message: response.message,
                    type: EAlertType.ERROR,
                });
            }

            reset();
        } catch (error) {
            console.error("Signup failed:", error);
            alertStore.notify({
                message: "Failed to signup",
                type: EAlertType.ERROR,
            });
        } finally {
            setLoading(false);
        }
    };

    function toggleShowPassword() {
        setShowPassword((prev) => !prev);
    }

    return (
        <form
            className="flex flex-col gap-y-4 w-full"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input
                {...register("email")}
                fullWidth
                errorMessage={errors.email?.message}
                isInvalid={!!errors?.email}
                label="Email"
                type="email"
            />

            {/* todo: add eye and show password button */}
            <Input
                {...register("password")}
                fullWidth
                endContent={
                    <PasswordEye
                        showPassword={showPassword}
                        toggleShowPassword={toggleShowPassword}
                    />
                }
                errorMessage={errors.password?.message}
                isInvalid={!!errors?.password}
                label="Password"
                type={showPassword ? "text" : "password"}
            />

            <Input
                {...register("confirmPassword")}
                fullWidth
                endContent={
                    <PasswordEye
                        showPassword={showPassword}
                        toggleShowPassword={toggleShowPassword}
                    />
                }
                errorMessage={errors.confirmPassword?.message}
                isInvalid={!!errors?.confirmPassword}
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
            />

            <Button
                color="primary"
                disabled={loading}
                isLoading={loading}
                type="submit"
            >
                Sign Up
            </Button>
        </form>
    );
}
