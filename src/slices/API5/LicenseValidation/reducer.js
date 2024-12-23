import { createSlice} from '@reduxjs/toolkit';
import { POST_LicenseValidation } from './thunk';


const license = createSlice({
  name: 'license',
  initialState: {
    data: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.data = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(POST_LicenseValidation.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(POST_LicenseValidation.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(POST_LicenseValidation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = license.actions;
export default license.reducer;