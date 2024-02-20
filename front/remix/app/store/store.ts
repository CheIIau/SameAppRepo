import { create } from 'zustand'
import { produce } from 'immer'
import { devtools } from 'zustand/middleware'

interface CartState {
    cart: Record<string, { number: number; price: number }>
    computed: { totalPrice: number; totalItems: number }
    increase: (id: string, by: number, price: number) => void
    decrease: (id: string, by: number, price: number) => void
}

export const useCartStore = create<CartState>()(
    devtools((set, get) => ({
        cart: {},
        computed: {
            get totalPrice() {
                if (!get()) {
                    return 0
                }
                return Object.values(get().cart).reduce((acc, item) => acc + item.number * item.price, 0)
            },
            get totalItems() {
                if (!get()) {
                    return 0
                }
                return Object.values(get().cart).reduce((acc, item) => acc + item.number, 0)
            },
        },
        increase: (id, by, price) =>
            set(
                produce((state) => {
                    if (state.cart[id]) {
                        state.cart[id] = { number: state.cart[id].number + by, price }
                    } else {
                        state.cart[id] = { number: by, price }
                    }
                }),
                false,
                'inc',
            ),
        decrease: (id, by, price) =>
            set(
                produce((state) => {
                    if (state.cart[id]?.number > 0) {
                        state.cart[id] = { number: state.cart[id].number - by, price }
                    }
                }),
                false,
                'dec',
            ),
    })),
)
