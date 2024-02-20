import { ChangeEvent, FC, PropsWithChildren, useState } from 'react'
import { Todo } from '~/types/todos'

interface TodoItemProps extends PropsWithChildren {
    todo: Todo
    deleteTodo: (id: string) => void
    saveTodo: (id: string, text: string) => void
}

export const TodoItem: FC<TodoItemProps> = ({ todo, deleteTodo, saveTodo }) => {
    const onDeleteTodoHandler = () => {
        deleteTodo(todo.id)
    }

    const [disabled, setDisabled] = useState(true)
    const [newText, setNewText] = useState(todo.text)

    const onEditHandler = () => {
        setDisabled(false)
    }

    const onSaveHandler = () => {
        setDisabled(true)
        saveTodo(todo.id, newText)
    }

    const onStashHandler = () => {
        setDisabled(true)
        setNewText(todo.text)
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewText(event.target.value)
    }

    return (
        <li className="flex items-center justify-between px-3 py-2 rounded-lg border-2">
            <input
                value={newText}
                disabled={disabled}
                onChange={onChangeHandler}
                className="text-sm font-medium"
            ></input>
            <div className="flex gap-2">
                {disabled && (
                    <button
                        onClick={onEditHandler}
                        className="inline-flex justify-center items-center p-2 text-sm font-medium text-center text-white bg-emerald-500 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                    >
                        Edit
                    </button>
                )}
                {!disabled && (
                    <button
                        onClick={onSaveHandler}
                        className="inline-flex justify-center items-center p-2 text-sm font-medium text-center text-white bg-emerald-500 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                    >
                        Save
                    </button>
                )}
                {!disabled && (
                    <button
                        onClick={onStashHandler}
                        className="inline-flex justify-center items-center p-2 text-sm font-medium text-center text-white bg-amber-500 rounded-lg hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
                    >
                        Stash
                    </button>
                )}
                <button
                    onClick={onDeleteTodoHandler}
                    className="inline-flex justify-center items-center p-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                    Delete
                </button>
            </div>
        </li>
    )
}
