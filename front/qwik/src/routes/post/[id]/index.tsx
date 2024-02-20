import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getPostById } from "~/api/posts";
import ItemCard from "~/routes/posts/[page]/components/ItemCard/ItemCard";

export const usePost = routeLoader$(async (requestEvent) => {
    const page = requestEvent.url.pathname;
    const id = page.split("/").at(-2);

    const response = await getPostById(id!);
    return response;
});

export default component$(() => {
    const post = usePost()

    return (
        <>
            <div class="flex-grow flex justify-center items-center">
                <div class="flex justify-center item h-full">
                    <ItemCard post={post.value} showFooter={false} />
                </div>
            </div>
        </>
    );
});

export const head: DocumentHead = {
    title: "Post",
    meta: [
        {
            name: "description",
            content: "Some description",
        },
    ],
};
