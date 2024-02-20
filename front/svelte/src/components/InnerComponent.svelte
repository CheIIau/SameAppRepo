<script lang="ts">
	import type { Post } from '$lib/api/types';
	import ItemCard from './ItemCard.svelte';

	export let post: Post;
</script>

<ItemCard {post} on:decrease on:increase />
