import { FC, PropsWithChildren } from 'react'
import { Todo } from '~/types/todos'
import { TodoItem } from './Todo'

interface TodoListProps extends PropsWithChildren {
    className: string
    todos: Todo[]
    deleteTodo: (id: string) => void
    saveTodo: (id: string, text: string) => void
}

export const TodoList: FC<TodoListProps> = ({ todos, deleteTodo, saveTodo, className }) => {
    return (
        <ul className={`${className} flex flex-col flex-grow gap-2`}>
            {todos.map((todo) => (
                <TodoItem
                    todo={todo}
                    key={todo.id}
                    deleteTodo={deleteTodo}
                    saveTodo={saveTodo}
                />
            ))}
        </ul>
    )
}
