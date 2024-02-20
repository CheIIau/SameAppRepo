import { A, useParams } from '@solidjs/router'
import { ParentProps, createEffect, createSignal } from 'solid-js'
import { Component } from 'solid-js/types/server/rendering.js'

interface PostsFooterProps extends ParentProps {}

export const PostsFooter: Component<PostsFooterProps> = () => {
    const params = useParams()

    const prevPage = () => +params.page - 1
    const nextPage = () => +params.page + 1

    return (
        <footer class="fixed bottom-0 flex gap-3 items-center p-2 bg-indigo-800 text-indigo-200 rounded-t-lg left-1/2 -translate-x-1/2 ">
            {+params.page! > 1 && (
                <A
                    class="p-2"
                    href={`/posts/${prevPage()}`}
                >
                    {prevPage()}
                </A>
            )}
            <A
                class="p-2 text-amber-600"
                href={`/posts/${params.page}`}
            >
                {params.page}
            </A>
            <A
                class="p-2"
                href={`/posts/${nextPage()}`}
            >
                {nextPage()}
            </A>
        </footer>
    )
}
