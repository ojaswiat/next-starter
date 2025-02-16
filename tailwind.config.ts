import type { Config } from "tailwindcss";

import { heroui } from "@heroui/react";

const config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    prefix: "",
    theme: {
        extend: {},
    },
    plugins: [
        heroui({
            layout: {
                fontSize: {
                    tiny: "0.5rem",
                    small: "0.875rem",
                    medium: "1rem",
                    large: "2rem",
                },
                radius: {
                    small: "0.25rem",
                    medium: "0.5rem",
                    large: "0.75rem",
                },
            },
            themes: {
                dark: {
                    colors: {
                        background: "#08070d",
                        foreground: "#ffffff",
                        primary: "#723AFF",
                        success: "#54BF2D",
                        content1: "#2CB5F9",
                        warning: "#FFDE0C",
                        danger: "#FF4747",
                    },
                },
                light: {
                    colors: {
                        background: "#ffffff",
                        foreground: "#08070d",
                        primary: "#723AFF",
                        success: "#54BF2D",
                        content1: "#2CB5F9",
                        warning: "#FFDE0C",
                        danger: "#FF4747",
                    },
                },
            },
        }),
    ],
} satisfies Config;

export default config;
