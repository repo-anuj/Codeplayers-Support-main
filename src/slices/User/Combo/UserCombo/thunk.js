import { GET_ListofUser } from "../../../../helpers/fakebackend_helper";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const GET_ListUser = createAsyncThunk(
  "ListofUser/get",
  async (_, thunkAPI) => {
    try {
      const response = await GET_ListofUser();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
