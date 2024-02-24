import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { TailwindElement } from '../../../utils/tailwindMixin'

@customElement('posts-footer')
export class PostsFooter extends TailwindElement() {
    @property()
    currentPage = ''

    private _setCurrentLocation = () => {
        this.currentPage = window.location.pathname.replace(/\D/g, '')
    }

    constructor() {
        super()
        this._setCurrentLocation()
    }

    connectedCallback() {
        super.connectedCallback()
        window.addEventListener('popstate', this._setCurrentLocation)
    }

    disconnectedCallback() {
        super.disconnectedCallback()
        window.removeEventListener('popstate', this._setCurrentLocation)
    }

    render() {
        return html`
            <footer
                class="fixed bottom-0 flex gap-3 items-center p-2 bg-indigo-800 text-indigo-200 rounded-t-lg left-1/2 -translate-x-1/2 "
            >
                ${+this.currentPage! > 1
                    ? html`<a
                          class="p-2"
                          href=${`/posts/${+this.currentPage - 1}`}
                          >${+this.currentPage - 1}</a
                      >`
                    : html``}
                <a
                    class="p-2 text-amber-600"
                    href=${`/posts/${+this.currentPage}`}
                    >${+this.currentPage}</a
                >
                <a
                    class="p-2"
                    href=${`/posts/${+this.currentPage + 1}`}
                    >${+this.currentPage + 1}</a
                >
            </footer>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'posts-footer': PostsFooter
    }
}
