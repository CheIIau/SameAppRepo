import { todoApiLoads } from '$lib/api/todos.js';

export const load = async (loadEvent) => {
	const todos = await todoApiLoads['get-todos'](loadEvent);
	return { todos };
};
