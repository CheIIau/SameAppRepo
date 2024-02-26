import { Component, State, h } from '@stencil/core';
import { Post } from '../../types/posts';
import { getPostsByPage } from '../../api/posts';
//@ts-expect-error
import { PostsFooter } from './components/PostsFooter';
import '../../components/PostItem/PostItem'

@Component({
  tag: 'posts-page',
  styleUrl: '../../index.css',
  shadow: true,
})
export class Posts {
  @State()
  posts: Post[] = [];

  @State()
  currentPage: string;

  private _getPosts = async () => {
    const response = (await getPostsByPage(this.currentPage)) as Post[];
    //@ts-expect-error
    if (response.errors) {
      //@ts-expect-error
      throw new Error(response.errors[0]);
    }
    this.posts = response as Post[];
    return this.posts;
  };

  connectedCallback() {
    this.currentPage = window.location.pathname.replace(/\D/g, '');
    this._getPosts();
  }

  render() {
    return (
      <>
        <div class="flex-grow">
          <div class="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {(this.posts as Post[]).map(post => (
              <div key={post.id} class="flex justify-center item h-full">
                <post-item post={post} />
              </div>
            ))}
          </div>
        </div>
        <posts-footer />
      </>
    );
  }
}
