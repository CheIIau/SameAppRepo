<script lang="ts">
	import Counter from '../components/UI/Counter.svelte';

	$: parentCount = 3;
	$: {
		console.log(parentCount);
	}
	function handleEvent(event: CustomEvent<{ count: number }>) {
		parentCount = event.detail.count;
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<Counter count={parentCount} on:changeCount={handleEvent} />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
