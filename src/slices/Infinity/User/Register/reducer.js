import { createSlice } from '@reduxjs/toolkit';
import { POST_USER_Register } from './thunk'; // Adjust the import path accordingly

const userRegisterSlice = createSlice({
    name: 'userRegister',
    initialState: {
        data: null,
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        resetUserRegisterState: (state) => {
            state.loading = false;
            state.data = null;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(POST_USER_Register.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(POST_USER_Register.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.success = true;
            })
            .addCase(POST_USER_Register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error during registration';
            });
    },
});

export const { resetUserRegisterState } = userRegisterSlice.actions;
export default userRegisterSlice.reducer;
