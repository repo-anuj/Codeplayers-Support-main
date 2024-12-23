import { POST_Vendor_ForgotPassword } from './thunk';
import { createSlice } from '@reduxjs/toolkit';

const ForgotPassword = createSlice({
    name: 'ForgotPassword',
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
            .addCase(POST_Vendor_ForgotPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(POST_Vendor_ForgotPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.success = true;
            })
            .addCase(POST_Vendor_ForgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetState } = ForgotPassword.actions;
export default ForgotPassword.reducer;
