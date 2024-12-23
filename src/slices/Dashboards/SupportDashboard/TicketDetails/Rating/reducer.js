import { createSlice } from "@reduxjs/toolkit";
import { POST_Rating } from "./thunk";

const Rating = createSlice({
  name: "Rating",
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
      .addCase(POST_Rating.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(POST_Rating.fulfilled, (state, action) => {
        state.success = true;
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(POST_Rating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = Rating.actions;
export default Rating.reducer;
