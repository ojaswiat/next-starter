"use client";

import type { TUser } from "@/lib/types";

import {
    Avatar,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from "@heroui/react";
import { isEmpty } from "lodash-es";
import { CircleUser } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { signOutAction } from "@/actions/supabase";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
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

    useEffect(() => {
        userStore.fetchUserDetails();
    }, [user]);

    async function onLogout() {
        try {
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
            <div className="ml-auto" />
            <NavbarContent justify="end">
                {isEmpty(user?.email) ? (
                    <>
                        <NavbarItem>
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
                    </>
                ) : (
                    <>
                        <Dropdown className="bg-background border border-primary">
                            <DropdownTrigger>
                                <Avatar>
                                    <CircleUser />
                                </Avatar>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem
                                    key="profile"
                                    onPress={() =>
                                        router.push(CLIENT_ROUTES.PROFILE)
                                    }
                                >
                                    Profile
                                </DropdownItem>
                                <DropdownItem
                                    key="settings"
                                    onPress={() =>
                                        router.push(CLIENT_ROUTES.SETTINGS)
                                    }
                                >
                                    Settings
                                </DropdownItem>
                                <DropdownItem
                                    key="logout"
                                    className="border-t border-primary mt-4"
                                    onPress={() => onLogout()}
                                >
                                    Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </>
                )}
                <NavbarItem>
                    <ThemeSwitcher />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
