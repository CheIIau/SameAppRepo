import { createStore } from '@stencil/store';

type Cart = Record<string, { number: number; price: number }>;

//можно менять через set, можно напрямую
const { state, get, set } = createStore<{ cart: Cart }>({ cart: {} });

export const increase = (payload: { id: string; by: number; price: number }) => {
  const { id, by, price } = payload;
  if (state.cart[id]) {
    state.cart = { ...state.cart, [id]: { number: state.cart[id].number + by, price } };
  } else {
    state.cart = { ...state.cart, [id]: { number: by, price } };
  }
};

export const decrease = (payload: { id: string; by: number; price: number }) => {
  const { id, by, price } = payload;
  if (state.cart[id]?.number > 0) {
    state.cart = { ...state.cart, [id]: { number: state.cart[id].number - by, price } };
  }
};

export const totalPrice = () => {
  return Object.values(state.cart).reduce((acc, item) => acc + item.number * item.price, 0);
};

export const totalItems = () => {
  return Object.values(state.cart).reduce((acc, item) => acc + item.number, 0);
};

export default state;
