import { Component, For, Show, createResource } from 'solid-js'
import { Post } from '../../types/posts'
import { PostsFooter } from './components/PostsFooter/PostsFooter'
import { ItemCard } from '../../components/ItemCard/ItemCard'
import { getPostsByPage } from '../../api/posts'
import { useParams } from '@solidjs/router'
import { Spinner } from '../../components/Spinner/Spinner'

const Posts: Component = () => {
    const params = useParams()
    const [posts] = createResource(() => ({ page: params.page }), getPostsByPage)

    return (
        <>
            <Show
                when={!posts.loading}
                fallback={
                    <div class="w-full flex justify-center m-auto mt-5">
                        <Spinner
                            size="130px"
                            color="#F87171"
                            width="7px"
                        />
                    </div>
                }
            >
                <div class="flex-grow">
                    <div class="grid gap-4 grid-cols-1 sm:grid-cols-2">
                        <For each={posts() as Post[]}>
                            {(post) => (
                                <div class="flex justify-center item h-full">
                                    <ItemCard post={post} />
                                </div>
                            )}
                        </For>
                    </div>
                </div>
            </Show>

            <PostsFooter />
        </>
    )
}

export default Posts
