import { ChangeEvent, FC, InputHTMLAttributes, PropsWithChildren } from 'react'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>

interface InputProps extends PropsWithChildren, HTMLInputProps {
    readonly value?: string
    readonly onChange?: (value: string) => void
}

export const Input: FC<InputProps> = ({ value, onChange, ...otherProps }) => {
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(event.target.value)
    }

    return (
        <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-indigo-700 dark:border-indigo-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={value}
            onChange={onChangeHandler}
            {...otherProps}
        />
    )
}
