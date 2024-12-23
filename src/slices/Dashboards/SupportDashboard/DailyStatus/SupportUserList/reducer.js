import { createSlice } from "@reduxjs/toolkit";
import { GET_SUPPORTUSER } from "./thunk";

const SupportUsers = createSlice({
    name: "SupportUsers",
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
            .addCase(GET_SUPPORTUSER.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(GET_SUPPORTUSER.fulfilled, (state, action) => {
                state.success = true;
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(GET_SUPPORTUSER.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetState } = SupportUsers.actions;
export default SupportUsers.reducer;
