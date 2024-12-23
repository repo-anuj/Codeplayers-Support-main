
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  error: "",
  success: "test", 
  user: []
};

const CompanySelection  = createSlice({
  name: "CompanySelection",
  initialState,
  reducers: { 
    dataSuccess(state, action) {
      state.success = "true";
      state.user = action.payload
    },
  },
});

export const {
    dataSuccess
} = CompanySelection.actions

export default CompanySelection.reducer;