import type { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col gap-12 items-start w-full">
            {children}
        </div>
    );
}
