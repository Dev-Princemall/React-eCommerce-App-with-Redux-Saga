import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  LOGIN_USER,
  LOGOUT_USER,
  ADD_USER,
  SET_CATEGORY_FILTER,
  SET_SORT_BY,
  CLEAR_ERROR_SUCCESS_STATE,
  CLEAR_CART,
  ADD_DELIVERY_INFO,
  EDIT_DELIVERY_INFO,
  SAVE_PAYMENT_INFO,
} from "./constants";

export const fetchProductsRequest = () => ({ type: FETCH_PRODUCTS_REQUEST });
export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});
export const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});

export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const removeFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  payload: id,
});

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const loginUser = (name, password) => ({
  type: LOGIN_USER,
  payload: { name, password },
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const setCategoryFilter = (category) => ({
  type: SET_CATEGORY_FILTER,
  payload: category,
});

export const setSortBy = (sortBy) => ({
  type: SET_SORT_BY,
  payload: sortBy,
});

export const clearErrorSuccessState = () => ({
  type: CLEAR_ERROR_SUCCESS_STATE,
});

export const addDeliveryInfo = (deliveryInfo) => ({
  type: ADD_DELIVERY_INFO,
  payload: deliveryInfo,
});
export const editDeliveryInfo = (updatedFields) => ({
  type: EDIT_DELIVERY_INFO,
  payload: updatedFields,
});

export const savePaymentInfo = (paymentInfo) => ({
  type: SAVE_PAYMENT_INFO,
  payload: paymentInfo,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});
