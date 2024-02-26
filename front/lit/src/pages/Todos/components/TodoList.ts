import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { TailwindElement } from '../../../utils/tailwindMixin'
import { Todo } from '../../../types/todos'
import '../components/TodoItem'

@customElement('todo-list')
export class TodoList extends TailwindElement() {
    declare todos: Todo[]

    private onDeleteTodoHandler(id: string) {
        const customEvent = new CustomEvent('onDeleteTodo', {
            detail: { id },
            bubbles: false,
        })
        this.dispatchEvent(customEvent)
    }

    private onSaveHandler(payload: { id: string; text: string }) {
        const customEvent = new CustomEvent('onSaveTodo', {
            detail: { id: payload.id, text: payload.text },
            bubbles: false,
        })
        this.dispatchEvent(customEvent)
    }

    render() {
        return html`
            <ul class="flex flex-col flex-grow gap-2">
                ${this.todos.map(
                    (todo) => html`
                        <todo-item
                            .todo=${todo}
                            key="${todo.id}"
                            @onDeleteTodo="${(event: CustomEvent<{ id: string }>) => {
                                event.stopPropagation()
                                this.onDeleteTodoHandler(event.detail.id)
                            }}"
                            @onSaveTodo="${(event: CustomEvent<{ id: string; text: string }>) => {
                                event.stopPropagation()
                                this.onSaveHandler(event.detail)
                            }}"
                        ></todo-item>
                    `,
                )}
            </ul>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'todo-list': TodoList
    }
}
