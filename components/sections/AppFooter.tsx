import Link from "next/link";

import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

export default function AppFooter() {
    return (
        <footer className="border-t mx-auto text-center pt-8 flex flex-col gap-2 sticky bottom-8">
            <p className="text-md">
                Powered by{" "}
                <Link
                    className="font-bold hover:underline"
                    href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                    rel="noreferrer"
                    target="_blank"
                >
                    Supabase
                </Link>
            </p>
            <ThemeSwitcher />
        </footer>
    );
}
