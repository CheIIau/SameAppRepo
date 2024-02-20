import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getPostsByPage } from '../../api/posts'
import { ItemCard } from './components/ItemCard/ItemCard'
import { PostsFooter } from './components/PostsFooter/PostsFooter'

export const loader = async ({ params }: LoaderFunctionArgs) => {
    if (!params.page) {
        throw new Response('Invalid page', { status: 404 })
    }
    const posts = await getPostsByPage(params.page)

    // Return the data as JSON
    return json({ posts })
}

export default function Posts() {
    const { posts } = useLoaderData<typeof loader>()

    if (posts.errors) {
        return <>{posts.errors[0]}</>
    }
    return (
        <>
            <div className="flex-grow">
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="flex justify-center item h-full"
                        >
                            <ItemCard post={post} />
                        </div>
                    ))}
                </div>
            </div>
            <PostsFooter />
        </>
    )
}
