import { $, component$, useSignal } from "@builder.io/qwik";
import type { FailReturn } from "@builder.io/qwik-city";
import {
    Form,
    type ActionStore,
    GetValidatorType,
} from "@builder.io/qwik-city";
import Input from "~/components/Input/Input";
import type { Todo } from "~/types/todos";
import type { useAddTodoType } from "..";

interface TodoFormProps {
    readonly addTodo: useAddTodoType;
}

// 2 типа из zod, которые не могу достать
type allKeys<T> = T extends any ? keyof T : never;
type typeToFlattenedError<T, U = string> = {
    formErrors: U[];
    fieldErrors: {
        [P in allKeys<T>]?: U[];
    };
};
type ZodValidationError = FailReturn<typeToFlattenedError<{ text: string }>>;

export default component$(({ addTodo }: TodoFormProps) => {
    const todoText = useSignal("");

    const setTodoText = $((text: string) => {
        todoText.value = text;
    });

    const addTodoValue = addTodo.value as undefined | Todo | ZodValidationError;

    let zodError = "";

    if (addTodoValue?.failed) {
        (addTodoValue as ZodValidationError).fieldErrors.text?.forEach(
            (error) => (zodError += " " + error).trim()
        );
    }

    return (
        <>
            <Form
                class="flex justify-between gap-3"
                action={addTodo}
                spaReset
            >
                <Input
                    value={todoText.value}
                    onChange={setTodoText}
                    name="text"
                    required
                />
                <button
                    disabled={addTodo.isRunning}
                    type="submit"
                    class="inline-flex justify-center items-center p-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                    {addTodo.isRunning ? "Loading" : "Add"}
                </button>
            </Form>
            <div class="mt-2 w-full text-red-400 text-center">{zodError}</div>
        </>
    );
});
