"use client";

import { FC, PropsWithChildren } from "react";
import classes from "./Header.module.css";
import { checkRouteMatch } from "@/utils/helpers";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface HeaderProps extends PropsWithChildren {}

export const Header: FC<HeaderProps> = () => {
    const links = [
        { name: "Home", link: "/" },
        { name: "Posts", link: "/posts/1" },
        { name: "About", link: "/about" },
        { name: "Todos", link: "/todos" },
    ] as const;

    const pathname = usePathname();

    return (
        <header className={classes.header}>
            <nav className="w-full flex justify-center">
                <svg
                    viewBox="0 0 2 3"
                    className={classes.svg + " text-indigo-800"}
                    aria-hidden="true"
                >
                    <path
                        className="fill-current"
                        d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z"
                    />
                </svg>
                <ul className="bg-indigo-800 flex justify-center items-center [&>li]:relative [&>li]:h-full">
                    {links.map((link) => (
                        <li key={link.name}>
                            <Link
                                className={`${classes.link} ${
                                    checkRouteMatch(link.link, pathname)
                                        ? "text-amber-600"
                                        : "text-slate-400"
                                }`}
                                href={link.link}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <svg
                    viewBox="0 0 2 3"
                    className={classes.svg + " text-indigo-800"}
                    aria-hidden="true"
                >
                    <path
                        className="fill-current"
                        d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z"
                    />
                </svg>
            </nav>
        </header>
    );
};
