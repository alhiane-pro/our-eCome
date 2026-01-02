import { isString, type IProduct } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "@/types";

import getWishlistItemsFullInfo from "./actions/get-wishlist.action";
import toggleLike from "./actions/toggle-like.action";
import { logout } from "../auth/auth.slice";

interface IWishlistState {
  wishlistItems: number[]; // productIds => [1, 3, 7]
  wishlistItemsFullInfo: IProduct[];
  loading: TLoading;
  error: null | string;
}

const initialState: IWishlistState = {
  wishlistItems: [],
  wishlistItemsFullInfo: [],
  loading: "idle",
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    wishlistItemsFullInfoCleanUp: (state) => {
      state.wishlistItemsFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    // Toggle Like
    builder.addCase(toggleLike.pending, (state) => {
      state.error = null;
    });
    builder.addCase(toggleLike.fulfilled, (state, action) => {
      if (action.payload.type === "like") {
        state.wishlistItems.push(action.payload.productId);
      } else if (action.payload.type === "deslike") {
        state.wishlistItems = state.wishlistItems.filter((wishlistItem) => {
          return wishlistItem !== action.payload.productId;
        });
        state.wishlistItemsFullInfo = state.wishlistItemsFullInfo.filter(
          (product) => {
            return product.id !== action.payload.productId;
          }
        );
      }
    });
    builder.addCase(toggleLike.rejected, (state, { payload }) => {
      if (isString(payload)) state.error = payload;
    });

    // Get Wishlist Items
    builder.addCase(getWishlistItemsFullInfo.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(getWishlistItemsFullInfo.fulfilled, (state, action) => {
      state.loading = "succeeded";
      if (action.payload?.dataType === "productsFullInfo") {
        state.wishlistItemsFullInfo = action.payload.data as IProduct[];
      } else if (action.payload?.dataType === "productsIds") {
        state.wishlistItems = action.payload?.data as number[];
      }
    });
    builder.addCase(getWishlistItemsFullInfo.rejected, (state, { payload }) => {
      state.loading = "failed";
      if (isString(payload)) state.error = payload;
    });

    // On Logout
    builder.addCase(logout, (state) => {
      state.wishlistItems = [];
      state.wishlistItemsFullInfo = [];
    });
  },
});

export const { wishlistItemsFullInfoCleanUp } = wishlistSlice.actions;
export { toggleLike, getWishlistItemsFullInfo };

export default wishlistSlice.reducer;
