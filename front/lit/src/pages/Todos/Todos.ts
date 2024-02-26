import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '../../components/UI/Input/Input'
import { Task } from '@lit/task'
import { TailwindElement } from '../../utils/tailwindMixin'
import styles from './Todos.css?inline'
import { addTodo, deleteTodo, editTodo, getTodos } from '../../api/todos'
import { Todo } from '../../types/todos'
import './components/TodoList'
import '../../components/UI/Spinner/Spinner'

@customElement('todos-page')
export class Todos extends TailwindElement(styles) {
    @property()
    todoText = ''

    @property({ type: Array })
    todos: Todo[] = []

    private _setTodoText(event: CustomEvent<{ text: string }>) {
        this.todoText = event.detail.text
    }

    private async _onAddTodo() {
        await addTodo({ text: this.todoText, timestamp: Date.now() })
        this.todoText = ''
        this._todosTask.run()
    }

    private async _onDeleteTodo(id: string) {
        await deleteTodo(id)
        this._todosTask.run()
    }

    private async _editTodo(payload: { id: string; text: string }) {
        await editTodo(payload)
        this._todosTask.run()
    }

    private _todosTask = new Task(this, {
        task: async ([currentPage]) => {
            const response = await getTodos()
            if (response.errors) {
                throw new Error(response.errors[0])
            }
            this.todos = response
            return this.todos
        },
        args: () => [],
    })

    connectedCallback() {
        super.connectedCallback()
        this._todosTask.run()
    }

    render() {
        return html`
            <div class="w-1/2 mt-3 mx-auto">
                <form
                    class="flex justify-between gap-3 w-full"
                    method="post"
                    @submit=${(event: SubmitEvent) => {
                        event.preventDefault()
                        this._onAddTodo()
                    }}
                >
                    <input-component
                        .value="${this.todoText}"
                        @changeValue="${this._setTodoText}"
                    ></input-component>
                    <button
                        ?disabled="${!this.todoText}"
                        type="submit"
                        class=${`inline-flex justify-center items-center p-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none ${
                            !this.todoText
                                ? 'bg-green-300 hover:bg-green-500 focus:ring-green-100 dark:bg-green-300 dark:hover:bg-green-400 dark:focus:ring-green-500'
                                : 'bg-green-500 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
                        }`}
                    >
                        Add
                    </button>
                </form>

                ${this._todosTask.render({
                    complete: (value) =>
                        html`<todo-list
                            .todos="${this.todos}"
                            @onDeleteTodo="${(event: CustomEvent<{ id: string }>) => {
                                this._onDeleteTodo(event.detail.id)
                            }}"
                            @onSaveTodo="${(event: CustomEvent<{ id: string; text: string }>) => {
                                this._editTodo(event.detail)
                            }}"
                        ></todo-list>`,
                    pending: () => html`
                        <div class="absolute inset-0 flex justify-center items-center">
                            <spinner-component></spinner-component>
                        </div>
                    `,
                })}
            </div>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'todos-page': Todos
    }
}

// <todo-list
// todos="{this.todos}"
// onDeleteTodo="{event"
// =""
// >
// { this._onDeleteTodo(event.detail); }} onSaveTodo={event => { this._editTodo(event.detail); }}
// ></todo-list
// >
