import type { QRL} from "@builder.io/qwik";
import { $, component$, type InputHTMLAttributes } from "@builder.io/qwik";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange$">;

interface InputProps extends HTMLInputProps {
    readonly value: string;
    readonly onChange: QRL<(text: string) => void>;
}

export default component$(({ value, onChange, ...otherProps }: InputProps) => {
    const onChangeHandler = $((event: Event) => {
        const target = event.target as HTMLInputElement;
        if (typeof target.value === "string") {
            onChange(target.value);
        }
    });

    return (
        <input
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-indigo-700 dark:border-indigo-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={value}
            onChange$={onChangeHandler}
            {...otherProps}
        />
    );
});
