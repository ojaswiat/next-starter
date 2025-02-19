import { createServerClient } from "@supabase/ssr";
import { includes, isEmpty } from "lodash-es";
import { type NextRequest, NextResponse } from "next/server";

import { CLIENT_ROUTES } from "@/lib/constants";

const PROTECTED_ROUTES = [
    CLIENT_ROUTES.DASHBOARD,
    CLIENT_ROUTES.PROFILE,
    CLIENT_ROUTES.SETTINGS,
    CLIENT_ROUTES.RESET_PASSWORD,
];

export const updateSession = async (request: NextRequest) => {
    // This `try/catch` block is only here for the interactive tutorial.
    // Feel free to remove once you have Supabase connected.
    try {
        // Create an unmodified response
        let response = NextResponse.next({
            request: {
                headers: request.headers,
            },
        });

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return request.cookies.getAll();
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value }) =>
                            request.cookies.set(name, value),
                        );
                        response = NextResponse.next({
                            request,
                        });
                        cookiesToSet.forEach(({ name, value, options }) =>
                            response.cookies.set(name, value, options),
                        );
                    },
                },
            },
        );

        // This will refresh session if expired - required for Server Components
        // https://supabase.com/docs/guides/auth/server-side/nextjs
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (
            isEmpty(user) &&
            includes(PROTECTED_ROUTES, request.nextUrl.pathname)
        ) {
            // no user, potentially respond by redirecting the user to the login page except for the above pages
            const url = request.nextUrl.clone();

            url.pathname = CLIENT_ROUTES.LOGIN;

            return NextResponse.redirect(url);
        }

        if (
            !isEmpty(user) &&
            (request.nextUrl.pathname === CLIENT_ROUTES.LOGIN ||
                request.nextUrl.pathname === CLIENT_ROUTES.SIGNUP ||
                request.nextUrl.pathname === CLIENT_ROUTES.FORGOT_PASSWORD)
        ) {
            // if the user is logged in and the url is login, signup, or forgot-password we redirect the user to home.
            const url = request.nextUrl.clone();

            url.pathname = CLIENT_ROUTES.DASHBOARD;

            return NextResponse.redirect(url);
        }

        return response;
    } catch (error) {
        // If you are here, a Supabase client could not be created!
        // This is likely because you have not set up environment variables.
        // Check out http://localhost:3000 for Next Steps.
        console.error(error);

        return NextResponse.next({
            request: {
                headers: request.headers,
            },
        });
    }
};
