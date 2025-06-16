import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./Reducers";
export const store = configureStore({
    reducer: rootReducer,
  });
