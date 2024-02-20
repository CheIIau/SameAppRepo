import { FC, PropsWithChildren } from 'react'
import { Link, useParams } from '@remix-run/react'

interface PostsFooterProps extends PropsWithChildren {}

export const PostsFooter: FC<PostsFooterProps> = () => {
    const { page } = useParams()
    const prevPage = page ? +page - 1 : 1
    const nextPage = page ? +page + 1 : 2

    return (
        <footer className="fixed bottom-0 flex gap-3 items-center p-2 bg-indigo-800 text-indigo-200 rounded-t-lg left-1/2 -translate-x-1/2 ">
            {+page! > 1 && <Link className='p-2' to={`/posts/${prevPage}`}>{prevPage}</Link>}
            <Link className='p-2 text-amber-600' to={`/posts/${page}`}>{page}</Link>
            <Link className='p-2' to={`/posts/${nextPage}`}>{nextPage}</Link>
        </footer>
    )
}
