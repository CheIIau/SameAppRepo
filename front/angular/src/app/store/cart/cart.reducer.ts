import { createReducer, on } from '@ngrx/store';
import { decrease, increase } from './cart.actions';
import { Cart } from './types';

export const initialState: Cart = {};

export const cartReducer = createReducer(
    initialState,
    on(increase, (state, { id, by, price }) => {
        if (state[id]) {
            return { ...state, [id]: { number: state[id].number + by, price } }
        } else {
            return { ...state, [id]: { number: by, price } }
        }
    }),
    on(decrease, (state, { id, by, price }) => {
        if (state[id]?.number > 0) {
            return { ...state, [id]: { number: state[id].number - by, price } }
        }
        return state
    })
);

// так же можно было сделать через сигналы
// https://ngrx.io/guide/signals/signal-store
// https://dev.to/ngrx/announcing-ngrx-v17-introducing-ngrx-signals-operators-performance-improvements-workshops-and-more-55e4
