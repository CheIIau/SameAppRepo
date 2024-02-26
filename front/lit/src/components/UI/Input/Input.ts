import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { TailwindElement } from '../../../utils/tailwindMixin'
import { ifDefined } from 'lit/directives/if-defined.js'

@customElement('input-component')
export class Input extends TailwindElement() {
    @property()
    declare name?: string

    @property()
    value: string = ''

    private _changeValue(event: InputEvent) {
        const value = (event.target as HTMLInputElement).value
        const customEvent = new CustomEvent('changeValue', {
            detail: { text: value },
            bubbles: false,
        })
        this.dispatchEvent(customEvent)
    }

    render() {
        return html`
            <input
                name="${ifDefined(this.name)}"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-indigo-700 dark:border-indigo-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                .value=${this.value}
                @input=${this._changeValue}
            />
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'input-component': Input
    }
}
