"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { FC, PropsWithChildren } from "react";

interface PostsFooterProps extends PropsWithChildren {}

export const PostsFooter: FC<PostsFooterProps> = () => {
    const { id } = useParams();
    const prevPage = id ? +id - 1 : 1;
    const nextPage = id ? +id + 1 : 2;

    return (
        <footer className="fixed bottom-0 flex gap-3 items-center p-2 bg-indigo-800 text-indigo-200 rounded-t-lg left-1/2 -translate-x-1/2 ">
            {+id! > 1 && (
                <Link className="p-2" href={`/posts/${prevPage}`}>
                    {prevPage}
                </Link>
            )}
            <Link className="p-2 text-amber-600" href={`/posts/${id}`}>
                {id}
            </Link>
            <Link className="p-2" href={`/posts/${nextPage}`}>
                {nextPage}
            </Link>
        </footer>
    );
};
