"use client";

import type { TUser } from "@/lib/types";

import {
    Button,
    Link,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from "@heroui/react";
import { isEmpty } from "lodash-es";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { signOutAction } from "@/actions/supabase";
import { CLIENT_ROUTES, EServerResponseCode } from "@/lib/constants";
import { EAlertType } from "@/lib/types";
import useAlertStore from "@/stores/AlertStore";
import useUserStore from "@/stores/UserStore";

type TTopNavbarProps = {
    user: TUser;
};

export const AcmeLogo = () => {
    return (
        <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
            <path
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    );
};

export default function TopNavbar({ user }: TTopNavbarProps) {
    const router = useRouter();
    const alertStore = useAlertStore();
    const userStore = useUserStore();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        userStore.fetchUserDetails();
    }, [user]);

    async function onLogout() {
        try {
            setLoading(true);
            const response = await signOutAction();

            if (response.code === EServerResponseCode.SUCCESS) {
                router.push(CLIENT_ROUTES.HOME);
            } else {
                alertStore.notify({
                    type: EAlertType.ERROR,
                    message: response.message,
                });
            }
        } catch (error) {
            console.error(error);
            alertStore.notify({
                type: EAlertType.ERROR,
                message: "Failed to logout! Please try again",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Navbar>
            <NavbarBrand>
                <AcmeLogo />
                <p className="font-bold text-inherit">Nexus</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Features
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link aria-current="page" href="#">
                        Customers
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Integrations
                    </Link>
                </NavbarItem>
            </NavbarContent>

            {isEmpty(user?.email) ? (
                <NavbarContent justify="end">
                    <NavbarItem className="hidden lg:flex">
                        <Link href={CLIENT_ROUTES.LOGIN}>Login</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Button
                            as={Link}
                            color="primary"
                            href={CLIENT_ROUTES.SIGNUP}
                            variant="flat"
                        >
                            Sign Up
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            ) : (
                <NavbarContent justify="end">
                    <NavbarItem>
                        <p className="text-md text-primary">{user?.email}</p>
                    </NavbarItem>
                    <NavbarItem>
                        <Button
                            className="w-12"
                            isLoading={loading}
                            variant="bordered"
                            onPress={onLogout}
                        >
                            Logout
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            )}
        </Navbar>
    );
}
