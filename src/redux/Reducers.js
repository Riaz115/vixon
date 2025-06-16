import { combineReducers } from "redux";
import stampSlice from "./stampSlice";
import adminSlice from "./adminSlice";
import customerSlice from "./customerSlice";
import transactionSlice from "./transactionSlice";
import businessSlice from "./businessSlice";
const rootReducer = combineReducers({
  admin: adminSlice,
  stamp:stampSlice,
  customer:customerSlice,
  transaction:transactionSlice,
  business: businessSlice,
});

export default rootReducer;