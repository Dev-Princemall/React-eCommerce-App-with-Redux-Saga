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
import {
  placeOrder as placeOrderApi,
  getOrderHistory,
  getOrderById,
  cancelOrder as cancelOrderApi,
} from "../../services/orderApi";

// Place Order
export const placeOrder = (orderData) => async (dispatch) => {
  try {
    dispatch({ type: PLACE_ORDER_REQUEST });
    const data = await placeOrderApi(orderData);
    dispatch({ type: PLACE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PLACE_ORDER_FAILURE, payload: error.message });
  }
};

// Fetch Order History
export const fetchOrderHistory = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ORDERS_REQUEST });
    const data = await getOrderHistory();
    dispatch({ type: FETCH_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_ORDERS_FAILURE, payload: error.message });
  }
};

// Fetch Single Order Details
export const fetchOrderDetails = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ORDER_DETAILS_REQUEST });
    const data = await getOrderById(orderId);
    dispatch({ type: FETCH_ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_ORDER_DETAILS_FAILURE, payload: error.message });
  }
};

// Cancel Order
export const cancelOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: CANCEL_ORDER_REQUEST });
    await cancelOrderApi(orderId);
    dispatch({ type: CANCEL_ORDER_SUCCESS, payload: orderId });
  } catch (error) {
    dispatch({ type: CANCEL_ORDER_FAILURE, payload: error.message });
  }
};
