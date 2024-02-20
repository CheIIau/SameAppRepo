import { Todo } from "@/types/todos";
import { revalidateTag } from 'next/cache'

export const baseUrl = "http://localhost:8000";

export async function getTodos(): Promise<Todo[]> {
    const response = await fetch(`${baseUrl}/todos`, {
        next: { tags: ["todos"] },
    });
    revalidateTag('todos')
    return await response.json();
}

const headers = {
    "Content-Type": "application/json;charset=utf-8",
};

export async function addTodo(formData: FormData): Promise<Todo[]> {
    'use server';
    const text = formData.get("text");
    const timestamp = formData.get("timestamp");

    const response = await fetch(`${baseUrl}/todos`, {
        method: "POST",
        headers,
        body: JSON.stringify({ text, timestamp }),
        next: { tags: ["todos"] },
    });
    revalidateTag('todos')
    return await response.json();
}

export async function editTodo(formData: FormData): Promise<Todo[]> {
    'use server';
    const text = formData.get("text");
    const id = formData.get("id");

    const response = await fetch(`${baseUrl}/todos/${id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ text, id }),
        next: { tags: ["todos"] },
    });
    revalidateTag('todos')
    return await response.json();
}

export async function deleteTodo(formData: FormData): Promise<Todo[]> {
    'use server';
    const id = formData.get("id");

    const response = await fetch(`${baseUrl}/todos/${id}`, {
        method: "DELETE",
        headers,
        next: { tags: ["todos"] },
    });
    revalidateTag('todos')
    return await response.json();
}
