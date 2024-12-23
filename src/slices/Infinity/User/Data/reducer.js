import { createSlice } from '@reduxjs/toolkit';
import { GET_USER_Data } from './thunk'; // Adjust the import path accordingly

const userDataSlice = createSlice({
    name: 'userData',
    initialState: {
        data: null,
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        resetUserDataState: (state) => {
            state.loading = false;
            state.data = null;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GET_USER_Data.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(GET_USER_Data.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.success = true;
            })
            .addCase(GET_USER_Data.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error during registration';
            });
    },
});

export const { resetUserDataState } = userDataSlice.actions;
export default userDataSlice.reducer;
