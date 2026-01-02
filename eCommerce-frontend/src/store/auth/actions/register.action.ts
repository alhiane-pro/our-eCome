import type { TRegisterSchema } from "@/validations";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@/utils";

import axios from "axios";

type TFormData = Omit<TRegisterSchema, "confirmPassword">;

const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData: TFormData, thunk) => {
    const { rejectWithValue } = thunk;

    try {
      await axios.post("/register", formData);
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default registerUser;
