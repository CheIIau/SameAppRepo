import { defineConfig } from 'astro/config'
import alpine from '@astrojs/alpinejs'
import tailwind from '@astrojs/tailwind'
import node from '@astrojs/node'

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind(), alpine()],
    prefetch: {
        prefetchAll: true,
    },
    output: 'hybrid',
    adapter: node({
        mode: 'standalone',
    }),
})
