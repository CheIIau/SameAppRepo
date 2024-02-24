import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { TailwindElement } from '../utils/tailwindMixin'
import '../components/UI/Header/Header'
import '../components/UI/Cart/Cart'

@customElement('lit-app')
export class App extends TailwindElement() {
    render() {
        return html`
            <div class="flex flex-col min-h-screen">
                <header-component></header-component>
                <cart-component></cart-component>
                <main class="flex flex-col flex-1 p-4 w-full max-w-5xl mx-auto box-border">
                    <slot></slot>
                </main>
            </div>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'lit-app': App
    }
}