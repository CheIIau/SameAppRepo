import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { Todo } from '../../../../types/todos';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
    selector: 'app-todo-list',
    standalone: true,
    imports: [TodoItemComponent],
    templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
    @Input({ required: true }) todos: Todo[] = []
    @Input('class') className: string = ''

    @Output() deleteTodo = new EventEmitter<string>()
    @Output() saveTodo = new EventEmitter<Omit<Todo, 'timestamp'>>()

    onDeleteTodo(id: string) {
        this.deleteTodo.emit(id)
    }
    onSaveTodo(todo: Omit<Todo, 'timestamp'>) {
        this.saveTodo.emit(todo)
    }
}
