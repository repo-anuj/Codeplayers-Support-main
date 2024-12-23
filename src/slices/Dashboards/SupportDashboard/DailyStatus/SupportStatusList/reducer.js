import { createSlice } from "@reduxjs/toolkit";
import { GET_SUPPORTSTATUSLIST} from "./thunk";

const SupportStatuses = createSlice({
    name: "SupportStatuses",
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
            .addCase(GET_SUPPORTSTATUSLIST.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(GET_SUPPORTSTATUSLIST.fulfilled, (state, action) => {
                state.success = true;
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(GET_SUPPORTSTATUSLIST.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetState } = SupportStatuses.actions;
export default SupportStatuses.reducer;
