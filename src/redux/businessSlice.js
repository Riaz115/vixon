import { createSlice } from "@reduxjs/toolkit";

export const businessSlice = createSlice({
  name: "business",
  initialState: {
    businesses: {}, 
    isCertificatesUploaded : false,
  },
  reducers: {
  
    addBusiness: (state, action) => {
      const business = action.payload;
      state.businesses = business;
    },
    updateCertificateState: (state, action) => {
      state.isCertificatesUploaded =  action.payload;
    },

    updateBusiness: (state, action) => {
      const updatedBusiness = action.payload;
      if (state.businesses[updatedBusiness.id]) {
        state.businesses[updatedBusiness.id] = {
          ...state.businesses[updatedBusiness.id],
          ...updatedBusiness,
        };
      } else {
        console.warn(
          `Business with ID ${updatedBusiness.id} does not exist and cannot be updated.`
        );
      }
    },

    
    removeBusiness: (state, action) => {
      const idToRemove = action.payload;
      if (state.businesses[idToRemove]) {
        delete state.businesses[idToRemove];
      } else {
        console.warn(
          `Business with ID ${idToRemove} does not exist and cannot be removed.`
        );
      }
    },
  },
});

export const selectBusinesses = (state) => state.business.businesses;
export const selectisCertificatesUploaded = (state) => state.business.isCertificatesUploaded;

export const { addBusiness, updateBusiness, removeBusiness , updateCertificateState} = businessSlice.actions;
export default businessSlice.reducer;
