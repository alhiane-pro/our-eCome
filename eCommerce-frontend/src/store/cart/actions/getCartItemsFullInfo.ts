import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IProduct } from "@/types";
import { axiosErrorHandler } from "@/utils";
import type { RootState } from "@/store";

import axios from "axios";

type TResponse = IProduct[];

const getCartItemsFullInfo = createAsyncThunk(
  "cart/getCartItemsFullInfo",
  async (_, thunk) => {
    const { fulfillWithValue, rejectWithValue, getState, signal } = thunk;
    const {
      cart: { cartItems },
    } = getState() as RootState;

    const ids = Object.keys(cartItems);

    if (ids.length === 0) return fulfillWithValue([]);

    try {
      const concatenatedItemsIds = ids
        .map((id) => `id=${id}`) // ["id=1", "id=3", "id=7"]
        .join("&"); // id=1&id=3&id=7
      // Canceling While Running: to cancel your running thunk before it has finished
      // we use signal to actually cancel a costly asynchronous action.
      const response = await axios.get<TResponse>(
        `/products?${concatenatedItemsIds}`,
        { signal }
      );
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default getCartItemsFullInfo;
