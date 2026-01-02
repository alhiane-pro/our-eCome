import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../index";

export const getCartTotalQuantitySelector = createSelector(
  (state: RootState) => state.cart.cartItems,
  (cartItems) => {
    return Object.values(cartItems).reduce((acc, current) => {
      return acc + current;
    }, 0);
  }
);

// export const getCartTotalQuantity = (state: RootState) => {
//   return Object.values(state.cart.cartItems).reduce((acc, current) => {
//     return acc + current;
//   }, 0);
// };
