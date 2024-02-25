import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node'
import { Form, useLoaderData, useNavigation, useSubmit , isRouteErrorResponse, useRouteError } from '@remix-run/react'
import { getTodos, addTodo, deleteTodo, editTodo } from '~/api/todos'
import { TodoList } from './components/TodoList'
import { Input } from '~/components/UI/Input/Input'
import { useState } from 'react'
import { Spinner } from '~/components/UI/Spinner/Spinner'

export const loader = async (_args: LoaderFunctionArgs) => {
    const todos = await getTodos()
    // Return the data as JSON
    return json({ todos })
}

export const action = async ({ request }: ActionFunctionArgs) => {
    if (request.method === 'POST') {
        const formData = await request.formData()
        const todoText = formData.get('text') as string
        const timestamp = formData.get('timestamp') as string
        const todos = await addTodo({ text: todoText, timestamp: +timestamp })
        return json({ todos })
    }

    if (request.method === 'DELETE') {
        const formData = await request.formData()
        const id = formData.get('id') as string
        const todos = await deleteTodo(id)
        return json({ todos })
    }

    if (request.method === 'PATCH') {
        const formData = await request.formData()
        const id = formData.get('id') as string
        const text = formData.get('text') as string
        const todos = await editTodo({ id, text })
        return json({ todos })
    }
    return {}
}

export default function Todos() {
    const { todos } = useLoaderData<typeof loader>()
    const navigation = useNavigation()

    const submit = useSubmit()

    const [todoText, setTodoText] = useState('')

    const onDeleteTodo = (id: string) => {
        submit({ id }, { method: 'delete' })
    }

    const onAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
        //можно и без Form как сверху в делит,т.к все равно дергаем submit вручную
        event.preventDefault()

        if (!todoText) {
            return
        }

        submit({ text: todoText, timestamp: Date.now() }, { method: 'post' })
        setTodoText('')
    }

    const editTodo = (id: string, text: string) => {
        submit({ id, text }, { method: 'patch' })
    }

    return (
        <div className="w-1/2 mt-3 mx-auto">
            <Form
                className="flex justify-between gap-3"
                method="post"
                onSubmit={onAddTodo}
            >
                <Input
                    value={todoText}
                    onChange={setTodoText}
                    name="todoText"
                />
                <button
                    type="submit"
                    className="inline-flex justify-center items-center p-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                    Add
                </button>
            </Form>
            <TodoList
                className="mt-3"
                todos={todos}
                deleteTodo={onDeleteTodo}
                saveTodo={editTodo}
            />
            {(navigation.state === 'submitting' || navigation.state === 'loading') && (
                <div className="absolute inset-0 flex flex-grow justify-center items-center bg-slate-600 bg-opacity-40">
                    <Spinner
                        size="130px"
                        color="#F87171"
                        width="7px"
                    />
                </div>
            )}
        </div>
    )
}

export function ErrorBoundary() {
    const error = useRouteError()
    if (isRouteErrorResponse(error)) {
        return (
            <div>
                <h1>Whoopsie.</h1>
                <br />
                <h2>
                    {error.status} {error.statusText}
                </h2>
                <p>{error.data}</p>
            </div>
        )
    } else if (error instanceof Error) {
        return (
            <div>
                <h1>Error</h1>
                <p>{error.message}</p>
                <p>The stack trace is:</p>
                <pre>{error.stack}</pre>
            </div>
        )
    } else {
        return <h1>Unknown Error</h1>
    }
}
