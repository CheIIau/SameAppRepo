import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'posts-footer',
  styleUrl: '../../../index.css',
  shadow: true,
})
export class PostsFooter {
  @State()
  currentPage: string;

  constructor() {
    this._setCurrentLocation();
  }

  private _setCurrentLocation = async () => {
    this.currentPage = window.location.pathname.replace(/\D/g, '');
  };

  render() {
    return (
      <footer class="fixed bottom-0 flex gap-3 items-center p-2 bg-indigo-800 text-indigo-200 rounded-t-lg left-1/2 -translate-x-1/2 ">
        {+this.currentPage! > 1 && (
          <a class="p-2" href={`/posts/${+this.currentPage - 1}`}>
            {+this.currentPage - 1}
          </a>
        )}
        <a class="p-2 text-amber-600" href={`/posts/${this.currentPage}`}>
          {this.currentPage}
        </a>
        <a class="p-2" href={`/posts/${+this.currentPage + 1}`}>
          {+this.currentPage + 1}
        </a>
      </footer>
    );
  }
}
