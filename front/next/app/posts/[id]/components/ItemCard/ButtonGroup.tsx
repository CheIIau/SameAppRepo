"use client";

import cartStore from "@/store/cart";
import { Post } from "@/types/posts";
import type { FC, PropsWithChildren } from "react";
import { observer } from "mobx-react-lite";
interface ButtonGroupProps extends PropsWithChildren {
    readonly post: Post;
}

const ButtonGroup: FC<ButtonGroupProps> = observer(({ post }) => {
    const { decrease, increase, cart } = cartStore;

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={() => {
                    decrease(post.id, 1, post.width);
                }}
                className="inline-flex justify-center items-center h-8 w-8 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
                -
            </button>
            <p className="text-sm font-medium text-center text-white">
                {cart[post.id]?.number || 0}
            </p>
            <button
                onClick={() => {
                    increase(post.id, 1, post.width);
                }}
                className="inline-flex justify-center items-center h-8 w-8 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
                +
            </button>
        </div>
    );
});

export default ButtonGroup;
