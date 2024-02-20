<script lang="ts">
	import type { Todo } from '$lib/api/types';
	import TodoItem from './TodoItem.svelte';

	export let className: string = '';
	export let todos: Todo[];
</script>

<ul class="flex flex-col flex-grow gap-2 {className}">
	{#each todos as todo}
		{#key todo.id}
			<TodoItem {todo} />
		{/key}
	{/each}
</ul>
