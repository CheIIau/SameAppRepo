import { Post } from "@/types/posts";
import Link from "next/link";
import { FC, PropsWithChildren, useState } from "react";
import UselessButton from "./UselessButton";
import ButtonGroup from "./ButtonGroup";

interface ItemCardProps extends PropsWithChildren {
    readonly post: Post;
    readonly showFooter?: boolean;
}

export const ItemCard: FC<ItemCardProps> = ({ post, showFooter = true }) => {
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
            <div className="max-h-96 overflow-hidden">
                <img
                    className="rounded-t-lg object-cover object-center w-full h-full"
                    src={post.urls.regular}
                    alt=""
                />
            </div>
            <div className="flex-grow" />
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {post.user.first_name + " " + (post.user.last_name || "")}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {post.alt_description || post.description}
                </p>
                {showFooter && (
                    <div className="flex flex-row justify-between">
                        <Link
                            href={`/post/${post.id}`}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Read more
                            <svg
                                className="w-3.5 h-3.5 ml-2"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                            </svg>
                        </Link>
                        <UselessButton />
                    </div>
                )}
                <div className="flex flex-row justify-between mt-2">
                    <p className="py-2 text-sm font-medium text-center text-white">
                        Price: {post.width}
                    </p>
                    <ButtonGroup post={post} />
                </div>
            </div>
        </div>
    );
};
