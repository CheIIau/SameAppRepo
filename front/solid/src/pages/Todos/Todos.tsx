import { type Component, createSignal, createResource, Show, createEffect, JSX } from 'solid-js'
import { Input } from '../../components/Input/Input'
import { action, useAction, useSubmission, revalidate } from '@solidjs/router'
import { addTodo, deleteTodo, editTodo, getTodos } from '../../api/todos'
import { TodoList } from './components/TodoList'
import { Spinner } from '../../components/Spinner/Spinner'
import { Todo } from '../../types/todos'

const deleteTodoAction = action(deleteTodo)
const editTodoAction = action(editTodo)

const Todos: Component = () => {
    const addTodoAction = action(async (formData: FormData) => {
        const todo = await addTodo({ text: Object.fromEntries(formData).todoText as string, timestamp: Date.now() })
        formRef?.reset()
        return todo
    })

    const [todos, { refetch, mutate }] = createResource(getTodos)
    const myDeleteTodo = useAction(deleteTodoAction)
    const myEditTodo = useAction(editTodoAction)
    const echoingAddTodo = useSubmission(addTodoAction)

    const pushTodo = (todo: Todo) => {
        mutate([...todos()!, todo])
    }
    createEffect((prev) => {
        if (echoingAddTodo.result && echoingAddTodo.result !== prev) {
            pushTodo(echoingAddTodo.result)
        }
        return echoingAddTodo.result
    })

    const [todoText, setTodoText] = createSignal('')
    
    const onDeleteTodo = async (id: string) => {
        await myDeleteTodo(id)
        mutate(todos()?.filter((todo) => todo.id !== id))
        // refetch()
    }

    const editTodo = async (id: string, text: string) => {
        await myEditTodo({ id, text })
        // refetch()
    }

    let formRef: HTMLFormElement | undefined

    return (
        <div class="w-1/2 mt-3 mx-auto">
            <form
                class="flex justify-between gap-3"
                method="post"
                action={addTodoAction}
                ref={formRef}
            >
                <Input
                    value={todoText()}
                    onChange={setTodoText}
                    name="todoText"
                />
                <button
                    type="submit"
                    class="inline-flex justify-center items-center p-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                    Add
                </button>
            </form>

            <Show
                when={!todos.loading}
                fallback={
                    <div class="w-full flex justify-center m-auto mt-5">
                        <Spinner
                            size="130px"
                            color="#F87171"
                            width="7px"
                        />
                    </div>
                }
            >
                <TodoList
                    class="mt-3"
                    todos={todos()!}
                    deleteTodo={onDeleteTodo}
                    editTodo={editTodo}
                />
            </Show>
        </div>
    )
}

export default Todos
