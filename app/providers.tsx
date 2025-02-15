"use client";

import type { ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                disableTransitionOnChange
                enableSystem
                attribute="class"
                defaultTheme="system"
            >
                {children}
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} position="bottom" />
        </QueryClientProvider>
    );
}
