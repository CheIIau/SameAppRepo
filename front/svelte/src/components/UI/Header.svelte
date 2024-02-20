<script lang="ts">
	import { page } from '$app/stores'
	// const modules = import.meta.glob('./**/**.svelte')
	// const allPages = <string[]>[]
	// for (let path in modules) {
	// 	if (path.includes('+')) {
	// 		const cleanPath = path.replace('.svelte', '').replace('./', '')
	// 		allPages.push(cleanPath)
	// 	}
	// }
	// console.log(allPages)
</script>

<header>
	<nav class="w-full flex justify-center">
		<svg viewBox="0 0 2 3" class="text-red-400" aria-hidden="true">
			<path class="fill-current" d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul class="bg-red-400 flex justify-center items-center [&>li]:relative [&>li]:h-full">
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/posts') ? 'page' : undefined}>
				<a href="/posts/1">Posts</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/sverdle') ? 'page' : undefined}>
				<a href="/sverdle">Sverdle</a>
			</li>
			<li aria-current={$page.url.pathname === '/todos' ? 'page' : undefined}>
				<a href="/todos">Todos</a>
			</li>
		</ul>
		<svg viewBox="0 0 2 3" class="text-red-400" aria-hidden="true">
			<path class="fill-current" d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	nav {
		display: flex;
		justify-content: center;
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-2);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>
