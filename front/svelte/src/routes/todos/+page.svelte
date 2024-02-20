<script lang="ts">
	import TodoForm from './components/TodoForm.svelte';
	import TodoList from './components/TodoList.svelte';

	export let data;
	$: todos = data.todos;
</script>

<svelte:head>
	<title>Todos</title>
	<meta name="description" content="Todo" />
</svelte:head>

<div class="w-1/2 mt-3 mx-auto">
	<TodoForm />
	<TodoList {todos} className="w-full mt-3" />
</div>
