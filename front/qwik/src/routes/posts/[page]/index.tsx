import { component$ } from "@builder.io/qwik";
import {
    type DocumentHead,
    routeLoader$,
} from "@builder.io/qwik-city";
import PostsFooter from "./components/PostsFooter/PostsFooter";
import { getPostsByPage } from "~/api/posts";
import ItemCard from "./components/ItemCard/ItemCard";
// import ItemCard from "./components/ItemCard/ItemCard";

export const usePosts = routeLoader$(async (requestEvent) => {
    const page = requestEvent.url.pathname;
    const regex = /(\d+)/g;

    const response = await getPostsByPage(page.match(regex)?.[0] || "1");
    return response;
});

export default component$(() => {
    // const posts = useResource$(async ({ track }) => {
    //     // it will run first on mount (server), then re-run whenever prNumber changes (client)
    //     // this means this code will run on the server and the browser
    //     track(() => page);
    //     const response = await getPostsByPage(page);
    //     return response;
    // });
    const posts = usePosts();
    return (
        <>
            <div class="flex-grow">
                <div class="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    {posts.value.map((post) => (
                        <div
                            key={post.id}
                            class="flex justify-center item h-full"
                        >
                            <ItemCard post={post} showFooter />
                        </div>
                    ))}
                    {/* <Resource
                        value={posts}
                        onPending={() => (
                            <div
                                class="flex justify-center item h-full"
                            >
                                <Spinner color="red" size="40" />
                            </div>
                        )}
                        onResolved={(posts) =>
                            posts.map((post) => (
                                <div
                                    key={post.id}
                                    class="flex justify-center item h-full"
                                >
                                    <ItemCard post={post} />
                                </div>
                            ))
                        }
                    /> */}
                </div>
            </div>
            <PostsFooter />
        </>
    );
});

export const head: DocumentHead = {
    title: "Posts",
    meta: [
        {
            name: "description",
            content: "Some description",
        },
    ],
};
