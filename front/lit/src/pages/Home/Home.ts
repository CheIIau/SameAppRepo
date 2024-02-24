import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('home-page')
export class Home extends LitElement {
    render() {
        return html`
            <h2>Home</h2>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'home-page': Home
    }
}