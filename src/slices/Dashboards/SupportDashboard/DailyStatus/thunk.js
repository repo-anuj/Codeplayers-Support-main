import {  Daily_Post_Status,Daily_Patch_Status } from "../../../../helpers/fakebackend_helper";
import { createAsyncThunk } from "@reduxjs/toolkit";



// {
//     "Support": "44cf205e-6241-4521-87eb-71f707f73d2b",
//     "SupportUser": "20d277c0-ac82-4d27-a316-a22a3771b3bd",
//     "SupportStatus": "32d8213f-5857-41f5-9ab5-eac1689a27e4",
//     "Description": "ok",
//     "DueDate":"2024-12-10T12:47:55.724Z"
// }
// {
//     "TicketNumber": "CS0000001",
//     "SupportUser": "20d277c0-ac82-4d27-a316-a22a3771b3bd",
//     "CurrentStatus": "44f5b34c-2bf5-4601-8785-c26f0157d76c",
//     "statusDate": "2024-12-09T09:41:08.507Z",
//     "DueDate": "2024-12-16T09:41:08.507Z",
//     "solutionDetails": "ddd",
//     "SupportID": "44cf205e-6241-4521-87eb-71f707f73d2b"
//   }
export const POST_DailyStatus = createAsyncThunk(
    "DailyStatus/post",
    async ({ body }, thunkAPI) => {
        try {
            
            if (!body) return("error");
            console.log(body);
            const payload={};
            payload.Support=body.SupportID;
            payload.SupportUser=body.SupportUser;
            payload.SupportStatus=body.CurrentStatus;
            payload.Remarks=body.solutionDetails;
            payload.DueDate=body.DueDate;
            console.log("pay ",payload);

            const response = await Daily_Post_Status(payload);

            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const PATCH_DailyStatus=createAsyncThunk(
    "DailyStatus/Patch",
    async({body},thunkAPI)=>{
        try{
            if (!body) return ("error");
            console.log(body);
            const payload = {};
            payload.DailyID=body.dailyID;
            payload.Support = body.SupportID;
            payload.SupportUser = body.SupportUser;
            payload.SupportStatus = body.CurrentStatus;
            payload.Remarks = body.solutionDetails;
            const date = new Date(body.DueDate);
            payload.DueDate = date.toISOString();
            console.log("pay ", payload);

            const response = await Daily_Patch_Status(payload);

            return response;
        }
        catch(error){
            console.log(error.response.data);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


