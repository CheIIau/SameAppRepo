import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getPostById } from '../../api/posts'
import { ItemCard } from '../posts.$page/components/ItemCard/ItemCard'

export const loader = async ({ params }: LoaderFunctionArgs) => {
    if (!params.id) {
        throw new Response('Invalid id', { status: 404 })
    }
    const post = await getPostById(params.id)

    // Return the data as JSON
    return json({ post })
}

export default function Posts() {
    const { post } = useLoaderData<typeof loader>()

    if (post.errors) {
        return <>{post.errors[0]}</>
    }

    return (
        <>
            <div className="flex-grow flex justify-center items-center">
                <div className="flex justify-center item h-full">
                    <ItemCard post={post} showFooter={false} />
                </div>
            </div>
        </>
    )
}
