import {GET_SupportUser } from "../../../../../helpers/fakebackend_helper";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const GET_SUPPORTUSER = createAsyncThunk(
    "SupportUserData/get",
    async (_, thunkAPI) => {
        try {
            const response = await GET_SupportUser(_);
            console.log(response);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);