import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('spinner-component')
export class Spinner extends LitElement {
    render() {
        return html`<div class="lds-dual-ring"></div>`
    }
    static styles = css`
        .lds-dual-ring {
            display: inline-block;
            width: var(--containerSize);
            height: var(--containerSize);
        }
        .lds-dual-ring:after {
            content: ' ';
            display: block;
            width: var(--size);
            height: var(--size);
            margin: 8px;
            border-radius: 50%;
            border: var(--width) solid #fff;
            border-color: var(--color) transparent var(--color) transparent;
            animation: lds-dual-ring 1.2s linear infinite;
        }
        @keyframes lds-dual-ring {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    `
}

declare global {
    interface HTMLElementTagNameMap {
        'spinner-component': Spinner
    }
}
