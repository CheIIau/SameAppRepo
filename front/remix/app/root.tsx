import { cssBundleHref } from '@remix-run/css-bundle'
import type { LinksFunction } from '@remix-run/node'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import stylesheet from '~/tailwind.css'
import { Header } from './components/UI/Header/Header'
import { Cart } from './components/UI/Cart/Cart'

export const links: LinksFunction = () => [
    ...(cssBundleHref
        ? [
              { rel: 'stylesheet', href: cssBundleHref },
              { rel: 'stylesheet', href: stylesheet },
          ]
        : []),
]

export default function App() {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body>
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <Cart />
                    <main className="flex flex-col flex-1 p-4 w-full max-w-5xl mx-auto box-border">
                        <Outlet />
                    </main>
                </div>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}
