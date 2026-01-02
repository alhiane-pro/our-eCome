import { isString, type IOrder, type TLoading } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

import placeOrder from "./actions/place-order.slice";
import getOrders from "./actions/get-orders.action";

interface IOrderState {
  ordersList: IOrder[];
  loading: TLoading;
  error: null | string;
}

const initialState: IOrderState = {
  ordersList: [],
  loading: "idle",
  error: null,
};

const ordersSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetPlacingOrderStatus: (state) => {
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Place Order
    builder.addCase(placeOrder.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(placeOrder.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(placeOrder.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });

    // Get Orders
    builder.addCase(getOrders.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.ordersList = action.payload;
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });
  },
});

export const { resetPlacingOrderStatus } = ordersSlice.actions;
export { placeOrder, getOrders };

export default ordersSlice.reducer;
