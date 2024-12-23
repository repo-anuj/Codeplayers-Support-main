import {GET_SupportStatusList } from "../../../../../helpers/fakebackend_helper";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const GET_SUPPORTSTATUSLIST = createAsyncThunk(
    "SupportStatusData/get",
    async (_, thunkAPI) => {
        try {
            const response = await GET_SupportStatusList(_);
            console.log(response);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);