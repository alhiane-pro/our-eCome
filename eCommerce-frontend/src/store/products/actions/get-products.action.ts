import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IProduct } from "@/types";
import { axiosErrorHandler } from "@/utils";

import axios from "axios";

type TResponse = IProduct[];

const getProducts = createAsyncThunk(
  "products/getProducts",
  async (prefix: string, thunk) => {
    try {
      // Canceling While Running: to cancel your running thunk before it has finished
      // we use signal to actually cancel a costly asynchronous action.
      const response = await axios.get<TResponse>(
        `/products?cat_prefix=${prefix}`,
        { signal: thunk.signal }
      );
      return response.data;
    } catch (error) {
      return thunk.rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default getProducts;
