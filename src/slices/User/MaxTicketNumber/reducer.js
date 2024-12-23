import { createSlice } from "@reduxjs/toolkit";
import { GET_MaxTicketNumber } from "./thunk";

const MaxTicketNumber = createSlice({
  name: "MaxTicketNumber",
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
      .addCase(GET_MaxTicketNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(GET_MaxTicketNumber.fulfilled, (state, action) => {
        state.success = true;
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(GET_MaxTicketNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = MaxTicketNumber.actions;
export default MaxTicketNumber.reducer;