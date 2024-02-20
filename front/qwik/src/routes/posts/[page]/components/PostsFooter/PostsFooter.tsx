import { component$ } from "@builder.io/qwik"
import { Link, useLocation } from "@builder.io/qwik-city"

export default component$(() => {
    const page = useLocation().params.page
    const prevPage = page ? +page - 1 : 1
    const nextPage = page ? +page + 1 : 2

    return (
        <footer class="fixed bottom-0 flex gap-3 items-center p-2 bg-indigo-800 text-indigo-200 rounded-t-lg left-1/2 -translate-x-1/2 ">
            {+page! > 1 && <Link class='p-2' href={`/posts/${prevPage}`}>{prevPage}</Link>}
            <Link class='p-2 text-amber-600' href={`/posts/${page}`}>{page}</Link>
            <Link class='p-2' href={`/posts/${nextPage}`}>{nextPage}</Link>
        </footer>
    )
})
