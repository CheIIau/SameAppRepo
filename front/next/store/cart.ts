import {
    action,
    makeObservable,
    observable,
    computed,
    makeAutoObservable,
} from "mobx";

type Cart = Record<string, { number: number; price: number }>;

interface CartState {
    cart: Cart;
    totalPrice: number;
    totalItems: number;
    increase: (id: string, by: number, price: number) => void;
    decrease: (id: string, by: number, price: number) => void;
}

class CartStore implements CartState {
    constructor() {
        // makeObservable(this, {
        //     cart: observable,
        //     increase: action,
        //     decrease: action,
        //     totalItems: computed,
        //     totalPrice: computed,
        // });
        makeAutoObservable(this);
    }

    public cart: Cart = {};

    public get totalPrice() {
        return Object.values(this.cart).reduce(
            (acc, item) => acc + item.number * item.price,
            0
        );
    }
    public get totalItems() {
        return Object.values(this.cart).reduce(
            (acc, item) => acc + item.number,
            0
        );
    }

    public increase = (id: string, by: number, price: number) => {
        if (this.cart[id]) {
            this.cart = {
                ...this.cart,
                [id]: { ...this.cart[id], number: this.cart[id].number + by },
            };
        } else {
            this.cart = { ...this.cart, [id]: { number: by, price } };
        }
    };
    public decrease = (id: string, by: number, price: number) => {
        if (this.cart[id]) {
            if (this.cart[id].number < 1) {
                return;
            }
            this.cart = {
                ...this.cart,
                [id]: { ...this.cart[id], number: this.cart[id].number - by },
            };
        } else {
            this.cart = { ...this.cart, [id]: { number: by, price } };
        }
    };
}

const cartStore = new CartStore();
export default cartStore;
