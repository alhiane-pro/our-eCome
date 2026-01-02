import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IToast } from "@/types";
import { nanoid } from "nanoid";

interface IToastsState {
  toasts: IToast[];
}

const initialState: IToastsState = {
  toasts: [],
};

const toastsSlice = createSlice({
  name: "toasts",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<IToast>) => {
      state.toasts.push({
        id: nanoid(),
        type: action.payload.type,
        title: action.payload.title || action.payload.type,
        message: action.payload.message,
      });
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload
      );
    },
  },
});

export const { addToast, removeToast } = toastsSlice.actions;

export default toastsSlice.reducer;
