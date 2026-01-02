import { isString, type IProduct } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "@/types";

import getProducts from "./actions/get-products.action";

interface IProductsState {
  records: IProduct[];
  loading: TLoading;
  error: null | string;
}

const initialState: IProductsState = {
  records: [],
  loading: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsCleanUp: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });
  },
});

export const { productsCleanUp } = productsSlice.actions;
export { getProducts };

export default productsSlice.reducer;
