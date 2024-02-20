import { getPostsByPage } from "@/api/posts";
import { FC, PropsWithChildren } from "react";
import { PostsFooter } from "./components/PostsFooter/PostsFooter";
import { ItemCard } from "./components/ItemCard/ItemCard";
import { Post } from "@/types/posts";

interface PostsProps extends PropsWithChildren {
    params?: {
        id: string;
    };
}

const Posts: FC<PostsProps> = async ({ params }) => {
    if (!params?.id) {
        return null;
    }

    const posts = await getPostsByPage(params.id);

    ///@ts-expect-error
    if (posts.errors) {
        return <p>Oops. Some error</p>;
    }

    return (
        <>
            <div className="flex-grow">
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    {(posts as Post[]).map((post) => (
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
    );
};

export default Posts;
