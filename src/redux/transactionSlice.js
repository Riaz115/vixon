
import { createSlice } from "@reduxjs/toolkit";
export const transactionslice = createSlice({
  name: "transaction",
  initialState: {
    transactions: [],
  },
  reducers: {

    Addtransaction: (state, action) => {
      state.transactions = action.payload;
    },
    AddNewtransaction: (state, action) => {
      //console.log("AddNewtransaction Reducer Called:", action.payload);
      state.transactions = [action.payload,...state.transactions];
    },
    updatetransactions: (state, action) => {
      let data = action.payload;
      let index = state.transactions.findIndex((obj) => obj.id === data.id)
      if (index !== -1) {
        state.transactions[index] = data;
      }
    },
    deletetransaction: (state, action) => {
      let id = action.payload;
      //// //console.log   .log("this is for filter card")
      const updatedtransactions = state.transactions.filter(transaction => transaction.id !== id)
      state.transactions = updatedtransactions;
    },

  },
});

export const selecttransactions = (state) => state.transaction.transactions;

export const { Addtransaction, updatetransactions, deletetransaction, AddNewtransaction} = transactionslice.actions;
export default transactionslice.reducer;
