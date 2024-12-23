import { createSlice } from "@reduxjs/toolkit";
import { GET_TrainingTask, POST_AllotTraining,GET_AllotedTraining  } from "./thunk"; // Add other thunks as needed

const TrainingTask = createSlice({
  name: "TrainingTask",
  initialState: {
    data: null,
    allotTaskData: null, // Renamed for clarity
    allotedData: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.allotTaskData = null;
      // Only reset necessary parts
    },
    updateData: (state, action) => {
      state.data = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GET_TrainingTask.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(GET_TrainingTask.fulfilled, (state, action) => {
        state.success = true;
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(GET_TrainingTask.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error?.message || action.payload;
      })

      .addCase(POST_AllotTraining.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(POST_AllotTraining.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.allotTaskData = action.payload;
      })
      .addCase(POST_AllotTraining.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error?.message || action.payload;
      })

      .addCase(GET_AllotedTraining.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(GET_AllotedTraining.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.allotedData = action.payload;
      })
      .addCase(GET_AllotedTraining.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error?.message || action.payload;
      });
  },
});


export const { resetState, updateData, setError } = TrainingTask.actions;
export default TrainingTask.reducer;
