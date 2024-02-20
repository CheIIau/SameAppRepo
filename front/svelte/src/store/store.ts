import { derived, writable } from 'svelte/store';

export type Cart = Record<string, { number: number; price: number }>;

export const cart = writable<Cart>({});

export const totalPrice = derived(cart, ($cart) => {
	return Object.values($cart).reduce((acc, item) => acc + item.number * item.price, 0);
});

export const totalItems = derived(cart, ($cart) => {
	return Object.values($cart).reduce((acc, item) => acc + item.number, 0);
});

export function increase({ id, by, price }: { id: string; by: number; price: number }) {
	cart.update((cart) => {
		if (cart[id]) {
			return { ...cart, [id]: { number: cart[id].number + by, price } };
		} else {
			return { ...cart, [id]: { number: by, price } };
		}
	});
}
export function decrease({ id, by, price }: { id: string; by: number; price: number }) {
	cart.update((cart) => {
		if (cart[id]?.number > 0) {
			return { ...cart, [id]: { number: cart[id].number - by, price } };
		}
		return cart;
	});
}
