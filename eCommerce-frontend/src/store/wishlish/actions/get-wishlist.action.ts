import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@/utils";
import type { RootState } from "@/store";
import type { IProduct } from "@/types";

import axios from "axios";

type TResponse = IProduct[];

type TDataType = "productsFullInfo" | "productsIds";

const getWishlistItemsFullInfo = createAsyncThunk(
  "wishlist/getWishlistItems",
  async (dataType: TDataType, thunk) => {
    const { rejectWithValue, fulfillWithValue, getState, signal } = thunk;
    const {
      auth: { user },
    } = getState() as RootState;
    try {
      // Canceling While Running: to cancel your running thunk before it has finished
      // we use signal to actually cancel a costly asynchronous action.
      const userWishlist = await axios.get<{ productId: number }[]>(
        `/wishlist?userId=${user?.id}`,
        { signal }
      );

      if (userWishlist.data.length === 0) {
        return fulfillWithValue({ data: [], dataType: "ampty" });
      }

      if (dataType === "productsIds") {
        const productsIds = userWishlist.data.map((wishlistItem) => {
          return wishlistItem.productId;
        });
        return fulfillWithValue({
          data: productsIds,
          dataType: "productsIds",
        });
      } else if (dataType === "productsFullInfo") {
        const concatenatedItemsIds = userWishlist.data
          .map((wishlistItem) => {
            return `id=${wishlistItem.productId}`;
          })
          .join("&");
        const response = await axios.get<TResponse>(
          `/products?${concatenatedItemsIds}`,
          { signal }
        );
        return fulfillWithValue({
          data: response.data,
          dataType: "productsFullInfo",
        });
      }
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default getWishlistItemsFullInfo;
