<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '@/components/UI/Button.svelte';
	import Input from '@/components/UI/Input.svelte';

	$: value = '';
</script>

<form method="POST" action="?/add-todo" use:enhance class="flex justify-between gap-3 w-full">
	<Input bind:value name="text" autocomplete="off" />
	<Button
		disabled={!value.length}
		type="submit"
		className={!value.length
			? 'bg-green-300 hover:bg-green-500 focus:ring-green-100 dark:bg-green-300 dark:hover:bg-green-400 dark:focus:ring-green-500'
			: 'bg-green-500 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'}
		>Add</Button
	>
</form>
