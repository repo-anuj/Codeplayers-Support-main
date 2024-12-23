import { createAsyncThunk } from '@reduxjs/toolkit';
import {Vendor_Post_ChangePassword} from "./../../../../helpers/fakebackend_helper"

// Define the thunk for changing the password
export const POST_Vendor_ChangePassword = createAsyncThunk(
    'changePassword/post',
    async (payload, { rejectWithValue }) => {
        try {
            if(!payload){
                return rejectWithValue({ message: 'Invalid payload' });
            }

            const response = await Vendor_Post_ChangePassword(payload);
            return response.data; // Assuming API returns a data object on success
        } catch (error) {
            return rejectWithValue(error.response.data || 'Something went wrong');
        }
    }
);