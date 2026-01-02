import { getCartTotalQuantitySelector } from "./selectors/cart.selectors";
import { isString, type IProduct } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "@/types";

import getCartItemsFullInfo from "./actions/getCartItemsFullInfo";

interface ICartState {
  cartItems: { [key: string]: number }; // { productId: quantity }
  cartItemsFullInfo: IProduct[];
  loading: TLoading;
  error: null | string;
}

const initialState: ICartState = {
  cartItems: {},
  cartItemsFullInfo: [],
  loading: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (state.cartItems[action.payload]) {
        state.cartItems[action.payload]++;
      } else {
        state.cartItems[action.payload] = 1;
      }
    },
    cartItemChangeQuantity: (state, action) => {
      state.cartItems[action.payload.id] = action.payload.quantity;
    },
    deleteCartItem: (state, action) => {
      delete state.cartItems[action.payload];
      state.cartItemsFullInfo = state.cartItemsFullInfo.filter((product) => {
        return product.id !== action.payload;
      });
    },
    cartItemsFullInfoCleanUp: (state) => {
      state.cartItemsFullInfo = [];
    },
    clearCartAfterPlacingOrder: (state) => {
      state.cartItems = {};
      state.cartItemsFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartItemsFullInfo.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(getCartItemsFullInfo.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.cartItemsFullInfo = action.payload;
    });
    builder.addCase(getCartItemsFullInfo.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });
  },
});

export { getCartTotalQuantitySelector, getCartItemsFullInfo };
export const {
  addToCart,
  cartItemChangeQuantity,
  deleteCartItem,
  cartItemsFullInfoCleanUp,
  clearCartAfterPlacingOrder,
} = cartSlice.actions;

export default cartSlice.reducer;
