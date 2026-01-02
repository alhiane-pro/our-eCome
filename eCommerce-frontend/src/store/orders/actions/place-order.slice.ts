import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@/utils";
import type { RootState } from "@/store";

import axios from "axios";

const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (subTotal: number, thunk) => {
    const { rejectWithValue, getState } = thunk;
    const {
      auth: { user },
      cart: { cartItemsFullInfo, cartItems },
    } = getState() as RootState;

    const orderItems = cartItemsFullInfo.map((item) => {
      return {
        id: item.id,
        title: item.title,
        img: item.img,
        price: item.price,
        quantity: cartItems[item.id!],
      };
    });

    try {
      await axios.post(`/orders`, {
        userId: user?.id,
        subTotal,
        orderItems,
      });
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default placeOrder;
