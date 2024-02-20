import { addTodo, getTodos, deleteTodo, editTodo } from "@/api/todos";
import { TodoList } from "./components/TodoList";
import TodoForm from "./components/TodoForm";

export default async function Todos() {
    const todos = await getTodos();

    return (
        <div className="w-1/2 mt-3 mx-auto">
            <TodoForm addTodo={addTodo} />
            <TodoList
                className="mt-3"
                todos={todos}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
            />
        </div>
    );
}
