import { create } from "lodash";
import { GET_ListofClient, GET_ListofModules } from "../../../../helpers/fakebackend_helper";
import { GET_ListofClientUser } from "../../../../helpers/fakebackend_helper";
import { GET_LIST_OF_CLIENTUSER } from "../../../../helpers/url_helper";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const GET_ListModule = createAsyncThunk(
  "ListofModulesData/get",
  async (_, thunkAPI) => {
    try {
      const response = await GET_ListofModules();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const GET_ListClient = createAsyncThunk(
  "ListofClientsData/get",
  async (_, thunkAPI) => {
    try {
      const response = await GET_ListofClient();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const GET_ListClientUser = createAsyncThunk(
  "ListofClientsUserData/get",
  async(clientID,thunkAPI)=>{
    try {
      console.log('Fetching daily status details for ClientID:', clientID);

      if (!clientID) {
        return thunkAPI.rejectWithValue('Support ID could not be extracted from the URL.');
      }

      // Call the API helper
      const api = GET_LIST_OF_CLIENTUSER;
      const param = clientID;
      const masterURL = `${api}${param}`;
      const response = await GET_ListofClientUser(masterURL);
      return response;

    } catch (error) {
      // Handle errors gracefully
      return thunkAPI.rejectWithValue(error.response?.data || error.message || 'Something went wrong');
    }
  }
);