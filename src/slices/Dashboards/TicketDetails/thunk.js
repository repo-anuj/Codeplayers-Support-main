import { ERP_GET_TicketDetails } from '../../../helpers/fakebackend_helper';
import { GET_TICKET_DETAILS } from "../../../helpers/url_helper";

import { createAsyncThunk } from '@reduxjs/toolkit';

export const GET_TicketDetails = createAsyncThunk(
  'ticketDetails/post',
  async (SupportID, thunkAPI) => {
    try {
      console.log('Fetching ticket details for SupportID:', SupportID);

      if (!SupportID) {
        return thunkAPI.rejectWithValue('Support ID could not be extracted from the URL.');
      }

      // Call the API helper
      const api = GET_TICKET_DETAILS
      const param = SupportID;
      const masterURL = `${api}${param}`;
      const response = await ERP_GET_TicketDetails(masterURL);
      return response;

    } catch (error) {
      // Handle errors gracefully
      return thunkAPI.rejectWithValue(error.response?.data || error.message || 'Something went wrong');
    }
  }
);
