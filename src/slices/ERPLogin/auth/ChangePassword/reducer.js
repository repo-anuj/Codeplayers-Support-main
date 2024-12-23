import { createSlice } from '@reduxjs/toolkit';
import { POST_Vendor_ChangePassword } from './thunk'; // Import the thunk from above

const initialState = {
    data: null,
    loading: false,
    error: null,
    success: false,
};

const changePasswordSlice = createSlice({
    name: 'ChangePassword',
    initialState,
    reducers: {
        resetChangePasswordState: (state) => {
            state.data = null;
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(POST_Vendor_ChangePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(POST_Vendor_ChangePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.success = true;
                state.error = null;
            })
            .addCase(POST_Vendor_ChangePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
                state.success = false;
                state.data = null;
            });
    },
});

export const { resetChangePasswordState } = changePasswordSlice.actions;

export default changePasswordSlice.reducer;