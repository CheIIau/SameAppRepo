import { ParentProps, JSX, splitProps, Component } from 'solid-js'

type HTMLInputProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'onChange'>

interface InputProps extends ParentProps, HTMLInputProps {
    readonly value?: string
    readonly onChange?: (value: string) => void
}

export const Input: Component<InputProps> = (_props) => {
    const [props, otherProps] = splitProps(_props, ['value', 'onChange'])

    const onChangeHandler: JSX.ChangeEventHandlerUnion<HTMLInputElement, Event> = (event) => {
        props.onChange?.(event.target.value)
    }

    return (
        <input
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-indigo-700 dark:border-indigo-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={props.value}
            onChange={onChangeHandler}
            {...otherProps}
        />
    )
}
