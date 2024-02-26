import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '../../components/Post/ItemCard'
import { Post } from '../../types/posts'
import { Task, initialState } from '@lit/task'
import { getPostsByPage } from '../../api/posts'
import './components/PostsFooter'
import { TailwindElement } from '../../utils/tailwindMixin'
import '../../components/UI/Spinner/Spinner'
import style from './Posts.css?inline'

@customElement('posts-page')
export class Posts extends TailwindElement(style) {
    @property({ type: Array })
    posts: Post[] = []

    @property()
    currentPage?: string

    connectedCallback() {
        super.connectedCallback()
        this.currentPage = window.location.pathname.replace(/\D/g, '')
    }

    disconnectedCallback() {
        super.disconnectedCallback()
    }

    private _postsTask = new Task(this, {
        task: async ([currentPage]) => {
            const page = currentPage ? currentPage : 1
            const response = await getPostsByPage(page.toString())
            if (response.errors) {
                throw new Error(response.errors[0])
            }
            this.posts = response as Post[]
            return this.posts
        },
        args: () => [this.currentPage],
    })

    render() {
        return html`
            <div class="flex-grow">
                <div class="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    ${this._postsTask.render({
                        complete: (value) =>
                            html` ${value.map(
                                (post) =>
                                    html` <div class="flex justify-center item h-full">
                                        <item-card .showFooter=${true} .post=${post}></item-card>
                                    </div>`,
                            )}`,
                        pending: () => html`
                            <div class="absolute inset-0 flex justify-center items-center">
                                <spinner-component></spinner-component>
                            </div>
                        `,
                    })}
                </div>
            </div>
            <posts-footer></posts-footer>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'posts-page': Posts
    }
}
