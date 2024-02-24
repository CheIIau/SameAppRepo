import { Route, Router } from '@vaadin/router'

const routes: Route[] = [
    {
        path: '/',
        component: 'lit-app',
        action: async () => {
            await import('./pages/app')
        },
        children: [
            {
                path: '/',
                component: 'home-page',
                action: async () => {
                    await import('./pages/Home/Home')
                },
            },
            {
                path: 'about',
                component: 'about-page',
                action: async () => {
                    await import('./pages/About/About')
                },
            },
            {
                path: 'posts/:id',
                component: 'posts-page',
                action: async () => {
                    await import('./pages/Posts/Posts')
                },
            },
            {
                path: 'post/:id',
                component: 'post-page',
                action: async () => {
                    await import('./pages/Post/Post')
                },
            },
            {
                path: 'todos',
                component: 'todos-page',
                action: async () => {
                    await import('./pages/Todos/Todos')
                },
            },
        ],
    },
]

const outlet = document.getElementById('outlet')
export const router = new Router(outlet)
router.setRoutes(routes)
