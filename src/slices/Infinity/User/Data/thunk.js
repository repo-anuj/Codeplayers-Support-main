import { User_Get_Data } from "../../../../helpers/fakebackend_helper";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const GET_USER_Data = createAsyncThunk(
    "userData/fetch",
    async (_, thunkAPI) => { // No 'user' argument needed here
        try {
            const data = await User_Get_Data(); // Await the response directly
            console.log(data);
            return data; // Return the fetched data
        } catch (error) {
            // Provide a fallback for better error handling
            return thunkAPI.rejectWithValue(
                error.response?.data || error.message || 'Error during user data fetch'
            );
        }
    }
);

