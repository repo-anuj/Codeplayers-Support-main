import { POST_Vendor_Register } from './thunk';
import { createSlice } from '@reduxjs/toolkit';

const signUpSlice = createSlice({
    name: 'SignUp',
    initialState: {
        data: null,
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        resetSignUpState: (state) => {
            state.loading = false;
            state.data = null;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(POST_Vendor_Register.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(POST_Vendor_Register.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.success = true;
            })
            .addCase(POST_Vendor_Register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetSignUpState } = signUpSlice.actions;
export default signUpSlice.reducer;
