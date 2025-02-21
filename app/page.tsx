import Hero from "@/components/sections/Hero";
import CheckAlert from "@/components/ui/CheckAlert";

export default async function Home() {
    return (
        <>
            <div className="flex gap-4 my-4 w-fit mx-auto">
                <CheckAlert />
            </div>
            <Hero />
            <p className="text-center">
                Edit app/page.tsx to create your landing page
            </p>
        </>
    );
}
