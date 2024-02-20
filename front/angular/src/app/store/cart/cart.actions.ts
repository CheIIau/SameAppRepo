import { createAction, props } from '@ngrx/store';

type CartPayload = {id: string, by: number, price: number}

export const increase = createAction(
    '[Cart] Add Item',
    props<CartPayload>()
);

export const decrease = createAction(
    '[Cart] Delete Item',
    props<CartPayload>()
);
