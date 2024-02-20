<script lang="ts">
	import type { Errors, Post } from '$lib/api/types.js';
	import InnerComponent from '@/components/InnerComponent.svelte';
	import Spinner from '@/components/UI/Spinner.svelte';
	import { decrease, increase } from '@/store/store';
	export let data;
	$: post = data.post;

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
	<title>Item {data.post?.id || ''}</title>
	<meta name="description" content="Demo post" />
</svelte:head>

<div class="flex items-center justify-center flex-grow">
	{#if (post as Errors).errors}
		<div>Error</div>
	{:else if post}
		<div class="flex justify-center items-center w-full">
			<InnerComponent post={post as Post} on:decrease={decreaseHandler} on:increase={increaseHandler} />
		</div>
	{:else}
		<Spinner size="130px" color="#F87171" width="7px" />
	{/if}
</div>

<style>
</style>
