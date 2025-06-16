
import { createSlice } from "@reduxjs/toolkit";
export const customerslice = createSlice({
  name: "customer",
  initialState: {
    customers: [],
  },
  reducers: {

    Addcustomer: (state, action) => {
      state.customers = action.payload;
    },
    AddNewcustomer: (state, action) => {
      state.customers = [action.payload,...state.customers ];
    },
    updatecustomers: (state, action) => {
      let data = action.payload;
      let index = state.customers.findIndex((obj) => obj.id === data.id)
      if (index !== -1) {
        state.customers[index] = data;
      }
    },
    deletecustomerdata: (state, action) => {
      let id = action.payload;
      //// //console.log   .log("this is for filter card")
      const updatedcustomers = state.customers.filter(customer => customer.id !== id)
      state.customers = updatedcustomers;
    },

  },
});

export const selectcustomers = (state) => state.customer.customers;

export const { Addcustomer, updatecustomers, deletecustomerdata, AddNewcustomer} = customerslice.actions;
export default customerslice.reducer;
