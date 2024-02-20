import { Component, OnInit } from '@angular/core';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoService } from '../../api/todo/todo.service';
import { Todo } from '../../types/todos';

@Component({
    selector: 'app-todos',
    standalone: true,
    imports: [TodoFormComponent, TodoListComponent],
    templateUrl: './todos.component.html',
})
export class TodosComponent implements OnInit {
    constructor(private todoService: TodoService) { }

    todos: Todo[] = []

    ngOnInit() {
        this.getTodos()
    }

    getTodos() {
        this.todoService.getTodos().subscribe((response) => {
            this.todos = response
        })
    }

    addTodo(todo: { text: string }) {
        const timestamp = Date.now()
        this.todoService.addTodo({ ...todo, timestamp }).subscribe((response) => {
            this.todos = [...this.todos, response]
        })
    }

    deleteTodo(id: string) {
        this.todoService.deleteTodo(id).subscribe(() => {
            this.todos = this.todos.filter((todo) => todo.id !== id)
        })
    }

    saveTodo(todo: Omit<Todo, 'timestamp'>) {
        this.todoService.editTodo(todo).subscribe(() => {
            const currentTodo = this.todos.find((item) => item.id === todo.id)
            if (currentTodo) {
                currentTodo.text = todo.text
            }
        })
    }
}
