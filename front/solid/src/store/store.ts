import { createStore, produce } from 'solid-js/store'

export type Cart = Record<string, { number: number; price: number }>

export const [cart, setCart] = createStore<Cart>({})

export const increase = ({ id, by, price }: { id: string; by: number; price: number }) => {
    setCart(
        produce((cart) => {
            if (cart[id]) {
                cart[id].number += by
            } else {
                cart[id] = { number: by, price }
            }
        }),
    )
}

export const decrease = ({ id, by }: { id: string; by: number }) => {
    setCart(
        produce((cart) => {
            if (cart[id]?.number > 0) {
                cart[id].number -= by
            } else {
                cart[id].number = 0
            }
        }),
    )
}
