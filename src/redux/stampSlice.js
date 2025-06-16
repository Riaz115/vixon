
import { createSlice } from "@reduxjs/toolkit";
export const stampslice = createSlice({
  name: "stamp",
  initialState: {
    stamps: [],
  },
  reducers: {

    Addstamp: (state, action) => {
      state.stamps = action.payload;
    },
    AddNewstamp: (state, action) => {
      state.stamps = [action.payload, ...state.stamps]
    },
    updatestamps: (state, action) => {
      let data = action.payload;
      let index = state.stamps.findIndex((obj) => obj.id === data.id)
      if (index !== -1) {
        state.stamps[index] = data;
      }
    },
    deletestamp: (state, action) => {
      let id = action.payload;
      //// //console.log   .log("this is for filter card")
      const updatedstamps = state.stamps.filter(stamp => stamp.id !== id)
      state.stamps = updatedstamps;
    },

  },
});

export const selectstamps = (state) => state.stamp.stamps;

export const { Addstamp, updatestamps, deletestamp, AddNewstamp, } = stampslice.actions;
export default stampslice.reducer;
