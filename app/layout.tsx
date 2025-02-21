import type { TUser } from "@/lib/types";

import { Geist } from "next/font/google";

import Providers from "./providers";

import AppFooter from "@/components/sections/AppFooter";
import TopNavbar from "@/components/sections/TopNavbar";
import AlertNotify from "@/components/ui/AlertNotify";
import NavigationProgress from "@/components/ui/NavigationProgress";
import "@/global/styles/global.scss";
import { createClient } from "@/utils/supabase/server";
import "./globals.css";

// Vercel sets it's own environment variables when deployed
const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: {
        template: "%s | Nexus",
        default: "Nexus",
    },
    description: "NextJS Supabase Starter",
};

const geistSans = Geist({
    display: "swap",
    subsets: ["latin"],
});

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <html
            suppressHydrationWarning
            className={`${geistSans.className} h-screen w-screen`}
            lang="en"
        >
            <body className="w-full">
                <Providers>
                    <NavigationProgress />
                    <main className="w-full bg-background text-foreground flex flex-col items-center">
                        <AlertNotify />
                        <div className="flex-1 w-full flex flex-col items-center">
                            <TopNavbar user={user as TUser} />
                            <div className="w-full flex flex-col p-5">
                                {children}
                            </div>

                            <AppFooter />
                        </div>
                    </main>
                </Providers>
            </body>
        </html>
    );
}
