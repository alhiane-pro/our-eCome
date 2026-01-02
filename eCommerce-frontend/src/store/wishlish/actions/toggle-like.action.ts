import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@/utils";

import axios from "axios";

const toggleLike = createAsyncThunk(
  "wishlist/toggleLike",
  async (productId: number, thunk) => {
    const { fulfillWithValue, rejectWithValue, signal } = thunk;

    try {
      // Canceling While Running: to cancel your running thunk before it has finished
      // we use signal to actually cancel a costly asynchronous action.
      const isRecordExists = await axios.get(
        `/wishlist?userId=1&productId=${productId}`,
        { signal }
      );
      if (isRecordExists.data.length > 0) {
        axios.delete(`/wishlist/${isRecordExists.data[0].id}`, { signal });
        return fulfillWithValue({ type: "deslike", productId });
      } else {
        axios.post(
          `/wishlist`,
          {
            userId: 1,
            productId,
          },
          { signal }
        );
        return fulfillWithValue({ type: "like", productId });
      }
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default toggleLike;
