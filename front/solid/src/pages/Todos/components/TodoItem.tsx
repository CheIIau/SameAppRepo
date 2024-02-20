import { Component, JSX, ParentProps, createSignal } from 'solid-js'
import { Todo } from '../../../types/todos'

interface TodoItemProps extends ParentProps {
    todo: Todo
    deleteTodo: (id: string) => void
    editTodo: (id: string, text: string) => void
}

export const TodoItem: Component<TodoItemProps> = (props) => {
    const onDeleteTodoHandler = () => {
        props.deleteTodo(props.todo.id)
    }

    const [disabled, setDisabled] = createSignal(true)
    const [newText, setNewText] = createSignal(props.todo.text)

    const onEditHandler = () => {
        setDisabled(false)
    }

    const onSaveHandler = () => {
        setDisabled(true)
        props.editTodo(props.todo.id, newText())
    }

    const onStashHandler = () => {
        setDisabled(true)
        setNewText(props.todo.text)
    }

    const onChangeHandler: JSX.ChangeEventHandlerUnion<HTMLInputElement, Event> = (event) => {
        setNewText(event.target.value)
    }

    return (
        <li class="flex items-center justify-between px-3 py-2 rounded-lg border-2">
            <input
                value={newText()}
                disabled={disabled()}
                onChange={onChangeHandler}
                class="text-sm font-medium"
            />
            <div class="flex gap-2">
                {disabled() && (
                    <button
                        onClick={onEditHandler}
                        class="inline-flex justify-center items-center p-2 text-sm font-medium text-center text-white bg-emerald-500 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                    >
                        Edit
                    </button>
                )}
                {!disabled() && (
                    <button
                        onClick={onSaveHandler}
                        class="inline-flex justify-center items-center p-2 text-sm font-medium text-center text-white bg-emerald-500 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                    >
                        Save
                    </button>
                )}
                {!disabled() && (
                    <button
                        onClick={onStashHandler}
                        class="inline-flex justify-center items-center p-2 text-sm font-medium text-center text-white bg-amber-500 rounded-lg hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
                    >
                        Stash
                    </button>
                )}
                <button
                    onClick={onDeleteTodoHandler}
                    class="inline-flex justify-center items-center p-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                    Delete
                </button>
            </div>
        </li>
    )
}
