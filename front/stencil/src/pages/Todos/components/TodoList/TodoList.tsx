import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';
import { Todo } from '../../../../types/todos';
import '../TodoItem/TodoItem';

@Component({
  tag: 'todo-list',
  styleUrls: ['../../../../index.css'],
  shadow: true,
})
export class TodoList {
  @Prop()
  todos: Todo[] = [];

  @Event()
  deleteTodo: EventEmitter<string>;

  @Event()
  saveTodo: EventEmitter<{ id: string; text: string }>;

  private onDeleteTodoHandler(id: string) {
    this.deleteTodo.emit(id);
  }

  private onSaveHandler(payload: { id: string; text: string }) {
    this.saveTodo.emit(payload);
  }

  render() {
    return (
      <ul class="flex flex-col flex-grow gap-2">
        {this.todos.map(todo => (
          <todo-item
            todo={todo}
            key={todo.id}
            onDeleteTodo={event => {
              event.stopPropagation()
              this.onDeleteTodoHandler(event.detail);
            }}
            onSaveTodo={event => {
              event.stopPropagation()
              this.onSaveHandler(event.detail);
            }}
          ></todo-item>
        ))}
      </ul>
    );
  }
}
