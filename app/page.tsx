import Hero from "@/components/sections/Hero";
import CheckAlert from "@/components/ui/CheckAlert";

export default async function Home() {
    return (
        <>
            <CheckAlert />
            <Hero />
            <p className="text-center">
                Edit app/page.tsx to create your landing page
            </p>
        </>
    );
}
