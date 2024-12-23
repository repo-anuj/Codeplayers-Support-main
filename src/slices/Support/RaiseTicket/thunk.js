import { createAsyncThunk } from "@reduxjs/toolkit";
import { Query_Post_Ticket } from "../../../helpers/fakebackend_helper"; // Replace with your actual API helper

export const POST_Query_Ticket = createAsyncThunk(
    "ticket/submit",
    async (ticketData, thunkAPI) => {
        try {
            const response = await Query_Post_Ticket({

            }); // API call
            const data = await response;
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || "Failed to submit the ticket"
            );
        }
    }
);
