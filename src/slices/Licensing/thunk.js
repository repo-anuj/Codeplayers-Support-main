import { createAsyncThunk } from "@reduxjs/toolkit";
import { License_History_GET } from "../../helpers/fakebackend_helper"; // Replace with your actual API helper

export const GET_License_History = createAsyncThunk(
    "getLicenseHistory/get",
    async (thunkAPI) => {
        try {
            const response = await License_History_GET();
            const data = response;
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || "Failed to submit the License History"
            );
        }
    }
);

