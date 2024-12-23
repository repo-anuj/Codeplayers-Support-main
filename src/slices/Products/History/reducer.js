import { createSlice } from "@reduxjs/toolkit";
import { GET_PRODUCT_ORDER_HISTORY } from "./thunk";

const SupportDashboard = createSlice({
  name: "ProductOrderHistory",
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
      .addCase(GET_PRODUCT_ORDER_HISTORY.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(GET_PRODUCT_ORDER_HISTORY.fulfilled, (state, action) => {
        state.success = true;
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(GET_PRODUCT_ORDER_HISTORY.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = SupportDashboard.actions;
export default SupportDashboard.reducer;
