import { ERP_GET_MainDashboard } from "../../../../../helpers/fakebackend_helper";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const GET_ERPDashboard = createAsyncThunk(
  "MainDashboard/post",
  async ({ FromDate, ToDate, existingData, filterArray }, thunkAPI) => {
    try {
      if (existingData && filterArray) {
        return applyFilters(existingData, filterArray);
      }

      if (FromDate === undefined || ToDate === undefined) return;

      const bodyData = {
        FromDate: FromDate,
        ToDate: ToDate,
      };

      const response = ERP_GET_MainDashboard(bodyData);
      const data = await response;
      return data;
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
