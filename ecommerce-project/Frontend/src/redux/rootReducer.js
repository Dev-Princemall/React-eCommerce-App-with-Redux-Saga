import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import productReducer from "./product/reducer";
import cartReducer from "./cart/cartReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
});

export default rootReducer;
