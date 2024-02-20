import { getPostsByPage, init } from '$lib/api/posts';
import type { Errors, Post } from '$lib/api/types';

export const load = (async ({ params, fetch }) => {
	try {
		const url = getPostsByPage(params.id);
		const response = await fetch(url, init);
		const posts: Post[] | Errors = await response.json();
		return {
			posts
		};
	} catch (error) {
		console.error(error);
	}
});
