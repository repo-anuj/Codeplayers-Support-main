import { createSlice } from "@reduxjs/toolkit";
import { GET_ListUser } from "./thunk";

const ListUser = createSlice({
  name: "ListofModulesData",
  initialState: {
    data: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.data = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GET_ListUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(GET_ListUser.fulfilled, (state, action) => {
        state.success = true;
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(GET_ListUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = ListUser.actions;
export default ListUser.reducer;
