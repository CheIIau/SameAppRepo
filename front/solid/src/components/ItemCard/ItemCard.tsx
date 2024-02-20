import { Component, ParentProps, mergeProps, createSignal } from 'solid-js'
import { Post } from '../../types/posts'
import { A } from '@solidjs/router'
import { cart, decrease, increase } from '../../store/store'

interface ItemCardProps extends ParentProps {
    readonly post: Post
    readonly showFooter?: boolean
}

export const ItemCard: Component<ItemCardProps> = (_props) => {
    const props = mergeProps({ showFooter: true }, _props)
    const [buttonText, setButtonText] = createSignal('Not interested')
    const itemsInCart = () => cart[props.post.id]?.number || 0

    return (
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
            <div class="max-h-96 overflow-hidden">
                <img
                    class="rounded-t-lg object-cover object-center w-full h-full"
                    src={props.post.urls.regular}
                    alt=""
                />
            </div>
            <div class="flex-grow" />
            <div class="p-5">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {props.post.user.first_name + ' ' + (props.post.user.last_name || '')}
                </h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {props.post.alt_description || props.post.description}
                </p>
                {props.showFooter && (
                    <div class="flex flex-row justify-between">
                        <A
                            href={`/post/${props.post.id}`}
                            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Read more
                            <svg
                                class="w-3.5 h-3.5 ml-2"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                            </svg>
                        </A>
                        <button
                            onClick={() => {
                                setButtonText('Go f*** yourself')
                            }}
                            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            {buttonText()}
                        </button>
                    </div>
                )}
                <div class="flex flex-row justify-between mt-2">
                    <p class="py-2 text-sm font-medium text-center text-white">Price: {props.post.width}</p>
                    <div class="flex items-center gap-2">
                        <button
                            onClick={() => {
                                decrease({ by: 1, id: props.post.id })
                            }}
                            class="inline-flex justify-center items-center h-8 w-8 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        >
                            -
                        </button>
                        <p class="text-sm font-medium text-center text-white">{itemsInCart()}</p>
                        <button
                            onClick={() => {
                                increase({ by: 1, id: props.post.id, price: props.post.width })
                            }}
                            class="inline-flex justify-center items-center h-8 w-8 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
