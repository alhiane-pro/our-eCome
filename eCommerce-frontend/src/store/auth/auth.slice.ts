import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "@/types";
import { isString } from "@/types";

import registerUser from "./actions/register.action";
import loginUser from "./actions/login.action";

interface IAuthState {
  loading: TLoading;
  error: null | string;
  accessToken: string | null;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
}

const initialState: IAuthState = {
  loading: "idle",
  error: null,
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetUI: (state) => {
      state.loading = "idle";
      state.error = null;
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // Register User
    builder.addCase(registerUser.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });

    // Login User
    builder.addCase(loginUser.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });
  },
});

export const { resetUI, logout } = authSlice.actions;
export { registerUser, loginUser };

export default authSlice.reducer;
