import { Max_Ticket_Get_Data } from "../../../helpers/fakebackend_helper";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const GET_MaxTicketNumber = createAsyncThunk(
  "MaxTicketNumber/get",
  async (_, thunkAPI) => {
    try {
      const response = await Max_Ticket_Get_Data();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);