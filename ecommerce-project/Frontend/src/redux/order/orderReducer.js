import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILURE,
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  FETCH_ORDER_DETAILS_REQUEST,
  FETCH_ORDER_DETAILS_SUCCESS,
  FETCH_ORDER_DETAILS_FAILURE,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAILURE,
} from "../constants";

const initialState = {
  orders: [],
  orderDetails: null,
  loading: false,
  error: null,
  success: false,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLACE_ORDER_REQUEST:
    case FETCH_ORDERS_REQUEST:
    case FETCH_ORDER_DETAILS_REQUEST:
    case CANCEL_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };

    case PLACE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        orders: [action.payload, ...state.orders], // Add new order to state
      };

    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
        error: null,
      };

    case FETCH_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        orderDetails: action.payload,
        error: null,
      };

    case CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        orders: state.orders.filter((order) => order._id !== action.payload), // Remove canceled order
      };

    case PLACE_ORDER_FAILURE:
    case FETCH_ORDERS_FAILURE:
    case FETCH_ORDER_DETAILS_FAILURE:
    case CANCEL_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    default:
      return state;
  }
};

export default orderReducer;
