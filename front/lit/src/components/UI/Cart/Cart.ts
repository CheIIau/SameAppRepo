import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { TailwindElement } from '../../../utils/tailwindMixin'
import { StateController } from '@lit-app/state'
import store from '../../../store/store'

@customElement('cart-component')
export class Cart extends TailwindElement() {
    private bindState = new StateController(this, store)

    render() {
        const { totalItems, totalPrice } = store

        return html`
            <summary
                class="fixed top-0 right-0 flex gap-3 items-center p-2 bg-teal-800 text-teal-200 rounded-b-lg mr-4"
            >
                <div>items: ${totalItems}</div>
                <div>total: ${totalPrice}</div>
            </summary>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cart-component': Cart
    }
}
