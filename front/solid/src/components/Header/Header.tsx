import { Component, For } from "solid-js";
import classes from "./Header.module.css";
import { A } from "@solidjs/router";

export const Header: Component = () => {
    const links = [
        { name: "Home", link: "/" },
        { name: "Posts", link: "/posts/1" },
        { name: "About", link: "/about" },
        { name: "Todos", link: "/todos" },
    ] as const;

    return (
        <header class={classes.header}>
            <nav class="w-full flex justify-center">
                <svg
                    viewBox="0 0 2 3"
                    class={classes.svg + " text-indigo-800"}
                    aria-hidden="true"
                >
                    <path
                        class="fill-current"
                        d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z"
                    />
                </svg>
                <ul class="bg-indigo-800 flex justify-center items-center [&>li]:relative [&>li]:h-full">
                    <For each={links}>
                        {(link, i) => (
                            <A
                                class={`${classes.link} text-slate-400`}
                                activeClass="!text-amber-600"
                                href={link.link}
                                end={true}
                            >
                                {link.name}
                            </A>
                        )}
                    </For>
                </ul>
                <svg
                    viewBox="0 0 2 3"
                    class={classes.svg + " text-indigo-800"}
                    aria-hidden="true"
                >
                    <path
                        class="fill-current"
                        d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z"
                    />
                </svg>
            </nav>
        </header>
    );
};
