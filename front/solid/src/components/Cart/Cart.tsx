import { Component } from 'solid-js'
import { cart } from '../../store/store'

export const Cart: Component = () => {
    const totalPrice = () => Object.values(cart).reduce((acc, item) => acc + item.number * item.price, 0)
    const totalItems = () => Object.values(cart).reduce((acc, item) => acc + item.number, 0);

    return (
        <summary class="fixed top-0 right-0 flex gap-3 items-center p-2 bg-teal-800 text-teal-200 rounded-b-lg mr-4">
            <div>items: {totalItems()}</div>
            <div>total: {totalPrice()}</div>
        </summary>
    )
}
