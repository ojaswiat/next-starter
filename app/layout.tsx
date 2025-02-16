import { Geist } from "next/font/google";
import Link from "next/link";

import Providers from "./providers";

import DeployButton from "@/components/actions/DeployButton";
import HeaderAuth from "@/components/sections/HeaderAuth";
import AlertNotify from "@/components/ui/AlertNotify";
import EnvVarWarning from "@/components/ui/EnvVarWarning";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import HAS_ENV_VARS from "@/utils/supabase/checkEnvVars";

import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "Next.js and Supabase Starter Kit",
    description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
    display: "swap",
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            suppressHydrationWarning
            className={geistSans.className}
            lang="en"
        >
            <body className="h-screen w-screen">
                <Providers>
                    <main className="bg-background text-foreground flex flex-col items-center">
                        <AlertNotify />
                        <div className="flex-1 w-full flex flex-col gap-20 items-center">
                            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                                    <div className="flex gap-5 items-center font-semibold">
                                        <Link href={"/"}>
                                            Next.js Supabase Starter by Ojaswi
                                            Athghara
                                        </Link>
                                        <div className="flex items-center gap-2">
                                            <DeployButton />
                                        </div>
                                    </div>
                                    {!HAS_ENV_VARS ? (
                                        <EnvVarWarning />
                                    ) : (
                                        <HeaderAuth />
                                    )}
                                </div>
                            </nav>
                            <div className="flex flex-col gap-20 max-w-5xl p-5">
                                {children}
                            </div>

                            <footer className="border-t mx-auto py-8 text-center">
                                <div className="w-full flex items-center justify-center gap-8 text-sm">
                                    <p>
                                        Powered by{" "}
                                        <a
                                            className="font-bold hover:underline"
                                            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                                            rel="noreferrer"
                                            target="_blank"
                                        >
                                            Supabase
                                        </a>
                                    </p>
                                    <ThemeSwitcher />
                                </div>

                                <p className="text-sm mt-8">
                                    Mod by Ojaswi Athghara
                                </p>
                            </footer>
                        </div>
                    </main>
                </Providers>
            </body>
        </html>
    );
}
