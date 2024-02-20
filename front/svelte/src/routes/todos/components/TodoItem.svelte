<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Todo } from '$lib/api/types';
	import Button from '@/components/UI/Button.svelte';
	import Input from '@/components/UI/Input.svelte';

	export let todo: Todo;
	let disabled = true;
	let value = todo.text;

	function onEditHandler() {
		disabled = false;
	}
	function onStashHandler() {
		disabled = true;
		value = todo.text;
	}
	let formLoading = false;
</script>

<li class="flex items-center justify-between py-2 rounded-lg border-2 gap-2">
	{#if !formLoading}
		<Input bind:value {disabled} name="todo" />
	{:else}
		<div class="animate-pulse h-[41.5px] bg-gray-200 rounded-lg dark:bg-gray-700 w-full"></div>
	{/if}
	<div class="flex gap-2">
		{#if disabled}
			<Button
				on:click={onEditHandler}
				className="bg-emerald-500 hover:bg-emerald-800 focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
				>Edit</Button
			>
		{:else}
			<form
				method="POST"
				action="?/edit-todo"
				use:enhance={({ formData }) => {
					formLoading = true;
					formData.set('id', todo.id);
					formData.set('text', value);
					return async ({ update }) => {
						formLoading = false;
						disabled = true;
						update();
					};
				}}
			>
				<Button
					type="submit"
					className="bg-emerald-500 hover:bg-emerald-800 focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
					>Save</Button
				>
			</form>

			<Button
				on:click={onStashHandler}
				className="bg-amber-500 hover:bg-amber-800 focus:ring-amber-300 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
				>Stash</Button
			>
		{/if}
		<form
			method="POST"
			action="?/delete-todo"
			use:enhance={({ formData }) => {
				formLoading = true;
				formData.set('id', todo.id);
				return async ({ update }) => {
					formLoading = false;
					update();
				};
			}}
		>
			<Button
				type="submit"
				className="bg-red-500 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
				>Delete</Button
			>
		</form>
	</div>
</li>
