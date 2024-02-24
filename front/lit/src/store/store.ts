import { State, property } from '@lit-app/state'

//также есть пакет lit-mobx от adobe, но взял этот

type Cart = { number: number; price: number }

class CartState extends State {
    @property({ value: {}, type: Object }) cart!: Record<string, Cart>

    get totalPrice() {
        return Object.values(this.cart).reduce((acc, item) => acc + item.number * item.price, 0)
    }
    get totalItems() {
        return Object.values(this.cart).reduce((acc, item) => acc + item.number, 0)
    }

    increase = (payload: { id: string; by: number; price: number }) => {
        const { id, by, price } = payload
        if (this.cart[id]) {
            this.cart = { ...this.cart, [id]: { number: this.cart[id].number + by, price } }
        } else {
            this.cart = { ...this.cart, [id]: { number: by, price } }
        }
    }

    decrease = (payload: { id: string; by: number; price: number }) => {
        const { id, by, price } = payload
        if (this.cart[id]?.number > 0) {
            this.cart = { ...this.cart, [id]: { number: this.cart[id].number - by, price } }
        }
    }

    reset() {
        this.cart = {}
    }
}
const cartState = new CartState()

export default cartState
