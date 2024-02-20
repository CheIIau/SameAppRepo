import { getPostById } from "@/api/posts";
import { ItemCard } from "@/app/posts/[id]/components/ItemCard/ItemCard";
import { Post } from "@/types/posts";
import { PropsWithChildren } from "react";

interface PostProps extends PropsWithChildren {
    params: {
        id: string;
    };
}

export default async function Post({ params }: PostProps) {
    const { id } = params;
    const post = await getPostById(id as string);

    ///@ts-expect-error
    if (post.errors) {
        return <p>Oops. Some error</p>;
    }

    return (
        <>
            <div className="flex-grow flex justify-center items-center">
                <div className="flex justify-center item h-full">
                    <ItemCard post={post as Post} showFooter={false} />
                </div>
            </div>
        </>
    );
}
