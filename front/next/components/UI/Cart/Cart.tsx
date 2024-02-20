"use client";

import cartStore from "@/store/cart";
import { observer } from "mobx-react-lite";
import { FC, PropsWithChildren } from "react";

interface CartProps extends PropsWithChildren {}

export const Cart: FC<CartProps> = observer(() => {
    const { totalItems, totalPrice } = cartStore;

    return (
        <summary className="fixed top-0 right-0 flex gap-3 items-center p-2 bg-teal-800 text-teal-200 rounded-b-lg mr-4">
            <div>items: {totalItems}</div>
            <div>total: {totalPrice}</div>
        </summary>
    );
});
