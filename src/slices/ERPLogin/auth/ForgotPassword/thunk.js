import { Vendor_Post_ForgotPassword } from "../../../../helpers/fakebackend_helper";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const POST_Vendor_ForgotPassword = createAsyncThunk(
    "VendorForgotPassword/post",
    async (username, thunkAPI) => {
        try {
            // Call the backend helper function to send the forgot password request based on the username
            const response = await Vendor_Post_ForgotPassword({
                UserName: username,
            });
            const data = await response;

            // You can store the username in localStorage for further steps if needed
            localStorage.setItem("forgotPasswordUsername", username);

            return data;
        } catch (error) {
            // If error, return the error to be handled by extraReducers
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
