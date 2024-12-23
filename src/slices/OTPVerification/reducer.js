import { POST_OTP_Sending, POST_OTP_Verified } from './thunk';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: null,
    loading: false,
    error: null,
    success: false,
};

const OTPVerification = createSlice({
    name: 'OTPVerification',
    initialState,
    reducers: {
        resetState: (state) => {
            return initialState; // Reset to initial state to avoid manually resetting each property
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(POST_OTP_Sending.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(POST_OTP_Sending.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.success = true;
            })
            .addCase(POST_OTP_Sending.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error occurred while sending OTP.";
            });
    },
});

const OTPVerified = createSlice({
    name: 'OTPVerified',
    initialState,
    reducers: {
        resetState: (state) => {
            return initialState; // Reset to initial state
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(POST_OTP_Verified.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(POST_OTP_Verified.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.success = true;
            })
            .addCase(POST_OTP_Verified.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error occurred while verifying OTP.";
            });
    },
});

// Export the actions from OTPVerification
export const { resetState: resetOTPVerificationState } = OTPVerification.actions;
export const { resetState: resetOTPVerifiedState } = OTPVerified.actions;

// Export the reducers as named exports
export const OTPVerificationReducer = OTPVerification.reducer;
export const OTPVerifiedReducer = OTPVerified.reducer;
