import { createSlice } from "@reduxjs/toolkit";
import { GET_UploadMedia } from "./thunk";

const UploadMedia = createSlice({
    name: "UploadMedia",
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
            .addCase(GET_UploadMedia.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(GET_UploadMedia.fulfilled, (state, action) => {
                state.success = true;
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(GET_UploadMedia.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetState } = UploadMedia.actions;
export default UploadMedia.reducer;
