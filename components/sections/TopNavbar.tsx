"use client";

import type { TUser } from "@/lib/types";

import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from "@heroui/react";
import { isEmpty } from "lodash-es";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
    const pathName = usePathname();

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
                    height={16}
                    src="/images/NexusLogo.svg"
                    width={16}
                />
                <Link
                    className="font-bold text-primary text-xl"
                    href={CLIENT_ROUTES.HOME}
                >
                    Nexus
                </Link>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {!isEmpty(user?.email) ? (
                    <NavbarItem isActive={pathName === CLIENT_ROUTES.DASHBOARD}>
                        <Link href={CLIENT_ROUTES.DASHBOARD}>
                            <p
                                className={`${
                                    pathName === CLIENT_ROUTES.DASHBOARD
                                        ? "text-primary"
                                        : "text-foreground"
                                }`}
                            >
                                Dashboard
                            </p>
                        </Link>
                    </NavbarItem>
                ) : null}
                <NavbarItem isActive={pathName === CLIENT_ROUTES.FEATURES}>
                    <Link href={CLIENT_ROUTES.FEATURES}>
                        <p
                            className={`${
                                pathName === CLIENT_ROUTES.FEATURES
                                    ? "text-primary"
                                    : "text-foreground"
                            }`}
                        >
                            Features
                        </p>
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={pathName === CLIENT_ROUTES.DOCS}>
                    <Link href={CLIENT_ROUTES.DOCS}>
                        <p
                            className={`${
                                pathName === CLIENT_ROUTES.DOCS
                                    ? "text-primary"
                                    : "text-foreground"
                            }`}
                        >
                            Docs
                        </p>
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
