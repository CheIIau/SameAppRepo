import { lazy } from 'solid-js'

export const routes = [
    {
        path: '/',
        component: lazy(() => import('../pages/Home/Home')),
    },
    {
        path: '/about',
        component: lazy(() => import('../pages/About/About')),
    },
    {
        path: '/todos',
        component: lazy(() => import('../pages/Todos/Todos')),
    },
    {
        path: '/post/:id',
        component: lazy(() => import('../pages/Post/Post')),
    },
    {
        path: '/posts/:page',
        component: lazy(() => import('../pages/Posts/Posts')),
    },
    {
        path: '/*all',
        component: lazy(() => import('../pages/CatchAll/CatchAll')),
    },
]
