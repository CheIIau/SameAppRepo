import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('todos-page')
export class Todos extends LitElement {
    render() {
        return html`
            todos
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'todos-page': Todos
    }
}