<script lang="ts">
	export let size = '10px'
	export let color = '#fff'
	export let width = '6px'
	$: containerSize = parseInt(size, 10) + 16 + 'px'
</script>

<div
	class="lds-dual-ring"
	style="--size: {size}; --color: {color}; --containerSize: {containerSize}; --width: {width}"
/>

<style>
	.lds-dual-ring {
		display: inline-block;
		width: var(--containerSize);
		height: var(--containerSize);
	}
	.lds-dual-ring:after {
		content: ' ';
		display: block;
		width: var(--size);
		height: var(--size);
		margin: 8px;
		border-radius: 50%;
		border: var(--width) solid #fff;
		border-color: var(--color) transparent var(--color) transparent;
		animation: lds-dual-ring 1.2s linear infinite;
	}
	@keyframes lds-dual-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
