import { customElement, property } from 'lit/decorators.js'
import { TailwindElement } from '../../../utils/tailwindMixin'
import style from './Header.css?inline'
import { html } from 'lit'

@customElement('header-component')
export class Header extends TailwindElement(style) {
    private links = [
        { name: 'Home', link: '/' },
        { name: 'Posts', link: '/posts/1' },
        { name: 'About', link: '/about' },
        { name: 'Todos', link: '/todos' },
    ] as const

    @property()
    currentUrl = window.location.pathname

    private _setCurrentLocation = () => {
        this.currentUrl = window.location.pathname
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
            <header class="header">
                <nav class="w-full flex justify-center">
                    <svg
                        viewBox="0 0 2 3"
                        class="svg text-indigo-800"
                        aria-hidden="true"
                    >
                        <path
                            class="fill-current"
                            d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z"
                        />
                    </svg>
                    <ul class="bg-indigo-800 flex justify-center items-center [&>li]:relative [&>li]:h-full">
                        ${this.links.map(
                            (link) => html`
                                <li>
                                    <a
                                        href="${link.link}"
                                        class="link ${this.currentUrl === link.link ? '!text-amber-600' : ''}"
                                    >
                                        ${link.name}
                                    </a>
                                </li>
                            `,
                        )}
                    </ul>
                    <svg
                        viewBox="0 0 2 3"
                        class="svg text-indigo-800"
                        aria-hidden="true"
                    >
                        <path
                            class="fill-current"
                            d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z"
                        />
                    </svg>
                </nav>
            </header>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'header-component': Header
    }
}
