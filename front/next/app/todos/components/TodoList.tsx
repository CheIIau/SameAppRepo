import { FC, PropsWithChildren } from "react";
import { TodoItem } from "./Todo";
import { Todo } from "@/types/todos";

interface TodoListProps extends PropsWithChildren {
    className: string;
    todos: Todo[];
    deleteTodo: (formData: FormData) => Promise<Todo[]>;
    editTodo: (formData: FormData) => Promise<Todo[]>;
}

export const TodoList: FC<TodoListProps> = ({
    todos,
    deleteTodo,
    editTodo,
    className,
}) => {
    return (
        <ul className={`${className} flex flex-col flex-grow gap-2`}>
            {todos.map((todo) => (
                <TodoItem
                    todo={todo}
                    key={todo.id}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                />
            ))}
        </ul>
    );
};
