import { Component, Prop, State, h } from '@stencil/core';
import { Post } from '../../components';
import '../../components/PostItem/PostItem';
import { getPostById } from '../../api/posts';

@Component({
  tag: 'post-page',
  styleUrls: ['../../index.css', 'Post.css'],
  shadow: true,
})
export class PostPage {
  @State()
  post: Post;

  @State()
  postId: string;

  private _getTodos = async () => {
    const response = (await getPostById(this.postId)) as Post;
    //@ts-expect-error
    if (response.errors) {
      //@ts-expect-error
      throw new Error(response.errors[0]);
    }
    this.post = response as Post;
    return this.post;
  };

  connectedCallback() {
    this.postId = window.location.pathname.split('/').at(-1);
    this._getTodos();
  }

  render() {
    return (
      <div class="flex-grow flex justify-center items-center">
        <div class="flex justify-center item h-full">{this.post && <post-item post={this.post} showFooter={false} />}</div>
      </div>
    );
  }
}
