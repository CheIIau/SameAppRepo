import { Component, State, Watch, h } from '@stencil/core';
import '../../components/UI/Input/Input';
import './components/TodoList/TodoList';
import { addTodo, deleteTodo, editTodo, getTodos } from '../../api/todos';
import { Todo } from '../../types/todos';

@Component({
  tag: 'todos-page',
  styleUrls: ['../../index.css', './Todos.css'],
  shadow: true,
})
export class Todos {
  @State()
  todoText = '';

  @State()
  todos: Todo[] = [];

  private async _onAddTodo() {
    await addTodo({ text: this.todoText, timestamp: Date.now() });
    this._getTodos();
  }

  private async _onDeleteTodo(id: string) {
    await deleteTodo(id);
    this._getTodos();
  }

  private async _editTodo(payload: { id: string; text: string }) {
    await editTodo(payload);
    this._getTodos();
  }

  private _getTodos = async () => {
    const response = await getTodos();
    //@ts-expect-error
    if (response.errors) {
      //@ts-expect-error
      throw new Error(response.errors[0]);
    }
    this.todos = response;
    return this.todos;
  };

  connectedCallback() {
    this._getTodos();
  }

  render() {
    return (
      <div class="w-1/2 mt-3 mx-auto">
        <form
          class=" asd flex justify-between gap-3 w-full"
          method="post"
          onSubmit={event => {
            event.preventDefault();
            this._onAddTodo();
          }}
        >
          <input-component
            value={this.todoText}
            onChangeValue={event => {
              this.todoText = event.detail;
            }}
            name="todoText"
          ></input-component>
          <button
            disabled={!this.todoText}
            type="submit"
            class={`inline-flex justify-center items-center p-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none ${
              !this.todoText
                ? 'bg-green-300 hover:bg-green-500 focus:ring-green-100 dark:bg-green-300 dark:hover:bg-green-400 dark:focus:ring-green-500'
                : 'bg-green-500 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
            }`}
          >
            Add
          </button>
        </form>

        <todo-list
          todos={this.todos}
          onDeleteTodo={event => {
            this._onDeleteTodo(event.detail);
          }}
          onSaveTodo={event => {
            this._editTodo(event.detail);
          }}
        ></todo-list>
      </div>
    );
  }
}
