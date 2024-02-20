import type { Actions } from '@sveltejs/kit';
import type { Todo } from './types';
import type { PageLoad } from '../../routes/todos/$types';

const baseUrl = 'http://localhost:8000';

export const todoUrl = `${baseUrl}/todos`;

const headers = {
	'Content-Type': 'application/json;charset=UTF-8'
};

export const todoApiActions = {
	'add-todo': async ({ request, fetch }) => {
		const data = await request.formData();
		const timestamp = Date.now();
		data.set('timestamp', `${timestamp}`);
		const formData = Object.fromEntries(data);
		await fetch(todoUrl, { method: 'POST', body: JSON.stringify(formData), headers });
	},
	'delete-todo': async ({ request, fetch }) => {
		const data = await request.formData();
		const formData = Object.fromEntries(data);
		const id = formData.id;
		await fetch(`${todoUrl}/${id}`, { method: 'DELETE' });
	},
	'edit-todo': async ({ request, fetch }) => {
		const data = await request.formData();
		const formData = Object.fromEntries(data);
		await fetch(`${todoUrl}/${formData.id}`, { method: 'PATCH', body: JSON.stringify(formData), headers });
	}
} satisfies Actions;

export const todoApiLoads = {
	'get-todos': async ({ fetch }) => {
		const response = await fetch(todoUrl);
		const todos: Todo[] = await response.json();
		return todos;
	}
} satisfies Record<string, PageLoad>;
