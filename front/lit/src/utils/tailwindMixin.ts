import { LitElement, adoptStyles, unsafeCSS } from 'lit'

import style from '../index.css?inline'

declare global {
    export type LitMixin<T = unknown> = new (...args: any[]) => T & LitElement
}

const stylesheet = unsafeCSS(style)

export const TailwindElement = (style: string = '') =>
    class extends LitElement {
        static styles = [stylesheet, unsafeCSS(style)]
    }

// другой вариант подключения стилей, тут работает только тейлвинд, нужно допиливать, чтобы работали свои классы

// export const TW = <T extends LitMixin>(superClass: T): T =>
//     class extends superClass {
//         connectedCallback() {
//             super.connectedCallback()
//             adoptStyles(this.shadowRoot!, [stylesheet])
//         }
//     }
// export const TwLitElement = TW(LitElement)
