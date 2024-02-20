import type { Todo } from '~/types/todos'
import { $ } from '@builder.io/qwik'

const baseUrl = 'http://localhost:8000'

export async function getTodos(): Promise<Todo[]> {
    const response = await fetch(`${baseUrl}/todos`)
    return await response.json()
}

const headers = {
    'Content-Type': 'application/json;charset=utf-8',
}

export async function addTodo(text: string): Promise<Todo> {
    const timestamp = Date.now()
    const response = await fetch(`${baseUrl}/todos`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ timestamp, text }),
    })
    return await response.json()
}

export async function editTodo(todo: Omit<Todo, 'timestamp'>): Promise<Todo> {
    const response = await fetch(`${baseUrl}/todos/${todo.id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(todo),
    })
    return await response.json()
}

export async function deleteTodo(id: string): Promise<Todo> {
    const response = await fetch(`${baseUrl}/todos/${id}`, {
        method: 'DELETE',
        headers
    });
    return await response.json();
}

// можно объявить функцию через доллар и прокидывать как колбэк в компоненты, но сделаю через form action
// export const addTodo = $(async function addTodo(todo: Omit<Todo, 'id'>): Promise<Todo> {
//     const response = await fetch(`${baseUrl}/todos`, {
//         method: 'POST',
//         headers,
//         body: JSON.stringify(todo),
//     })
//     return await response.json()
// });