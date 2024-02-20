<script lang="ts">
	import type { Post } from '$lib/api/types';
	import { createEventDispatcher } from 'svelte';
	export let post: Post;
	import { cart } from '@/store/store';

	const dispatch = createEventDispatcher();
	function removeItem() {
		dispatch('removeItem', {
			id: post.id
		});
	}
	function increase() {
		dispatch('increase', {
			id: post.id,
			by: 1,
			price: post.width
		});
	}
	function decrease() {
		dispatch('decrease', {
			id: post.id,
			by: 1,
			price: post.width
		});
	}
</script>

<div
	class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col"
>
	<div class="max-h-96 overflow-hidden">
		<img class="rounded-t-lg object-cover object-center w-full h-full" src={post.urls.regular} alt="" />
	</div>
	<div class="flex-grow" />
	<div class="p-5">
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			{post.user.first_name + ' ' + (post.user.last_name || '')}
		</h5>
		<p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
			{post.alt_description || post.description || post.sponsorship}
		</p>
		<div class="flex flex-row justify-between">
			<a
				href="/posts/item/{post.id}"
				class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				Read more
				<svg
					class="w-3.5 h-3.5 ml-2"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 14 10"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M1 5h12m0 0L9 1m4 4L9 9"
					/>
				</svg>
			</a>
			<button
				on:click={removeItem}
				class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				Not interested</button
			>
		</div>
		<div class="flex flex-row justify-between mt-2">
			<p class="py-2 text-sm font-medium text-center text-white">Price: {post?.width}</p>
			<div class="flex items-center gap-2">
				<button
					on:click={decrease}
					class="inline-flex justify-center items-center h-8 w-8 py-2 text-sm font-medium text-center
                    text-white bg-red-500 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300
                    dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
				>
					-
				</button>
				<p class="text-sm font-medium text-center text-white">{$cart[post.id]?.number || 0}</p>
				<button
					on:click={increase}
					class="inline-flex justify-center items-center h-8 w-8 text-sm font-medium text-center
                    text-white bg-green-500 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none
                    focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
				>
					+
				</button>
			</div>
		</div>
	</div>
</div>
