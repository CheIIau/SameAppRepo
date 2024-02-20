<script lang="ts">
	import type { Errors, Post } from '$lib/api/types.js';
	import ItemCard from '@/components/ItemCard.svelte';
	import Spinner from '@/components/UI/Spinner.svelte';
	import { increase, decrease } from '@/store/store';
	export let data;
	$: posts = data.posts;

	function removeItem(event: CustomEvent<{ id: string }>) {
		const id = event.detail.id;
		if (posts && !(posts as Errors).errors) {
			posts = (posts as Post[]).filter((post) => post.id !== id);
		}
	}
	function increaseHandler(event: CustomEvent<{ id: string; by: number; price: number }>) {
		const detail = event.detail;
		increase({ id: detail.id, by: detail.by, price: detail.price });
	}
	function decreaseHandler(event: CustomEvent<{ id: string; by: number; price: number }>) {
		const detail = event.detail;
		decrease({ id: detail.id, by: detail.by, price: detail.price });
	}
</script>

<svelte:head>
	<title>Posts</title>
	<meta name="description" content="Demo posts" />
</svelte:head>

<section class="flex-grow">
	{#if (posts as Errors)?.errors}
		<div>Error</div>
	{:else if (posts as Post[])?.length}
		<div class="grid gap-4 grid-cols-1 sm:grid-cols-2">
			{#each posts as Post[] as post}
				<div class="flex justify-center item h-full">
					<ItemCard
						{post}
						on:removeItem={removeItem}
						on:increase={increaseHandler}
						on:decrease={decreaseHandler}
					/>
				</div>
			{/each}
		</div>
	{:else}
		<div class="flex row justify-center items-center h-full mt-6">
			<Spinner size="130px" color="#F87171" width="7px" />
		</div>
	{/if}
</section>

<style>
</style>
