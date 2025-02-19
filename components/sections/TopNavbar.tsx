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
import Image from "next/image";
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
        <Navbar isBordered>
            <NavbarBrand className="flex gap-1">
                <Image
                    alt="Nexus Logo"
                    height={20}
                    src="/images/NexusLogo.svg"
                    width={20}
                />
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
                        <Button
                            as={Link}
                            color="primary"
                            href={CLIENT_ROUTES.LOGIN}
                            variant="bordered"
                        >
                            <p className="font-semibold">Login</p>
                        </Button>
                    </NavbarItem>
                    <NavbarItem>
                        <Button
                            as={Link}
                            color="primary"
                            href={CLIENT_ROUTES.SIGNUP}
                            variant="solid"
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
