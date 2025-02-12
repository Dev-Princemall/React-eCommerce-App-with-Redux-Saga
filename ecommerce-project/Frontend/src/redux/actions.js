import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
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
  ADD_ORDER_HISTORY,
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

export const addProductRequest = (product) => ({
  type: ADD_PRODUCT_REQUEST,
  payload: product,
});
export const addProductSuccess = (product) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: product,
});
export const addProductFailure = (error) => ({
  type: ADD_PRODUCT_FAILURE,
  payload: error,
});

export const updateProductRequest = (id, updatedProduct) => ({
  type: UPDATE_PRODUCT_REQUEST,
  payload: { id, updatedProduct },
});
export const updateProductSuccess = (product) => ({
  type: UPDATE_PRODUCT_SUCCESS,
  payload: product,
});
export const updateProductFailure = (error) => ({
  type: UPDATE_PRODUCT_FAILURE,
  payload: error,
});

export const deleteProductRequest = (id) => ({
  type: DELETE_PRODUCT_REQUEST,
  payload: id,
});
export const deleteProductSuccess = (id) => ({
  type: DELETE_PRODUCT_SUCCESS,
  payload: id,
});
export const deleteProductFailure = (error) => ({
  type: DELETE_PRODUCT_FAILURE,
  payload: error,
});

export const registerRequest = (userData) => ({
  type: REGISTER_REQUEST,
  payload: userData,
});
export const registerSuccess = (user) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});
export const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

export const loginRequest = (userData) => ({
  type: LOGIN_REQUEST,
  payload: userData,
});
export const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({ type: LOGOUT });

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
export const addOrderHistory = (
  cartItems,
  delivery_info,
  payment_info,
  totalAmount
) => ({
  type: ADD_ORDER_HISTORY,
  payload: {
    orderId: Date.now(),
    items: [...cartItems],
    status: "processing",
    shippingAddress:
      delivery_info.houseNameNumber +
      "," +
      delivery_info.area +
      "," +
      delivery_info.landmark +
      "," +
      delivery_info.city +
      "," +
      delivery_info.state +
      "-" +
      delivery_info.pinCode +
      "," +
      delivery_info.country,
    paymentInfo: payment_info,
    total: totalAmount,
    orderDate: new Date().toISOString(),
  },
});
export const clearCart = () => ({
  type: CLEAR_CART,
});
