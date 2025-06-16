// reducers/adminReducer.js
import { createSlice } from "@reduxjs/toolkit";
export const adminSlice = createSlice({
  name: "otheradmin",
  initialState: {
    admins: [],

  },
  reducers: {

    Addadmin: (state, action) => {
      state.admins = action.payload;
    },
    AddNewadmin: (state, action) => {
      state.admins = [action.payload, ...state.admins];
    },
    updateadminStatus: (state, action) => {
      let data = action.payload;
      let index = state.admins.findIndex((obj) =>
        obj._id === data._id
      )
      if (index !== -1) {
        state.admins[index] = data;

      }
    },
    deleteadmin: (state, action) => {
      let docId = action.payload;
      const updatedadmins = state.admins.filter(admin => admin.docId !== docId);
      state.admins = updatedadmins;
    },
    addActiveadmins: (state, action) => {
      state.activeadmins = action.payload;
      state.loading = false;

    }

  },
});

export const selectadmins = (state) => state.otheradmin.admins;

export const { Addadmin, updateadminStatus, deleteadmin, AddNewadmin } = adminSlice.actions; // actions
export default adminSlice.reducer;
