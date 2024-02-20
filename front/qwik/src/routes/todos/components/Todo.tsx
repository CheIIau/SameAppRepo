import { $, component$, useSignal } from "@builder.io/qwik";
import type { Action, ActionStore } from "@builder.io/qwik-city";
import type { Todo } from "~/types/todos";

interface TodoItemProps {
    todo: Todo;
    deleteTodo: ActionStore<{}, Record<string, unknown>, true>;
    editTodo: ActionStore<{}, Record<string, unknown>, true>;
}

export default component$(({ todo, deleteTodo, editTodo }: TodoItemProps) => {
    const onDeleteTodoHandler = $(() => {
        deleteTodo.submit({ id: todo.id });
    });

    const disabled = useSignal(true);
    const newText = useSignal(todo.text);

    const onEditHandler = $(() => {
        disabled.value = false;
    });

    const onSaveHandler = $(() => {
        editTodo.submit({ id: todo.id, text: newText.value });
        disabled.value = true;
    });

    const onStashHandler = $(() => {
        disabled.value = true;
        newText.value = todo.text;
    });

    const onChangeHandler = $((event: InputEvent) => {
        const target = event.target as HTMLInputElement;
        if (target.value) {
            newText.value = target.value;
        }
    });

    return (
        <li class="flex items-center justify-between px-3 py-2 rounded-lg border-2">
            <input
                value={newText.value}
                disabled={disabled.value}
                onChange$={onChangeHandler}
                class="text-sm font-medium"
            ></input>
            <div class="flex gap-2">
                {disabled.value && (
                    <button
                        onClick$={onEditHandler}
                        class="inline-flex justify-center items-center p-2 text-sm font-medium text-center text-white bg-emerald-500 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                    >
                        Edit
                    </button>
                )}
                {!disabled.value && (
                    <button
                        onClick$={onSaveHandler}
                        class="inline-flex justify-center items-center p-2 text-sm font-medium text-center text-white bg-emerald-500 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                    >
                        {editTodo.isRunning ? "Saving" : "Save"}
                    </button>
                )}
                {!disabled.value && (
                    <button
                        onClick$={onStashHandler}
                        class="inline-flex justify-center items-center p-2 text-sm font-medium text-center text-white bg-amber-500 rounded-lg hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
                    >
                        Stash
                    </button>
                )}
                <button
                    onClick$={onDeleteTodoHandler}
                    class="inline-flex justify-center items-center p-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                    Delete
                </button>
            </div>
        </li>
    );
});
