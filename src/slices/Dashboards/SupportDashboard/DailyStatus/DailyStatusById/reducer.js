import { createSlice } from "@reduxjs/toolkit";
import { GET_DailyStatusDetails } from "./thunk";

const DailyStatusById = createSlice({
    name: "DailyStatusById",
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
            .addCase(GET_DailyStatusDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(GET_DailyStatusDetails.fulfilled, (state, action) => {
                state.success = true;
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(GET_DailyStatusDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetState } = DailyStatusById.actions;
export default DailyStatusById.reducer;
