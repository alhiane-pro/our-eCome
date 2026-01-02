import type { AsyncThunkConfig, GetThunkAPI } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@/utils";

/**
 * A reusable wrapper for createAsyncThunk payload creators
 * @param callback The async logic to execute
 */
const withErrorHandling = <Args, Returned>(
  callback: (
    args: Args,
    thunkAPI: GetThunkAPI<AsyncThunkConfig>
  ) => Promise<Returned>
) => {
  return async (args: Args, thunkAPI: GetThunkAPI<AsyncThunkConfig>) => {
    try {
      return await callback(args, thunkAPI);
    } catch (error) {
      return thunkAPI.rejectWithValue(axiosErrorHandler(error));
    }
  };
};

export default withErrorHandling;
