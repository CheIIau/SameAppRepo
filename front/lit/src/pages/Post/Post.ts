import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { TailwindElement } from '../../utils/tailwindMixin'
import { Task } from '@lit/task'
import { getPostById } from '../../api/posts'
import { Post } from '../../types/posts'
import style from './Post.css?inline'
import '../../components/Post/ItemCard'

@customElement('post-page')
export class PostPage extends TailwindElement(style) {
    @property({ type: Object })
    post = null as Post | null

    @property()
    postId?: string

    connectedCallback() {
        super.connectedCallback()
        this.postId = window.location.pathname.split('/').at(-1)
    }

    disconnectedCallback() {
        super.disconnectedCallback()
    }

    private _postTask = new Task(this, {
        task: async ([postId]) => {
            if (!postId) return null
            const response = await getPostById(postId.toString())
            if (response.errors) {
                throw new Error(response.errors[0])
            }
            this.post = response as Post
            return this.post
        },
        args: () => [this.postId],
    })

    render() {
        return html`
            ${this._postTask.render({
                complete: (value) => {
                    if (value) {
                        return html` <div class="flex justify-center item h-full">
                            <item-card .post=${value}></item-card>
                        </div>`
                    } else {
                        return html`<div class="absolute inset-0 flex justify-center items-center">
                            <spinner-component></spinner-component>
                        </div>`
                    }
                },
                pending: () => html`
                    <div class="absolute inset-0 flex justify-center items-center">
                        <spinner-component></spinner-component>
                    </div>
                `,
            })}
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'post-page': PostPage
    }
}
