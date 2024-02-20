import type { Todo as ITodo } from "~/types/todos";
import { component$ } from "@builder.io/qwik";
import Todo from "./Todo";
import type { ActionStore } from "@builder.io/qwik-city";
import { Action } from "@builder.io/qwik-city";

interface TodoListProps {
    class: string;
    todos: ITodo[];
    deleteTodo: ActionStore<{}, Record<string, unknown>, true>
    editTodo: ActionStore<{}, Record<string, unknown>, true>
}

export default component$((props: TodoListProps) => {
    return (
        <ul class={`${props.class} flex flex-col flex-grow gap-2`}>
            {props.todos.map((todo) => (
                <Todo
                    todo={todo}
                    key={todo.id}
                    deleteTodo={props.deleteTodo}
                    editTodo={props.editTodo}
                />
            ))}
        </ul>
    );
});
