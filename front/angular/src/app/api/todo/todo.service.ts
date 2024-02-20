import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../../types/todos';

const baseUrl = 'http://localhost:8000'

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    constructor(private http: HttpClient) { }

    getTodos() {
        return this.http.get<Todo[]>(`${baseUrl}/todos`)
    }

    addTodo(todo: Omit<Todo, 'id'>) {
        return this.http.post<Todo>(`${baseUrl}/todos`, todo)
    }

    deleteTodo(id: string) {
        return this.http.delete<Todo>(`${baseUrl}/todos/${id}`)
    }

    editTodo(todo: Omit<Todo, 'timestamp'>) {
        console.log(todo)
        return this.http.patch<Todo[]>(`${baseUrl}/todos/${todo.id}`, todo)
    }
}
