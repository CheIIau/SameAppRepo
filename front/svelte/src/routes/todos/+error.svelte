<script lang="ts">
	import { page } from '$app/stores';
</script>

<div>
	<h1>Whoopsie</h1>
	<h1>{$page.status}: {$page.error?.message}</h1>
</div>
