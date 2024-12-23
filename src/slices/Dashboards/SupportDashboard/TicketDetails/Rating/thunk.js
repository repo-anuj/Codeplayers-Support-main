import { Post_Rating } from "../../../../../helpers/fakebackend_helper";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const POST_Rating = createAsyncThunk(
  "Rating/post",
  async ({ body }, thunkAPI) => {
    try {
      // if (!SupportID || !Rating || RatingRemarks === undefined) {
      //   throw new Error("Missing required fields in POST body.");
      // }

      // const body = { SupportID, Rating, RatingRemarks };

      console.log("POST Body:", body);

      const response = await Post_Rating(body);

      return response;
    } catch (error) {
      // Return error message from API or generic error
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to post rating."
      );
    }
  }
);
