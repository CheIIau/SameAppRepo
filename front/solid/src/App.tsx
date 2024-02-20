import { ErrorBoundary, type Component, type ParentProps } from 'solid-js'
import { Header } from './components/Header/Header'
import { Cart } from './components/Cart/Cart'

const App: Component<ParentProps> = (props) => {
    return (
        <>
            <Header />
            <Cart />
            <ErrorBoundary
                fallback={(err) => (
                    <p class="mt-4 text-center text-lg font-bold w-full">Whoopsie. Something went wrong</p>
                )}
            >
                <main class="flex flex-col flex-1 p-4 w-full max-w-5xl mx-auto box-border">{props.children}</main>
            </ErrorBoundary>
        </>
    )
}

export default App
