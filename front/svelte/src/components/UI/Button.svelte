<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	interface $$Props extends HTMLButtonAttributes {
		className?: string;
	}

	export let className: string = '';
</script>

<button
	on:click
	on:mouseover
	on:mouseenter
	on:mouseleave
	class="inline-flex justify-center items-center p-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none {className}"
	{...$$restProps}
>
	<slot />
</button>
