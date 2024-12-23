import { OTP_Post_Login,OTP_Post_Verified } from "../../helpers/fakebackend_helper";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const POST_OTP_Sending = createAsyncThunk(
    "OTPVerification/post",
    async (user, thunkAPI) => {
        try {
            const response = OTP_Post_Login({
                Mobile:user.mobileNumber,
                UserName:user.userName,
                
            });
            const data = await response;
            
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const POST_OTP_Verified = createAsyncThunk(
    "OTPVerified/post",
    async (user, thunkAPI) => {
        try {
            const response = OTP_Post_Verified({
                OTP:user.otp,
                Mobile:user.mobileNumber,
                UserName:user.userName,
            });
            const data = await response;
            console.log(data);
            localStorage.setItem("verifiedOTP", true);
            return data;
            
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);