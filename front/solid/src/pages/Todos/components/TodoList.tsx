import { Component, ParentProps, For } from 'solid-js'
import { Todo } from '../../../types/todos'
import { TodoItem } from './TodoItem'

interface TodoListProps extends ParentProps {
    class: string
    todos: Todo[]
    deleteTodo: (id: string) => void
    editTodo: (id: string, text: string) => void
}

export const TodoList: Component<TodoListProps> = (props) => {
    return (
        <ul class={`${props.class} flex flex-col flex-grow gap-2`}>
            <For each={props.todos}>
                {(todo) => (
                    <TodoItem
                        todo={todo}
                        deleteTodo={props.deleteTodo}
                        editTodo={props.editTodo}
                    />
                )}
            </For>
        </ul>
    )
}
