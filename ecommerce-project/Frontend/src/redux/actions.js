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
  FETCH_USER_PROFILE_REQUEST,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAILURE,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  INCREASE_QUANTITY_REQUEST,
  INCREASE_QUANTITY_SUCCESS,
  INCREASE_QUANTITY_FAILURE,
  DECREASE_QUANTITY_REQUEST,
  DECREASE_QUANTITY_SUCCESS,
  DECREASE_QUANTITY_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  CLEAR_CART_REQUEST,
  CLEAR_CART_SUCCESS,
  CLEAR_CART_FAILURE,
  SET_CATEGORY_FILTER,
  SET_SORT_BY,
  ADD_DELIVERY_INFO,
  EDIT_DELIVERY_INFO,
  SAVE_PAYMENT_INFO,
  ADD_ORDER_HISTORY,
} from "./constants";

// product actions
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

// auth actions
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
export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});
export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({ type: LOGOUT });

export const fetchUserProfileRequest = () => ({
  type: FETCH_USER_PROFILE_REQUEST,
});
export const fetchUserProfileSuccess = (user) => ({
  type: FETCH_USER_PROFILE_SUCCESS,
  payload: user,
});
export const fetchUserProfileFailure = (error) => ({
  type: FETCH_USER_PROFILE_FAILURE,
  payload: error,
});

export const updateUserProfileRequest = (user) => ({
  type: UPDATE_USER_PROFILE_REQUEST,
  payload: user,
});
export const updateUserProfileSuccess = (user) => ({
  type: UPDATE_USER_PROFILE_SUCCESS,
  payload: user,
});
export const updateUserProfileFailure = (error) => ({
  type: UPDATE_USER_PROFILE_FAILURE,
  payload: error,
});

// cart actions
export const getCartRequest = (userId) => ({
  type: GET_CART_REQUEST,
  payload: userId,
});
export const getCartSuccess = (cart) => ({
  type: GET_CART_SUCCESS,
  payload: cart,
});
export const getCartFailure = (error) => ({
  type: GET_CART_FAILURE,
  payload: error,
});

export const addToCartRequest = (productId, userId, quantity = 1) => ({
  type: ADD_TO_CART_REQUEST,
  payload: { productId, userId, quantity },
});
export const addToCartSuccess = (cart) => ({
  type: ADD_TO_CART_SUCCESS,
  payload: cart,
});
export const addToCartFailure = (error) => ({
  type: ADD_TO_CART_FAILURE,
  payload: error,
});

export const updateCartItemRequest = (productId, userId, quantity) => ({
  type: UPDATE_CART_ITEM_REQUEST,
  payload: { productId, userId, quantity },
});
export const updateCartItemSuccess = (cart) => ({
  type: UPDATE_CART_ITEM_SUCCESS,
  payload: cart,
});
export const updateCartItemFailure = (error) => ({
  type: UPDATE_CART_ITEM_FAILURE,
  payload: error,
});

export const increaseQuantityRequest = (productId, userId) => ({
  type: INCREASE_QUANTITY_REQUEST,
  payload: { productId, userId },
});
export const increaseQuantitySuccess = (cart) => ({
  type: INCREASE_QUANTITY_SUCCESS,
  payload: cart,
});
export const increaseQuantityFailure = (error) => ({
  type: INCREASE_QUANTITY_FAILURE,
  payload: error,
});

export const decreaseQuantityRequest = (productId, userId) => ({
  type: DECREASE_QUANTITY_REQUEST,
  payload: { productId, userId },
});
export const decreaseQuantitySuccess = (cart) => ({
  type: DECREASE_QUANTITY_SUCCESS,
  payload: cart,
});
export const decreaseQuantityFailure = (error) => ({
  type: DECREASE_QUANTITY_FAILURE,
  payload: error,
});

export const removeCartItemRequest = (productId, userId) => ({
  type: REMOVE_CART_ITEM_REQUEST,
  payload: { productId, userId },
});
export const removeCartItemSuccess = (cart) => ({
  type: REMOVE_CART_ITEM_SUCCESS,
  payload: cart,
});
export const removeCartItemFailure = (error) => ({
  type: REMOVE_CART_ITEM_FAILURE,
  payload: error,
});

export const clearCartRequest = (userId) => ({
  type: CLEAR_CART_REQUEST,
  payload: userId,
});
export const clearCartSuccess = (cart) => ({
  type: CLEAR_CART_SUCCESS,
  payload: cart,
});
export const clearCartFailure = (error) => ({
  type: CLEAR_CART_FAILURE,
  payload: error,
});

export const setCategoryFilter = (category) => ({
  type: SET_CATEGORY_FILTER,
  payload: category,
});

export const setSortBy = (sortBy) => ({
  type: SET_SORT_BY,
  payload: sortBy,
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
