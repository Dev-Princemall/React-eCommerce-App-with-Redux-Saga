import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import productReducer from "./product/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
});

export default rootReducer;
