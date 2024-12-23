import { createSlice } from "@reduxjs/toolkit";
import { GET_TrainingDashboard } from "./thunk";

const TrainingDashboard = createSlice({
  name: "TrainingDashboard",
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
      .addCase(GET_TrainingDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(GET_TrainingDashboard.fulfilled, (state, action) => {
        state.success = true;
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(GET_TrainingDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = TrainingDashboard.actions;
export default TrainingDashboard.reducer;
