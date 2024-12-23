import { createSlice } from "@reduxjs/toolkit";
import { GET_License_History } from "./thunk";

const LicenseHistorySlice = createSlice({
    name:"LicenseHistory",
    initialState: {
        loading: false,
        error: null,
        success: false,
        data: null,
    },
    reducers: {
        resetState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GET_License_History.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(GET_License_History.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.data = action.payload;
            })
            .addCase(GET_License_History.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "An error occurred";
            });
    },
});

export const { resetState } = LicenseHistorySlice.actions;
export default LicenseHistorySlice.reducer;
