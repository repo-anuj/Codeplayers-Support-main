import { createSlice } from "@reduxjs/toolkit";
import { GET_VendorDashboard } from "./thunk";

const VendorDashboard = createSlice({
  name: "VendorDashboard",
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
      .addCase(GET_VendorDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(GET_VendorDashboard.fulfilled, (state, action) => {
        state.success = true;
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(GET_VendorDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = VendorDashboard.actions;
export default VendorDashboard.reducer;
