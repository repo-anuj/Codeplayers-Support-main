import { POST_Vendor_Login } from './thunk'
import { createSlice } from '@reduxjs/toolkit';

const Login = createSlice({
  name: 'Login',
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
      .addCase(POST_Vendor_Login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(POST_Vendor_Login.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.success = true;
      })
      .addCase(POST_Vendor_Login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = Login.actions;
export default Login.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// export const initialState = {
//   user: {},
//   error: "", // for error message
//   loading2: false,
//   isUserLogout: false,
//   errorMsg: false, // for error
// };

// const loginSlice = createSlice({
//   name: "login",
//   initialState,
//   reducers: {
//     apiError(state, action) {
//       state.error = action.payload;
//       state.loading2 = false;
//       state.isUserLogout = false;
//       state.errorMsg = true;
//     },
//     loginSuccess(state, action) {
//       state.user = action.payload
//       state.loading2 = false;
//       state.errorMsg = false;
//     },
//     logoutUserSuccess(state, action) {
//       state.isUserLogout = true
//     },
//     reset_login_flag(state) {
//       state.error = null
//       state.loading2 = false;
//       state.errorMsg = false;
//     }
//   },
// });

// export const {
//   apiError,
//   loginSuccess,
//   logoutUserSuccess,
//   reset_login_flag
// } = loginSlice.actions

// export default loginSlice.reducer;