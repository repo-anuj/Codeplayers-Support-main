import { createSlice } from "@reduxjs/toolkit";
import { POST_Query_Ticket } from "./thunk";

const ticketSlice = createSlice({
    name: "ticket",
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
            .addCase(POST_Query_Ticket.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(POST_Query_Ticket.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.data = action.payload;
            })
            .addCase(POST_Query_Ticket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "An error occurred";
            });
    },
});

export const { resetState } = ticketSlice.actions;
export default ticketSlice.reducer;
