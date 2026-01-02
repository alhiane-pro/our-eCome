import { isString, type ICategory } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "@/types";

import getCategories from "./actions/get-categories.action";

interface ICategoriesState {
  records: ICategory[];
  loading: TLoading;
  error: null | string;
}

const initialState: ICategoriesState = {
  records: [],
  loading: "idle",
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    categoriesCleanUp: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });
  },
});

export const { categoriesCleanUp } = categoriesSlice.actions;
export { getCategories };

export default categoriesSlice.reducer;
