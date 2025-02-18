import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import productReducer from "./product/reducer";
import cartReducer from "./cart/cartReducer";
import orderReducer from "./order/orderReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
  orders: orderReducer,
});

export default rootReducer;
