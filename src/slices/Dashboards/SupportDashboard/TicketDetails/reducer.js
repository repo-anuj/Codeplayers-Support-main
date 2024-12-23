import { createSlice } from "@reduxjs/toolkit";
import { GET_TicketDetails } from "./thunk";
const TicketDetails = createSlice({
  name: "TicketDetails",
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
    updateCurrentData: (state, action) => {
      // Merge the incoming payload with the existing data
      if (state.data) {
        state.data = {
          ...state.data,
          ...action.payload,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GET_TicketDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(GET_TicketDetails.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(GET_TicketDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState, updateCurrentData } = TicketDetails.actions;
export default TicketDetails.reducer;
