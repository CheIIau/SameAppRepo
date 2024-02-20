import { component$ } from "@builder.io/qwik";
import classes from "./Header.module.css";
import { Link, useLocation } from "@builder.io/qwik-city";

export default component$(() => {
    const links = [
        { name: "Home", link: "/" },
        { name: "Posts", link: "/posts/1" },
        { name: "About", link: "/about" },
        { name: "Todos", link: "/todos" },
    ] as const;

    const url = useLocation().url;
    
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
                    {links.map((link) => (
                        <li key={link.name}>
                            <Link
                                class={`${classes.link} ${checkRouteMatch(link.link, url.pathname) ? "!text-amber-600" : ""}`}
                                href={link.link}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
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
});

function checkRouteMatch(link: string, currentRoute: string) {
    const regexp = /^\/([^/]+\/[^/]+)(\/.*)?$/;
    let routeWithoutParams = currentRoute.replace(regexp, "");
    const linkWithoutParams = link.replace(regexp, "");
    if (routeWithoutParams.length > 1 && routeWithoutParams.at(-1) === "/") {
        routeWithoutParams = routeWithoutParams.substring(
            0,
            routeWithoutParams.length - 1
        );
    }
    return routeWithoutParams === linkWithoutParams;
}
