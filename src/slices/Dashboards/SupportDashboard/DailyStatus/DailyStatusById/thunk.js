import { ERP_GET_DailyStatusDetails } from '../../../../../helpers/fakebackend_helper';
import { GET_DAILYSTATUS_DETAILS } from '../../../../../helpers/url_helper';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const GET_DailyStatusDetails = createAsyncThunk(
    'DailyStatusDetails/post',
    async (SupportID, thunkAPI) => {
        try {
            console.log('Fetching daily status details for ticketID:', SupportID);

            if (!SupportID) {
                return thunkAPI.rejectWithValue('Support ID could not be extracted from the URL.');
            }

            // Call the API helper
            const api = GET_DAILYSTATUS_DETAILS;
            const param = SupportID;
            const masterURL = `${api}${param}`;
            const response = await ERP_GET_DailyStatusDetails(masterURL);
            return response;

        } catch (error) {
            // Handle errors gracefully
            return thunkAPI.rejectWithValue(error.response?.data || error.message || 'Something went wrong');
        }
    }
);
