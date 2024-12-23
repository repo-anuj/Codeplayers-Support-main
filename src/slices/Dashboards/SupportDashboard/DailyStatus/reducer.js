import { createSlice } from "@reduxjs/toolkit";
import { POST_DailyStatus } from "./thunk";

const DailyStatus = createSlice({
    name: "DailyStatus",
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
            .addCase(POST_DailyStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(POST_DailyStatus.fulfilled, (state, action) => {
                state.success = true;
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(POST_DailyStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetState } = DailyStatus.actions;
export default DailyStatus.reducer;
