import { z } from "zod";

export const SignupFormSchema = z
    .object({
        email: z.string().email("Please enter a valid email"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(100, "Password is too long"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type TSignupFormSchema = z.infer<typeof SignupFormSchema>;

export const LoginFormSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string(),
});

export type TLoginFormSchema = z.infer<typeof LoginFormSchema>;
