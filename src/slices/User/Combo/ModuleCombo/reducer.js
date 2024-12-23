import { createSlice } from "@reduxjs/toolkit";
import { GET_ListClient, GET_ListModule,GET_ListClientUser } from "./thunk";

// Slice for List of Modules
const ListModule = createSlice({
  name: "ListofModulesData",
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
      .addCase(GET_ListModule.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(GET_ListModule.fulfilled, (state, action) => {
        state.success = true;
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(GET_ListModule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Slice for List of Clients
const ListClients = createSlice({
  name: "ListofClientsData",
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
      .addCase(GET_ListClient.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(GET_ListClient.fulfilled, (state, action) => {
        state.success = true;
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(GET_ListClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
const ListClientUser = createSlice({
  name: "ListofClientUserData",
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
      .addCase(GET_ListClientUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(GET_ListClientUser.fulfilled, (state, action) => {
        state.success = true;
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(GET_ListClientUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Exporting actions
export const { resetState: resetListModuleState } = ListModule.actions;
export const { resetState: resetListClientsState } = ListClients.actions;
export const { resetState: resetListClientUserState } = ListClientUser.actions;
// Exporting reducers
export default {
  ListModuleReducer: ListModule.reducer,
  ListClientsReducer: ListClients.reducer,
  ListClientUserReducer:ListClientUser.reducer,
};
