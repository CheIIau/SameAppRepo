"use client";

import { useState, type FC, type PropsWithChildren } from "react";
import { Input } from "@/components/UI/Input/Input";
import { Todo } from "@/types/todos";
import { useFormState, useFormStatus } from "react-dom";

interface TodoFormProps extends PropsWithChildren {
    readonly addTodo: (formData: FormData) => Promise<Todo[]>;
}

const TodoForm: FC<TodoFormProps> = ({ addTodo }) => {
    const [todoText, setTodoText] = useState("");
    // const [state, formAction] = useFormState(someAction, initialState);

    const addTodoHandler = (formData: FormData) => {
        const timestamp = Date.now();
        formData.append("timestamp", String(timestamp));
        addTodo(formData);
        setTodoText('')
    };

    return (
        <form className="flex justify-between gap-3" action={addTodoHandler}>
            <Input value={todoText} onChange={setTodoText} name="text" />
            <SubmitButton />
        </form>
    );
};

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            disabled={pending}
            type="submit"
            className="inline-flex justify-center items-center p-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
            {pending ? "Loading" : "Add"}
        </button>
    );
}

export default TodoForm;
