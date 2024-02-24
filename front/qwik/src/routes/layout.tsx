import type { QRL } from "@builder.io/qwik";
import {
    component$,
    createContextId,
    Slot,
    useContextProvider,
    useStore,
    useStyles$,
    $,
    useVisibleTask$,
} from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";
import Header from "~/components/Header/Header";

import styles from "./styles.css?inline";
import Cart from "~/components/Cart/Cart";

export const onGet: RequestHandler = async ({ cacheControl, request }) => {
    // Control caching for this request for best performance and to reduce hosting costs:
    // https://qwik.builder.io/docs/caching/
    cacheControl({
        // Always serve a cached response by default, up to a week stale
        staleWhileRevalidate: 60 * 60 * 24 * 7,
        // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
        maxAge: 5,
    });
};

// export const onRequest: RequestHandler = async ({ request }) => {
//    console.log(request)
// };

export const useServerTimeLoader = routeLoader$(() => {
    return {
        date: new Date().toISOString(),
    };
});

export default component$(() => {
    useStyles$(styles);
    // не помню почему вынес методы отдельно, можно было засунуть в стору
    const cart = useStore<Record<string, { number: number; price: number }>>(
        {}
    );

    const increase$ = $((id: string, by: number, price: number) => {
        if (cart[id]) {
            cart[id] = { number: cart[id].number + by, price };
        } else {
            cart[id] = { number: by, price };
        }
    });
    const decrease$ = $((id: string, by: number, price: number) => {
        if (cart[id]?.number > 0) {
            cart[id] = { number: cart[id].number - by, price };
        }
    });

    useContextProvider(CartContext, cart);
    useContextProvider(CartIncreaseContext, increase$);
    useContextProvider(CartDecreaseContext, decrease$);

    // useVisibleTask$(({ track }) => {
    //     // const value = track(() => cart);
    //     setInterval(() => increase$("12", 1, 3000), 5500);
    // });
    return (
        <>
            <Header />
            <Cart />
            <main class="p-3">
                <Slot />
            </main>
        </>
    );
});

export const CartContext =
    createContextId<Record<string, { number: number; price: number }>>("cart");
export const CartIncreaseContext =
    createContextId<QRL<(id: string, by: number, price: number) => void>>(
        "increase"
    );
export const CartDecreaseContext =
    createContextId<QRL<(id: string, by: number, price: number) => void>>(
        "decrease"
    );
