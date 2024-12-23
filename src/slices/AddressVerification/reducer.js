import { POST_Address_details } from './thunk';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: null,
    loading: false,
    error: null,
    success: false,
};

const AddressDetails = createSlice({
    name: 'OTPVerification',
    initialState,
    reducers: {
        resetState: (state) => {
            return initialState; // Reset to initial state to avoid manually resetting each property
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(POST_Address_details.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(POST_Address_details.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.success = true;
            })
            .addCase(POST_Address_details.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error occurred while sending OTP.";
            });
    },
});
export const { resetState: resetAddressDetails } = AddressDetails.actions;
export const AddressDetailsReducer = AddressDetails.reducer;