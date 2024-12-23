import { ERP_GET_SupportDashboard, Raise_Post_Ticket,Raise_Patch_Ticket } from "../../../helpers/fakebackend_helper";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const GET_SupportDashboard = createAsyncThunk(
  "SupportRegister/get",
  async (_, thunkAPI) => {
    try {
      const response = await ERP_GET_SupportDashboard();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const POST_RaiseTicket = createAsyncThunk(
  "RaiseTicket/post",
  async (body, thunkAPI) => {
    try {
      console.log(body);
      if (!body) return;

      console.log(body);

      const response = Raise_Post_Ticket(body);
      const data = await response;
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const PATCH_RaiseTicket = createAsyncThunk(
  "RaiseTicket/patch",
  async (body, thunkAPI) => {
    try {
      console.log(body);
      if (!body) return;

      console.log(body);

      const response = await Raise_Patch_Ticket(body);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const applyFilters = (existingData, filterArray) => {
  let result = existingData;

  if (filterArray.Accounts.length > 0) {
    result = result.filter((item) => filterArray.Accounts.includes(item.party));
  }

  return result;
};
