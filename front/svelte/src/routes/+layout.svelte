<script lang="ts">
	import Header from '../components/UI/Header.svelte';
	import './styles.css';
	import '../app.css';
	import Cart from '@/components/UI/Cart.svelte';
</script>

<div class="flex flex-col min-h-screen">
	<Header />
	<Cart />
	<main class="flex flex-col flex-1 p-4 w-full max-w-5xl mx-auto box-border">
		<slot />
	</main>
</div>
