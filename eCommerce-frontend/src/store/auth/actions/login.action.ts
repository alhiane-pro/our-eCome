import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TLoginSchema } from "@/validations";
import { axiosErrorHandler } from "@/utils";

import axios from "axios";

type TFormData = TLoginSchema;

type TResponse = {
  accessToken: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
};

const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData: TFormData, thunk) => {
    const { rejectWithValue, fulfillWithValue } = thunk;

    try {
      const response = await axios.post<TResponse>("/login", formData);
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default loginUser;
