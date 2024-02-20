<script lang="ts">
	import { page } from '$app/stores';
	$: currentPage = $page.params.id || 1;
	$: prevPage = currentPage ? +currentPage - 1 : 0;
	$: nextPage = currentPage ? +currentPage + 1 : 0;
</script>

<footer
	class="fixed bottom-0 flex gap-3 items-center p-2 bg-indigo-800 text-indigo-200 rounded-t-lg left-1/2 -translate-x-1/2"
>
	{#if +currentPage > 1}
		<a class="p-2" href="/posts/{prevPage}">{prevPage}</a>
	{/if}
	<a class="p-2 text-amber-600" href="/posts/{currentPage}">{currentPage}</a>
	<a class="p-2" href="/posts/{nextPage}">{nextPage}</a>
</footer>
