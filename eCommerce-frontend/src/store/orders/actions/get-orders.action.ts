import { createAsyncThunk } from "@reduxjs/toolkit";
import { withErrorHandling } from "@/utils";
import type { RootState } from "@/store";
import type { IOrder } from "@/types";

import axios from "axios";

type TResponse = IOrder[];

const getOrders = createAsyncThunk(
  "orders/getOrders",
  withErrorHandling<void, TResponse>(async (_, thunk) => {
    const { getState, signal } = thunk;
    const {
      auth: { user },
    } = getState() as RootState;

    const response = await axios.get<TResponse>(`/orders?userId=${user?.id}`, {
      signal,
    });
    return response.data;
  })
);

export default getOrders;
