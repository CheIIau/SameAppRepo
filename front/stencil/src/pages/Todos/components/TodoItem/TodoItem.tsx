import { Component, EventEmitter, Prop, State, h, Event } from '@stencil/core';
import { Todo } from '../../../../types/todos';

@Component({
  tag: 'todo-item',
  styleUrl: '../../../../index.css',
  shadow: true,
})
export class TodoItem {
  @Prop()
  todo: Todo = undefined;
  @State()
  disabled = true;
  @State()
  newText = this.todo?.text;

  @Event()
  deleteTodo: EventEmitter<string>;

  @Event()
  saveTodo: EventEmitter<{ id: string; text: string }>;

  private onDeleteTodoHandler() {
    this.deleteTodo.emit(this.todo.id);
  }

  private onEditHandler() {
    this.disabled = false;
  }

  private onSaveHandler() {
    this.disabled = true;
    this.saveTodo.emit({ id: this.todo.id, text: this.newText });
  }

  private onStashHandler() {
    this.disabled = true;
    this.newText = this.todo?.text;
  }

  private onChangeHandler(event: Event) {
    this.newText = (event.target as HTMLInputElement).value;
  }

  render() {
    return (
      <li class="flex items-center justify-between px-3 py-2 rounded-lg border-2">
        <input value={this.newText} disabled={this.disabled} onChange={event => this.onChangeHandler(event)} class="text-sm font-medium"></input>
        <div class="flex gap-2">
          {this.disabled && (
            <button
              onClick={() => this.onEditHandler()}
              class="inline-flex justify-center items-center p-2 text-sm font-medium text-center text-white bg-emerald-500 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
            >
              Edit
            </button>
          )}
          {!this.disabled && (
            <button
              onClick={() => this.onSaveHandler()}
              class="inline-flex justify-center items-center p-2 text-sm font-medium text-center text-white bg-emerald-500 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
            >
              Save
            </button>
          )}
          {!this.disabled && (
            <button
              onClick={() => this.onStashHandler()}
              class="inline-flex justify-center items-center p-2 text-sm font-medium text-center text-white bg-amber-500 rounded-lg hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
            >
              Stash
            </button>
          )}
          <button
            onClick={() => this.onDeleteTodoHandler()}
            class="inline-flex justify-center items-center p-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Delete
          </button>
        </div>
      </li>
    );
  }
}
