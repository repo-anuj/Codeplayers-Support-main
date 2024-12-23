import { ERP_GET_TrainingTask, ERP_POST_AllotTraining,GET_ALLOTED_TRAINING } from "../../../helpers/fakebackend_helper";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const GET_TrainingTask = createAsyncThunk(
  "TraningAllotmentData/get",
  async (_, thunkAPI) => {
    try {
      const response = await ERP_GET_TrainingTask();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const GET_AllotedTraining  = createAsyncThunk('allotedTraining/get',async (SubUserID, thunkAPI)  => {
  try {

    if (SubUserID === undefined)
      return;

    
    const paramData = { "SubUserID": SubUserID }
    const response = GET_ALLOTED_TRAINING(paramData);
    const data = await response;
    return data;
  } catch (error) {
    return  thunkAPI.rejectWithValue(error.response.data);
  }
}
);

export const POST_AllotTraining = createAsyncThunk(
  "TraningAllotmentData/post",
  async (postData, thunkAPI) => {
    try {

      if (postData === undefined)
        return;
      const response = await ERP_POST_AllotTraining(postData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
