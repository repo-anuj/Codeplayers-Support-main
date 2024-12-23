import { GET_Product_History } from "../../../helpers/fakebackend_helper";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const GET_PRODUCT_ORDER_HISTORY = createAsyncThunk(
  "ProductOrderHistory/get",
  async (thunkAPI) => {
    try {
      const response = GET_Product_History();
      const data = await response;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);



