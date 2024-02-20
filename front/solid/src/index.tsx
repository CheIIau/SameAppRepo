/* @refresh reload */
import { ErrorBoundary, Suspense, render } from 'solid-js/web'

import './index.css'
import App from './App'
import { Router } from '@solidjs/router'
import { routes } from './router/router'
import FullScreenSpinner from './components/Spinner/FullScreenSpinner'

const root = document.getElementById('root')

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error(
        'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
    )
}

render(
    () => (
        <Suspense fallback={<FullScreenSpinner />}>
            <Router root={App}>{routes}</Router>
        </Suspense>
    ),
    root!,
)
