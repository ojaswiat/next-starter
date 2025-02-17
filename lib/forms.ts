import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email");
const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password is too long");

export const SignupFormSchema = z
    .object({
        email: emailSchema,
        password: passwordSchema,
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type TSignupFormSchema = z.infer<typeof SignupFormSchema>;

export const LoginFormSchema = z.object({
    email: emailSchema,
    password: z.string(),
});

export type TLoginFormSchema = z.infer<typeof LoginFormSchema>;

export const ForgotPasswordFormSchema = z.object({
    email: emailSchema,
});

export type TForgotPasswordFormSchema = z.infer<
    typeof ForgotPasswordFormSchema
>;

export const ResetPasswordFormSchema = z
    .object({
        password: passwordSchema,
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type TResetPasswordFormSchema = z.infer<typeof ResetPasswordFormSchema>;
