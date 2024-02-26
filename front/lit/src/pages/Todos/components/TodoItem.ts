import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { TailwindElement } from '../../../utils/tailwindMixin'
import { Todo } from '../../../types/todos'

@customElement('todo-item')
export class TodoItem extends TailwindElement() {
    todo: Todo | Record<string, never> = {}

    @property({ type: Boolean })
    disabled = true

    @property({ type: Object })
    newText = ''

    private onDeleteTodoHandler() {
        const customEvent = new CustomEvent('onDeleteTodo', {
            detail: { id: this.todo.id },
            bubbles: false,
        })
        this.dispatchEvent(customEvent)
    }

    private onEditHandler() {
        this.disabled = false
    }

    private onSaveHandler() {
        this.disabled = true
        const customEvent = new CustomEvent('onSaveTodo', {
            detail: { id: this.todo.id, text: this.newText },
            bubbles: false,
        })
        this.dispatchEvent(customEvent)
    }

    private onStashHandler() {
        this.disabled = true
        this.newText = this.todo?.text
    }

    private onChangeHandler(event: Event) {
        this.newText = (event.target as HTMLInputElement).value
    }

    connectedCallback() {
        super.connectedCallback()
        this.newText = this.todo.text
    }

    render() {
        return html`
            <li class="flex items-center justify-between px-3 py-2 rounded-lg border-2">
                <input
                    .value=${this.newText}
                    ?disabled=${this.disabled}
                    @input=${(event: Event) => this.onChangeHandler(event)}
                    class="text-sm font-medium"
                />
                <div class="flex gap-2">
                    ${this.disabled
                        ? html`
                              <button
                                  @click=${() => this.onEditHandler()}
                                  class="inline-flex justify-center items-center p-2 text-sm font-medium text-center text-white bg-emerald-500 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                              >
                                  Edit
                              </button>
                          `
                        : ''}
                    ${!this.disabled
                        ? html`
                              <button
                                  @click=${() => this.onSaveHandler()}
                                  class="inline-flex justify-center items-center p-2 text-sm font-medium
                      text-center text-white bg-emerald-500 rounded-lg hover:bg-emerald-800 focus:ring-4
                      focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700
                      dark:focus:ring-emerald-800"
                              >
                                  Save
                              </button>
                          `
                        : ''}
                    ${!this.disabled
                        ? html`
                              <button
                                  @click=${() => this.onStashHandler()}
                                  class="inline-flex justify-center items-center p-2 text-sm font-medium text-center text-white bg-amber-500 rounded-lg hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
                              >
                                  Stash
                              </button>
                          `
                        : ''}
                    <button
                        @click=${() => this.onDeleteTodoHandler()}
                        class="inline-flex justify-center items-center p-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                        Delete
                    </button>
                </div>
            </li>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'todo-item': TodoItem
    }
}
