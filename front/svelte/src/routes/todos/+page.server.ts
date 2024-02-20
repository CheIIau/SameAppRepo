import { todoApiActions } from '$lib/api/todos.js';

export const actions = {
	'add-todo': todoApiActions['add-todo'],
	'delete-todo': todoApiActions['delete-todo'],
	'edit-todo': todoApiActions['edit-todo']
};
