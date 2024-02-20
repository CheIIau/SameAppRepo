import { getPostById, init } from '$lib/api/posts';
import type { Errors, Post } from '$lib/api/types';

export const load = async ({ params }) => {
	try {
		const url = getPostById(params.post);
		const response = await fetch(url, init);
		const post: Post | Errors = await response.json();
		return {
			post
		};
	} catch (error) {
		console.error(error);
	}
};

