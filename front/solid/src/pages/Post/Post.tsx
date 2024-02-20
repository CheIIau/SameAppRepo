import { Component, Show, createResource } from 'solid-js'
import { ItemCard } from '../../components/ItemCard/ItemCard'
import { getPostById } from '../../api/posts'
import { useParams } from '@solidjs/router'
import { Spinner } from '../../components/Spinner/Spinner'

const Post: Component = () => {
    const params = useParams()
    const [post] = createResource(() => ({ id: params.id }), getPostById)

    return (
        <>
            <Show
                when={!post.loading}
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
                <div class="flex-grow flex justify-center items-center">
                    <div class="flex justify-center item h-full">
                        <ItemCard
                            post={post()!}
                            showFooter={false}
                        />
                    </div>
                </div>
            </Show>
        </>
    )
}

export default Post
