import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICategory } from "@/types";
import { axiosErrorHandler } from "@/utils";

import axios from "axios";

type TResponse = ICategory[];

const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, thunk) => {
    try {
      // Canceling While Running: to cancel your running thunk before it has finished
      // we use signal to actually cancel a costly asynchronous action.
      const response = await axios.get<TResponse>("/categories", {
        signal: thunk.signal,
      });
      return response.data;
    } catch (error) {
      return thunk.rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default getCategories;
