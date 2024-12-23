import { Ticket_GET_UploadMedia} from '../../../../../helpers/fakebackend_helper';
import { GET_ATTACHMENT_DETAILS } from '../../../../../helpers/url_helper';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const GET_UploadMedia = createAsyncThunk(
    'UploadMedia/get',
    async (TicketID, thunkAPI) => {
        try {
            console.log('Fetching daily status details for ticketID:', TicketID);

            if (!TicketID) {
                return thunkAPI.rejectWithValue('Support ID could not be extracted from the URL.');
            }

            // Call the API helper
            const api = GET_ATTACHMENT_DETAILS;
            const param = TicketID;
            const masterURL = `${api}${param}`;
            const response = await Ticket_GET_UploadMedia(masterURL);
            return response;

        } catch (error) {
            // Handle errors gracefully
            return thunkAPI.rejectWithValue(error.response?.data || error.message || 'Something went wrong');
        }
    }
);
