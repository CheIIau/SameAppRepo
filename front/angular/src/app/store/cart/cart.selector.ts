import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectCartState = (state: AppState) => state.cart

export const selectTotalPrice = createSelector(selectCartState, (cart) => {
    return Object.values(cart).reduce(
        (acc, item) => acc + item.number * item.price,
        0)
})

export const selectTotalItems = createSelector(selectCartState, (cart) => {
    return Object.values(cart).reduce(
        (acc, item) => acc + item.number,
        0)
})

export const selectPostFromCart = (id: string) => createSelector(selectCartState, (cart) => {
    return cart[id]?.number || 0
})
